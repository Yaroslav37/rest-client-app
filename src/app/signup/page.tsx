'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage';
import { useAuth } from '@/context/authContext';
import { validationSchema } from '@/lib/yup/schema';

type Inputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });
  const { signup } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    await signup(email, password);
    router.push('/');
  };

  return (
    <div className="w-full my-10 max-w-md mx-auto bg-input-bg rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full  px-2 py-2 border text-white border-input-border bg-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
              {...register('email')}
              placeholder="email"
            />
            <ErrorMessage message={errors.email?.message} />

            <label htmlFor="password" className="block  text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-2 py-2 border text-white border-input-border bg-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
              {...register('password')}
              placeholder="password"
            />
            <ErrorMessage message={errors.password?.message} />
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Confirm password
            </label>
            <input
              type="password"
              className="w-full px-2 py-2 border text-white border-input-border bg-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
              {...register('passwordConfirm')}
              placeholder="password"
            />
            <ErrorMessage message={errors.passwordConfirm?.message} />
            <button
              type="submit"
              className="w-full mt-2 py-2 px-4 rounded-md text-white font-medium bg-gradient-to-r from-green-900 to-green-700 hover:from-green-800 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
