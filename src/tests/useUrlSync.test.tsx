import { renderHook } from '@testing-library/react';
import { RefObject } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useDebounce } from '@/hooks/useDebounce';
import { useUrlSync } from '@/hooks/useUrlSync';
import { HttpMethod } from '@/shared/types/enums';

vi.mock('./useUpdateUrl', () => ({
  useUpdateUrl: () => ({
    buildUrl: vi.fn((method: HttpMethod, url: string) => `/rest-client/${method}/${btoa(url)}`),
  }),
}));

vi.mock('@/hooks/useDebounce', () => ({
  useDebounce: vi.fn((value) => value),
}));

describe('useUrlSync Hook', () => {
  const mockInitializedRef: RefObject<boolean> = { current: true };
  const baseProps = {
    currentMethod: HttpMethod.GET,
    currentUrl: 'api/test',
    currentBody: '',
    currentHeaders: [],
    initializedRef: mockInitializedRef,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.history.replaceState = vi.fn();
  });

  it('returns debounced URL', () => {
    const { result } = renderHook(() => useUrlSync(baseProps));

    expect(result.current.debouncedNewUrl).toBe('/rest-client/GET/YXBpL3Rlc3Q');
    expect(useDebounce).toHaveBeenCalledWith('/rest-client/GET/YXBpL3Rlc3Q', 100);
  });

  it('updates history when initialized', () => {
    renderHook(() => useUrlSync(baseProps));

    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      '/rest-client/GET/YXBpL3Rlc3Q',
    );
  });

  it('recomputes URL when method changes', () => {
    const { rerender } = renderHook((props) => useUrlSync(props), { initialProps: baseProps });

    rerender({ ...baseProps, currentMethod: HttpMethod.POST });
    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      '/rest-client/POST/YXBpL3Rlc3Q',
    );
  });

  it('handles all HTTP methods correctly', () => {
    const methods = Object.values(HttpMethod);

    methods.forEach((method) => {
      const { result } = renderHook(() => useUrlSync({ ...baseProps, currentMethod: method }));

      expect(result.current.debouncedNewUrl).toMatch(
        new RegExp(`^/rest-client/${method}/[A-Za-z0-9+/]+=?=?$`),
      );

      const base64Part = result.current.debouncedNewUrl.split('/')[3];
      expect(atob(base64Part)).toBe('api/test');
    });
  });

  it('handles empty URL gracefully', () => {
    const { result } = renderHook(() => useUrlSync({ ...baseProps, currentUrl: '' }));

    expect(result.current.debouncedNewUrl).toBe('/rest-client/GET/');
  });
});
