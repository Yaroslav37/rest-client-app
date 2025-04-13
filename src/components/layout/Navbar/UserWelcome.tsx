import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ROUTES } from '@/shared/routes';

export default function UserWelcome({ email }: { email: string }) {
  const t = useTranslations('userWelcome');

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-responsive text-white font-bold m-6 whitespace-pre">
          {t('welcomeUser')}, <span className="text-[#FFCC54]">{email}</span>!
        </h1>
        <div className="flex gap-5">
          <Link
            href={ROUTES.REST}
            className="flex flex-col items-center justify-center text-[#29E881] rounded-full px-5 py-3 hover:scale-110 transition-transform"
          >
            <span className="text-responsive">{t('restClient')}</span>
          </Link>
          <Link
            href={ROUTES.HISTORY}
            className="flex flex-col items-center justify-center text-[#73CCFE] rounded-full px-5 py-3  hover:scale-110 transition-transform"
          >
            <span className="text-responsive">{t('history')}</span>
          </Link>
          <Link
            href={ROUTES.VARIABLES}
            className="flex flex-col items-center justify-center text-[#FF87FC] rounded-full px-5 py-3 hover:scale-110 transition-transform"
          >
            <span className="text-responsive">{t('variables')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
