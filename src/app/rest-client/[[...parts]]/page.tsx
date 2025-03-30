'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { Spinner } from '@/components';

const RestClient = dynamic(() => import('@/screens/RestClient.tsx'), {
  loading: () => <Spinner />,
  ssr: false,
});

export default function RestClientPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <RestClient />
    </Suspense>
  );
}
