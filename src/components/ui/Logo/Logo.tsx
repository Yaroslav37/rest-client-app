import Link from 'next/link';

import { ROUTES } from '@/shared/routes';

export const Logo = () => {
  return (
    <Link href={ROUTES.MAIN} className="text-size-24 font-bold text-light-green">
      REST Client
    </Link>
  );
};
