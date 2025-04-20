import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface FormFieldSignUpProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  type: string;
  placeholder?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export const FormFieldSignUp = <T extends FieldValues>({
  id,
  label,
  register,
  type,
  placeholder,
  error,
  onChange,
}: FormFieldSignUpProps<T>) => {
  const { onChange: registerOnChange, ...rest } = register(id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
    registerOnChange(event);
  };

  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="input"
        placeholder={placeholder}
        onChange={handleChange}
        {...rest}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
