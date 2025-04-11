import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import { useVariablesForm } from '@/hooks/useVariablesForm';
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
  const t = useTranslations('Variables');
  const currentMethod = watch('method');
  const currentUrl = watch('url');
  const currentBody = watch('body');
  const currentHeaders = watch('headers');
  const { applyVariables, validateVariables } = useVariablesForm();
  const { buildUrl } = useUpdateUrl();

  const onSubmit = useCallback(
    async (data: RestClientFormValues) => {
      setError(null);
      setResponse(undefined);

      try {
        const allTextsToCheck = [
          data.url,
          data.body || '',
          ...(data.headers?.flatMap((h) => [h.key, h.value]) || []),
        ];

        const missingVars = new Set<string>();
        allTextsToCheck.forEach((text) => {
          const validation = validateVariables(text);
          if (!validation.isValid) {
            validation.missingVariables.forEach((v) => missingVars.add(v));
          }
        });

        if (missingVars.size > 0) {
          throw new Error(
            t('errors.unknown_variables', {
              variables: Array.from(missingVars).join(', '),
            }),
          );
        }

        const urlWithVars = applyVariables(data.url);
        const bodyWithVars = applyVariables(data.body || '');
        const headersWithVars =
          data.headers?.map(({ key, value }) => ({
            key: applyVariables(key),
            value: applyVariables(value),
          })) ?? [];

        const updatedUrl = buildUrl(data.method, urlWithVars, bodyWithVars, headersWithVars);
        window.history.replaceState(null, '', updatedUrl);

        const headers = new Headers(
          headersWithVars.reduce(
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
          requestInit.body = bodyWithVars;
        }

        const response = await fetch(urlWithVars, requestInit);

        const responseInfo = {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
        };

        let responseData;

        try {
          responseData = await response.clone().json();
        } catch {
          try {
            responseData = await response.clone().text();
          } catch {
            responseData = 'Unable to parse response';
          }
        }
        const fullResponse = { ...responseInfo, data: responseData };
        setResponse(fullResponse);

        if (!response.ok) {
          const error = new Error(`HTTP Error ${response.status}`);
          Object.assign(error, { response: fullResponse });
          throw error;
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(t('errors.unknown_error'));
        setError(error);
      }
    },
    [applyVariables, buildUrl, , validateVariables, t],
  );

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
    validateVariables,
  };
}
