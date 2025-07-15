import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { UrlInput } from '@/components/ui/UrlInput/UrlInput';
import { RestClientFormValues } from '@/lib/yup/restClient';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'RestClient.enter-url': 'Enter URL',
    };
    return translations[key] || key;
  },
}));

describe('UrlInput Component', () => {
  const Wrapper = () => {
    const { control } = useForm<RestClientFormValues>({
      defaultValues: { url: '' },
    });
    return <UrlInput control={control} />;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with label and input', () => {
    render(<Wrapper />);

    expect(screen.getByText('enter-url')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'https://jsonplaceholder.typicode.com/posts',
    );
  });

  it('applies correct styling classes', () => {
    render(<Wrapper />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('text-white');
    expect(input).toHaveClass('border-b');
    expect(input).toHaveClass('border-green');
  });

  it('updates value when typing', async () => {
    render(<Wrapper />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'https://example.com/api');
    expect(input).toHaveValue('https://example.com/api');
  });

  it('matches snapshot', () => {
    const { container } = render(<Wrapper />);
    expect(container).toMatchSnapshot();
  });
});
