'use client';

import { useTranslations } from 'next-intl';

export const useStatusInfo = () => {
  const t = useTranslations('RestClient');

  const getStatusColor = (status: number) => {
    if (status >= 100 && status < 200) return 'text-gray-600';
    if (status >= 200 && status < 300) return 'text-light-green';
    if (status >= 300 && status < 400) return 'text-blue-600';
    return 'text-red-600';
  };

  const getStatusMessage = (status: number) => {
    if (status >= 100 && status < 200) return t('informational');
    if (status >= 200 && status < 300) return t('success');
    if (status >= 300 && status < 400) return t('redirection');
    if (status >= 400 && status < 500) return t('clientError');
    if (status >= 500 && status < 600) return t('serverError');
    return t('unknown');
  };

  return { getStatusColor, getStatusMessage };
};
