import type { Header } from '@/shared/types/interfaces';

import { encodeBase64 } from './safe-coding';

interface BuildRedirectUrlParams {
  currentHost: string;
  method: string;
  url: string;
  body: string;
  headers: Header[];
}

export function buildRedirectUrl({
  currentHost,
  method,
  url,
  body,
  headers,
}: BuildRedirectUrlParams): string {
  const encodedUrl = encodeBase64(url);
  const encodedBody = encodeBase64(body);

  const headersQuery = headers
    .filter(({ key, value }) => key && value)
    .map(({ key, value }) => `${key}=${value}`)
    .join('&');

  return `${currentHost}/rest-client/${method}/${encodedUrl}/${encodedBody}${
    headersQuery ? `?${headersQuery}` : ''
  }`;
}
