'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { IoMdExit } from 'react-icons/io';
import { toast } from 'react-toastify';

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/LanguageSwitcher';
import { Logo } from '@/components/ui/Logo/Logo';
import { useAuth } from '@/hooks/useAuth';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { ROUTES } from '@/shared/routes';
import { cn } from '@/utils/tailwind-clsx';

import { Container } from '../Container/Container';

const linksStyles =
  'border-b border-transparent hover:border-light-green transition-colors font-medium';

export const Header = () => {
  const t = useTranslations('Header');
  const tr = useTranslations('Toasts');
  const { user, logout } = useAuth();
  const isScrolled = useScrollTrigger();

  const handleLogout = () => {
    logout();
    toast.success(tr('logout.success'));
  };

  return (
    <header
      className={cn(
        'flex w-full border-b border-light-green fixed top-0 left-0 bg-dark transition-all will-change-contents duration-500 z-[500] py-4',
        isScrolled && 'shadow-[0_3px_3px_0_rgba(135,194,50,0.3)] bg-[#1d1d1d] py-2',
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
              className="group cursor-pointer min-w-[105px] text-center flex gap-2.5 items-center"
            >
              <IoMdExit size={20} />
              <span
                className={cn(
                  linksStyles,
                  'order-1',
                  'group-hover:text-light-green',
                  'group-hover:border-b group-hover:border-light-green',
                  'will-change-contents',
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
