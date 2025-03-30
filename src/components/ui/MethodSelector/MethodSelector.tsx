'use client';

import { Control, Controller } from 'react-hook-form';

import { RestClientFormValues } from '@/lib/yup/restClient';
import { HTTP_METHODS } from '@/shared/constants';

interface Props {
  control: Control<RestClientFormValues>;
}

export const MethodSelector = ({ control }: Props) => {
  return (
    <Controller
      name="method"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          className="w-32 px-4 py-2 border rounded bg-white"
          onChange={(e) => field.onChange(e.target.value)}
        >
          {HTTP_METHODS.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      )}
    />
  );
};
