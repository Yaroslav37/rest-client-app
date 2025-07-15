'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { Spinner } from '@/components';

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

export default HistoryPage;
