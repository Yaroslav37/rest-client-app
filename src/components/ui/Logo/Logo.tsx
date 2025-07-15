import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { ROUTES } from '@/shared/routes';

export const Logo = () => {
  const t = useTranslations('Header');

  return (
    <Link href={ROUTES.MAIN} className="text-size-24 font-bold text-light-green">
      {t('logo')}
    </Link>
  );
};
