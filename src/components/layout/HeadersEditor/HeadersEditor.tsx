'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { MdLibraryAdd } from 'react-icons/md';

import { HeaderInput } from '@/components/ui/HeaderInput/HeaderInput';
import { HeaderItem } from '@/components/ui/HeaderItem/HeaderItem';
import { RestClientFormValues } from '@/lib/yup/restClient';

import { Button } from '../../ui/FormButton/FormButton';

interface Props {
  control: Control<RestClientFormValues>;
}

const iconSize = 25;

export const HeadersEditor = ({ control }: Props) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'headers',
  });
  const [newHeader, setNewHeader] = useState({ key: '', value: '' });
  const keyInputRef = useRef<HTMLInputElement>(null);
  const valueInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('RestClient');

  const handleAddHeader = () => {
    if (newHeader.key.trim() && newHeader.value.trim()) {
      append(newHeader);
      setNewHeader({ key: '', value: '' });
      keyInputRef.current?.focus();
    }
  };

  const handleUpdateHeader = useCallback(
    (index: number, key: string, value: string) => {
      update(index, { key, value });
    },
    [update],
  );

  return (
    <div className="flex gap-2 flex-col justify-between font-montserrat">
      <span className="text-light-green">{t('headers-title')}</span>

      <div className="flex flex-col gap-6 mb-4 mds:flex-row">
        <div className="flex flex-col gap-4 mds:flex-row flex-1">
          <HeaderInput
            ref={keyInputRef}
            placeholder={t('key-placeholder')}
            value={newHeader.key}
            onChange={(e) => setNewHeader((prev) => ({ ...prev, key: e.target.value }))}
            className="border-green text-green"
          />
          <HeaderInput
            ref={valueInputRef}
            placeholder={t('value-placeholder')}
            value={newHeader.value}
            onChange={(e) => setNewHeader((prev) => ({ ...prev, value: e.target.value }))}
            className="border-green text-green"
          />
        </div>
        <Button
          type="button"
          onClick={handleAddHeader}
          className="border border-green transition-colors text-light-green hover:bg-light-green flex justify-center hover:text-dark font-bold px-4 py-2 rounded cursor-pointer"
        >
          <MdLibraryAdd size={iconSize} />
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <HeaderItem
            key={field.id}
            id={field.id}
            index={index}
            keyValue={field.key}
            value={field.value}
            onRemove={() => remove(index)}
            onUpdate={handleUpdateHeader}
          />
        ))}
      </div>
    </div>
  );
};
