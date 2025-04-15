import * as yup from 'yup';

import { HTTP_METHODS } from '@/shared/constants';

export const restClientSchema = yup.object({
  method: yup.string().required('Method is required').oneOf(HTTP_METHODS, 'Invalid HTTP method'),
  url: yup
    .string()
    .required('URL is required')
    .url('Invalid URL format')
    .test(
      'no-variables',
      'Variables must be replaced before sending',
      (value) => !/\{\{.+?\}\}/.test(value),
    ),
  headers: yup.array().of(
    yup.object({
      key: yup.string().required('Header key is required'),
      value: yup.string().required('Header value is required'),
      id: yup.number().required('Header id is required'),
    }),
  ),
  body: yup.string().test('valid-json', 'Invalid JSON format', (value) => {
    if (!value) return true;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }),
});

export type RestClientFormValues = yup.InferType<typeof restClientSchema>;
