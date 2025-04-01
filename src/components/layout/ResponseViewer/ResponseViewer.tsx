'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { ResponseTabs } from '@/components/ui/ReponseTabs/ResponseTabs';
import { ResponseContent } from '@/components/ui/ResponseContent/ResponseContent';
import { useStatusInfo } from '@/hooks/useStatusInfo';
import { cn } from '@/utils/tailwind-clsx';

interface ResponseViewerProps {
  response?: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    data: unknown;
  };
  error?: Error | null;
}

export const ResponseViewer = ({ response, error }: ResponseViewerProps) => {
  const [activeTab, setActiveTab] = useState<'headers' | 'body'>('body');
  const t = useTranslations('RestClient');
  const { getStatusColor, getStatusMessage } = useStatusInfo();

  const status = response?.status;
  const statusText = response?.statusText;

  return (
    <div className="border rounded-lg overflow-hidden">
      <span className={cn('text-light-green mb-1.5 hidden', response && 'flex')}>
        {t('response-title')}
      </span>
      {status !== undefined && (
        <div className="flex justify-between items-center bg-dark-green p-4">
          <div className="flex items-center gap-4">
            <span className="text-white">{t('status')}:</span>
            <span className={`${getStatusColor(status)} font-bold`}>
              {status} {getStatusMessage(status)}
            </span>
            {statusText && <span className="text-white">• {statusText}</span>}
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
      ) : response ? (
        <>
          <div className="bg-dark py-2 px-4 border-t  border-grey">
            <ResponseTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <ResponseContent response={response} activeTab={activeTab} />
        </>
      ) : null}
    </div>
  );
};
