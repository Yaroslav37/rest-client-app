import { render, screen } from '@testing-library/react';
import { UseFormRegister } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { FormField } from '@/components/ui/FormField/FormField';

vi.mock('@/components/ui/ErrorMessage/ErrorMessage', () => ({
  default: ({ message }: { message: string }) => <div>{message}</div>,
}));

type FormData = {
  email: string;
};

describe('FormField', () => {
  const mockRegister: UseFormRegister<FormData> = vi.fn().mockReturnValue({
    name: 'email',
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  });

  it('renders label and input correctly', () => {
    render(<FormField<FormData> id="email" label="Email" register={mockRegister} type="email" />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('renders placeholder if provided', () => {
    render(
      <FormField<FormData>
        id="email"
        label="Email"
        register={mockRegister}
        type="email"
        placeholder="Enter your email"
      />,
    );

    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('renders error message if error exists', () => {
    render(
      <FormField<FormData>
        id="email"
        label="Email"
        register={mockRegister}
        type="email"
        error="Email is required"
      />,
    );

    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('adds required attributes when required is true', () => {
    render(
      <FormField<FormData>
        id="email"
        label="Email"
        register={mockRegister}
        type="email"
        required
      />,
    );

    const input = screen.getByLabelText('Email');
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('adds error class when error is present', () => {
    render(
      <FormField<FormData>
        id="email"
        label="Email"
        register={mockRegister}
        type="email"
        error="Invalid"
      />,
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveClass('input-error');
  });
});
