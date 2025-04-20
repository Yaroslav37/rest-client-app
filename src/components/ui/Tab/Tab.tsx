'use client';

import { ReactNode } from 'react';

import { cn } from '@/utils/tailwind-clsx';

const buttonClasses = {
  base: 'px-3 py-1 rounded cursor-pointer border border-light-green transition-colors',
  active: 'bg-light-green text-dark',
  inactive: 'bg-transparent text-light-green hover:bg-light-green/20',
};

interface Props<T extends string> {
  value: T;
  activeTab: T;
  onClick: (value: T) => void;
  children: ReactNode;
  className?: string;
}

export const Tab = <T extends string>({
  value,
  activeTab,
  onClick,
  children,
  className,
}: Props<T>) => {
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={cn(
        buttonClasses.base,
        isActive ? buttonClasses.active : buttonClasses.inactive,
        className,
      )}
    >
      {children}
    </button>
  );
};
