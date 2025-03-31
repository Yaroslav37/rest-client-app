'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage';
import Button from '@/components/ui/FormButton/FormButton';
import { FormField } from '@/components/ui/FormField/FormField';
import withAuthRedirect from '@/hoc/withAuthRedirect';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/shared/routes';

type SignInFormValues = {
  email: string;
  password: string;
};

const SignInPage: React.FC = () => {
  const { register, handleSubmit } = useForm<SignInFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { signin } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();
  const t = useTranslations('SignIn');

  const tr = useTranslations('Toasts');
  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    const { email, password } = data;
    try {
      await signin(email, password);
      toast.success(tr('signin.success'));
      router.push(ROUTES.MAIN);
    } catch (_error) {
      toast.error(tr('errors.invalid'));
      const errorMessage = t('invalid');
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full my-10 max-w-md text-white mx-auto bg-input-bg rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="flex w-full justify-center text-3xl font-bold pb-5">{t('title')}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage message={error} justifyCenter />
          <div className="space-y-5">
            <FormField
              id="email"
              type="email"
              label={t('emailLabel')}
              register={register}
              placeholder={t('emailLabel')}
              required={true}
            />

            <FormField
              id="password"
              type="password"
              label={t('passwordLabel')}
              register={register}
              placeholder={t('passwordLabel')}
              required={true}
            />
            <Button>{t('button')}</Button>
            <Link
              href={`${ROUTES.SIGN_UP}`}
              className="flex justify-center text-gray-400 cursor-pointer hover:border-light-green whitespace-pre"
            >
              {t('noAccount')}
              <span className="text-green-600"> {t('signUpLink')}</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuthRedirect(SignInPage);
