import { NextResponse } from 'next/server';
import { middleware } from '@/middleware';
import { ROUTES } from '@/shared/routes';
import { vi, describe, it, expect } from 'vitest';

vi.mock('next/server', () => ({
  NextResponse: {
    next: vi.fn().mockReturnValue('next'),
    redirect: vi.fn().mockImplementation((url) => ({ redirect: url })),
  },
}));

describe('middleware', () => {
  const createMockRequest = (pathname: string, token?: string) => ({
    nextUrl: { pathname },
    cookies: {
      get: vi.fn().mockReturnValue(token ? { value: token } : undefined),
    },
    url: 'http://localhost:3000',
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should allow access to protected paths with valid token', () => {
    const mockRequest = createMockRequest(ROUTES.REST, 'valid-token');

    const response = middleware(mockRequest as any);

    expect(response).toBe(undefined);
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it('should redirect from protected paths without token', () => {
    const mockRequest = createMockRequest(ROUTES.REST);

    const response = middleware(mockRequest as any);

    expect(response).toEqual(undefined);
    expect(NextResponse.redirect).toHaveBeenCalled();
  });

  it('should redirect from auth paths with token', () => {
    const mockRequest = createMockRequest(ROUTES.SIGN_IN, 'valid-token');

    const response = middleware(mockRequest as any);

    expect(response).toEqual(undefined);
    expect(NextResponse.redirect).toHaveBeenCalled();
  });

  it('should allow access to auth paths without token', () => {
    const mockRequest = createMockRequest(ROUTES.SIGN_IN);

    const response = middleware(mockRequest as any);

    expect(response).toBe(undefined);
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it('should allow non-protected paths without token', () => {
    const mockRequest = createMockRequest('/some-public-path');

    const response = middleware(mockRequest as any);

    expect(response).toBe(undefined);
    expect(NextResponse.next).toHaveBeenCalled();
  });
});
