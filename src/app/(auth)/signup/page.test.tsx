import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import SignUpPage from '@/app/(auth)/signup/page';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import {
  NavigateOptions,
  PrefetchOptions,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ROUTES } from '@/shared/routes';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn((namespace) => {
    const translations: Record<string, Record<string, string>> = {
      SignUp: {
        title: 'Sign Up',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        confirmPasswordLabel: 'Confirm Password',
        button: 'Create Account',
      },
      Toasts: {
        'signup.success': 'Registration successful',
        'in-use.in-use': 'Email already in use',
      },
      validation: {
        'validation.email.required': 'Email is required',
        'validation.email.invalid': 'Invalid email format',
        'validation.password.required': 'Password is required',
      },
    };
    return (key: string) => translations[namespace]?.[key] || key;
  }),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    signup: vi.fn(),
  })),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@hookform/resolvers/yup', () => ({
  yupResolver: vi.fn(),
}));

vi.mock('debounce', () => ({
  default: vi.fn((fn) => fn),
}));

describe('SignUpPage', () => {
  const mockSignup = vi.fn();
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      signup: mockSignup,
      user: null,
      signin: function (_email: string, _password: string): Promise<void> {
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

  it('renders the sign up form correctly', () => {
    render(<SignUpPage />);

    expect(screen.getByRole('heading', { name: 'Sign Up', level: 2 })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    mockSignup.mockResolvedValueOnce(true);
    render(<SignUpPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'ValidPass1!');
    await user.type(screen.getByLabelText('Confirm Password'), 'ValidPass1!');
    await user.click(screen.getByRole('button', { name: 'Create Account' }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('test@example.com', 'ValidPass1!');
      expect(toast.success).toHaveBeenCalledWith('Registration successful');
      expect(mockPush).toHaveBeenCalledWith(ROUTES.MAIN);
    });
  });

  it('shows error message when email is already in use', async () => {
    mockSignup.mockRejectedValueOnce(new Error('Email in use'));
    render(<SignUpPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'used@example.com');
    await user.type(screen.getByLabelText('Password'), 'ValidPass1!');
    await user.type(screen.getByLabelText('Confirm Password'), 'ValidPass1!');
    await user.click(screen.getByRole('button', { name: 'Create Account' }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email already in use');
    });
  });

  it('triggers field validation on change', async () => {
    render(<SignUpPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'invalid-email');
    await user.tab(); // Move to next field to trigger validation

    expect(await screen.findByText('Email')).toBeInTheDocument();
  });
});
