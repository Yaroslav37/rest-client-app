'use client';

import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

import {
  Button,
  CodeGenerator,
  Container,
  HeadersEditor,
  MethodSelector,
  RequestEditor,
  ResponseViewer,
  UrlInput,
} from '@/components';
import { useRestClientForm } from '@/hooks/useRestClientForm';
import { useRestClientParams } from '@/hooks/useRestClientParams';
import { useUrlSync } from '@/hooks/useUrlSync';
import { RestClientFormValues } from '@/lib/yup/restClient';

const RestClient = () => {
  const { initialMethod, initialValues, initializedRef } = useRestClientParams();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('RestClient');

  const {
    control,
    handleSubmit,
    currentMethod,
    currentUrl = '',
    currentBody = '',
    currentHeaders = [],
    onSubmit,
    response,
    error,
  } = useRestClientForm({
    initialMethod,
    initialValues,
  });

  useUrlSync({
    currentMethod,
    currentUrl,
    currentBody,
    currentHeaders,
    initializedRef,
  });

  const handleFormSubmit = (data: RestClientFormValues) => {
    startTransition(async () => {
      await onSubmit(data);
    });
  };

  return (
    <Container className="py-12">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-12 max-w-[900px] mx-auto"
      >
        <div className="flex flex-col sm:flex-row gap-5 sm:justify-between sm:gap-10">
          <MethodSelector control={control} />
          <UrlInput control={control} />
        </div>
        <HeadersEditor control={control} />
        <RequestEditor control={control} />
        <ResponseViewer response={response} error={error} />
        <CodeGenerator />
        <Button disabled={isPending}>{isPending ? t('sending') : t('send')}</Button>
      </form>
    </Container>
  );
};

export default RestClient;
