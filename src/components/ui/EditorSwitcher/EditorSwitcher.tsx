'use client';

import { cn } from '@/utils/tailwind-clsx';

type Language = 'json' | 'text';

const buttonClasses = {
  base: 'px-3 py-1 rounded cursor-pointer border border-light-green transition-colors',
  active: 'bg-light-green text-dark',
  inactive: 'bg-transparent text-light-green hover:bg-light-green/20',
};

export const EditorSwitcher = ({
  language,
  onLanguageChange,
}: {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}) => (
  <div className="flex gap-2">
    {(['json', 'text'] as const).map((lang) => (
      <button
        key={lang}
        type="button"
        onClick={() => onLanguageChange(lang)}
        className={cn(
          buttonClasses.base,
          language === lang ? buttonClasses.active : buttonClasses.inactive,
        )}
      >
        {lang.toUpperCase()}
      </button>
    ))}
  </div>
);
