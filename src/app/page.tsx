'use client';

import { useTranslations } from 'next-intl';

import AuthWelcome from '@/components/layout/Navbar/AuthWelcome';
import UserWelcome from '@/components/layout/Navbar/UserWelcome';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const t = useTranslations('HomePage');
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 min-h-[100vh] flex flex-col items-center sm:items-start bg-dark">
        <h1 className="font-inter">{t('title')}</h1>
        {user ? <UserWelcome email={user.email || ''} /> : <AuthWelcome />}
      </main>
    </div>
  );
}
