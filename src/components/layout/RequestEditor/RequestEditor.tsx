'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { toast } from 'react-toastify';

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
  const { applyVariables, isLoaded } = useVariablesForm();
  const { formatJson } = useJsonFormatter();
  const t = useTranslations('RestClient');

  useEffect(() => {
    setLocalValue(field.value || '');
  }, [field.value]);

  const handleBlur = () => {
    if (!isLoaded) return;
    field.onChange(localValue);
  };

  const handlePrettify = async () => {
    try {
      const formattedJSON = await formatJson(localValue);
      setLocalValue(formattedJSON);
      field.onChange(formattedJSON);
    } catch (_error) {
      toast.error(t('error'));
    }
  };

  const handleApplyVariables = () => {
    if (!isLoaded) {
      toast.error(t('variables-not-loaded'));
      return;
    }
    const saved = localStorage.getItem('rest-client-variables');

    if (!saved) {
      toast.error(t('no-variables'));
      return;
    }

    const valueWithVariables = applyVariables(localValue);
    setLocalValue(valueWithVariables);
    field.onChange(valueWithVariables);
  };

  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      setLocalValue(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, isLoaded]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <span className="text-light-green mb-1.5 inline-block">{t('request-title')}</span>

      <div className="flex flex-col items-start gap-2 xs:flex-row xs:justify-between xs:items-center bg-dark-green p-2">
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
            handleApplyVariables();
          }}
          disabled={!isLoaded}
          className={`cursor-pointer px-3 py-1 transition-colors border rounded ${
            isLoaded
              ? 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
              : 'border-gray-500 text-gray-500 cursor-not-allowed'
          }`}
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
