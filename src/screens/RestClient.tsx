'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Container } from '@/components';
import { CodeGenerator } from '@/components/ui/CodeGenerator/CodeGenerator';
import { HeadersEditor } from '@/components/ui/HeadersEditor/HeadersEditor';
import { MethodSelector } from '@/components/ui/MethodSelector/MethodSelector';
import { RequestEditor } from '@/components/ui/RequestEditor/RequestEditor';
import { ResponseViewer } from '@/components/ui/ResponseViewer/ResponseViewer';
import { UrlInput } from '@/components/ui/UrlInput/UrlInput';
import { useDebounce } from '@/hooks/useDebounce';
import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import { RestClientFormValues, restClientSchema } from '@/lib/yup/restClient';
import { HTTP_METHODS } from '@/shared/constants';
import { ROUTES } from '@/shared/routes';
import { HttpMethod } from '@/shared/types/enums';
import { decodeBase64 } from '@/shared/utils/safe-coding';

const RestClient = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { buildUrl } = useUpdateUrl();
  const initializedRef = useRef(false);

  const initialMethod = (() => {
    const method = params.parts?.[0]?.toUpperCase() as HttpMethod;
    return HTTP_METHODS.includes(method) ? method : HttpMethod.GET;
  })();

  const initialValues = useMemo(() => {
    return {
      url: params.parts?.[1] ? decodeBase64(params.parts[1]) : '',
      body: params.parts?.[2] ? decodeBase64(params.parts[2]) : '',
      headers: Array.from(searchParams.entries()).map(([key, value]) => ({
        key: decodeURIComponent(key),
        value: decodeURIComponent(value),
      })),
    };
  }, [params.parts, searchParams]);

  const { control, handleSubmit, setValue, watch } = useForm<RestClientFormValues>({
    // resolver: yupResolver(restClientSchema),
    defaultValues: {
      method: initialMethod,
      ...initialValues,
    },
  });

  const currentMethod = watch('method');
  const currentUrl = watch('url');
  const currentBody = watch('body');
  const currentHeaders = watch('headers');

  useEffect(() => {
    if (initializedRef.current) return;

    const parts = params.parts || [];

    if (parts.length === 0) {
      const defaultUrl = `${ROUTES.REST}/${HttpMethod.GET}`;
      window.history.replaceState(null, '', defaultUrl);
      return;
    }

    const method = (parts[0]?.toUpperCase() || HttpMethod.GET) as HttpMethod;

    if (!HTTP_METHODS.includes(method)) {
      notFound();
    }

    initializedRef.current = true;
  }, [params.parts]);

  const newUrl = useMemo(
    () => buildUrl(currentMethod, currentUrl, currentBody, currentHeaders),
    [currentMethod, currentUrl, currentBody, currentHeaders, buildUrl],
  );

  const debouncedNewUrl = useDebounce(newUrl, 300);

  useEffect(() => {
    if (!initializedRef.current) return;
    window.history.replaceState(null, '', debouncedNewUrl);
  }, [debouncedNewUrl]);

  const onSubmit = (_data: RestClientFormValues) => {
    // console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <MethodSelector control={control} />
          <UrlInput control={control} />
        </div>
        <HeadersEditor control={control} />
        <RequestEditor />
        <ResponseViewer />
        <CodeGenerator />
        <Button>Send Request</Button>
      </form>
    </Container>
  );
};

export default RestClient;
