'use client';

import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import { Control, useController } from 'react-hook-form';

import { useDebounce } from '@/hooks/useDebounce';
import { RestClientFormValues } from '@/lib/yup/restClient';
import { decodeBase64, encodeBase64 } from '@/shared/utils/safe-coding';
import { cn } from '@/utils/tailwind-clsx';

interface RequestEditorProps {
  control: Control<RestClientFormValues>;
  readOnly?: boolean;
}

export const RequestEditor = ({ control, readOnly = false }: RequestEditorProps) => {
  const [language, setLanguage] = useState<'json' | 'text'>('json');
  const { field } = useController({
    control,
    name: 'body',
  });

  const decodedValue = decodeBase64(field.value || '');
  const [localValue, setLocalValue] = useState(decodedValue);
  const debouncedValue = useDebounce(localValue, 300);

  useEffect(() => {
    setLocalValue(decodedValue);
  }, [decodedValue]);

  useEffect(() => {
    if (debouncedValue !== decodedValue) {
      field.onChange(encodeBase64(debouncedValue));
    }
  }, [debouncedValue, decodedValue, field]);

  const handlePrettify = () => {
    if (language === 'json') {
      try {
        const parsed = JSON.parse(localValue);
        const formatted = JSON.stringify(parsed, null, 2);
        setLocalValue(formatted);
      } catch (_error) {
        // TODO: show TOAST
        // showToast('Invalid JSON format');
      }
    } else {
      const formatted = localValue
        .split('\n')
        .map((line) => line.trim())
        .join('\n');
      setLocalValue(formatted);
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
              language === 'json' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300',
            )}
          >
            Text
          </button>
        </div>
        {!readOnly && (
          <button
            type="button"
            onClick={handlePrettify}
            className=" cursor-pointer px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Prettify
          </button>
        )}
      </div>

      <CodeMirror
        value={localValue}
        height="400px"
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
