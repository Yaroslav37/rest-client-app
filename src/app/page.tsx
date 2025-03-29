'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useAuth } from '@/context/authContext';
import { ROUTES } from '@/shared/routes';

export default function Home() {
  const t = useTranslations('HomePage');
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 min-h-[100vh] flex flex-col items-center sm:items-start bg-dark">
        <h1 className="font-inter">{t('title')}</h1>
        {user && (
          <>
            <div className="w-full text-amber-300 text-center">Hello, {user?.email}</div>
            <Link href={ROUTES.REST} className='text-light-green'>Rest Client</Link>
          </>
        )}
      </main>
    </div>
  );
}
