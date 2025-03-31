'use client';

import { notFound, useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';

import { HTTP_METHODS } from '@/shared/constants';
import { ROUTES } from '@/shared/routes';
import { HttpMethod } from '@/shared/types/enums';
import { decodeBase64 } from '@/shared/utils/safe-coding';

export function useRestClientParams() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initializedRef = useRef(false);

  const initialMethod = useMemo(() => {
    const method = params.parts?.[0]?.toUpperCase() as HttpMethod;
    return HTTP_METHODS.includes(method) ? method : HttpMethod.GET;
  }, [params.parts]);

  const initialValues = useMemo(() => {
    return {
      url: params.parts?.[1] ? decodeBase64(params.parts[1]) : '',
      body: params.parts?.[2] ? decodeBase64(params.parts[2]) : '',
      headers: Array.from(searchParams.entries()).map(([key, value]) => ({
        key: decodeURIComponent(key),
        value: decodeURIComponent(value),
      })),
    };
  }, [params.parts, searchParams]);

  useEffect(() => {
    if (initializedRef.current) return;

    const parts = params.parts || [];

    if (parts.length === 0) {
      const defaultUrl = `${ROUTES.REST}/${HttpMethod.GET}`;
      router.replace(defaultUrl);
      return;
    }

    const method = (parts[0]?.toUpperCase() || HttpMethod.GET) as HttpMethod;

    if (!HTTP_METHODS.includes(method)) {
      notFound();
    }

    initializedRef.current = true;
  }, [params.parts, router]);

  return {
    initialMethod,
    initialValues,
    initializedRef,
  };
}
