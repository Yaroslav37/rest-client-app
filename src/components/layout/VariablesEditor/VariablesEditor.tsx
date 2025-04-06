'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import { MdLibraryAdd } from 'react-icons/md';

import { HeaderInput } from '@/components/ui/HeaderInput/HeaderInput';
import { HeaderItem } from '@/components/ui/HeaderItem/HeaderItem';
import { useVariablesForm } from '@/hooks/useVariablesForm';

import { Button } from '../../ui/FormButton/FormButton';

const iconSize = 25;

export const VariablesEditor = () => {
  const { variables, addVariable, removeVariable, updateVariable } = useVariablesForm();

  const [newVariable, setNewVariable] = useState({ key: '', value: '' });
  const keyInputRef = useRef<HTMLInputElement>(null);
  const valueInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('Variables');

  const handleAddVariable = useCallback(() => {
    if (newVariable.key.trim()) {
      addVariable(newVariable);
      setNewVariable({ key: '', value: '' });
      keyInputRef.current?.focus();
    }
  }, [newVariable, addVariable]);

  const handleUpdateVariable = useCallback(
    (index: number, key: string, value: string) => {
      updateVariable(index, key, value);
    },
    [updateVariable],
  );

  return (
    <div className="flex gap-2 flex-col justify-between font-montserrat">
      <span className="text-light-green">{t('variables-title')}</span>

      <div className="flex flex-col gap-6 mb-4 mds:flex-row">
        <div className="flex flex-col gap-4 mds:flex-row flex-1">
          <HeaderInput
            ref={keyInputRef}
            placeholder={t('key-placeholder')}
            value={newVariable.key}
            onChange={(e) => setNewVariable((prev) => ({ ...prev, key: e.target.value }))}
            className="border-green text-green"
          />
          <HeaderInput
            ref={valueInputRef}
            placeholder={t('value-placeholder')}
            value={newVariable.value}
            onChange={(e) => setNewVariable((prev) => ({ ...prev, value: e.target.value }))}
            className="border-green text-green"
          />
        </div>
        <Button
          type="button"
          onClick={handleAddVariable}
          disabled={!newVariable.key || !newVariable.value}
          className="border border-green transition-colors text-light-green hover:bg-light-green flex justify-center hover:text-dark font-bold px-4 py-2 rounded cursor-pointer"
        >
          <MdLibraryAdd size={iconSize} />
        </Button>
      </div>

      <div className="space-y-2">
        {variables.map((variable, index) => (
          <HeaderItem
            key={variable.id}
            id={variable.id}
            index={index}
            keyValue={variable.key}
            value={variable.value}
            onRemove={() => {
              removeVariable(index);
            }}
            onUpdate={handleUpdateVariable}
          />
        ))}
      </div>
    </div>
  );
};
