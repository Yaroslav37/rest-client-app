import { renderHook } from '@testing-library/react';
import { useRestClientParams } from '@/hooks/useRestClientParams';
import { ReadonlyURLSearchParams, useParams, useRouter, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { vi } from 'vitest';
import { HttpMethod } from '@/shared/types/enums';
import { ROUTES } from '@/shared/routes';

class MockURLSearchParams extends URLSearchParams {
  constructor(init?: string[][] | Record<string, string> | string | URLSearchParams) {
    super(init);
  }

  append = vi.fn();
  delete = vi.fn();
  set = vi.fn();
  sort = vi.fn();
}

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
  useRouter: vi.fn(() => ({
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  useSearchParams: vi.fn(() => {
    const params = new MockURLSearchParams();
    return params as unknown as ReadonlyURLSearchParams;
  }),
  notFound: vi.fn(),
}));

vi.mock('@/shared/utils/safe-coding', () => ({
  decodeBase64: vi.fn((str) => (str ? `decoded-${str}` : '')),
}));

describe('useRestClientParams', () => {
  const mockRouter = {
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  };

  let mockSearchParams: MockURLSearchParams;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new MockURLSearchParams();

    vi.mocked(useRouter).mockReturnValue(mockRouter);
    vi.mocked(useParams).mockReturnValue({ parts: [] });
    vi.mocked(useSearchParams).mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams,
    );
  });

  it('should provide default values when no params are provided', () => {
    const { result } = renderHook(() => useRestClientParams());

    expect(result.current.initialMethod).toBe(HttpMethod.GET);
    expect(result.current.initialValues).toEqual({
      url: '',
      body: '',
      headers: [],
    });
  });

  it('should decode method from URL parts', () => {
    vi.mocked(useParams).mockReturnValue({
      parts: ['post', 'test-url', 'test-body'],
    });

    const { result } = renderHook(() => useRestClientParams());

    expect(result.current.initialMethod).toBe(HttpMethod.POST);
  });

  it('should decode URL and body from parts', () => {
    vi.mocked(useParams).mockReturnValue({
      parts: ['get', 'encoded-url', 'encoded-body'],
    });

    const { result } = renderHook(() => useRestClientParams());

    expect(result.current.initialValues).toEqual({
      url: 'decoded-encoded-url',
      body: 'decoded-encoded-body',
      headers: [],
    });
  });

  it('should parse headers from search params', () => {
    mockSearchParams = new MockURLSearchParams([
      ['Content-Type', 'application/json'],
      ['Authorization', 'Bearer token'],
    ]);

    vi.mocked(useSearchParams).mockReturnValue(
      mockSearchParams as unknown as ReadonlyURLSearchParams,
    );

    vi.mocked(useParams).mockReturnValue({
      parts: ['get', 'test-url'],
    });

    const { result } = renderHook(() => useRestClientParams());

    expect(result.current.initialValues.headers).toEqual([
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer token' },
    ]);
  });

  it('should redirect to default URL when no parts are provided', () => {
    renderHook(() => useRestClientParams());
    expect(mockRouter.replace).toHaveBeenCalledWith(`${ROUTES.REST}/${HttpMethod.GET}`);
  });

  it('should call notFound for invalid HTTP methods', () => {
    vi.mocked(useParams).mockReturnValue({
      parts: ['INVALID_METHOD', 'test-url'],
    });

    renderHook(() => useRestClientParams());

    expect(notFound).toHaveBeenCalled();
  });

  it('should only initialize once', () => {
    const mockReplace = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      replace: mockReplace,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      push: vi.fn(),
      prefetch: vi.fn(),
    });

    const { result, rerender } = renderHook(() => useRestClientParams());

    expect(result.current.initializedRef.current).toBe(false);

    vi.mocked(useParams).mockReturnValue({
      parts: ['post', 'new-url'],
    });

    rerender();

    expect(mockReplace).toHaveBeenCalledTimes(1);
  });

  it('should handle missing parts in array', () => {
    vi.mocked(useParams).mockReturnValue({
      parts: ['get'],
    });

    const { result } = renderHook(() => useRestClientParams());

    expect(result.current.initialValues).toEqual({
      url: '',
      body: '',
      headers: [],
    });
  });
});
