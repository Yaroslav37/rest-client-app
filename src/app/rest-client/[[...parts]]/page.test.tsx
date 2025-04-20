import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue(() => <div>RestClient Component</div>),
}));

vi.mock('@/components', () => ({
  Spinner: () => <div>Loading...</div>,
}));

import RestClientPage from '@/app/rest-client/[[...parts]]/page';

describe('RestClientPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders RestClient component after load', async () => {
    render(<RestClientPage />);
    await waitFor(() => {
      expect(screen.getByText('RestClient Component')).toBeInTheDocument();
    });
  });
});
