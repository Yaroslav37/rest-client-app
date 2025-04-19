import { vi, describe, it, expect, beforeEach } from 'vitest';
import { locales, defaultLocale } from '@/i18n/config';

vi.mock('next-intl/server', () => ({
  getRequestConfig: vi.fn((callback) => callback),
}));

vi.mock('@/services/locale', () => ({
  getUserLocale: vi.fn(),
}));

vi.mock('../../messages/en.json', () => ({
  default: { greeting: 'Hello' },
}));
vi.mock('../../messages/de.json', () => ({
  default: { greeting: 'Hallo' },
}));

describe('i18n configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should have correct locale constants', () => {
    expect(locales).toEqual(['en', 'de']);
    expect(defaultLocale).toBe('en');
  });
});
