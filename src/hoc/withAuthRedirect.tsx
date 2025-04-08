import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';

interface WithRedirectOptions {
  redirectIfAuthenticated?: string;
  redirectIfNotAuthenticated?: string;
}

export default function withAuthRedirect<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  options: WithRedirectOptions = {},
): React.FC<T> {
  return function WrappedComponent(props: T) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user && options.redirectIfAuthenticated) {
        router.push(options.redirectIfAuthenticated);
      } else if (!user && options.redirectIfNotAuthenticated) {
        router.push(options.redirectIfNotAuthenticated);
      }
    }, [user, router]);

    // Если пользователь авторизован и это маршрут для неавторизованных, ничего не рендерим
    if (user && options.redirectIfAuthenticated) {
      return null;
    }

    // Если пользователь не авторизован и это защищённый маршрут, ничего не рендерим
    if (!user && options.redirectIfNotAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
