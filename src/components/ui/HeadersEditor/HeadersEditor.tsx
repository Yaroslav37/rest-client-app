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

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white">Headers</h3>
        <button
          type="button"
          onClick={() => append({ key: '', value: '' })}
          className="bg-green-600 hover:bg-green-700"
        >
          Add Header
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-2">
          <input
            className="flex-1 p-2 bg-gray-800 text-white rounded"
            placeholder="Header Key"
            {...control.register(`headers.${index}.key`)}
          />
          <input
            className="flex-1 p-2 bg-gray-800 text-white rounded"
            placeholder="Header Value"
            {...control.register(`headers.${index}.value`)}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-600 hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};
