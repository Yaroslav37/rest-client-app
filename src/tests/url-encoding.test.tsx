import { describe, it, expect } from 'vitest';
import { buildRedirectUrl } from '@/shared/utils/url-encoding';
import { encodeBase64 } from '@/shared/utils/safe-coding';

describe('buildRedirectUrl', () => {
  const baseParams = {
    currentHost: 'http://localhost:3000',
    method: 'POST',
    url: 'https://api.example.com/data',
    body: '{"name":"John"}',
  };

  it('builds a redirect URL without headers', () => {
    const url = buildRedirectUrl({ ...baseParams, headers: [] });

    const expected = `${baseParams.currentHost}/rest-client/${baseParams.method}/${encodeBase64(baseParams.url)}/${encodeBase64(baseParams.body)}`;
    expect(url).toBe(expected);
  });

  it('builds a redirect URL with valid headers', () => {
    const headers = [
      { key: 'Authorization', value: 'Bearer token' },
      { key: 'Content-Type', value: 'application/json' },
    ];

    const url = buildRedirectUrl({ ...baseParams, headers });

    const query = `Authorization=Bearer token&Content-Type=application/json`;
    expect(url).toBe(
      `${baseParams.currentHost}/rest-client/${baseParams.method}/${encodeBase64(baseParams.url)}/${encodeBase64(baseParams.body)}?${query}`,
    );
  });

  it('filters out headers with missing keys or values', () => {
    const headers = [
      { key: 'X-Test', value: '123' },
      { key: '', value: 'missingKey' },
      { key: 'missingValue', value: '' },
    ];

    const url = buildRedirectUrl({ ...baseParams, headers });

    expect(url).toBe(
      `${baseParams.currentHost}/rest-client/${baseParams.method}/${encodeBase64(baseParams.url)}/${encodeBase64(baseParams.body)}?X-Test=123`,
    );
  });

  it('works with GET method and empty body', () => {
    const url = buildRedirectUrl({
      ...baseParams,
      method: 'GET',
      body: '',
      headers: [],
    });

    expect(url).toBe(
      `${baseParams.currentHost}/rest-client/GET/${encodeBase64(baseParams.url)}/${encodeBase64('')}`,
    );
  });

  it('handles special characters in header values', () => {
    const headers = [
      { key: 'X-Emoji', value: '😀=yes' },
      { key: 'X-Space', value: 'with space' },
    ];

    const url = buildRedirectUrl({ ...baseParams, headers });

    expect(url).toContain('X-Emoji=😀=yes');
    expect(url).toContain('X-Space=with space');
  });
});
