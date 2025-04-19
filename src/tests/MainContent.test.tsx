import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { MainContent } from '@/components/ui/MainContent/MainContent';

const messages = {
  'MainContent.description': 'This is a test description',
  'MainContent.stack': 'Technology Stack',
  'MainContent.project': 'This is a test project description',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider messages={messages} locale="en">
    {children}
  </NextIntlClientProvider>
);

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('MainContent', () => {
  it('renders description, stack title, project description, logo and icons', () => {
    render(<MainContent />, { wrapper: Wrapper });

    expect(screen.getByText('MainContent.description')).toBeInTheDocument();
    expect(screen.getByText('MainContent.stack')).toBeInTheDocument();

    const icons = screen.getAllByRole('img', { hidden: true });
    expect(icons.length).toBeGreaterThanOrEqual(10);

    const logo = screen.getByAltText('RS School logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders TeamList component', () => {
    render(<MainContent />, { wrapper: Wrapper });

    const teamList = screen.getByTestId('team-cards-container');
    expect(teamList).toBeInTheDocument();
  });
});
