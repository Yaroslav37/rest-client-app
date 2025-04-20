import { render, screen } from '@testing-library/react';
import Variables from '@/screens/Variables';
import { useTranslations } from 'next-intl';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

vi.mock('@/components/VariablesEditor', () => ({
  VariablesEditor: () => <div data-testid="variables-editor" />,
}));

vi.mock('@/lib/firebase/config', () => ({
  auth: {}, // Mock empty auth object
}));

describe('Variables Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const mockT = vi.fn((key: string) => {
      const translations: Record<string, string> = {
        'Variables.info': 'Variables help you reuse values across requests',
        'Variables.info-add': 'Add variables using the format',
      };
      return translations[key] || key;
    });

    vi.mocked(useTranslations).mockReturnValue(mockT as any);
  });

  it('renders the component with translations', () => {
    render(<Variables />);

    expect(screen.getByText('info')).toBeInTheDocument();
    expect(screen.getByText('info-add')).toBeInTheDocument();
    expect(screen.getByText('{{variableName}}')).toBeInTheDocument();
  });

  it('matches the expected structure', () => {
    const { container } = render(<Variables />);

    expect(container.firstChild).toHaveClass('min-h-[70vh]');
    expect(container.firstChild).toHaveClass('mt-5');
    expect(container.firstChild).toHaveClass('p-4');
  });

  it('renders the variable syntax with proper styling', () => {
    render(<Variables />);

    const variableSpan = screen.getByText('{{variableName}}');
    expect(variableSpan).toHaveClass('font-mono');
    expect(variableSpan).toHaveClass('bg-gray-700');
    expect(variableSpan).toHaveClass('px-1');
    expect(variableSpan).toHaveClass('rounded');
  });
});
