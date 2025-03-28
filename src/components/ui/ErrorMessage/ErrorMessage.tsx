import './index.css';

import React from 'react';
import { MdError } from 'react-icons/md';

interface ErrorMessageProps {
  message: string | undefined;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="flex items-center text-sm text-red-500 gap-1 animate-slide-down text-size-16 py-1">
      <MdError />
      {message}
    </div>
  );
}
