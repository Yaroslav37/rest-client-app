'use client';

import AuthWelcome from '@/components/layout/Navbar/AuthWelcome';
import UserWelcome from '@/components/layout/Navbar/UserWelcome';
import { MainContent } from '@/components/ui/MainContent/MainContent';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-full max-w-[1240px] mx-auto flex flex-col items-start bg-dark">
      {user ? <UserWelcome email={user.email || ''} /> : <AuthWelcome />}
      <MainContent />
    </div>
  );
}
