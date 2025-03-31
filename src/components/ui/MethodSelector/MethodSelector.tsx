'use client';

import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useTranslations } from 'use-intl';

import { RestClientFormValues } from '@/lib/yup/restClient';
import { HTTP_METHODS } from '@/shared/constants';
import { cn } from '@/utils/tailwind-clsx';

interface Props {
  control: Control<RestClientFormValues>;
}

const options = HTTP_METHODS.map((method) => ({
  value: method,
  label: method,
}));

export const MethodSelector = ({ control }: Props) => {
  const t = useTranslations('RestClient');

  return (
    <div className="flex gap-3 items-center font-montserrat">
      <span className="text-light-green">1. {t('select-method')}</span>
      <Controller
        name="method"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isSearchable={false}
            className="w-[160px]"
            classNames={{
              control: (state) =>
                cn(
                  '!border-green !bg-dark !cursor-pointer !text-white !rounded-md !shadow-sm',
                  state.isFocused ? '!border-green !ring-1 !ring-green' : '',
                ),
              option: (state) =>
                cn(
                  '!text-white !cursor-pointer !bg-dark hover:!bg-dark-grey',
                  state.isSelected ? '!bg-green !text-white !text-size-16' : '',
                ),
              singleValue: () => '!text-size-18 !text-white',
              menu: () => '!mt-1 !border !border-dark-grey !p-0 !rounded-md !shadow-lg',
              menuList: () => '!p-0 !bg-dark !border-0 !rounded-md',
            }}
            styles={{
              indicatorSeparator: () => ({ display: 'none' }),
            }}
            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
            value={options.find((option) => option.value === field.value)}
          />
        )}
      />
    </div>
  );
};
