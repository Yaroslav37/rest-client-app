'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components';
import { FormField } from '@/components';
import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage';
import { useAuth } from '@/context/authContext';
import { ROUTES } from '@/shared/routes';

type SignInFormValues = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const { register, handleSubmit } = useForm<SignInFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { signin } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    const { email, password } = data;
    signin(email, password)
      .then(() => router.push(ROUTES.MAIN))
      .catch((error) => setError(error));
  };

  return (
    <div className="w-full my-10 max-w-md text-white mx-auto bg-input-bg rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="flex w-full justify-center text-3xl font-bold pb-5">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage message={error} justifyCenter />
          <div className="space-y-5">
            <FormField
              id="email"
              type="email"
              label="Email"
              register={register}
              placeholder="email"
            />

            <FormField
              id="password"
              type="password"
              label="Password"
              register={register}
              placeholder="password"
            />
            <Button>Sign In</Button>
            <Link
              href={`${ROUTES.SIGN_UP}`}
              className="flex justify-center text-gray-400 cursor-pointer hover:border-light-green whitespace-pre"
            >
              Do not have an account?<span className="text-green-600"> Sign Up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
