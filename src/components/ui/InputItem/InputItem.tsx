'use client';

import { memo, useEffect, useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';

import { FieldInput } from '@/components/ui/FieldInput/FieldInput';
import { useDebounce } from '@/hooks/useDebounce';

interface Props {
  index: number;
  keyValue: string;
  value: string;
  onRemove: () => void;
  onUpdate: (index: number, key: string, value: string) => void;
  id?: string;
}

const iconSize = 25;

export const InputItem = memo(
  ({ index, keyValue, value, onRemove, onUpdate }: Props) => {
    const [localKey, setLocalKey] = useState(keyValue);
    const [localValue, setLocalValue] = useState(value);

    const debouncedKey = useDebounce(localKey, 500);
    const debouncedValue = useDebounce(localValue, 500);

    useEffect(() => {
      setLocalKey(keyValue);
      setLocalValue(value);
    }, [keyValue, value]);

    useEffect(() => {
      if (debouncedKey !== keyValue || debouncedValue !== value) {
        onUpdate(index, debouncedKey, debouncedValue);
      }
    }, [debouncedKey, debouncedValue, index, keyValue, onUpdate, value]);

    return (
      <div className="flex flex-col gap-6 mb-4 mds:flex-row not-last:border-b not-last:border-dark-grey mds:not-last:border-0 not-last:pb-3 mds:not-last:pb-0">
        <div className="flex flex-col gap-4 mds:flex-row flex-1">
          <FieldInput value={localKey} onChange={(e) => setLocalKey(e.target.value)} />
          <FieldInput value={localValue} onChange={(e) => setLocalValue(e.target.value)} />
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="flex justify-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-dark transition-colors cursor-pointer px-4 py-2 rounded"
        >
          <RiDeleteBin2Fill size={iconSize} />
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.keyValue === nextProps.keyValue &&
      prevProps.value === nextProps.value &&
      prevProps.index === nextProps.index
    );
  },
);

InputItem.displayName = 'InputItem';
