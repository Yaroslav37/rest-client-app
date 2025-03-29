import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components';
import { CodeGenerator } from '@/components/ui/CodeGenerator/CodeGenerator';
import { HeadersEditor } from '@/components/ui/HeadersEditor/HeadersEditor';
import { MethodSelector } from '@/components/ui/MethodSelector/MethodSelector';
import { RequestEditor } from '@/components/ui/RequestEditor/RequestEditor';
import { ResponseViewer } from '@/components/ui/ResponseViewer/ResponseViewer';
import { UrlInput } from '@/components/ui/UrlInput/UrlInput';
import { HttpMethod } from '@/shared/types/enums';
import { Header } from '@/shared/types/interfaces';

const RestClient = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [isInitializing, setIsInitializing] = useState(true);

  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    // resolver: yupResolver(restClientSchema), TODO: add SCHEMA
    defaultValues: {
      method: HttpMethod.GET,
      url: '',
      headers: [] as Header[],
      body: '',
      response: null,
    },
  });

  useEffect(() => {
    const parts = params.parts || [];
    const method = (parts[0]?.toUpperCase() || HttpMethod.GET) as HttpMethod;
    const decodedUrl = parts[0] ? atob(parts[0]) : '';
    const decodedBody = parts[1] ? atob(parts[1]) : '';

    const headers = Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
      acc.push({
        key: decodeURIComponent(key),
        value: decodeURIComponent(value),
      });
      return acc;
    }, [] as Header[]);

    setValue('method', method);
    setValue('url', decodedUrl);
    setValue('body', decodedBody);
    setValue('headers', headers);
    setIsInitializing(false);
  }, [params, searchParams, setValue]);

  const onSubmit = () => {
    // console.log('success');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="">
        <MethodSelector />
        <UrlInput />
      </div>

      <HeadersEditor />
      <RequestEditor />
      <ResponseViewer />
      <CodeGenerator />

      <Button>Send Request</Button>
    </form>
  );
};

export default RestClient;
