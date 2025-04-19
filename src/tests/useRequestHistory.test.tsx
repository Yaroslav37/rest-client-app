import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useRequestHistory } from '@/hooks/useRequestHistory';
import { RequestData } from '@/shared/types/interfaces';
import { HttpMethod } from '@/shared/types/enums';

const LOCAL_STORAGE_HISTORY = 'rest-client-history';

describe('useRequestHistory', () => {
  const mockLocalStorage: Record<string, string> = {};

  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => mockLocalStorage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        mockLocalStorage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockLocalStorage[key];
      }),
      clear: vi.fn(() => {
        for (const key in mockLocalStorage) delete mockLocalStorage[key];
      }),
      key: vi.fn(),
      length: 0,
    });
    mockLocalStorage[LOCAL_STORAGE_HISTORY] = JSON.stringify([]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should save a new request with timestamp', () => {
    const { result } = renderHook(() => useRequestHistory());

    const request = {
      api_url: 'https://api.example.com',
      redirect_url: 'https://redirect.example.com',
      method: HttpMethod.GET,
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      body: '{"test":"data"}',
    };

    act(() => {
      result.current.saveRequest(request);
    });

    const saved = JSON.parse(mockLocalStorage[LOCAL_STORAGE_HISTORY]) as RequestData[];

    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({
      api_url: request.api_url,
      redirect_url: request.redirect_url,
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    expect(typeof saved[0].timestamp).toBe('number');
  });

  it('should load request history from localStorage', () => {
    const now = Date.now();
    const mockHistory: RequestData[] = [
      {
        timestamp: now,
        api_url: 'https://api.example.com',
        redirect_url: 'https://redirect.example.com',
        method: HttpMethod.POST,
        headers: [],
        body: '{"data":123}',
      },
    ];
    mockLocalStorage[LOCAL_STORAGE_HISTORY] = JSON.stringify(mockHistory);
    const { result } = renderHook(() => useRequestHistory());
    const loaded = result.current.loadRequests();
    expect(loaded).toEqual(mockHistory);
  });

  it('should return empty array if localStorage is empty', () => {
    delete mockLocalStorage[LOCAL_STORAGE_HISTORY];
    const { result } = renderHook(() => useRequestHistory());
    const loaded = result.current.loadRequests();
    expect(loaded).toEqual([]);
  });
});
