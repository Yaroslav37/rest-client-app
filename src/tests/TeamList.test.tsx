import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TeamList } from '@/components/ui/TeamList/TeamList';

// Mock next-intl and TeamCard
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'Team.devteam': 'Development Team',
      'Team.yaraslau.name': 'Yaraslau',
      'Team.veranika.name': 'Veranika',
      'Team.elena.name': 'Elena',
      'Team.positions.teamLead': 'Team Lead',
      'Team.positions.frontend': 'Frontend Developer',
      'Team.yaraslau.contributions.ciCd': 'CI/CD Setup',
      'Team.yaraslau.contributions.firebase': 'Firebase Integration',
      'Team.veranika.contributions.header': 'Header Component',
      'Team.veranika.contributions.i18n': 'Internationalization',
      'Team.elena.contributions.environment': 'Environment Setup',
      'Team.elena.contributions.codegen': 'Code Generation',
    };
    return translations[key] || key;
  },
}));

vi.mock('@/components/ui/TeamCard/TeamCard', () => ({
  TeamCard: ({
    name,
    position,
    contributions,
  }: {
    name: string;
    position: string;
    contributions: string[];
  }) => (
    <div data-testid="team-card">
      <h3>{name}</h3>
      <p>{position}</p>
      <ul>
        {contributions.map((cont, i) => (
          <li key={i}>{cont}</li>
        ))}
      </ul>
    </div>
  ),
}));

describe('TeamList Component', () => {
  it('renders the team section title', () => {
    render(<TeamList />);
    expect(screen.getByText('devteam')).toBeInTheDocument();
  });

  it('renders all team members', () => {
    render(<TeamList />);
    const cards = screen.getAllByTestId('team-card');
    expect(cards).toHaveLength(3);
  });

  it('renders correct team member names', () => {
    render(<TeamList />);
    expect(screen.getByText('yaraslau.name')).toBeInTheDocument();
    expect(screen.getByText('veranika.name')).toBeInTheDocument();
    expect(screen.getByText('elena.name')).toBeInTheDocument();
  });

  it('renders correct positions', () => {
    render(<TeamList />);
    expect(screen.getByText('positions.teamLead')).toBeInTheDocument();
    expect(screen.getAllByText('positions.frontend')).toHaveLength(2);
  });

  it('renders team member contributions', () => {
    render(<TeamList />);
    expect(screen.getByText('yaraslau.contributions.ciCd')).toBeInTheDocument();
    expect(screen.getByText('yaraslau.contributions.firebase')).toBeInTheDocument();
    expect(screen.getByText('veranika.contributions.header')).toBeInTheDocument();
    expect(screen.getByText('veranika.contributions.i18n')).toBeInTheDocument();
    expect(screen.getByText('elena.contributions.environment')).toBeInTheDocument();
    expect(screen.getByText('elena.contributions.codegen')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<TeamList />);
    const teamList = container.firstChild;

    expect(teamList).toHaveClass('flex');
    expect(teamList).toHaveClass('flex-col');
    expect(teamList).toHaveClass('gap-5');

    const cardsContainer = screen.getByTestId('team-cards-container');
    expect(cardsContainer).toHaveClass('flex');
    expect(cardsContainer).toHaveClass('flex-wrap');
    expect(cardsContainer).toHaveClass('justify-center');
    expect(cardsContainer).toHaveClass('min-[1044px]:justify-between');
    expect(cardsContainer).toHaveClass('gap-5');
  });

  it('applies hover effect to team cards', () => {
    const { container } = render(<TeamList />);
    const cardWrappers = container.querySelectorAll('.transition-transform');

    cardWrappers.forEach((wrapper) => {
      expect(wrapper).toHaveClass('will-change-transform');
      expect(wrapper).toHaveClass('hover:scale-105');
    });
  });
});
