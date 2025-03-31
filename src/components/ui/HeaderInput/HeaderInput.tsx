import { cn } from '@/utils/tailwind-clsx';

const inputClasses = {
  base: 'p-2 border rounded transition-colors',
  active: 'text-white border-green focus:outline-0 focus:border-white',
  readonly: 'text-light-grey border-light-grey pointer-events-none',
};

export const HeaderInput = ({
  ref,
  placeholder,
  value,
  onChange,
  readOnly = false,
}: {
  ref?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}) => (
  <input
    ref={ref}
    className={cn(
      inputClasses.base,
      readOnly ? inputClasses.readonly : inputClasses.active,
      'flex-1',
    )}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    readOnly={readOnly}
  />
);
