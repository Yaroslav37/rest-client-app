/*'use client';

import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';

export const ErrorToasts = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        toast.error('Email is already in use');
        return 'Email is already in use';
      case 'auth/invalid-credential':
        toast.error('Check your email and password.');
        return 'Invalid credentials';
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Wrong password';
      case 'auth/invalid-email':
        return 'Invalid email';
      default:
        toast.error('An unexpected error occurred.');
        return error.message;
    }
  }

  const defaultError = 'An unexpected error occurred';
  toast.error(defaultError);
  return defaultError;
};*/
