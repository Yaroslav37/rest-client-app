'use client';

import { useEffect, useState } from 'react';
import { Control, useController } from 'react-hook-form';

import { Editor } from '@/components/ui/Editor/Editor';
import { EditorSwitcher } from '@/components/ui/EditorSwitcher/EditorSwitcher';
import { useJsonFormatter } from '@/hooks/useJsonFormatter';
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
  const { formatJson } = useJsonFormatter();

  useEffect(() => {
    setLocalValue(field.value || '');
  }, [field.value]);

  const handleBlur = () => {
    if (localValue !== field.value) {
      field.onChange(localValue);
    }
  };

  const handlePrettify = async () => {
    try {
      const formattedJSON = await formatJson(localValue);
      setLocalValue(formattedJSON);
      field.onChange(formattedJSON);
    } catch (_error) {
      // TODO: show TOAST
      // showToast('Invalid JSON format');
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-dark-green p-2">
        <EditorSwitcher language={language} onLanguageChange={setLanguage} />
        {!readOnly && language === 'json' && (
          <button
            type="button"
            onClick={handlePrettify}
            className="cursor-pointer px-3 py-1 transition-colors border border-light-green  text-light-green rounded hover:bg-light-green hover:text-dark"
          >
            Prettify
          </button>
        )}
      </div>

      <div onBlur={handleBlur}>
        <Editor
          value={localValue}
          language={language}
          readOnly={readOnly}
          onChange={setLocalValue}
        />
      </div>
    </div>
  );
};
