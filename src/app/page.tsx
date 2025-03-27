import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '@/components';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen bg-mainBackground p-8 pb-0 gap-16 sm:p-20">
      <header>
        <LanguageSwitcher />
      </header>
      <main className="flex flex-col items-center sm:items-start">
        <h1 className="font-inter">{t('title')}</h1>
      </main>
    </div>
  );
}
