import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import RequestItem from '@/components/ui/HistoryRequestIem/RequestItem';
import { HttpMethod } from '@/shared/types/enums';
import { RequestData } from '@/shared/types/interfaces';

describe('RequestItem', () => {
  const mockRequest: RequestData = {
    timestamp: new Date('2023-01-01T12:34:56').getTime(),
    api_url: 'https://api.example.com/test',
    redirect_url: 'https://app.example.com/details',
    method: HttpMethod.GET,
    headers: [],
    body: '',
  };

  it('renders timestamp correctly', () => {
    render(<RequestItem request={mockRequest} />);
    const time = new Date(mockRequest.timestamp).toLocaleTimeString();
    expect(screen.getByText(time)).toBeInTheDocument();
  });

  it('renders method correctly', () => {
    render(<RequestItem request={mockRequest} />);
    expect(screen.getByText(mockRequest.method)).toBeInTheDocument();
  });

  it('renders API URL correctly', () => {
    render(<RequestItem request={mockRequest} />);
    expect(screen.getByText(mockRequest.api_url)).toBeInTheDocument();
  });

  it('has correct link redirect_url', () => {
    render(<RequestItem request={mockRequest} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockRequest.redirect_url);
  });
});
