'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/ui/FormButton/FormButton';
import { FormField } from '@/components/ui/FormField/FormField';
import withAuthRedirect from '@/hoc/withAuthRedirect';
import { useAuth } from '@/hooks/useAuth';
import { validationSchema } from '@/lib/yup/schema';
import { ROUTES } from '@/shared/routes';

type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const { signup } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    const { email, password } = data;
    await signup(email, password);
    router.push(ROUTES.MAIN);
  };

  return (
    <div className="w-full my-10 max-w-md mx-auto bg-input-bg rounded-lg shadow-md overflow-hidden text-white">
      <div className="px-6 py-8">
        <h2 className="flex w-full justify-center text-3xl font-bold pb-5">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <FormField
              id="email"
              type="email"
              label="Email"
              register={register}
              placeholder="email"
              error={errors.email?.message}
            />
            <FormField
              id="password"
              type="password"
              label="Password"
              register={register}
              placeholder="password"
              error={errors.password?.message}
            />
            <FormField
              id="passwordConfirm"
              type="password"
              label="Confirm Password"
              register={register}
              placeholder="password"
              error={errors.passwordConfirm?.message}
            />
            <Button>Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withAuthRedirect(SignUpPage);
