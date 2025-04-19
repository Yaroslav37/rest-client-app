import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserWelcome from '@/components/layout/Navbar/UserWelcome';
import { ROUTES } from '@/shared/routes';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const t: Record<string, string> = {
      welcomeUser: 'Welcome',
      restClient: 'REST Client',
      history: 'History',
      variables: 'Variables',
    };
    return t[key] ?? key;
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

describe('UserWelcome', () => {
  const testEmail = 'user@example.com';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders welcome message with email', () => {
    render(<UserWelcome email={testEmail} />);
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(testEmail)).toBeInTheDocument();
  });

  it('renders all navigation buttons with correct text', () => {
    render(<UserWelcome email={testEmail} />);
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
  });

  it('has correct links', () => {
    render(<UserWelcome email={testEmail} />);
    expect(screen.getByText('REST Client').closest('a')).toHaveAttribute('href', ROUTES.REST);
    expect(screen.getByText('History').closest('a')).toHaveAttribute('href', ROUTES.HISTORY);
    expect(screen.getByText('Variables').closest('a')).toHaveAttribute('href', ROUTES.VARIABLES);
  });
});
