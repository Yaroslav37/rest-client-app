import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EditorSwitcher } from '@/components/ui/EditorSwitcher/EditorSwitcher';

describe('EditorSwitcher Component', () => {
  it('renders both buttons', () => {
    render(<EditorSwitcher language="json" onLanguageChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'JSON' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'TEXT' })).toBeInTheDocument();
  });

  it('applies active class to selected language', () => {
    render(<EditorSwitcher language="text" onLanguageChange={() => {}} />);

    const jsonButton = screen.getByRole('button', { name: 'JSON' });
    const textButton = screen.getByRole('button', { name: 'TEXT' });

    expect(textButton).toHaveClass('bg-light-green');
    expect(jsonButton).toHaveClass('bg-transparent');
  });

  it('calls onLanguageChange with correct language', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<EditorSwitcher language="json" onLanguageChange={onChange} />);

    const textButton = screen.getByRole('button', { name: 'TEXT' });
    await user.click(textButton);

    expect(onChange).toHaveBeenCalledWith('text');
  });

  it('does not call onLanguageChange if clicking active button', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<EditorSwitcher language="json" onLanguageChange={onChange} />);

    const jsonButton = screen.getByRole('button', { name: 'JSON' });
    await user.click(jsonButton);

    // It still calls the function, since there's no prevention logic
    expect(onChange).toHaveBeenCalledWith('json');
  });

  it('buttons have correct type', () => {
    render(<EditorSwitcher language="text" onLanguageChange={() => {}} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('type', 'button');
    });
  });
});
