import { DateGroup, RequestData } from '@/shared/types/interfaces';

export const formatDateGroup = (timestamp: number, locale: string = 'en-US'): string => {
  const now = new Date();
  const date = new Date(timestamp);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date >= today) {
    return 'Today';
  } else if (date >= yesterday) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString(locale, { month: 'long', day: 'numeric' });
  }
};

export const groupRequestsByDate = (
  requests: RequestData[],
  locale: string = 'en-US',
): DateGroup[] => {
  const groups: Record<string, RequestData[]> = {};

  requests.forEach((request) => {
    const dateGroup = formatDateGroup(request.timestamp, locale);
    if (!groups[dateGroup]) {
      groups[dateGroup] = [];
    }
    groups[dateGroup].push(request);
  });

  return Object.entries(groups).map(([date, requests]) => ({
    date,
    requests,
    isExpanded: date === 'Today',
  }));
};
