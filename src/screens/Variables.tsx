import { useTranslations } from 'next-intl';

import { VariablesEditor } from '@/components';

const Variables = () => {
  const t = useTranslations('Variables');

  return (
    <div className="mt-5 p-4">
      <p className="m-5 text-white text-sm mds:text-xl">{t('info')}</p>
      <p className="m-5 text-white text-sm mds:text-xl">
        {t('info-add')}
        <span className="font-mono bg-gray-700 px-1 rounded">
          {'{{'}variableName{'}}'}
        </span>
      </p>
      <VariablesEditor />
    </div>
  );
};

export default Variables;
