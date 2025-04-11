'use client';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { Container } from '@/components/layout/Container/Container';
import RequestGroup from '@/components/ui/HistoryRequestGroup/RequestGroup';
import { useRequestHistory } from '@/hooks/useRequestHistory';
import { groupRequestsByDate } from '@/services/date';
import { ROUTES } from '@/shared/routes';
import { DateGroup } from '@/shared/types/interfaces';

const History = () => {
  const { loadRequests } = useRequestHistory();
  const [dateGroups, setDateGroups] = useState<DateGroup[]>([]);
  const locale = useLocale();
  const t = useTranslations('History');

  useEffect(() => {
    const requests = loadRequests().sort((a, b) => b.timestamp - a.timestamp);
    setDateGroups(groupRequestsByDate(requests, locale));
  }, [loadRequests, locale]);

  if (dateGroups.length === 0) {
    return (
      <Container className="py-12">
        <div className="text-white text-center">
          <span className="text-responsive-auth">{t('no-requests')}</span>
          <br />
          <Link href={ROUTES.REST} className="inline-flex flex-col items-center justify-center">
            <span className="text-responsive-auth text-[#D0BFAF] hover:bg-green-400 hover:text-black">
              {t('rest-link')}
            </span>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <h1 className="text-xl font-bold text-light-green mb-6">{t('history-title')}</h1>
      <div className="text-gray-300 overflow-hidden p-2 border rounded border-green transition-colors">
        {dateGroups.map((group, index) => (
          <RequestGroup key={group.date} group={group} groupIndex={index} />
        ))}
      </div>
    </Container>
  );
};

export default History;
