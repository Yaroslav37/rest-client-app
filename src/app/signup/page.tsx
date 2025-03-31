'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import debounce from 'debounce';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/ui/FormButton/FormButton';
import { FormFieldSignUp } from '@/components/ui/FormField/FormFieldSignUp';
import withAuthRedirect from '@/hoc/withAuthRedirect';
import { useAuth } from '@/hooks/useAuth';
import { validationSchema } from '@/lib/yup/schema';
import { ROUTES } from '@/shared/routes';

type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const t = useTranslations();

  const { signup } = useAuth();
  const router = useRouter();
  const signUpT = useTranslations('SignUp');

  const handleFieldChange = debounce(async (field: keyof SignUpFormValues) => {
    await trigger(field);
  }, 500);

  const tr = useTranslations('Toasts');
  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    const { email, password } = data;
    try {
      await signup(email, password);
      toast.success(tr('signup.success'));
      router.push(ROUTES.MAIN);
    } catch (error) {
      console.error('SignUp error:', error);
      toast.error(tr('in-use.in-use'));
    }
  };

  return (
    <div className="w-full my-10 max-w-md mx-auto bg-input-bg rounded-lg shadow-md overflow-hidden text-white">
      <div className="px-6 py-8">
        <h2 className="flex w-full justify-center text-3xl font-bold pb-5">{signUpT('title')}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <FormFieldSignUp
              id="email"
              type="email"
              label={signUpT('emailLabel')}
              register={register}
              placeholder={signUpT('emailLabel')}
              error={errors.email?.message && t(errors.email?.message)}
              onChange={() => handleFieldChange('email')}
            />
            <FormFieldSignUp
              id="password"
              type="password"
              label={signUpT('passwordLabel')}
              register={register}
              placeholder={signUpT('passwordLabel')}
              error={errors.password?.message && t(errors.password?.message)}
              onChange={() => handleFieldChange('password')}
            />
            <FormFieldSignUp
              id="passwordConfirm"
              type="password"
              label={signUpT('confirmPasswordLabel')}
              register={register}
              placeholder={signUpT('confirmPasswordLabel')}
              error={errors.passwordConfirm?.message && t(errors.passwordConfirm?.message)}
              onChange={() => handleFieldChange('passwordConfirm')}
            />
            <Button>{signUpT('button')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuthRedirect(SignUpPage);
