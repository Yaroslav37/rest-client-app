import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/app/not-found';

vi.mock('next/image', () => ({
  default: (props: any) => {
    return <img {...props} />;
  },
}));

vi.mock('next/link', () => ({
  default: (props: any) => {
    return <a {...props} href={props.href} />;
  },
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      'NotFound.not-found': 'Page not found',
      'NotFound.back': 'Back to home',
    };
    return translations[key] || key;
  }),
}));

describe('NotFoundPage', () => {
  it('renders correctly with all elements', () => {
    render(<NotFoundPage />);

    const image = screen.getByAltText('Page not found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/404.gif');
    expect(image).toHaveAttribute('width', '150');
    expect(image).toHaveAttribute('height', '150');

    expect(screen.getByText('not-found')).toBeInTheDocument();

    const backLink = screen.getByText('back');
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('applies correct styling classes', () => {
    render(<NotFoundPage />);

    const container = screen.getByTestId('not-found-container');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
    expect(container).toHaveClass('min-h-screen');
    expect(container).toHaveClass('p-4');

    const text = screen.getByText('not-found');
    expect(text).toHaveClass('text-light-green');
    expect(text).toHaveClass('text-[16px]');
    expect(text).toHaveClass('xs:text-[24px]');
    expect(text).toHaveClass('mb-4');

    const link = screen.getByText('back');
    expect(link).toHaveClass('text-white');
    expect(link).toHaveClass('hover:text-green');
    expect(link).toHaveClass('hover:underline');
    expect(link).toHaveClass('transition-colors');
  });

  it('applies correct inline styles to image', () => {
    render(<NotFoundPage />);

    const image = screen.getByAltText('Page not found');
    expect(image).toHaveStyle({
      borderImage: 'linear-gradient(to right, #87c232, #3b82f6) 1',
    });
  });
});
