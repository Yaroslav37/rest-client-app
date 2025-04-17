import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, UseFormRegister } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

import { FormFieldSignUp } from '@/components/ui/FormField/FormFieldSignUp';

vi.mock('../ErrorMessage/ErrorMessage', () => ({
  default: ({ message }: { message: string }) => <div data-testid="error-message">{message}</div>,
}));

describe('FormFieldSignUp Component', () => {
  // Create a test form type
  type TestFormValues = {
    testField: string;
  };

  const TestForm = ({
    error,
    onChange,
  }: {
    error?: string;
    onChange?: (value: string) => void;
  }) => {
    const { register } = useForm<TestFormValues>();
    return (
      <FormFieldSignUp<TestFormValues>
        id="testField"
        label="Test Label"
        register={register}
        type="text"
        placeholder="Test Placeholder"
        error={error}
        onChange={onChange}
      />
    );
  };

  it('renders correctly with basic props', () => {
    render(<TestForm />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'testField');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'Test Placeholder');
  });

  it('displays error message when provided', () => {
    render(<TestForm error="Test error message" />);

    expect(screen.getByTestId('error-message')).toHaveTextContent('Test error message');
  });

  it('calls register onChange handler', async () => {
    // Create properly typed mock register function
    const mockRegisterOnChange = vi.fn();
    const mockRegister: UseFormRegister<TestFormValues> = vi.fn((name) => ({
      onChange: mockRegisterOnChange,
      onBlur: vi.fn(),
      name,
      ref: vi.fn(),
    }));

    render(
      <FormFieldSignUp<TestFormValues>
        id="testField"
        label="Test Label"
        register={mockRegister}
        type="text"
      />,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');
    expect(mockRegisterOnChange).toHaveBeenCalled();
  });

  it('calls custom onChange handler when provided', async () => {
    const mockOnChange = vi.fn();
    render(<TestForm onChange={mockOnChange} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'a');
    expect(mockOnChange).toHaveBeenCalledWith('a');
  });

  it('applies correct CSS classes', () => {
    render(<TestForm />);
    expect(screen.getByRole('textbox')).toHaveClass('input');
  });

  it('combines register and custom onChange handlers', async () => {
    const mockOnChange = vi.fn();
    const mockRegisterOnChange = vi.fn();

    const mockRegister: UseFormRegister<TestFormValues> = (name) => ({
      onChange: mockRegisterOnChange,
      onBlur: vi.fn(),
      name,
      ref: vi.fn(),
    });

    render(
      <FormFieldSignUp<TestFormValues>
        id="testField"
        label="Test Label"
        register={mockRegister}
        type="text"
        onChange={mockOnChange}
      />,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'a');

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockRegisterOnChange).toHaveBeenCalled();
  });

  it('applies correct CSS classes', () => {
    render(<TestForm />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input');
  });
});
