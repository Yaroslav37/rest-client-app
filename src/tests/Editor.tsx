import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
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

vi.mock('@codemirror/lang-json', () => ({
  json: vi.fn(),
}));

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

    await userEvent.clear(editor);
    await userEvent.type(editor, 'new content');

    expect(mockOnChange).toHaveBeenCalledTimes(10); // 1 for clear, 9 for 'new content'
    expect(mockOnChange).toHaveBeenLastCalledWith('new content');
  });

  it('renders in read-only mode', () => {
    render(<Editor {...defaultProps} readOnly={true} />);
    const editor = screen.getByTestId('codemirror-mock');
    expect(editor).toHaveAttribute('readOnly', 'true');
  });

  it('sets up JSON extensions when language is json', () => {
    render(<Editor {...defaultProps} language="json" />);

    expect(vi.mocked(json)).toHaveBeenCalled();
    expect(vi.mocked(linter)).toHaveBeenCalled();
    expect(vi.mocked(jsonParseLinter)).toHaveBeenCalled();
  });

  it('uses lineWrapping for non-JSON languages', () => {
    render(<Editor {...defaultProps} language="text" />);

    expect(vi.mocked(json)).not.toHaveBeenCalled();
    expect(vi.mocked(linter)).not.toHaveBeenCalled();
    expect(vi.mocked(jsonParseLinter)).not.toHaveBeenCalled();
  });

  it('applies dark theme', () => {
    render(<Editor {...defaultProps} />);
    expect(vi.mocked(CodeMirror)).toHaveBeenCalledWith(
      expect.objectContaining({ theme: 'dark' }),
      expect.anything(),
    );
  });

  it('configures basic setup correctly', () => {
    render(<Editor {...defaultProps} />);

    expect(vi.mocked(CodeMirror)).toHaveBeenCalledWith(
      expect.objectContaining({
        basicSetup: expect.objectContaining({
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
        }),
      }),
      expect.anything(),
    );
  });

  it('configures basic setup differently for read-only mode', () => {
    render(<Editor {...defaultProps} readOnly={true} />);

    expect(vi.mocked(CodeMirror)).toHaveBeenCalledWith(
      expect.objectContaining({
        basicSetup: expect.objectContaining({
          lineNumbers: false,
          foldGutter: false,
          highlightActiveLine: false,
          highlightSelectionMatches: false,
        }),
      }),
      expect.anything(),
    );
  });

  it('applies custom className', () => {
    render(<Editor {...defaultProps} />);

    expect(vi.mocked(CodeMirror)).toHaveBeenCalledWith(
      expect.objectContaining({ className: 'text-size-16' }),
      expect.anything(),
    );
  });
});
