import { TeamCard } from '@/components/ui/TeamCard/TeamCard';

export const TeamList = () => {
  const teamMembers = [
    {
      name: 'Yaraslau Minenkou',
      position: 'Team Lead',
      contributions: [
        'Set up CI/CD pipeline',
        'Set up Firebase',
        'Implemented authentication',
        'Created request history feature',
        'Optimized performance',
      ],
    },
    {
      name: 'Veranika Liauchuk',
      position: 'Frontend Developer',
      contributions: [
        'Implemented Header',
        'Configured i18n',
        'Implemented REST client page',
        'Built API endpoints',
        'Fixed critical bugs',
      ],
    },
    {
      name: 'Elena Ivanova',
      position: 'Frontend Developer',
      contributions: [
        "Set up project's environment",
        'Implemented Code Generation',
        'Developed variables management',
        'Implemented Footer',
        'Created documentation',
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-white mt-10 mb-6">Development Team</h2>
      <div className="flex flex-wrap justify-center min-[1044px]:justify-between items-center gap-5 mb-15">
        {teamMembers.map((member, index) => (
          <div key={index} className="transition-transform hover:scale-105">
            <TeamCard
              name={member.name}
              position={member.position}
              contributions={member.contributions}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
