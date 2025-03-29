import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const RestClient = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  return <div>RestClient</div>;
};

export default RestClient;
