import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import RequestGroup from '@/components/ui/HistoryRequestGroup/RequestGroup';
import { HttpMethod } from '@/shared/types/enums';
import { DateGroup } from '@/shared/types/interfaces';

vi.mock('@/components/ui/HistoryRequestIem/RequestItem', () => ({
  default: ({ request }: any) => <div data-testid="request-item">{request.api_url}</div>,
}));

describe('RequestGroup', () => {
  const mockGroup: DateGroup = {
    date: '2025-04-16',
    isExpanded: false,
    requests: [
      {
        timestamp: 1713278400000,
        api_url: 'https://api.example.com/1',
        redirect_url: 'https://app.example.com/1',
        method: HttpMethod.GET,
      },
      {
        timestamp: 1713278500000,
        api_url: 'https://api.example.com/2',
        redirect_url: 'https://app.example.com/2',
        method: HttpMethod.POST,
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the group date', () => {
    render(<RequestGroup group={mockGroup} groupIndex={0} />);
    expect(screen.getByText(mockGroup.date)).toBeInTheDocument();
  });

  it('does not render request items by default when collapsed', () => {
    render(<RequestGroup group={mockGroup} groupIndex={0} />);
    expect(screen.queryByTestId('request-item')).not.toBeInTheDocument();
  });

  it('renders request items when expanded', () => {
    render(<RequestGroup group={{ ...mockGroup, isExpanded: true }} groupIndex={0} />);
    const items = screen.getAllByTestId('request-item');
    expect(items).toHaveLength(mockGroup.requests.length);
  });

  it('toggles request list visibility when clicked', () => {
    render(<RequestGroup group={mockGroup} groupIndex={0} />);

    const toggleButton = screen.getByRole('button');
    expect(screen.queryByTestId('request-item')).not.toBeInTheDocument();

    fireEvent.click(toggleButton);

    const items = screen.getAllByTestId('request-item');
    expect(items).toHaveLength(mockGroup.requests.length);
  });
});
