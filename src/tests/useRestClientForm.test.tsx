import { act, renderHook } from '@testing-library/react';
import { useRestClientForm } from '@/hooks/useRestClientForm';
import { HttpMethod } from '@/shared/types/enums';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => () => 'error',
}));

vi.mock('@/hooks/useVariablesForm', () => ({
  useVariablesForm: () => ({
    applyVariables: (val: string) => val,
    validateVariables: (text: string) => ({
      isValid: !text.includes('{{'),
      missingVariables: text.includes('{{') ? ['VAR'] : [],
    }),
  }),
}));

vi.mock('@/hooks/useUpdateUrl', () => ({
  useUpdateUrl: () => ({ buildUrl: (_method: string, url: string) => url }),
}));

vi.mock('@/hooks/useRequestHistory', () => ({
  useRequestHistory: () => ({ saveRequest: vi.fn() }),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

const createProps = () => ({
  initialMethod: HttpMethod.GET,
  initialValues: {
    url: 'https://api.example.com',
    body: '',
    headers: [],
  },
});

describe('useRestClientForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockFetch.mockReset();
  });

  it('should fallback to text if json fails', async () => {
    const mockResponse = {
      status: 200,
      statusText: 'OK',
      ok: true,
      headers: new Headers(),
      clone: vi.fn().mockReturnValue({
        json: vi.fn().mockRejectedValue(new Error('JSON parse error')),
        text: vi.fn().mockResolvedValue('plain text'),
      }),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useRestClientForm(createProps()));

    await act(async () => {
      await result.current.onSubmit({
        method: HttpMethod.GET,
        url: 'https://api.example.com',
        body: '',
        headers: [],
      });
    });

    expect(result.current.response?.status).toBe(undefined);
  });

  it('should fallback to text if json fails', async () => {
    const mockJson = vi.fn().mockRejectedValue(new Error('fail'));
    const mockText = vi.fn().mockResolvedValue('plain text');
    mockFetch.mockResolvedValue({
      status: 200,
      statusText: 'OK',
      ok: true,
      headers: new Headers(),
      clone: () => ({ json: mockJson, text: mockText }),
    });

    const { result } = renderHook(() => useRestClientForm(createProps()));

    await act(async () => {
      await result.current.onSubmit({
        method: HttpMethod.GET,
        url: 'https://api.example.com',
        body: '',
        headers: [],
      });
    });

    expect(result.current.response?.data).toBe(undefined);
  });

  it('should set error on missing variables', async () => {
    const { result } = renderHook(() => useRestClientForm(createProps()));

    await act(async () => {
      await result.current.onSubmit({
        method: HttpMethod.GET,
        url: 'https://api.example.com/{{VAR}}',
        body: '',
        headers: [],
      });
    });

    expect(result.current.error?.message).toBe('error');
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
