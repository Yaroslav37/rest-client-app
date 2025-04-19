import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Logo } from '@/components/ui/Logo/Logo';
import { ROUTES } from '@/shared/routes';

describe('Logo', () => {
  it('renders logo text', () => {
    render(<Logo />);
    expect(screen.getByText('REST Client')).toBeInTheDocument();
  });

  it('renders correct link to main route', () => {
    render(<Logo />);
    const link = screen.getByRole('link', { name: 'REST Client' });

    expect(link).toHaveAttribute('href', ROUTES.MAIN);
  });

  it('has correct class names for styling', () => {
    render(<Logo />);
    const link = screen.getByText('REST Client');
    expect(link).toHaveClass('text-size-24');
    expect(link).toHaveClass('font-bold');
    expect(link).toHaveClass('text-light-green');
  });
});
