import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Spinner } from '@/components/ui/Spinner/Spinner';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      data-testid="mock-image"
      data-priority={props.priority || undefined}
    />
  ),
}));

describe('Spinner Component', () => {
  it('renders a spinner container', () => {
    render(<Spinner />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('has correct container styling', () => {
    render(<Spinner />);
    const spinner = screen.getByTestId('spinner');

    expect(spinner).toHaveClass('flex');
    expect(spinner).toHaveClass('justify-center');
    expect(spinner).toHaveClass('items-center');
    expect(spinner).toHaveClass('inset-0');
    expect(spinner).toHaveClass('bg-[rgba(0,0,0,0.1)]');
  });

  it('renders an Image component with correct props', () => {
    render(<Spinner />);
    const image = screen.getByTestId('mock-image');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/spinner.svg');
    expect(image).toHaveAttribute('alt', 'spinner');
    expect(image).toHaveAttribute('width', '80');
    expect(image).toHaveAttribute('height', '80');
    expect(image).toHaveAttribute('data-priority', 'true');
  });

  it('has proper accessibility attributes', () => {
    render(<Spinner />);
    const image = screen.getByTestId('mock-image');
    expect(image).toHaveAttribute('alt', 'spinner');
  });
});
