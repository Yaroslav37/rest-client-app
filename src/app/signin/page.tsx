'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage';
import Button from '@/components/ui/FormButton/FormButton';
import { FormField } from '@/components/ui/FormField/FormField';
import { useAuth } from '@/context/authContext';

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
      .then(() => router.push('/'))
      .catch((error) => setError(error));
  };

  return (
    <div className="w-full my-10 max-w-md mx-auto bg-input-bg rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8">
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
          </div>
        </form>
      </div>
    </div>
  );
}
