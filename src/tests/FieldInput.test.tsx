import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { FieldInput } from '@/components/ui/FieldInput/FieldInput';

describe('FieldInput Component', () => {
  it('renders with correct value and placeholder', () => {
    render(<FieldInput value="test" placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe('test');
  });

  it('calls onChange handler when typed into', async () => {
    const handleChange = vi.fn((e) => e);
    render(<FieldInput value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'hello');

    expect(handleChange).toHaveBeenCalled();
  });

  it('applies readOnly props correctly', () => {
    render(<FieldInput value="read only" readOnly />);
    const input = screen.getByDisplayValue('read only');

    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveClass('pointer-events-none');
  });

  it('applies custom className', () => {
    render(<FieldInput value="text" className="custom-class" />);
    const input = screen.getByDisplayValue('text');

    expect(input).toHaveClass('custom-class');
  });

  it('applies active styles when not readonly', () => {
    render(<FieldInput value="editable" />);
    const input = screen.getByDisplayValue('editable');

    expect(input).toHaveClass('focus:border-white');
    expect(input).not.toHaveClass('pointer-events-none');
  });
});
