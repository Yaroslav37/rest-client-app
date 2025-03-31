'use client';

import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import { Control, useController } from 'react-hook-form';

import { useDebounce } from '@/hooks/useDebounce';
import { RestClientFormValues } from '@/lib/yup/restClient';
import { cn } from '@/utils/tailwind-clsx';

interface Props {
  control: Control<RestClientFormValues>;
  readOnly?: boolean;
}

export const RequestEditor = ({ control, readOnly = false }: Props) => {
  const [language, setLanguage] = useState<'json' | 'text'>('json');
  const { field } = useController({
    control,
    name: 'body',
  });

  const [localValue, setLocalValue] = useState(field.value || '');
  const debouncedValue = useDebounce(localValue, 300);

  useEffect(() => {
    setLocalValue(field.value || '');
  }, [field.value]);

  useEffect(() => {
    if (debouncedValue !== field.value) {
      field.onChange(debouncedValue);
    }
  }, [debouncedValue, field]);

  const handlePrettify = () => {
    try {
      const correctedJson = localValue
        .replace(/(\w+):\s*'/g, '"$1": "')
        .replace(/'([^']*)'/g, '"$1"');

      const parsed = JSON.parse(correctedJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setLocalValue(formatted);
    } catch (_error) {
      // TODO: show TOAST
      // showToast('Invalid JSON format');
    }
  };

  return (
    <div className="relative h-full border rounded-lg overflow-hidden mt-2">
      <div className="flex justify-between items-center bg-gray-800 p-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLanguage('json')}
            className={cn(
              `px-3 py-1 rounded cursor-pointer`,
              language === 'json' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300',
            )}
          >
            JSON
          </button>
          <button
            type="button"
            onClick={() => setLanguage('text')}
            className={cn(
              `px-3 py-1 rounded cursor-pointer`,
              language === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300',
            )}
          >
            Text
          </button>
        </div>
        {!readOnly && language === 'json' && (
          <button
            type="button"
            onClick={handlePrettify}
            className="cursor-pointer px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Prettify
          </button>
        )}
      </div>

      <CodeMirror
        value={localValue}
        height="200px"
        extensions={[
          language === 'json' ? json() : EditorView.lineWrapping,
          language === 'json' ? linter(jsonParseLinter()) : [],
        ]}
        readOnly={readOnly}
        onChange={setLocalValue}
        theme="dark"
        basicSetup={{
          lineNumbers: !readOnly,
          foldGutter: !readOnly,
          highlightActiveLine: !readOnly,
          highlightSelectionMatches: !readOnly,
        }}
        className="text-sm"
      />
    </div>
  );
};
