'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-dark)] text-white p-4">
      <h2 className="text-light-green text-[16px] xs:text-[24px] mb-4">{t('error')}</h2>
      <button
        onClick={() => reset()}
        className="
    bg-grey
    text-white
    px-4 py-2
    rounded-lg
    transition-colors
    duration-300
    hover:bg-light-green
    cursor-pointer     
      hover:scale-105  
      transform     
      active:scale-95
  "
      >
        {t('try')}
      </button>
    </div>
  );
}
