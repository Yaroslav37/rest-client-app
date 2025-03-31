'use client';

import { Button, Container } from '@/components';
import { CodeGenerator } from '@/components/ui/CodeGenerator/CodeGenerator';
import { HeadersEditor } from '@/components/ui/HeadersEditor/HeadersEditor';
import { MethodSelector } from '@/components/ui/MethodSelector/MethodSelector';
import { RequestEditor } from '@/components/ui/RequestEditor/RequestEditor';
import { ResponseViewer } from '@/components/ui/ResponseViewer/ResponseViewer';
import { UrlInput } from '@/components/ui/UrlInput/UrlInput';
import { useRestClientForm } from '@/hooks/useRestClientForm';
import { useRestClientParams } from '@/hooks/useRestClientParams';
import { useUrlSync } from '@/hooks/useUrlSync';

const RestClient = () => {
  const { initialMethod, initialValues, initializedRef } = useRestClientParams();

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
    isLoading,
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

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <MethodSelector control={control} />
          <UrlInput control={control} />
        </div>
        <HeadersEditor control={control} />
        <RequestEditor control={control} />
        <ResponseViewer response={response} error={error} />
        <CodeGenerator />
        <Button disabled={isLoading}>{isLoading ? 'Sending...' : 'Send Request'}</Button>
      </form>
    </Container>
  );
};

export default RestClient;
