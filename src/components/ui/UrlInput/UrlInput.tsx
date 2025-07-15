'use client';

import { useTranslations } from 'next-intl';
import { Control, Controller } from 'react-hook-form';

import { RestClientFormValues } from '@/lib/yup/restClient';

interface Props {
  control: Control<RestClientFormValues>;
}

export const UrlInput = ({ control }: Props) => {
  const t = useTranslations('RestClient');

  return (
    <div className="flex gap-2 flex-col justify-between font-montserrat max-w-[375px] sm:w-full">
      <span className="text-light-green self-start sm:self-end">{t('enter-url')}</span>

      <Controller
        name="url"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            className="text-white p-2 border-b border-green focus:outline-0 focus:border-white"
            placeholder="https://jsonplaceholder.typicode.com/posts"
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
        )}
      />
    </div>
  );
};
