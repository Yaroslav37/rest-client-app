'use client';

import { usePathname } from 'next/navigation';
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
import { useRequestHistory } from '@/hooks/useRequestHistory';
import { useRestClientForm } from '@/hooks/useRestClientForm';
import { useRestClientParams } from '@/hooks/useRestClientParams';
import { useUrlSync } from '@/hooks/useUrlSync';
import { RestClientFormValues } from '@/lib/yup/restClient';

const RestClient = () => {
  const { initialMethod, initialValues, initializedRef } = useRestClientParams();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('RestClient');
  const { saveRequest } = useRequestHistory();
  const pathname = usePathname();

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
    saveRequest({
      api_url: data.url,
      redirect_url: pathname,
      method: data.method,
      body: data.body,
      headers: data.headers,
    });
    startTransition(async () => {
      await onSubmit(data);
    });
  };

  const currentRequest = {
    method: currentMethod,
    url: currentUrl,
    headers: currentHeaders,
    body: currentBody,
  };

  return (
    <Container className="py-12">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-10 max-w-[900px] mx-auto"
      >
        <div className="flex flex-col sm:flex-row gap-5 sm:justify-between sm:gap-10">
          <MethodSelector control={control} />
          <UrlInput control={control} />
        </div>
        <HeadersEditor control={control} />
        <RequestEditor control={control} />
        <CodeGenerator requestCurrent={currentRequest} />
        <Button disabled={isPending}>{isPending ? t('sending') : t('send')}</Button>
        <ResponseViewer response={response} error={error} />
      </form>
    </Container>
  );
};

export default RestClient;
