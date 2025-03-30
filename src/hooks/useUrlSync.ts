'use client';

import { RefObject, useEffect, useMemo } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import type { HttpMethod } from '@/shared/types/enums';
import { Header } from '@/shared/types/interfaces';

interface UseUrlSyncProps {
  currentMethod: HttpMethod;
  currentUrl: string;
  currentBody: string;
  currentHeaders: Header[];
  initializedRef: RefObject<boolean>;
}

export function useUrlSync({
  currentMethod,
  currentUrl,
  currentBody,
  currentHeaders,
  initializedRef,
}: UseUrlSyncProps) {
  const { buildUrl } = useUpdateUrl();

  const newUrl = useMemo(
    () => buildUrl(currentMethod, currentUrl, currentBody, currentHeaders),
    [currentMethod, currentUrl, currentBody, currentHeaders, buildUrl],
  );

  const debouncedNewUrl = useDebounce(newUrl, 100);

  useEffect(() => {
    if (!initializedRef.current) return;
    window.history.replaceState(null, '', debouncedNewUrl);
  }, [debouncedNewUrl, initializedRef]);

  return { debouncedNewUrl };
}
