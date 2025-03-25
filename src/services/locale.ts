'use server';

import { cookies } from 'next/headers';
import { Locale, defaultLocale, locales } from '@/i18n/config';

const COOKIE_NAME = 'NEXT_LOCALE_REST_API_PROJECT';

const isValidLocale = (locale?: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

export async function getUserLocale() {
  const cookie = (await cookies()).get(COOKIE_NAME)?.value;
  return isValidLocale(cookie) ? cookie : defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
