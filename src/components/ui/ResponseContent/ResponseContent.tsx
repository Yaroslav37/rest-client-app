import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';

import { ApiResponse } from '@/shared/types/interfaces';

export const ResponseContent = ({
  response,
  activeTab,
}: {
  response: ApiResponse;
  activeTab: 'body' | 'headers';
}) => {
  const formattedData =
    typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2);

  return (
    <>
      {activeTab === 'headers' ? (
        <div className="p-4 h-[300px] overflow-auto">
          <pre className="text-sm text-light-grey" data-testid="headers-content">
            {JSON.stringify(response.headers, null, 2)}
          </pre>
        </div>
      ) : (
        <CodeMirror
          value={formattedData || ''}
          extensions={[json(), EditorView.lineWrapping]}
          readOnly
          theme="dark"
          height="300px"
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            highlightActiveLine: false,
          }}
        />
      )}
    </>
  );
};
