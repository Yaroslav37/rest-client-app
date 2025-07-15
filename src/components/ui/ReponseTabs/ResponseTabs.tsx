import { useTranslations } from 'next-intl';
import React from 'react';

import { Tab } from '../Tab/Tab';

export const ResponseTabs = ({
  activeTab,
  onTabChange,
}: {
  activeTab: 'body' | 'headers';
  onTabChange: (tab: 'body' | 'headers') => void;
}) => {
  const t = useTranslations('RestClient');

  return (
    <div className="flex gap-2">
      <Tab value="body" activeTab={activeTab} onClick={onTabChange}>
        {t('response-tab-body')}
      </Tab>
      <Tab value="headers" activeTab={activeTab} onClick={onTabChange}>
        {t('response-tab-headers')}
      </Tab>
    </div>
  );
};
