import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '@/components';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header>
        <LanguageSwitcher />
      </header>
      <main className="flex flex-col items-center sm:items-start">
        <h1 className="font-inter">{t('title')}</h1>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
      </footer>
    </div>
  );
}
