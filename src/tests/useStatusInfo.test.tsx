import { renderHook } from '@testing-library/react';
import { useStatusInfo } from '@/hooks/useStatusInfo';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'RestClient.informational': 'Informational',
      'RestClient.success': 'Success',
      'RestClient.redirection': 'Redirection',
      'RestClient.clientError': 'Client Error',
      'RestClient.serverError': 'Server Error',
      'RestClient.unknown': 'Unknown Status',
    };
    return translations[key] || key;
  },
}));

describe('useStatusInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return correct status colors', () => {
    const { result } = renderHook(() => useStatusInfo());

    expect(result.current.getStatusColor(100)).toBe('text-gray-600');
    expect(result.current.getStatusColor(199)).toBe('text-gray-600');

    expect(result.current.getStatusColor(200)).toBe('text-light-green');
    expect(result.current.getStatusColor(204)).toBe('text-light-green');
    expect(result.current.getStatusColor(299)).toBe('text-light-green');

    expect(result.current.getStatusColor(300)).toBe('text-blue-600');
    expect(result.current.getStatusColor(304)).toBe('text-blue-600');
    expect(result.current.getStatusColor(399)).toBe('text-blue-600');

    expect(result.current.getStatusColor(400)).toBe('text-red-600');
    expect(result.current.getStatusColor(404)).toBe('text-red-600');
    expect(result.current.getStatusColor(499)).toBe('text-red-600');

    expect(result.current.getStatusColor(500)).toBe('text-red-600');
    expect(result.current.getStatusColor(503)).toBe('text-red-600');
    expect(result.current.getStatusColor(599)).toBe('text-red-600');

    expect(result.current.getStatusColor(600)).toBe('text-red-600');
    expect(result.current.getStatusColor(0)).toBe('text-red-600');
    expect(result.current.getStatusColor(-1)).toBe('text-red-600');
  });

  it('should return correct status messages', () => {
    const { result } = renderHook(() => useStatusInfo());

    expect(result.current.getStatusMessage(100)).toBe('informational');
    expect(result.current.getStatusMessage(199)).toBe('informational');

    expect(result.current.getStatusMessage(200)).toBe('success');
    expect(result.current.getStatusMessage(204)).toBe('success');
    expect(result.current.getStatusMessage(299)).toBe('success');

    expect(result.current.getStatusMessage(300)).toBe('redirection');
    expect(result.current.getStatusMessage(304)).toBe('redirection');
    expect(result.current.getStatusMessage(399)).toBe('redirection');

    expect(result.current.getStatusMessage(400)).toBe('clientError');
    expect(result.current.getStatusMessage(404)).toBe('clientError');
    expect(result.current.getStatusMessage(499)).toBe('clientError');

    expect(result.current.getStatusMessage(500)).toBe('serverError');
    expect(result.current.getStatusMessage(503)).toBe('serverError');
    expect(result.current.getStatusMessage(599)).toBe('serverError');

    expect(result.current.getStatusMessage(600)).toBe('unknown');
    expect(result.current.getStatusMessage(0)).toBe('unknown');
    expect(result.current.getStatusMessage(-1)).toBe('unknown');
  });

  it('should handle edge cases', () => {
    const { result } = renderHook(() => useStatusInfo());

    expect(result.current.getStatusColor(99)).toBe('text-red-600');
    expect(result.current.getStatusColor(200)).toBe('text-light-green');
    expect(result.current.getStatusColor(300)).toBe('text-blue-600');
    expect(result.current.getStatusColor(400)).toBe('text-red-600');
    expect(result.current.getStatusColor(500)).toBe('text-red-600');
    expect(result.current.getStatusColor(600)).toBe('text-red-600');

    expect(result.current.getStatusMessage(Number('invalid'))).toBe('unknown');
  });
});
