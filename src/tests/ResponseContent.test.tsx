import { json } from '@codemirror/lang-json';
import { render, screen } from '@testing-library/react';
import * as CodeMirrorModule from '@uiw/react-codemirror';
import { describe, expect, it, vi } from 'vitest';

import { ResponseContent } from '@/components/ui/ResponseContent/ResponseContent';
import { ApiResponse } from '@/shared/types/interfaces';

type CodeMirrorWithMock = {
  default: typeof CodeMirrorModule.default;
  codeMirrorMock: ReturnType<typeof vi.fn>;
};

vi.mock('@uiw/react-codemirror', async () => {
  const codeMirrorMock = vi.fn(({ value, height }) => (
    <div data-testid="codemirror-mock" data-value={value} data-height={height} />
  ));

  return {
    default: codeMirrorMock,
    __esModule: true,
    codeMirrorMock,
  };
});

vi.mock('@codemirror/lang-json', () => ({
  json: vi.fn(() => 'json-extension'),
}));

vi.mock('@codemirror/view', () => ({
  EditorView: {
    lineWrapping: 'lineWrapping',
  },
}));

describe('ResponseContent Component', () => {
  const mockJsonResponse: ApiResponse = {
    status: 200,
    statusText: 'OK',
    headers: {
      'content-type': 'application/json',
      'x-custom-header': 'value',
    },
    data: { message: 'success' },
  };

  const mockTextResponse: ApiResponse = {
    status: 200,
    statusText: 'OK',
    headers: { 'content-type': 'text/plain' },
    data: 'plain text response',
  };

  const mockEmptyResponse: ApiResponse = {
    status: 204,
    statusText: 'No Content',
    headers: {},
    data: null,
  };

  it('renders headers tab with formatted headers', () => {
    render(<ResponseContent response={mockJsonResponse} activeTab="headers" />);

    const preElement = screen.getByTestId('headers-content');
    expect(preElement).toBeInTheDocument();

    const actual = preElement.textContent?.replace(/\s/g, '');
    const expected = JSON.stringify(mockJsonResponse.headers, null, 2).replace(/\s/g, '');

    expect(actual).toBe(expected);
  });

  it('renders JSON body with CodeMirror when activeTab is body', () => {
    render(<ResponseContent response={mockJsonResponse} activeTab="body" />);

    const codeMirror = screen.getByTestId('codemirror-mock');
    expect(codeMirror).toBeInTheDocument();
    expect(codeMirror).toHaveAttribute(
      'data-value',
      JSON.stringify(mockJsonResponse.data, null, 2),
    );
  });

  it('renders plain text body directly when data is string', () => {
    render(<ResponseContent response={mockTextResponse} activeTab="body" />);

    const codeMirror = screen.getByTestId('codemirror-mock');
    expect(codeMirror).toHaveAttribute('data-value', mockTextResponse.data as string);
  });

  it('handles empty/null response data', () => {
    render(<ResponseContent response={mockEmptyResponse} activeTab="body" />);

    const codeMirror = screen.getByTestId('codemirror-mock');
    expect(codeMirror).toHaveAttribute('data-value', 'null');
  });

  it('configures CodeMirror with correct JSON extensions', () => {
    render(<ResponseContent response={mockJsonResponse} activeTab="body" />);

    const codeMirrorWithMock = CodeMirrorModule as unknown as CodeMirrorWithMock;

    expect(codeMirrorWithMock.codeMirrorMock).toHaveBeenCalledWith(
      expect.objectContaining({
        extensions: expect.arrayContaining(['json-extension', 'lineWrapping']),
        readOnly: true,
        theme: 'dark',
        basicSetup: expect.objectContaining({
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: false,
        }),
        height: '300px',
        value: JSON.stringify(mockJsonResponse.data, null, 2),
      }),
      undefined,
    );

    expect(json).toHaveBeenCalled();
  });

  it('applies correct styling for headers container', () => {
    const { container } = render(
      <ResponseContent response={mockJsonResponse} activeTab="headers" />,
    );

    const div = container.querySelector('div');
    expect(div).toHaveClass('p-4');
    expect(div).toHaveClass('h-[300px]');
    expect(div).toHaveClass('overflow-auto');
  });

  it('handles malformed JSON data gracefully', () => {
    const badResponse: ApiResponse = {
      status: 200,
      statusText: 'OK',
      headers: {},
      data: 'invalid{json',
    };

    render(<ResponseContent response={badResponse} activeTab="body" />);

    const codeMirror = screen.getByTestId('codemirror-mock');
    expect(codeMirror).toHaveAttribute('data-value', 'invalid{json');
  });
});
