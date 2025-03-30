'use client';

import { Control, Controller } from 'react-hook-form';

import { RestClientFormValues } from '@/lib/yup/restClient';

interface Props {
  control: Control<RestClientFormValues>;
}

export const UrlInput = ({ control }: Props) => {
  return (
    <Controller
      name="url"
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type="text"
          className="text-white"
          placeholder="Enter endpoint URL"
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
        />
      )}
    />
  );
};
