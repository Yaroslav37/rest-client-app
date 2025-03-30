import { useCallback } from 'react';

import { ROUTES } from '@/shared/routes';
import { Header } from '@/shared/types/interfaces';
import { encodeBase64 } from '@/shared/utils/safe-coding';

export const useUpdateUrl = () => {
  const buildUrl = useCallback((method: string, url: string, body?: string, headers?: Header[]) => {
    const encodedUrl = encodeBase64(url);
    const encodedBody = body ? `/${encodeBase64(body)}` : '';

    const query = new URLSearchParams();
    headers?.forEach(({ key, value }) => {
      if (key && value) {
        query.append(key, value);
      }
    });

    return `${ROUTES.REST}/${method}/${encodedUrl}${encodedBody}${query.size ? `?${query}` : ''}`;
  }, []);
  return { buildUrl };
};
