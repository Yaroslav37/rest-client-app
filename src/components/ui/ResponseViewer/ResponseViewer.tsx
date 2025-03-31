'use client';

import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';

interface ResponseViewerProps {
  response?: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    data: unknown;
  };
  error?: Error | null;
}

const getStatusColor = (status: number) => {
  if (status >= 100 && status < 200) return 'text-gray-600';
  if (status >= 200 && status < 300) return 'text-green-600';
  if (status >= 300 && status < 400) return 'text-blue-600';
  return 'text-red-600';
};

const getStatusMessage = (status: number) => {
  if (status >= 100 && status < 200) return 'Informational';
  if (status >= 200 && status < 300) return 'Success';
  if (status >= 300 && status < 400) return 'Redirection';
  if (status >= 400 && status < 500) return 'Client Error';
  if (status >= 500 && status < 600) return 'Server Error';
  return 'Unknown Status';
};

export const ResponseViewer = ({ response, error }: ResponseViewerProps) => {
  const [activeTab, setActiveTab] = useState<'headers' | 'body'>('headers');
  const formattedData =
    typeof response?.data === 'string' ? response.data : JSON.stringify(response?.data, null, 2);

  return (
    <div className="mt-4 border rounded-lg overflow-hidden bg-gray-900">
      {response && !error && (
        <div className="bg-gray-800 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Status:</span>
            <span className={`${getStatusColor(response.status)} font-semibold`}>
              {response.status} {getStatusMessage(response.status)}
            </span>
            {response.statusText && <span className="text-gray-400">• {response.statusText}</span>}
          </div>
        </div>
      )}

      {error ? (
        // TODO: ADD TOAST INSTEAD ?
        <div className="p-4 bg-red-900 text-red-200 flex items-center gap-2">
          <div>
            <div className="font-bold">Request Failed</div>
            <div className="text-sm">{error.message}</div>
          </div>
        </div>
      ) : (
        response && (
          <>
            <div className="bg-gray-800 px-4 border-t border-gray-700">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('body')}
                  className={`px-4 py-2 rounded-t-lg transition-colors ${
                    activeTab === 'body'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  Body
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('headers')}
                  className={`px-4 py-2 rounded-t-lg transition-colors ${
                    activeTab === 'headers'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  Headers
                </button>
              </div>
            </div>

            <div>
              {activeTab === 'headers' ? (
                <div className="p-4 h-full overflow-auto">
                  <pre className="text-sm text-gray-400">
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
            </div>
          </>
        )
      )}
    </div>
  );
};
