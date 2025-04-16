import '@testing-library/jest-dom/vitest';

import { render, screen, waitFor } from '@testing-library/react';
import { useLocale } from 'next-intl';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useRequestHistory } from '@/hooks/useRequestHistory';
import History from '@/screens/History';
import { groupRequestsByDate } from '@/services/date';
import { HttpMethod } from '@/shared/types/enums';
import type { DateGroup, RequestData } from '@/shared/types/interfaces';

const createMockTranslations = () => {
  const fn = vi.fn((key: string) => key);
  return Object.assign(fn, {
    rich: vi.fn((key: string) => key),
    markup: vi.fn((key: string) => key),
    raw: vi.fn((_key: string) => ({})),
  });
};

vi.mock('next-intl', () => ({
  useLocale: vi.fn(() => 'en'),
  useTranslations: vi.fn(createMockTranslations),
}));

const createMockRequest = (overrides: Partial<RequestData> = {}): RequestData => ({
  timestamp: Date.now(),
  api_url: 'https://api.example.com',
  redirect_url: 'https://example.com',
  method: HttpMethod.GET,
  headers: [],
  body: '',
  ...overrides,
});

vi.mock('@/hooks/useRequestHistory', () => ({
  useRequestHistory: vi.fn(() => ({
    saveRequest: vi.fn(),
    loadRequests: vi.fn(() => [] as RequestData[]),
  })),
}));

vi.mock('@/services/date', () => ({
  groupRequestsByDate: vi.fn(() => [] as DateGroup[]),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/components/layout/Container/Container', () => ({
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

vi.mock('@/components/ui/HistoryRequestGroup/RequestGroup', () => ({
  default: ({ group, groupIndex }: { group: DateGroup; groupIndex: number }) => (
    <div data-testid="request-group" data-index={groupIndex}>
      {group.date}
    </div>
  ),
}));

describe('History Component', () => {
  const mockLoadRequests = vi.fn(() => [] as RequestData[]);
  const mockLocale = 'en';

  beforeEach(() => {
    vi.mocked(useLocale).mockReturnValue(mockLocale);
    vi.mocked(useRequestHistory).mockReturnValue({
      loadRequests: mockLoadRequests,
      saveRequest: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty state when no requests are available', async () => {
    mockLoadRequests.mockReturnValue([]);
    vi.mocked(groupRequestsByDate).mockReturnValue([]);

    render(<History />);

    await waitFor(() => {
      expect(screen.getByText('History.no-requests')).toBeInTheDocument();
      expect(screen.getByText('History.rest-link')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/rest');
    });
  });

  it('loads and groups requests on mount', async () => {
    const mockRequests: RequestData[] = [
      createMockRequest({
        method: HttpMethod.POST,
        timestamp: Date.now(),
      }),
      createMockRequest({
        method: HttpMethod.PUT,
        timestamp: Date.now() - 86400000,
      }),
    ];
    const mockDateGroups: DateGroup[] = [
      {
        date: 'Today',
        requests: [mockRequests[0]],
        isExpanded: true,
      },
      {
        date: 'Yesterday',
        requests: [mockRequests[1]],
        isExpanded: false,
      },
    ];

    mockLoadRequests.mockReturnValue(mockRequests);
    vi.mocked(groupRequestsByDate).mockReturnValue(mockDateGroups);

    render(<History />);

    await waitFor(() => {
      expect(mockLoadRequests).toHaveBeenCalled();
      expect(groupRequestsByDate).toHaveBeenCalledWith(mockRequests, mockLocale);
      expect(screen.getAllByTestId('request-group')).toHaveLength(2);
    });
  });

  it('displays grouped requests when available', async () => {
    const mockRequests: RequestData[] = [
      createMockRequest({
        timestamp: Date.now(),
        api_url: 'https://api.example.com/1',
      }),
      createMockRequest({
        timestamp: Date.now() - 10000,
        api_url: 'https://api.example.com/2',
      }),
    ];
    const mockDateGroups: DateGroup[] = [
      {
        date: 'Today',
        requests: [mockRequests[0]],
        isExpanded: true,
      },
      {
        date: 'Yesterday',
        requests: [mockRequests[1]],
        isExpanded: false,
      },
    ];

    mockLoadRequests.mockReturnValue(mockRequests);
    vi.mocked(groupRequestsByDate).mockReturnValue(mockDateGroups);

    render(<History />);

    await waitFor(() => {
      expect(screen.getByText('History.history-title')).toBeInTheDocument();
      const requestGroups = screen.getAllByTestId('request-group');
      expect(requestGroups).toHaveLength(2);
      expect(requestGroups[0]).toHaveAttribute('data-index', '0');
      expect(requestGroups[1]).toHaveAttribute('data-index', '1');
    });
  });

  it('sorts requests by timestamp in descending order', async () => {
    const mockRequests: RequestData[] = [
      createMockRequest({ timestamp: 1000 }),
      createMockRequest({ timestamp: 2000 }),
    ];
    const sortedRequests = [...mockRequests].sort((a, b) => b.timestamp - a.timestamp);

    mockLoadRequests.mockReturnValue(mockRequests);
    vi.mocked(groupRequestsByDate).mockImplementation((requests) => {
      expect(requests[0].timestamp).toBeGreaterThan(requests[1].timestamp);
      return [] as DateGroup[];
    });

    render(<History />);

    await waitFor(() => {
      expect(mockLoadRequests).toHaveBeenCalled();
      expect(groupRequestsByDate).toHaveBeenCalledWith(sortedRequests, mockLocale);
    });
  });

  it('re-renders when locale changes', async () => {
    mockLoadRequests.mockReturnValue([]);
    vi.mocked(groupRequestsByDate).mockReturnValue([]);

    const { rerender } = render(<History />);

    // Change locale
    const newLocale = 'de';
    vi.mocked(useLocale).mockReturnValue(newLocale);
    rerender(<History />);

    await waitFor(() => {
      expect(groupRequestsByDate).toHaveBeenCalledWith([], newLocale);
    });
  });
});
