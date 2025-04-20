import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import VariablesPage from './page';

vi.mock('@/components', () => ({
  Spinner: () => <div>Loading...</div>,
}));

vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue(() => <div>Variables Component</div>),
}));

describe('VariablesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Variables component inside Suspense', () => {
    render(<VariablesPage />);
    expect(screen.getByText('Variables Component')).toBeInTheDocument();
  });

  it('does not render the loading spinner after lazy component has loaded', () => {
    render(<VariablesPage />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
