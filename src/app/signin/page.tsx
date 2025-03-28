'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage';
import { useAuth } from '@/context/authContext';

type Inputs = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const { register, handleSubmit } = useForm<Inputs>({});
  const { signin } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    signin(email, password)
      .then(() => router.push('/'))
      .catch((error) => setError(error));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8">
        <ErrorMessage message={error} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full  px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
              {...register('email')}
            />

            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
              {...register('password')}
            />
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-white font-medium bg-gradient-to-r from-green-900 to-green-700 hover:from-green-800 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
