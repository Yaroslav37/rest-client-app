import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getUserLocale } from '@/services/locale';
import { locales, defaultLocale } from '@/i18n/config';

vi.mock('next-intl/server', () => ({
  getRequestConfig: vi.fn((callback) => callback),
}));

vi.mock('@/services/locale', () => ({
  getUserLocale: vi.fn(),
}));

vi.mock('../../messages/en.json', () => ({
  default: { hello: 'Hello World' },
}));
vi.mock('../../messages/de.json', () => ({
  default: { hello: 'Hallo Welt' },
}));

describe('i18n configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('should return config with user locale and messages', async () => {
    vi.mocked(getUserLocale).mockResolvedValue('en');
    const mockParams = {
      locale: 'en',
      requestLocale: Promise.resolve('en'),
    };

    const config = await (await import('@/i18n/config')).default(mockParams);

    expect(config).toEqual({
      locale: 'en',
      messages: { hello: 'Hello World' },
    });
    expect(getUserLocale).toHaveBeenCalledTimes(1);
  });

  it('should work with German locale', async () => {
    vi.mocked(getUserLocale).mockResolvedValue('de');
    const mockParams = {
      locale: 'de',
      requestLocale: Promise.resolve('de'),
    };

    const config = await (await import('@/i18n/config')).default(mockParams);

    expect(config).toEqual({
      locale: 'de',
      messages: { hello: 'Hallo Welt' },
    });
  });

  it('should have correct locale constants', () => {
    expect(locales).toEqual(['en', 'de']);
    expect(defaultLocale).toBe('en');
  });
});
