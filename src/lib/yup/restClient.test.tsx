import { describe, it, expect } from 'vitest';
import { restClientSchema } from '@/lib/yup/restClient';
import { HTTP_METHODS } from '@/shared/constants';

describe('restClientSchema', () => {
  const validData = {
    method: 'GET',
    url: 'https://example.com/api',
    headers: [
      { key: 'Authorization', value: 'Bearer token' },
      { key: 'Content-Type', value: 'application/json' },
    ],
    body: '{"name":"John"}',
  };

  it('passes validation with valid data', async () => {
    await expect(restClientSchema.validate(validData)).resolves.toEqual(validData);
  });

  it('fails when method is missing', async () => {
    const { method, ...data } = validData;
    await expect(restClientSchema.validate(data)).rejects.toThrow('Method is required');
  });

  it('fails with invalid HTTP method', async () => {
    const data = { ...validData, method: 'INVALID' };
    await expect(restClientSchema.validate(data)).rejects.toThrow('Invalid HTTP method');
  });

  it('fails when URL is missing', async () => {
    const { url, ...data } = validData;
    await expect(restClientSchema.validate(data)).rejects.toThrow('URL is required');
  });

  it('fails with invalid URL format', async () => {
    const data = { ...validData, url: 'not-a-url' };
    await expect(restClientSchema.validate(data)).rejects.toThrow('Invalid URL format');
  });

  it('passes if body is empty', async () => {
    const data = { ...validData, body: '' };
    await expect(restClientSchema.validate(data)).resolves.toBeTruthy();
  });

  it('fails with invalid JSON body', async () => {
    const data = { ...validData, body: '{"name":}' };
    await expect(restClientSchema.validate(data)).rejects.toThrow('Invalid JSON format');
  });

  it('fails when headers key is missing', async () => {
    const data = {
      ...validData,
      headers: [{ key: '', value: 'value' }],
    };
    await expect(restClientSchema.validate(data)).rejects.toThrow('Header key is required');
  });

  it('fails when headers value is missing', async () => {
    const data = {
      ...validData,
      headers: [{ key: 'Authorization', value: '' }],
    };
    await expect(restClientSchema.validate(data)).rejects.toThrow('Header value is required');
  });

  it('passes with empty headers array', async () => {
    const data = { ...validData, headers: [] };
    await expect(restClientSchema.validate(data)).resolves.toBeTruthy();
  });

  it.each(HTTP_METHODS)('accepts valid HTTP method: %s', async (method) => {
    const data = { ...validData, method };
    await expect(restClientSchema.validate(data)).resolves.toBeTruthy();
  });
});
