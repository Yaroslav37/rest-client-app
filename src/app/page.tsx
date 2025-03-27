'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Header } from '@/components';
import { useAuth } from '@/context/authContext';

export default function Home() {
  const t = useTranslations('HomePage');
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 min-h-[100vh] flex flex-col items-center sm:items-start bg-dark">
        <h1 className="font-inter">{t('title')}</h1>
        {user && (
          <>
            <div className="text-amber-300">Hello, {user?.email}</div>
            <button className="bg-amber-700 w-100" onClick={() => logout()}>
              logout
            </button>
          </>
        )}
      </main>
    </div>
  );
}
