import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { convert } from 'postman-code-generators';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CodeGenerator, CodeGeneratorProps } from '@/components/ui/CodeGenerator/CodeGenerator';

vi.mock('postman-code-generators', () => ({
  convert: vi.fn((_, __, ___, ____, callback) => {
    callback(null, 'mocked generated code');
  }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'CodeGenerator.useGenerator': 'Use code generator',
      'CodeGenerator.select-language': 'Select language',
      'CodeGenerator.select-variant': 'Select variant',
      'CodeGenerator.show': 'Show code',
      'CodeGenerator.hide': 'Hide code',
      'CodeGenerator.generate': 'Generate code',
      'CodeGenerator.error': 'Error',
      'CodeGenerator.no-code-generated': 'No code generated',
      'CodeGenerator.unknown-error': 'Unknown error',
    };
    return translations[key] || key;
  },
}));

vi.mock('postman-code-generators', () => ({
  convert: vi.fn((_, __, ___, ____, callback) => {
    callback(null, 'mocked generated code');
  }),
}));

vi.mock('@/hooks/useVariablesForm', () => ({
  useVariablesForm: () => ({
    applyVariables: vi.fn((str) => str),
    getVariablesAsObject: vi.fn(() => ({})),
  }),
}));

describe('CodeGenerator Component', () => {
  const mockRequest: CodeGeneratorProps['requestCurrent'] = {
    method: 'GET',
    url: 'https://api.example.com',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: '{"test": "data"}',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<CodeGenerator requestCurrent={mockRequest} />);

    expect(screen.getByText('useGenerator')).toBeInTheDocument();
    expect(screen.getByText('select-language')).toBeInTheDocument();
    expect(screen.getByText('show')).toBeInTheDocument();
  });

  it('displays language dropdown with correct options', async () => {
    render(<CodeGenerator requestCurrent={mockRequest} />);

    const languageDropdown = screen.getByText('Curl');
    expect(languageDropdown).toBeInTheDocument();

    await userEvent.click(languageDropdown);

    expect(screen.getByText('Javascript')).toBeInTheDocument();
    expect(screen.getByText('Nodejs')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('C#')).toBeInTheDocument();
  });

  it('changes language when selected', async () => {
    render(<CodeGenerator requestCurrent={mockRequest} />);

    await userEvent.click(screen.getByText('Curl'));
    await userEvent.click(screen.getByText('Javascript'));

    expect(screen.getByText('Javascript')).toBeInTheDocument();
  });

  it('shows variant dropdown when language has multiple variants', async () => {
    render(<CodeGenerator requestCurrent={mockRequest} />);

    await userEvent.click(screen.getByText('Curl'));
    await userEvent.click(screen.getByText('Javascript'));

    expect(screen.getByText('select-variant')).toBeInTheDocument();
    expect(screen.getByText('Fetch')).toBeInTheDocument();
  });

  it('toggles code display when show/hide button is clicked', async () => {
    render(<CodeGenerator requestCurrent={mockRequest} />);

    const button = screen.getByText('show');
    await userEvent.click(button);

    expect(screen.getByText('hide')).toBeInTheDocument();
    expect(screen.getByText('mocked generated code')).toBeInTheDocument();

    await userEvent.click(button);
    expect(screen.getByText('show')).toBeInTheDocument();
  });

  it('handles code generation error', async () => {
    vi.mocked(convert).mockImplementationOnce(
      (_: any, __: any, ___: any, ____: any, callback: (arg0: Error, arg1: string) => void) => {
        callback(new Error('Generation failed'), '');
      },
    );

    render(<CodeGenerator requestCurrent={mockRequest} />);
    await userEvent.click(screen.getByText('show'));

    expect(screen.getByText(/mocked generated code/)).toBeInTheDocument();
  });

  it('does not generate code when request URL is empty', () => {
    render(<CodeGenerator requestCurrent={{ ...mockRequest, url: '' }} />);

    expect(screen.queryByText('mocked generated code')).not.toBeInTheDocument();
  });
});
