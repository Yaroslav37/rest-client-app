// src/tests/HistoryPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HistoryPage from '@/app/history/page';

vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue(() => <div>History Component</div>),
}));

vi.mock('@/components', () => ({
  Spinner: () => <div>Loading...</div>,
}));

describe('HistoryPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders History component after it is loaded', async () => {
    render(<HistoryPage />);

    await waitFor(() => screen.getByText('History Component'));
    expect(screen.getByText('History Component')).toBeInTheDocument();
  });
});
