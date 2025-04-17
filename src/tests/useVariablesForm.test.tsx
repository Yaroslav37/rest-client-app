import { act, renderHook } from '@testing-library/react';
import { toast } from 'react-toastify';

import { useVariablesForm } from '@/hooks/useVariablesForm';

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    configurable: true,
  });
});

beforeEach(() => {
  window.localStorage.clear();
  vi.clearAllMocks();
});

describe('useVariablesForm', () => {
  it('should initialize with empty variables', () => {
    const { result } = renderHook(() => useVariablesForm());

    expect(result.current.variables).toEqual([]);
    expect(result.current.isLoaded).toBe(true);
  });

  it('should load variables from localStorage on mount', () => {
    const testVariables = [
      { id: '1', key: 'apiUrl', value: 'https://api.example.com' },
      { id: '2', key: 'token', value: 'abc123' },
    ];
    localStorage.setItem('rest-client-variables', JSON.stringify(testVariables));

    const { result } = renderHook(() => useVariablesForm());

    expect(result.current.variables).toEqual(testVariables);
  });

  it('should handle invalid localStorage data', () => {
    localStorage.setItem('rest-client-variables', 'invalid json');

    const { result } = renderHook(() => useVariablesForm());

    expect(result.current.variables).toEqual([]);
    expect(toast.error).toHaveBeenCalledWith('errors.error-failed');
  });

  it('should add a new variable', () => {
    const { result } = renderHook(() => useVariablesForm());

    act(() => {
      const success = result.current.addVariable({
        key: 'apiUrl',
        value: 'https://api.example.com',
      });
      expect(success).toBe(true);
    });

    expect(result.current.variables).toEqual([
      expect.objectContaining({
        key: 'apiUrl',
        value: 'https://api.example.com',
      }),
    ]);
  });

  it('should not add invalid variables', () => {
    const { result } = renderHook(() => useVariablesForm());

    act(() => {
      const success = result.current.addVariable({ key: '', value: '' });
      expect(success).toBe(false);
    });

    expect(result.current.variables).toEqual([]);
  });

  it('should update a variable', () => {
    const testVariables = [{ id: '1', key: 'apiUrl', value: 'https://api.example.com' }];
    localStorage.setItem('rest-client-variables', JSON.stringify(testVariables));

    const { result } = renderHook(() => useVariablesForm());

    act(() => {
      const success = result.current.updateVariable(0, 'apiUrl', 'https://new.api.example.com');
      expect(success).toBe(true);
    });

    expect(result.current.variables).toEqual([
      expect.objectContaining({
        key: 'apiUrl',
        value: 'https://new.api.example.com',
      }),
    ]);
  });

  it('should not update with invalid data', () => {
    const testVariables = [{ id: '1', key: 'apiUrl', value: 'https://api.example.com' }];
    localStorage.setItem('rest-client-variables', JSON.stringify(testVariables));

    const { result } = renderHook(() => useVariablesForm());

    act(() => {
      const success = result.current.updateVariable(0, '', '');
      expect(success).toBe(false);
    });

    expect(result.current.variables).toEqual(testVariables);
  });

  it('should remove a variable', () => {
    const testVariables = [
      { id: '1', key: 'apiUrl', value: 'https://api.example.com' },
      { id: '2', key: 'token', value: 'abc123' },
    ];
    localStorage.setItem('rest-client-variables', JSON.stringify(testVariables));

    const { result } = renderHook(() => useVariablesForm());

    act(() => {
      result.current.removeVariable(0);
    });

    expect(result.current.variables).toEqual([
      expect.objectContaining({
        key: 'token',
        value: 'abc123',
      }),
    ]);
  });

  it('should safely handle removing non-existent index', () => {
    const testVariables = [{ id: '1', key: 'apiUrl', value: 'https://api.example.com' }];
    localStorage.setItem('rest-client-variables', JSON.stringify(testVariables));

    const { result } = renderHook(() => useVariablesForm());

    act(() => {
      result.current.removeVariable(10); // invalid index
    });

    expect(result.current.variables).toEqual([]);
  });

  it('should apply variables to text', () => {
    const testVariables = [
      { id: '1', key: 'apiUrl', value: 'https://api.example.com' },
      { id: '2', key: 'token', value: 'abc123' },
    ];
    localStorage.setItem('rest-client-variables', JSON.stringify(testVariables));

    const { result } = renderHook(() => useVariablesForm());

    const text = 'API: {{apiUrl}}, Token: {{token}}';
    const applied = result.current.applyVariables(text);

    expect(applied).toBe('API: https://api.example.com, Token: abc123');
  });

  it('should validate variables in text', () => {
    const testVariables = [{ id: '1', key: 'apiUrl', value: 'https://api.example.com' }];
    localStorage.setItem('rest-client-variables', JSON.stringify(testVariables));

    const { result } = renderHook(() => useVariablesForm());

    const text = 'API: {{apiUrl}}, Token: {{token}}';
    const validation = result.current.validateVariables(text);

    expect(validation).toEqual({
      isValid: false,
      missingVariables: ['token'],
    });
  });

  it('should get variables as object', () => {
    const testVariables = [
      { id: '1', key: 'apiUrl', value: 'https://api.example.com' },
      { id: '2', key: 'token', value: 'abc123' },
    ];
    localStorage.setItem('rest-client-variables', JSON.stringify(testVariables));

    const { result } = renderHook(() => useVariablesForm());

    const variablesObj = result.current.getVariablesAsObject();

    expect(variablesObj).toEqual({
      apiUrl: 'https://api.example.com',
      token: 'abc123',
    });
  });

  it('should set variables directly', () => {
    const { result } = renderHook(() => useVariablesForm());

    const newVariables = [
      { id: '1', key: 'apiUrl', value: 'https://api.example.com' },
      { id: '2', key: 'token', value: 'abc123' },
    ];

    act(() => {
      result.current.setVariables(newVariables);
    });

    expect(result.current.variables).toEqual(newVariables);
  });

  it('should save variables to localStorage when they change', () => {
    const { result } = renderHook(() => useVariablesForm());

    act(() => {
      result.current.addVariable({ key: 'apiUrl', value: 'https://api.example.com' });
    });

    expect(localStorage.getItem('rest-client-variables')).toEqual(
      JSON.stringify([
        expect.objectContaining({ key: 'apiUrl', value: 'https://api.example.com' }),
      ]),
    );
  });

  it('should remove from localStorage when no valid variables exist', () => {
    const { result } = renderHook(() => useVariablesForm());

    // Add then remove a variable
    act(() => {
      result.current.addVariable({ key: 'apiUrl', value: 'https://api.example.com' });
      result.current.removeVariable(0);
    });

    expect(localStorage.getItem('rest-client-variables')).toBeNull();
  });
});
