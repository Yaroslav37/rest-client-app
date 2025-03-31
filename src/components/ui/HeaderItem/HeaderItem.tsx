'use client';

import { RiDeleteBin2Fill } from 'react-icons/ri';

import { HeaderInput } from '@/components/ui/HeaderInput/HeaderInput';

interface Props {
  id: string;
  keyValue: string;
  value: string;
  onRemove: () => void;
}

const iconSize = 25;

export const HeaderItem = ({ id, keyValue, value, onRemove }: Props) => (
  <div
    className="flex flex-col gap-6 mb-4 mds:flex-row not-last:border-b not-last:border-dark-grey mds:not-last:border-0 not-last:pb-3 mds:not-last:pb-0"
    key={id}
  >
    <div className="flex flex-col gap-4 mds:flex-row flex-1">
      <HeaderInput value={keyValue} readOnly />
      <HeaderInput value={value} readOnly />
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
