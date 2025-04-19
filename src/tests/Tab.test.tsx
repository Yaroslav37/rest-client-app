import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tab } from '@/components/ui/Tab/Tab';

describe('Tab Component', () => {
  const mockOnClick = vi.fn();
  const testProps = {
    value: 'tab1',
    activeTab: 'tab1',
    onClick: mockOnClick,
    children: 'Test Tab',
  };

  it('renders correctly with children', () => {
    render(<Tab {...testProps} />);
    expect(screen.getByText('Test Tab')).toBeInTheDocument();
  });

  it('applies base classes', () => {
    render(<Tab {...testProps} />);
    const tab = screen.getByRole('button');
    expect(tab).toHaveClass('px-3');
    expect(tab).toHaveClass('py-1');
    expect(tab).toHaveClass('rounded');
    expect(tab).toHaveClass('cursor-pointer');
    expect(tab).toHaveClass('border');
    expect(tab).toHaveClass('border-light-green');
    expect(tab).toHaveClass('transition-colors');
  });

  it('applies active classes when tab is active', () => {
    render(<Tab {...testProps} activeTab="tab1" value="tab1" />);
    const tab = screen.getByRole('button');
    expect(tab).toHaveClass('bg-light-green');
    expect(tab).toHaveClass('text-dark');
    expect(tab).not.toHaveClass('bg-transparent');
    expect(tab).not.toHaveClass('hover:bg-light-green/20');
  });

  it('applies inactive classes when tab is not active', () => {
    render(<Tab {...testProps} activeTab="tab2" value="tab1" />);
    const tab = screen.getByRole('button');
    expect(tab).toHaveClass('bg-transparent');
    expect(tab).toHaveClass('text-light-green');
    expect(tab).toHaveClass('hover:bg-light-green/20');
    expect(tab).not.toHaveClass('bg-light-green');
    expect(tab).not.toHaveClass('text-dark');
  });

  it('calls onClick handler with correct value when clicked', async () => {
    render(<Tab {...testProps} />);
    const tab = screen.getByRole('button');
    await userEvent.click(tab);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('tab1');
  });

  it('merges custom className correctly', () => {
    render(<Tab {...testProps} className="custom-class" />);
    const tab = screen.getByRole('button');
    expect(tab).toHaveClass('custom-class');
  });

  it('has button type attribute set to "button"', () => {
    render(<Tab {...testProps} />);
    const tab = screen.getByRole('button');
    expect(tab).toHaveAttribute('type', 'button');
  });
});
