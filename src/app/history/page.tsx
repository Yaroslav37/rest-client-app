'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { Spinner } from '@/components';
import withAuthRedirect from '@/hoc/withAuthRedirect';
import { ROUTES } from '@/shared/routes';

const History = dynamic(() => import('@/screens/History.tsx'), {
  loading: () => <Spinner />,
  ssr: false,
});

function HistoryPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <History />
    </Suspense>
  );
}

export default withAuthRedirect(HistoryPage, {
  redirectIfNotAuthenticated: ROUTES.MAIN,
});
