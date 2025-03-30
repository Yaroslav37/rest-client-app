export const encodeBase64 = (str: string): string =>
  Buffer.from(str, 'utf-8').toString('base64').replace(/=+$/, '');

export const decodeBase64 = (str: string): string => {
  const pad = str.length % 4 === 0 ? '' : '===='.slice(str.length % 4);
  return Buffer.from(str + pad, 'base64').toString('utf-8');
};
