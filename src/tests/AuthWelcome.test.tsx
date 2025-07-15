import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthWelcome from '@/components/layout/Navbar/AuthWelcome';
import { ROUTES } from '@/shared/routes';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      welcome: 'Welcome',
      signIn: 'Sign In',
      or: 'or',
      signUp: 'Sign Up',
      toContinue: 'to continue.',
    };
    return translations[key] || key;
  },
}));

vi.mock('next/link', async () => {
  const React = await vi.importActual<typeof import('react')>('react');
  return {
    default: React.forwardRef(({ href, children, ...props }: any, ref) => (
      <a href={href} ref={ref} {...props}>
        {children}
      </a>
    )),
  };
});

describe('AuthWelcome', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all expected text elements', () => {
    render(<AuthWelcome />);

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('or')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('to continue.')).toBeInTheDocument();
  });

  it('renders Sign In link with correct href', () => {
    render(<AuthWelcome />);
    const signInLink = screen.getByText('Sign In').closest('a');
    expect(signInLink).toHaveAttribute('href', ROUTES.SIGN_IN);
  });

  it('renders Sign Up link with correct href', () => {
    render(<AuthWelcome />);
    const signUpLink = screen.getByText('Sign Up').closest('a');
    expect(signUpLink).toHaveAttribute('href', ROUTES.SIGN_UP);
  });
});
