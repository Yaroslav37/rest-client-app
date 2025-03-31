'use client';

import { useRef, useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';

import { RestClientFormValues } from '@/lib/yup/restClient';

interface HeadersEditorProps {
  control: Control<RestClientFormValues>;
}

export const HeadersEditor = ({ control }: HeadersEditorProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });
  const [newHeader, setNewHeader] = useState({ key: '', value: '' });
  const keyInputRef = useRef<HTMLInputElement>(null);
  const valueInputRef = useRef<HTMLInputElement>(null);

  const handleAddHeader = () => {
    if (newHeader.key.trim() && newHeader.value.trim()) {
      append(newHeader);
      setNewHeader({ key: '', value: '' });
      keyInputRef.current?.focus();
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white">Headers</h3>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          ref={keyInputRef}
          className="flex-1 p-2 bg-gray-800 text-white rounded"
          placeholder="Key"
          value={newHeader.key}
          onChange={(e) => setNewHeader((prev) => ({ ...prev, key: e.target.value }))}
        />
        <input
          ref={valueInputRef}
          className="flex-1 p-2 bg-gray-800 text-white rounded"
          placeholder="Value"
          value={newHeader.value}
          onChange={(e) => setNewHeader((prev) => ({ ...prev, value: e.target.value }))}
        />
        <button
          type="button"
          onClick={handleAddHeader}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <input
              className="flex-1 p-2 bg-gray-700 text-gray-400 rounded pointer-events-none"
              placeholder="Key"
              value={field.key}
              readOnly
            />
            <input
              className="flex-1 p-2 bg-gray-700 text-gray-400 rounded pointer-events-none"
              placeholder="Value"
              value={field.value}
              readOnly
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
