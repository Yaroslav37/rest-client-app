import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RootLayout from '@/app/layout';
import React from 'react';

vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(() => Promise.resolve('en')),
}));

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@/context/authContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@/components', () => ({
  Header: () => <header data-testid="header">Header</header>,
}));

vi.mock('@/components/layout/Footer/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock('react-toastify', async () => {
  const mod = await vi.importActual<typeof import('react-toastify')>('react-toastify');
  return {
    ...mod,
    ToastContainer: () => <div data-testid="toast-container" />,
  };
});

vi.mock('@/utils/fonts', () => ({
  inter: { variable: 'font-inter' },
  montserrat: { variable: 'font-montserrat' },
  openSans: { variable: 'font-open-sans' },
}));

describe('RootLayout', () => {
  it('renders layout with header, footer, and children', async () => {
    const TestChildren = () => <div data-testid="children">Test Content</div>;

    const Layout = await RootLayout({ children: <TestChildren /> });
    render(Layout);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
  });
});
