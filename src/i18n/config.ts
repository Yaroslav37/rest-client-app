import { getRequestConfig } from 'next-intl/server';

import { getUserLocale } from '@/services/locale';

export type Locale = (typeof locales)[number];

export const locales = ['en', 'de'] as const;
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  const finalLocale = locales.includes(locale) ? locale : defaultLocale;

  return {
    locale: finalLocale,
    messages: (await import(`../../messages/${finalLocale}.json`)).default,
  };
});
