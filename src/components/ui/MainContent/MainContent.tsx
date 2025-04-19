import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  SiEslint,
  SiFirebase,
  SiNextdotjs,
  SiPrettier,
  SiPyup,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVitest,
} from 'react-icons/si';

import { TeamList } from '@/components/ui/TeamList/TeamList';

const icons = [
  SiReact,
  SiNextdotjs,
  SiVitest,
  SiTypescript,
  SiEslint,
  SiPrettier,
  SiFirebase,
  SiPyup,
  SiTailwindcss,
];

export const MainContent = () => {
  const t = useTranslations('MainContent');
  return (
    <div className="flex flex-col p-3 xs:p-10">
      <p className="mb-15 text-light-grey text-sm mds:text-xl">{t('description')}</p>
      <h2 className="text-xl font-bold text-light-green mb-6">{t('stack')}</h2>
      <div className="flex flex-wrap gap-5">
        {icons.map((Icon, index) => (
          <Icon
            key={index}
            className="w-8 h-8 text-light-green transition-transform duration-300 hover:scale-110"
          />
        ))}
      </div>
      <TeamList />
      <div className="flex flex-col gap-2 xs:flex-row items-start">
        <Image src="/rss-logo.svg" width={100} height={100} alt="RS School logo" />
        <p className="mb-6 text-light-grey text-sm mds:text-xl">{t('project')}</p>
      </div>
    </div>
  );
};
