import { describe, it, expect, vi } from 'vitest';
import { formatDateGroup, groupRequestsByDate } from '@/services/date';
import { RequestData } from '@/shared/types/interfaces';
import { HttpMethod } from '@/shared/types/enums';

describe('date formatting utilities', () => {
  const mockDate = new Date(2023, 5, 15);
  const mockToday = new Date(2023, 5, 15);
  const mockYesterday = new Date(2023, 5, 14);
  const mockOlder = new Date(2023, 5, 10);

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('formatDateGroup', () => {
    it('should return "Today" for current date (English)', () => {
      const result = formatDateGroup(mockToday.getTime(), 'en');
      expect(result).toBe('Today');
    });

    it('should return "Heute" for current date (German)', () => {
      const result = formatDateGroup(mockToday.getTime(), 'de');
      expect(result).toBe('Heute');
    });

    it('should return "Yesterday" for previous day (English)', () => {
      const result = formatDateGroup(mockYesterday.getTime(), 'en');
      expect(result).toBe('Yesterday');
    });

    it('should return "Gestern" for previous day (German)', () => {
      const result = formatDateGroup(mockYesterday.getTime(), 'de');
      expect(result).toBe('Gestern');
    });

    it('should return formatted date for older dates (English)', () => {
      const result = formatDateGroup(mockOlder.getTime(), 'en');
      expect(result).toBe('June 10');
    });

    it('should return formatted date for older dates (German)', () => {
      const result = formatDateGroup(mockOlder.getTime(), 'de');
      expect(result).toBe('10. Juni');
    });
  });

  describe('groupRequestsByDate', () => {
    const mockRequests: RequestData[] = [
      {
        timestamp: mockToday.getTime(),
        api_url: 'https://api.example.com/today',
        redirect_url: '',
        method: HttpMethod.GET,
      },
      {
        timestamp: mockYesterday.getTime(),
        api_url: 'https://api.example.com/yesterday',
        redirect_url: '',
        method: HttpMethod.POST,
      },
      {
        timestamp: mockOlder.getTime(),
        api_url: 'https://api.example.com/older',
        redirect_url: '',
        method: HttpMethod.PUT,
      },
      {
        timestamp: mockToday.getTime(),
        api_url: 'https://api.example.com/today2',
        redirect_url: '',
        method: HttpMethod.DELETE,
      },
    ];

    it('should group requests by date (English)', () => {
      const result = groupRequestsByDate(mockRequests, 'en');

      expect(result).toHaveLength(3);

      const todayGroup = result.find((g: { date: string }) => g.date === 'Today');
      expect(todayGroup).toBeDefined();
      expect(todayGroup?.requests).toHaveLength(2);
      expect(todayGroup?.isExpanded).toBe(true);

      const yesterdayGroup = result.find((g: { date: string }) => g.date === 'Yesterday');
      expect(yesterdayGroup).toBeDefined();
      expect(yesterdayGroup?.requests).toHaveLength(1);
      expect(yesterdayGroup?.isExpanded).toBe(false);

      const olderGroup = result.find((g: { date: string }) => g.date === 'June 10');
      expect(olderGroup).toBeDefined();
      expect(olderGroup?.requests).toHaveLength(1);
      expect(olderGroup?.isExpanded).toBe(false);
    });

    it('should group requests by date (German)', () => {
      const result = groupRequestsByDate(mockRequests, 'de');

      expect(result).toHaveLength(3);

      const todayGroup = result.find((g: { date: string }) => g.date === 'Heute');
      expect(todayGroup).toBeDefined();
      expect(todayGroup?.requests).toHaveLength(2);
      expect(todayGroup?.isExpanded).toBe(true);

      const yesterdayGroup = result.find((g: { date: string }) => g.date === 'Gestern');
      expect(yesterdayGroup).toBeDefined();
      expect(yesterdayGroup?.requests).toHaveLength(1);
      expect(yesterdayGroup?.isExpanded).toBe(false);

      const olderGroup = result.find((g: { date: string }) => g.date === '10. Juni');
      expect(olderGroup).toBeDefined();
      expect(olderGroup?.requests).toHaveLength(1);
      expect(olderGroup?.isExpanded).toBe(false);
    });

    it('should return empty array for empty input', () => {
      const result = groupRequestsByDate([], 'en');
      expect(result).toEqual([]);
    });
  });
});
