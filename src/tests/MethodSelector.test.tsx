import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

import { MethodSelector } from '@/components/ui/MethodSelector/MethodSelector';
import { RestClientFormValues } from '@/lib/yup/restClient';
import { HttpMethod } from '@/shared/types/enums';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider messages={{ 'RestClient.select-method': 'Select method' }} locale="en">
    {children}
  </NextIntlClientProvider>
);

describe('MethodSelector', () => {
  it('renders without crashing', () => {
    const Component = () => {
      const { control } = useForm<RestClientFormValues>({
        defaultValues: { method: HttpMethod.GET },
      });

      return <MethodSelector control={control} />;
    };

    render(<Component />, { wrapper: Wrapper });

    expect(screen.getByText('RestClient.select-method')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
  });

  it('allows selecting a different HTTP method', async () => {
    const Component = () => {
      const { control } = useForm<RestClientFormValues>({
        defaultValues: { method: HttpMethod.GET },
      });

      return <MethodSelector control={control} />;
    };

    render(<Component />, { wrapper: Wrapper });

    const select = screen.getByText(HttpMethod.GET);
    fireEvent.mouseDown(select); // открываем меню

    const postOption = await screen.findByText(HttpMethod.POST);
    fireEvent.click(postOption);

    expect(screen.getByText(HttpMethod.POST)).toBeInTheDocument();
  });
});
