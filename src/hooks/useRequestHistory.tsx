import { useCallback } from 'react';

import { RequestData } from '@/shared/types/interfaces';

const LOCAL_STORAGE_HISTORY = 'rest-client-history';

export const useRequestHistory = () => {
  const saveRequest = (request: Omit<RequestData, 'timestamp'>) => {
    const historyJson = localStorage.getItem(LOCAL_STORAGE_HISTORY);
    const data: RequestData[] = historyJson ? JSON.parse(historyJson) : [];
    const newData: RequestData[] = [...data, { ...request, timestamp: Date.now() }];
    localStorage.setItem(LOCAL_STORAGE_HISTORY, JSON.stringify(newData));
  };

  const loadRequests = useCallback(() => {
    // TO DO: validate data
    const historyJson = localStorage.getItem(LOCAL_STORAGE_HISTORY);
    const data: RequestData[] = historyJson ? JSON.parse(historyJson) : [];
    return data;
  }, []);

  return { saveRequest, loadRequests };
};
