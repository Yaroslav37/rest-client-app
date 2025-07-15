'use client';

import Image from 'next/image';

const GITHUB_ICON = {
  src: '/github_icon.svg',
  width: 16,
  height: 16,
  className: 'h-4 w-4',
};

const TEAM_LINKS = [
  {
    name: 'Yaraslau Minenkou',
    href: 'https://github.com/Yaroslav37',
    icon: GITHUB_ICON,
  },
  {
    name: 'Veranika Liauchuk',
    href: 'https://github.com/adAstra97',
    icon: GITHUB_ICON,
  },
  {
    name: 'Elena Ivanova',
    href: 'https://github.com/Elena-lucky',
    icon: GITHUB_ICON,
  },
];

const RSS_ICON = {
  src: '/rss-logo.svg',
  width: 32,
  height: 32,
  className: 'h-8 w-8',
};

export default function Footer() {
  return (
    <footer className="flex flex-wrap flex-col items-center justify-center pb-10 gap-2 border-t border-light-green bg-dark-grey py-4 text-sm xs:gap-4 sm:flex-row sm:gap-16">
      <div className="flex flex-col gap-2 mds:gap-20 xs:flex-row">
        {TEAM_LINKS.map((member) => (
          <a
            key={member.href}
            href={member.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors text-white hover:text-light-green"
            aria-label={`${member.name} GitHub profile`}
          >
            <Image
              src={member.icon.src}
              alt=""
              width={member.icon.width}
              height={member.icon.height}
              className={member.icon.className}
              aria-hidden
            />
            {member.name}
          </a>
        ))}
      </div>

      <span className="text-light-green">2025</span>

      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="RS School React course"
        className="transition-opacity hover:opacity-80"
      >
        <Image
          src={RSS_ICON.src}
          alt="RS School logo"
          width={RSS_ICON.width}
          height={RSS_ICON.height}
          className={RSS_ICON.className}
        />
      </a>
    </footer>
  );
}
