'use client';

import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';

import { EditingLanguage } from '@/shared/types/interfaces';

export const Editor = ({
  value,
  language,
  readOnly,
  onChange,
}: {
  value: string;
  language: EditingLanguage;
  readOnly: boolean;
  onChange: (value: string) => void;
}) => (
  <CodeMirror
    value={value}
    height="200px"
    extensions={[
      language === 'json' ? json() : EditorView.lineWrapping,
      ...(language === 'json' ? [linter(jsonParseLinter())] : []),
    ]}
    readOnly={readOnly}
    onChange={onChange}
    theme="dark"
    basicSetup={{
      lineNumbers: !readOnly,
      foldGutter: !readOnly,
      highlightActiveLine: !readOnly,
      highlightSelectionMatches: !readOnly,
    }}
    className="text-size-16"
  />
);
