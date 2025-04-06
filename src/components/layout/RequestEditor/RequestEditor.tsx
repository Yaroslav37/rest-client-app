'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Control, useController } from 'react-hook-form';

import { Editor } from '@/components/ui/Editor/Editor';
import { EditorSwitcher } from '@/components/ui/EditorSwitcher/EditorSwitcher';
import { useJsonFormatter } from '@/hooks/useJsonFormatter';
import { useVariablesForm } from '@/hooks/useVariablesForm';
import { RestClientFormValues } from '@/lib/yup/restClient';
import { EditingLanguage } from '@/shared/types/interfaces';

interface Props {
  control: Control<RestClientFormValues>;
  readOnly?: boolean;
}

export const RequestEditor = ({ control, readOnly = false }: Props) => {
  const [language, setLanguage] = useState<EditingLanguage>('json');
  const { field } = useController({
    control,
    name: 'body',
  });

  const [localValue, setLocalValue] = useState(field.value || '');
  const { applyVariables } = useVariablesForm();
  const { formatJson } = useJsonFormatter();
  const t = useTranslations('RestClient');

  useEffect(() => {
    setLocalValue(field.value || '');
  }, [field.value]);

  const handleBlur = () => {
    const valueWithVariables = applyVariables(localValue);
    if (valueWithVariables !== field.value) {
      field.onChange(valueWithVariables);
    }
  };

  const handlePrettify = async () => {
    try {
      const formattedJSON = await formatJson(localValue);
      const valueWithVariables = applyVariables(formattedJSON);
      setLocalValue(valueWithVariables);
      field.onChange(valueWithVariables);
    } catch (_error) {
      // TODO: show TOAST
      // showToast('Invalid JSON format');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const valueWithVariables = applyVariables(localValue);
      if (valueWithVariables !== localValue) {
        setLocalValue(valueWithVariables);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, applyVariables]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <span className="text-light-green mb-1.5 inline-block">{t('request-title')}</span>

      <div className="flex justify-between items-center bg-dark-green p-2">
        <EditorSwitcher language={language} onLanguageChange={setLanguage} />
        {!readOnly && language === 'json' && (
          <button
            type="button"
            onClick={handlePrettify}
            className="cursor-pointer px-3 py-1 transition-colors border border-light-green  text-light-green rounded hover:bg-light-green hover:text-dark"
          >
            {t('prettify')}
          </button>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            const valueWithVariables = applyVariables(localValue);
            setLocalValue(valueWithVariables);
            field.onChange(valueWithVariables);
          }}
          className="cursor-pointer px-3 py-1 transition-colors border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
        >
          {t('apply-variables')}
        </button>
      </div>

      <div onBlur={handleBlur}>
        <Editor
          value={localValue}
          language={language}
          readOnly={readOnly}
          onChange={(newValue) => {
            setLocalValue(newValue);
          }}
        />
      </div>
    </div>
  );
};
