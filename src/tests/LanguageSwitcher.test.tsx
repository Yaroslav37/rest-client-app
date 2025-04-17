import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/LanguageSwitcher';

vi.mock('next-intl', () => ({
  useLocale: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    refresh: vi.fn(),
  })),
}));

vi.mock('react', () => ({
  useTransition: vi.fn(),
}));

// Mock the locale service directly
vi.mock('@/services/locale', () => ({
  setUserLocale: vi.fn().mockResolvedValue(undefined),
}));

describe('LanguageSwitcher Component', () => {
  const mockStartTransition = vi.fn((callback) => callback());

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTransition).mockReturnValue([false, mockStartTransition]);
    vi.mocked(useLocale).mockReturnValue('en');
  });

  it('renders correctly with English as default', () => {
    render(<LanguageSwitcher />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('DE')).toBeInTheDocument();
  });

  it('renders correctly with German as default', () => {
    vi.mocked(useLocale).mockReturnValue('de');
    render(<LanguageSwitcher />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('shows loading state during transition', () => {
    vi.mocked(useTransition).mockReturnValue([true, vi.fn()]);
    render(<LanguageSwitcher />);

    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<LanguageSwitcher />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('aria-label', 'Switch language');
    expect(checkbox).toHaveAttribute('aria-busy', 'false');
  });

  it('displays correct labels when English is active', () => {
    vi.mocked(useLocale).mockReturnValue('en');
    render(<LanguageSwitcher />);

    const enLabel = screen.getByText('EN');
    const deLabel = screen.getByText('DE');

    expect(enLabel).toHaveClass('on');
    expect(deLabel).toHaveClass('off');
  });
});
