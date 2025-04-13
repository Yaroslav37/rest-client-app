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
  SiVite,
  SiVitest,
} from 'react-icons/si';

import { TeamList } from '@/components/ui/TeamList/TeamList';

const icons = [
  SiReact,
  SiNextdotjs,
  SiVite,
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
    <div className="flex flex-col p-10">
      <p className="mb-15 text-light-grey text-sm mds:text-xl">{t('description')}</p>
      <h2 className="text-xl font-bold text-light-green mb-6">Technology Stack</h2>
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
        <p className="mb-6 text-light-grey text-sm mds:text-xl">
          The Rest Client App is a trainee project for RS School. The RS School React course offers
          free, high-quality training for developers with strong JavaScript/TypeScript and frontend
          skills. The program is open to all regardless of age or location, with all materials
          available on YouTube and GitHub. Through practical assignments and projects, participants
          gain real-world React development experience. The course focuses on modern React concepts
          while emphasizing hands-on learning. With its rigorous standards and free access, it
          provides excellent career advancement opportunities.
        </p>
      </div>
    </div>
  );
};
