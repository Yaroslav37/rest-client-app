import { describe, it, expect } from 'vitest';
import { encodeBase64, decodeBase64 } from '@/shared/utils/safe-coding';

describe('encodeBase64', () => {
  it('encodes a simple string', () => {
    expect(encodeBase64('hello')).toBe('aGVsbG8');
  });

  it('removes padding (=) from the encoded result', () => {
    const result = encodeBase64('hi');
    expect(result.endsWith('=')).toBe(false);
  });
});

describe('decodeBase64', () => {
  it('decodes a base64 string without padding', () => {
    expect(decodeBase64('aGVsbG8')).toBe('hello');
  });

  it('decodes string with special characters', () => {
    expect(decodeBase64('YS9iK2M_')).toBe('a/b+c?');
  });

  it('adds correct padding during decoding', () => {
    expect(decodeBase64('aGk')).toBe('hi');
  });
});

describe('base64 encode/decode round trip', () => {
  it('encodes and decodes back to the original', () => {
    const original = 'Test with 🤖 emoji, spaces & symbols!';
    const encoded = encodeBase64(original);
    const decoded = decodeBase64(encoded);
    expect(decoded).toBe(original);
  });
});
