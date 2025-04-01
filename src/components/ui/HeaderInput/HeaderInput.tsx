import { cn } from '@/utils/tailwind-clsx';

const inputClasses = {
  base: 'p-2 border rounded border-light-grey transition-colors',
  active: 'text-light-grey focus:outline-0 focus:border-white focus:text-white',
  readonly: 'pointer-events-none',
};

export const HeaderInput = ({
  ref,
  placeholder,
  value,
  onChange,
  readOnly = false,
  className,
}: {
  ref?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
}) => {
  return (
    <input
      ref={ref}
      className={cn(
        inputClasses.base,
        readOnly ? inputClasses.readonly : inputClasses.active,
        'flex-1',
        className,
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};
