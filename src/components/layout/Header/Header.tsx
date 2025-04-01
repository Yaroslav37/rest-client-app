'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import { Logo } from '@/components/ui/Logo/Logo';
import { useAuth } from '@/context/authContext';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { ROUTES } from '@/shared/routes';
import { cn } from '@/utils/tailwind-clsx';

import { Container } from '../Container/Container';

const linksStyles =
  'border-b border-transparent hover:border-light-green transition-colors font-medium';

export const Header = () => {
  const t = useTranslations('Header');
  const { user, logout } = useAuth();
  const router = useRouter();
  const isScrolled = useScrollTrigger();

  const handleLogout = () => {
    logout();
    router.push(ROUTES.SIGN_IN);
  };

  return (
    <header
      className={cn(
        'flex w-full border-b border-light-green sticky top-0 transition-all duration-500 z-[500]',
        isScrolled ? 'py-3 shadow-[0_3px_3px_0_rgba(135,194,50,0.3)] bg-dark-green' : 'py-6 bg-dark',
      )}
    >
      <Container className="w-full">
        <nav className="flex flex-col items-center gap-3 justify-between text-light-green xs:flex-row">
          <div className="flex items-center justify-between w-full">
            <Logo />
            <LanguageSwitcher />
          </div>
          {!user ? (
            <div className="flex gap-3 items-center min-w-[167px] justify-center xs:justify-end">
              <Link href={`${ROUTES.SIGN_IN}`} className={linksStyles}>
                {t('sign-in')}
              </Link>
              <Link href={`${ROUTES.SIGN_UP}`} className={linksStyles}>
                {t('sign-up')}
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="cursor-pointer min-w-[98px] text-center flex gap-2.5"
            >
              <Image
                src="/icons/exit.svg"
                width={20}
                height={20}
                alt="sign-out"
                className=" peer order-2"
              />
              <span
                className={cn(
                  linksStyles,
                  'peer-hover:text-light-green',
                  'peer-hover:border-b peer-hover:border-light-green',
                  'order-1',
                )}
              >
                {t('sign-out')}
              </span>
            </button>
          )}
        </nav>
      </Container>
    </header>
  );
};
