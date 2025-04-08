import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/shared/routes';

export default function withUnauthorized<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
): React.ComponentType<T> {
  return function WrappedComponent(props: T) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push(ROUTES.MAIN);
      }
    }, [user, router]);

    return user ? null : <Component {...props} />;
  };
}
