'use client';

import './index.css';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (newLocale: Locale) => {
    startTransition(async () => {
      await setUserLocale(newLocale);
      router.refresh();
    });
  };

  return (
    <div className="switch">
      <input
        id="language-toggle"
        className="check-toggle check-toggle-round-flat"
        type="checkbox"
        checked={locale === 'de'}
        onChange={(e) => handleSwitch(e.target.checked ? 'de' : 'en')}
        disabled={isPending}
        aria-label="Switch language"
        aria-busy={isPending}
      />
      <label htmlFor="language-toggle" />
      <span className="on">EN</span>
      <span className="off">DE</span>
      {isPending && (
        <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-[1px]" />
      )}
    </div>
  );
};
