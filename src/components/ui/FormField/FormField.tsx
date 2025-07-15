import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface FormFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  type: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const FormField = <T extends FieldValues>({
  id,
  label,
  register,
  type,
  placeholder,
  error,
  required = false,
}: FormFieldProps<T>) => {
  return (
    <div className="form-field">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`input ${error ? 'input-error' : ''}`}
        {...register(id)}
        placeholder={placeholder}
        required={required}
        aria-required={required}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
