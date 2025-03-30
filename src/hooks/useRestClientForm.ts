import { useForm } from 'react-hook-form';

import type { RestClientFormValues } from '@/lib/yup/restClient';
import type { HttpMethod } from '@/shared/types/enums';
import { Header } from '@/shared/types/interfaces';

interface UseRestClientFormProps {
  initialMethod: HttpMethod;
  initialValues: {
    url: string;
    body: string;
    headers: Header[];
  };
}

export function useRestClientForm({ initialMethod, initialValues }: UseRestClientFormProps) {
  const { control, handleSubmit, setValue, watch } = useForm<RestClientFormValues>({
    defaultValues: {
      method: initialMethod,
      ...initialValues,
    },
  });

  const currentMethod = watch('method');
  const currentUrl = watch('url');
  const currentBody = watch('body');
  const currentHeaders = watch('headers');

  const onSubmit = (data: RestClientFormValues) => {
    // console.log(data);
  };

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
  };
}
