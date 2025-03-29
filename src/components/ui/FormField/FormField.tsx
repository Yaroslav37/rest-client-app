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
}

export const FormField = <T extends FieldValues>({
  id,
  label,
  register,
  type,
  placeholder,
  error,
}: FormFieldProps<T>) => {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input id={id} type={type} className="input" {...register(id)} placeholder={placeholder} />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
