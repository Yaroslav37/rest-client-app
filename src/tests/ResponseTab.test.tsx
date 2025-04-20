import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ResponseTabs } from '@/components/ui/ReponseTabs/ResponseTabs';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'response-tab-body': 'Body',
      'response-tab-headers': 'Headers',
    };
    return translations[key] || key;
  },
}));

describe('ResponseTabs', () => {
  const renderTabs = (activeTab: 'body' | 'headers', onTabChange = vi.fn()) => {
    return render(<ResponseTabs activeTab={activeTab} onTabChange={onTabChange} />);
  };

  it('renders both tabs with correct labels', () => {
    renderTabs('body');

    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Headers')).toBeInTheDocument();
  });

  it('calls onTabChange with "headers" when headers tab is clicked', () => {
    const onTabChange = vi.fn();
    renderTabs('body', onTabChange);

    const headersTab = screen.getByText('Headers');
    fireEvent.click(headersTab);

    expect(onTabChange).toHaveBeenCalledWith('headers');
  });

  it('calls onTabChange with "body" when body tab is clicked', () => {
    const onTabChange = vi.fn();
    renderTabs('headers', onTabChange);

    const bodyTab = screen.getByText('Body');
    fireEvent.click(bodyTab);

    expect(onTabChange).toHaveBeenCalledWith('body');
  });

  it('applies active styles correctly', () => {
    renderTabs('body');

    const bodyTab = screen.getByText('Body');
    const headersTab = screen.getByText('Headers');

    expect(bodyTab.className.split(' ')).toContain('bg-light-green');
    expect(bodyTab.className.split(' ')).toContain('text-dark');
    expect(headersTab.className.split(' ')).not.toContain('bg-light-green');
    expect(headersTab.className.split(' ')).not.toContain('text-dark');
  });
});
