import { renderHook } from '@testing-library/react';
import { useJsonFormatter } from '@/hooks/useJsonFormatter';
import { vi } from 'vitest';
import { toast } from 'react-toastify';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock('prettier/standalone', () => ({
  format: vi.fn(),
}));

vi.mock('prettier/plugins/babel', () => ({}));
vi.mock('prettier/plugins/estree', () => ({}));

const mockFormat = vi.fn();

describe('useJsonFormatter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFormat.mockReset();
  });

  it('should format valid JSON', async () => {
    const validJson = '{\n  "name": "John",\n  "age": 30\n}';
    const formattedJson = '{\n  "name": "John",\n  "age": 30\n}';

    mockFormat.mockResolvedValue(formattedJson);

    const { result } = renderHook(() => useJsonFormatter());
    const formatted = await result.current.formatJson(validJson);

    expect(formatted).toEqual(formattedJson);
  });

  it('should return original input and show error for invalid JSON', async () => {
    const invalidJson = '{name: John}';
    mockFormat.mockRejectedValue(new Error('Parse error'));

    const { result } = renderHook(() => useJsonFormatter());
    const formatted = await result.current.formatJson(invalidJson);

    expect(formatted).toBe(invalidJson);
    expect(toast.error).toHaveBeenCalledWith('error');
  });

  it('should handle empty string input', async () => {
    const emptyInput = '';
    mockFormat.mockResolvedValue(emptyInput);

    const { result } = renderHook(() => useJsonFormatter());
    const formatted = await result.current.formatJson(emptyInput);

    expect(formatted).toBe(emptyInput);
  });
});
