import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage';

describe('ErrorMessage Component', () => {
  it('renders the message when provided', () => {
    render(<ErrorMessage message="This is an error" />);
    const messageEl = screen.getByTestId('error-message');

    expect(messageEl).toBeInTheDocument();
    expect(messageEl).toHaveTextContent('This is an error');
  });

  it('renders the icon alongside the message', () => {
    render(<ErrorMessage message="Icon test" />);
    const icon = screen.getByTestId('error-message').querySelector('svg');

    expect(icon).toBeInTheDocument();
  });

  it('applies center alignment when justifyCenter is true', () => {
    render(<ErrorMessage message="Centered" justifyCenter />);
    const messageEl = screen.getByTestId('error-message');

    expect(messageEl).toHaveClass('justify-center');
  });

  it('does not render anything if message is undefined', () => {
    const { container } = render(<ErrorMessage message={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('has all required utility classes', () => {
    render(<ErrorMessage message="Check classes" />);
    const el = screen.getByTestId('error-message');

    expect(el).toHaveClass('text-warning');
    expect(el).toHaveClass('text-sm');
    expect(el).toHaveClass('gap-1');
    expect(el).toHaveClass('animate-slide-down');
    expect(el).toHaveClass('text-size-16');
    expect(el).toHaveClass('min-h-5');
  });
});
