'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { Spinner } from '@/components';

const Variables = dynamic(() => import('@/screens/Variables.tsx'), {
  loading: () => <Spinner />,
  ssr: false,
});

function VariablesPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Variables />
    </Suspense>
  );
}

export default VariablesPage;
