import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ROUTES } from '@/shared/routes';

export default function AuthWelcome() {
  const t = useTranslations('authWelcome');

  return (
    <div className="flex items-center justify-center w-full h-screen text-white text-5xl whitespace-pre">
      <span className="text-responsive-auth">{t('welcome')} </span>
      <Link href={ROUTES.SIGN_IN} className="inline-flex flex-col items-center justify-center">
        <span className="text-responsive-auth text-[#D0BFAF] hover:bg-purple-400 hover:text-black">
          {t('signIn')}
        </span>
      </Link>
      <span className="text-responsive-auth"> {t('or')} </span>
      <Link href={ROUTES.SIGN_UP} className="inline-flex flex-col items-center justify-center">
        <span className="text-responsive-auth text-[#D0BFAF] hover:bg-blue-400 hover:text-black">
          {t('signUp')}
        </span>
      </Link>
      <span className="text-responsive-auth"> {t('toContinue')}</span>
    </div>
  );
}
