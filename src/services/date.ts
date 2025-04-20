import { DateGroup, RequestData } from '@/shared/types/interfaces';

const dateLabels: Record<string, { today: string; yesterday: string }> = {
  en: { today: 'Today', yesterday: 'Yesterday' },
  de: { today: 'Heute', yesterday: 'Gestern' },
};

export const formatDateGroup = (timestamp: number, locale: string = 'en'): string => {
  const now = new Date();
  const date = new Date(timestamp);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date >= today) {
    return dateLabels[locale].today;
  } else if (date >= yesterday) {
    return dateLabels[locale].yesterday;
  } else {
    return date.toLocaleDateString(locale, { month: 'long', day: 'numeric' });
  }
};

export const groupRequestsByDate = (
  requests: RequestData[],
  locale: string = 'en',
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
    isExpanded: date === dateLabels[locale].today,
  }));
};
