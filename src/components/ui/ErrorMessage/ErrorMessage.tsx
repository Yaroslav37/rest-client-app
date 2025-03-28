import './index.css';

import React from 'react';
import { MdError } from 'react-icons/md';

interface ErrorMessageProps {
  message: string | undefined;
  justifyCenter?: boolean;
}

export default function ErrorMessage({ message, justifyCenter }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className={`flex items-center text-sm text-warning gap-1 animate-slide-down text-size-16 min-h-5 ${
        justifyCenter ? 'justify-center' : ''
      }`}
    >
      <MdError />
      {message}
    </div>
  );
}
