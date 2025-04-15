import { useTranslations } from 'next-intl';

import { TeamCard } from '@/components/ui/TeamCard/TeamCard';

export const TeamList = () => {
  const t = useTranslations('Team');
  const teamMembers = [
    {
      id: 'yaraslau',
      position: 'teamLead',
      contributions: ['ciCd', 'firebase', 'auth', 'history', 'optimization'],
    },
    {
      id: 'veranika',
      position: 'frontend',
      contributions: ['header', 'i18n', 'restClient', 'api', 'bugs'],
    },
    {
      id: 'elena',
      position: 'frontend',
      contributions: ['environment', 'codegen', 'variables', 'footer', 'docs'],
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-white mt-10 mb-6">{t('devteam')}</h2>
      <div className="flex flex-wrap justify-center min-[1044px]:justify-between items-center gap-5 mb-15">
        {teamMembers.map((member, index) => (
          <div key={index} className="transition-transform will-change-transform hover:scale-105">
            <TeamCard
              name={t(`${member.id}.name`)}
              position={t(`positions.${member.position}`)}
              contributions={member.contributions.map((cont) =>
                t(`${member.id}.contributions.${cont}`),
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
