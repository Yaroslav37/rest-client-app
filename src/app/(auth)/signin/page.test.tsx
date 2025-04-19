import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import SignInPage from '@/app/(auth)/signin/page';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { ROUTES } from '@/shared/routes';
import {
  NavigateOptions,
  PrefetchOptions,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn((namespace) => {
    const translations: Record<string, Record<string, string>> = {
      SignIn: {
        title: 'Sign In',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        button: 'Sign In',
        noAccount: 'No account?',
        signUpLink: 'Sign up',
        invalid: 'Invalid credentials',
      },
      Toasts: {
        'signin.success': 'Login successful',
        'errors.invalid': 'Invalid credentials',
      },
    };
    return (key: string) => translations[namespace]?.[key] || key;
  }),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    signin: vi.fn(),
  })),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('SignInPage', () => {
  const mockSignin = vi.fn();
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      signin: mockSignin,
      user: null,
      signup: function (_email: string, _password: string): Promise<void> {
        throw new Error('Function not implemented.');
      },
      logout: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
    });
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: function (): void {
        throw new Error('Function not implemented.');
      },
      forward: function (): void {
        throw new Error('Function not implemented.');
      },
      refresh: function (): void {
        throw new Error('Function not implemented.');
      },
      replace: function (_href: string, _options?: NavigateOptions): void {
        throw new Error('Function not implemented.');
      },
      prefetch: function (_href: string, _options?: PrefetchOptions): void {
        throw new Error('Function not implemented.');
      },
    });
  });

  it('renders the sign in form correctly', () => {
    render(<SignInPage />);

    expect(screen.getByRole('heading', { name: 'Sign In', level: 2 })).toBeInTheDocument();

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();

    expect(screen.getByText('No account?')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    mockSignin.mockResolvedValueOnce(true);
    render(<SignInPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(mockSignin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(toast.success).toHaveBeenCalledWith('Login successful');
      expect(mockPush).toHaveBeenCalledWith(ROUTES.MAIN);
    });
  });

  it('shows error message on failed sign in', async () => {
    mockSignin.mockRejectedValueOnce(new Error('Invalid credentials'));
    render(<SignInPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'wrong@example.com');
    await user.type(screen.getByLabelText('Password'), 'wrongpass');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('validates required fields', async () => {
    render(<SignInPage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(mockSignin).not.toHaveBeenCalled();
  });

  it('navigates to sign up page when link is clicked', async () => {
    render(<SignInPage />);
    const user = userEvent.setup();

    const signUpLink = screen.getByText((_content, node) => {
      const hasText = (node: Element | null) => node?.textContent === 'No account? Sign up';
      const childrenDontHaveText = Array.from(node?.children || []).every(
        (child) => !hasText(child as Element),
      );
      return hasText(node) && childrenDontHaveText;
    });

    await user.click(signUpLink);

    expect(signUpLink).toHaveAttribute('href', ROUTES.SIGN_UP);
  });
});
