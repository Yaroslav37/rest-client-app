import React, { useCallback, useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6';

import { DateGroup, RequestData } from '@/shared/types/interfaces';

import RequestItem from '../HistoryRequestIem/RequestItem';

interface RequestGroupProps {
  group: DateGroup;
  groupIndex: number;
}

const RequestGroup: React.FC<RequestGroupProps> = ({ group }) => {
  const [isExpanded, setIsExpanded] = useState(group.isExpanded);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div className="border-b border-gray-800">
      <button
        onClick={toggleExpand}
        className="w-full flex items-center px-4 py-2 hover:bg-dark-grey transition-colors text-left"
      >
        {isExpanded ? (
          <FaChevronDown className="h-4 w-4 mr-2 text-gray-400" />
        ) : (
          <FaChevronRight className="h-4 w-4 mr-2 text-gray-400" />
        )}
        <span>{group.date}</span>
      </button>
      {isExpanded && (
        <div className="pl-10">
          {group.requests.map((request: RequestData) => (
            <RequestItem key={request.timestamp} request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestGroup;
