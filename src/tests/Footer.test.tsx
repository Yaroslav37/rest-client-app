import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Footer from '@/components/layout/Footer/Footer';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

describe('Footer Component', () => {
  it('renders correctly with all team members', () => {
    render(<Footer />);

    const teamLinks = ['Yaraslau Minenkou', 'Veranika Liauchuk', 'Elena Ivanova'];

    teamLinks.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('contains correct GitHub links for each team member', () => {
    render(<Footer />);

    const memberLinks = [
      { name: 'Yaraslau Minenkou', href: 'https://github.com/Yaroslav37' },
      { name: 'Veranika Liauchuk', href: 'https://github.com/adAstra97' },
      { name: 'Elena Ivanova', href: 'https://github.com/Elena-lucky' },
    ];

    memberLinks.forEach((member) => {
      const link = screen.getByText(member.name).closest('a');
      expect(link).toHaveAttribute('href', member.href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('displays GitHub icons for each team member', () => {
    render(<Footer />);

    const githubIcons = screen.getAllByAltText('');
    expect(githubIcons).toHaveLength(3);

    githubIcons.forEach((icon) => {
      expect(icon).toHaveAttribute('src', '/github_icon.svg');
      expect(icon).toHaveClass('h-4 w-4');
    });
  });

  it('shows the current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(currentYear)).toBeInTheDocument();
  });

  it('contains RS School link with correct attributes', () => {
    render(<Footer />);

    const rsLink = screen.getByLabelText('RS School React course');
    expect(rsLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(rsLink).toHaveAttribute('target', '_blank');
    expect(rsLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays RS School logo with correct attributes', () => {
    render(<Footer />);

    const rsLogo = screen.getByAltText('RS School logo');
    expect(rsLogo).toHaveAttribute('src', '/rss-logo.svg');
    expect(rsLogo).toHaveClass('h-8 w-8');
  });

  it('has correct styling classes', () => {
    const { container } = render(<Footer />);
    const footer = container.firstChild;

    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('flex-col');
    expect(footer).toHaveClass('items-center');
    expect(footer).toHaveClass('justify-center');
    expect(footer).toHaveClass('border-t');
    expect(footer).toHaveClass('border-light-green');
    expect(footer).toHaveClass('bg-dark-grey');
  });

  it('applies hover styles to team member links', async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const firstMemberLink = screen.getByText('Yaraslau Minenkou').closest('a');
    expect(firstMemberLink).toHaveClass('text-white');
    expect(firstMemberLink).toHaveClass('hover:text-light-green');

    await user.hover(firstMemberLink!);
  });

  it('applies hover styles to RS School link', async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const rsLink = screen.getByLabelText('RS School React course');
    expect(rsLink).toHaveClass('hover:opacity-80');

    await user.hover(rsLink);
  });

  it('matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
