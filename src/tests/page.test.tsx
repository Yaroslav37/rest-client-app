import { vi } from 'vitest';

vi.mock('@/lib/firebase/config', () => ({
  auth: {},
}));

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/layout/Navbar/AuthWelcome', () => ({
  default: () => <div data-testid="auth-welcome">AuthWelcome</div>,
}));
vi.mock('@/components/layout/Navbar/UserWelcome', () => ({
  default: ({ email }: { email: string }) => (
    <div data-testid="user-welcome">UserWelcome: {email}</div>
  ),
}));
vi.mock('@/components/ui/MainContent/MainContent', () => ({
  MainContent: () => <div data-testid="main-content">MainContent</div>,
}));

import { useAuth } from '@/hooks/useAuth';
vi.mock('@/hooks/useAuth');

import Home from '@/app/page';

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders AuthWelcome when not signed in', () => {
    // @ts-ignore
    vi.mocked(useAuth).mockReturnValue({ user: null });

    render(<Home />);
    expect(screen.getByTestId('auth-welcome')).toBeInTheDocument();
    expect(screen.queryByTestId('user-welcome')).toBeNull();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });

  it('renders UserWelcome when signed in', () => {
    // @ts-ignore
    vi.mocked(useAuth).mockReturnValue({ user: { email: 'a@b.com' } });

    render(<Home />);
    expect(screen.getByTestId('user-welcome')).toHaveTextContent('a@b.com');
    expect(screen.queryByTestId('auth-welcome')).toBeNull();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });
});
