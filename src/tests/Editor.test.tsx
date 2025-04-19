import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CodeMirror from '@uiw/react-codemirror';
import { describe, expect, it, vi } from 'vitest';

import { Editor } from '@/components/ui/Editor/Editor';
import { EditingLanguage } from '@/shared/types/interfaces';

vi.mock('@uiw/react-codemirror', () => ({
  default: vi.fn(({ onChange, value }) => (
    <textarea
      data-testid="codemirror-mock"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      readOnly={false}
    />
  )),
}));

vi.mock(import('@codemirror/lang-json'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    json: vi.fn(),
  };
});

vi.mock('@codemirror/lint', () => ({
  linter: vi.fn(),
  jsonParseLinter: vi.fn(),
}));

vi.mock('@codemirror/view', () => ({
  EditorView: {
    lineWrapping: 'lineWrapping',
  },
}));

describe('Editor Component', () => {
  const mockOnChange = vi.fn();

  const defaultProps = {
    value: 'initial value',
    language: 'text' as EditingLanguage,
    readOnly: false,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<Editor {...defaultProps} />);
    const editor = screen.getByTestId('codemirror-mock');
    expect(editor).toBeInTheDocument();
    expect(editor).toHaveValue('initial value');
  });

  it('handles onChange events', async () => {
    render(<Editor {...defaultProps} />);
    const editor = screen.getByTestId('codemirror-mock');

    await userEvent.click(editor);
    await userEvent.keyboard('{Control>}a{/Control}{Delete}');

    await userEvent.type(editor, 'new content');

    const calls = mockOnChange.mock.calls;
    expect(calls[calls.length - 1][0]).toBe('initial valuet');
  });

  it('renders in read-only mode', () => {
    render(<Editor {...defaultProps} readOnly={true} />);
  });

  it('applies dark theme', () => {
    render(<Editor {...defaultProps} />);

    const [props] = vi.mocked(CodeMirror).mock.calls[0];

    expect(props.theme).toBe('dark');
  });

  it('configures basic setup correctly', () => {
    render(<Editor {...defaultProps} />);

    const [props] = vi.mocked(CodeMirror).mock.calls[0];

    expect(props.basicSetup).toEqual({
      lineNumbers: true,
      foldGutter: true,
      highlightActiveLine: true,
      highlightSelectionMatches: true,
    });
  });

  it('configures basic setup differently for read-only mode', () => {
    render(<Editor {...defaultProps} readOnly={true} />);

    const [props] = vi.mocked(CodeMirror).mock.calls[0];

    expect(props.basicSetup).toEqual({
      lineNumbers: false,
      foldGutter: false,
      highlightActiveLine: false,
      highlightSelectionMatches: false,
    });
  });

  it('applies custom className', () => {
    render(<Editor {...defaultProps} />);

    const [props] = vi.mocked(CodeMirror).mock.calls[0];

    expect(props.className).toBe('text-size-16');
  });
});
