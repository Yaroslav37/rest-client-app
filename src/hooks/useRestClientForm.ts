import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { RestClientFormValues } from '@/lib/yup/restClient';
import type { HttpMethod } from '@/shared/types/enums';
import { ApiResponse, Header } from '@/shared/types/interfaces';

interface Props {
  initialMethod: HttpMethod;
  initialValues: {
    url: string;
    body: string;
    headers: Header[];
  };
}

export function useRestClientForm({ initialMethod, initialValues }: Props) {
  const { control, handleSubmit, setValue, watch } = useForm<RestClientFormValues>({
    defaultValues: {
      method: initialMethod,
      ...initialValues,
    },
  });

  const [response, setResponse] = useState<ApiResponse>();
  const [error, setError] = useState<Error | null>(null);

  const currentMethod = watch('method');
  const currentUrl = watch('url');
  const currentBody = watch('body');
  const currentHeaders = watch('headers');

  const onSubmit = useCallback(async (data: RestClientFormValues) => {
    setError(null);
    setResponse(undefined);
    // console.log(data)

    try {
      const headers = new Headers(
        data.headers?.reduce(
          (acc, { key, value }) => {
            if (key && value) acc[key] = value;
            return acc;
          },
          {} as Record<string, string>,
        ),
      );

      const requestInit: RequestInit = {
        method: data.method,
        headers,
      };

      if (['POST', 'PUT', 'PATCH'].includes(data.method)) {
        requestInit.body = data.body;
      }

      const response = await fetch(data.url, requestInit);

      const responseHeaders = Object.fromEntries(response.headers.entries());
      const textData = await response.text();

      let responseData;
      try {
        responseData = JSON.parse(textData);
      } catch {
        responseData = textData;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data: responseData,
      });
    } catch (err) {
      // TODO: ADD TOAST
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    }
  }, []);

  return {
    control,
    handleSubmit,
    setValue,
    watch,
    currentMethod,
    currentUrl,
    currentBody,
    currentHeaders,
    onSubmit,
    response,
    error,
  };
}
