import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Error from '@/app/error';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn((namespace: string) => {
    return (key: string) => {
      const translations: Record<string, Record<string, string>> = {
        Error: {
          error: 'Something went wrong!',
          try: 'Try again',
        },
      };
      return translations[namespace]?.[key] || key;
    };
  }),
}));

describe('Error', () => {
  const mockError = {
    message: 'Test error message',
    name: 'TestError',
    digest: '12345',
  };

  const mockReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    console.error = vi.fn();
  });

  it('renders the error message and try again button', () => {
    render(<Error error={mockError} reset={mockReset} />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('calls console.error with the error', () => {
    render(<Error error={mockError} reset={mockReset} />);

    expect(console.error).toHaveBeenCalledWith(mockError);
  });

  it('calls reset function when button is clicked', () => {
    render(<Error error={mockError} reset={mockReset} />);

    const button = screen.getByText('Try again');
    fireEvent.click(button);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('applies correct styling classes', () => {
    const { container } = render(<Error error={mockError} reset={mockReset} />);

    expect(container.firstChild).toHaveClass('min-h-screen');
    expect(container.firstChild).toHaveClass('bg-[var(--color-dark)]');
    expect(screen.getByText('Something went wrong!')).toHaveClass('text-light-green');
    expect(screen.getByText('Try again')).toHaveClass('bg-grey');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Error error={mockError} reset={mockReset} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
