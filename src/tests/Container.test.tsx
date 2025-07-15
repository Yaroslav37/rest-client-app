import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Container } from '@/components/layout/Container/Container';

describe('Container Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Container>
        <div>Test Content</div>
      </Container>,
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default classes correctly', () => {
    const { container } = render(
      <Container>
        <div>Test</div>
      </Container>,
    );

    const div = container.firstChild;
    expect(div).toHaveClass('px-4');
    expect(div).toHaveClass('sm:px-6');
    expect(div).toHaveClass('xl:px-10');
    expect(div).toHaveClass('max-w-[1920px]');
    expect(div).toHaveClass('mx-auto');
  });

  it('merges custom className with default classes', () => {
    const { container } = render(
      <Container className="custom-class extra-class">
        <div>Test</div>
      </Container>,
    );

    const div = container.firstChild;
    expect(div).toHaveClass('px-4');
    expect(div).toHaveClass('sm:px-6');
    expect(div).toHaveClass('custom-class');
    expect(div).toHaveClass('extra-class');
  });

  it('matches snapshot with default props', () => {
    const { container } = render(
      <Container>
        <div>Test</div>
      </Container>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with custom className', () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Test</div>
      </Container>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
