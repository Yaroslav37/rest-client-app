import dynamic from 'next/dynamic';

import { Spinner } from '@/components';

const RestClient = dynamic(() => import('@/screens/RestClient.tsx'), {
  loading: () => <Spinner />,
  ssr: false,
});

export default function RestClientPage() {
  return <RestClient />;
}
