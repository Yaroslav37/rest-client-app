import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TeamCard } from '@/components/ui/TeamCard/TeamCard';

describe('TeamCard Component', () => {
  const mockProps = {
    name: 'John Doe',
    position: 'Frontend Developer',
    contributions: ['Implemented authentication', 'Optimized performance', 'Fixed critical bugs'],
  };

  it('renders correctly with provided props', () => {
    render(<TeamCard {...mockProps} />);

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.position)).toBeInTheDocument();

    mockProps.contributions.forEach((contribution) => {
      expect(screen.getByText(contribution)).toBeInTheDocument();
    });
  });

  it('renders the correct number of contributions', () => {
    render(<TeamCard {...mockProps} />);
    const contributionItems = screen.getAllByRole('listitem');
    expect(contributionItems).toHaveLength(mockProps.contributions.length);
  });

  it('renders checkmark icons for each contribution', () => {
    render(<TeamCard {...mockProps} />);
    const checkmarkIcons = screen.getAllByTestId('checkmark-icon');
    expect(checkmarkIcons).toHaveLength(mockProps.contributions.length);
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<TeamCard {...mockProps} />);

    const card = container.firstChild;
    expect(card).toHaveClass('card');

    const border = container.querySelector('.card__border');
    expect(border).toBeInTheDocument();

    const titleContainer = screen.getByTestId('title-container');
    expect(titleContainer).toHaveClass('card_title__container');
    expect(screen.getByText(mockProps.name)).toHaveClass('card_title');
    expect(screen.getByText(mockProps.position)).toHaveClass('card_paragraph');

    const listItems = screen.getAllByRole('listitem');
    listItems.forEach((item) => {
      expect(item).toHaveClass('card__list_item');
    });
  });

  it('renders the divider line', () => {
    const { container } = render(<TeamCard {...mockProps} />);
    const divider = container.querySelector('.line');
    expect(divider).toBeInTheDocument();
  });

  it('renders empty state when no contributions provided', () => {
    render(<TeamCard name={mockProps.name} position={mockProps.position} contributions={[]} />);
    const contributionItems = screen.queryAllByRole('listitem');
    expect(contributionItems).toHaveLength(0);
  });
});
