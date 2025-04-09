import Link from 'next/link';
import React from 'react';

import { RequestData } from '@/shared/types/interfaces';

interface RequestItemProps {
  request: RequestData;
}

const RequestItem: React.FC<RequestItemProps> = ({ request }) => (
  <Link
    href={request.redirect_url}
    className="flex items-center py-2 px-4 hover:bg-gray-800 transition-colors gap-2"
  >
    <div className="text-xs text-gray-500">{new Date(request.timestamp).toLocaleTimeString()}</div>
    <span>{request.method}</span>
    <div className="overflow-hidden">
      <div className="truncate text-gray-300">{request.api_url}</div>
    </div>
  </Link>
);

export default RequestItem;
