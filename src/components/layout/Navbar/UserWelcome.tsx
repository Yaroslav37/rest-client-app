import Link from 'next/link';
import React from 'react';

import { ROUTES } from '@/shared/routes';

export default function UserWelcome({ email }: { email: string }) {
  return (
    <div className="flex flex-col h-screen justify-center items-center w-full">
      <h1 className="flex flex-row text-responsive text-white font-bold mb-12 whitespace-pre">
        Welcome, <span className="text-[#FFCC54]">{email}</span>!
      </h1>

      <div className="flex flex-col items-center  gap-5">
        <Link
          href={ROUTES.REST}
          className="flex flex-col items-center justify-center bg-[#29E881] rounded-full px-10 py-3 hover:text-white"
        >
          <span className="text-responsive">REST Client</span>
        </Link>
        <Link
          href={ROUTES.HISTORY}
          className="flex flex-col items-center justify-center  bg-[#73CCFE] rounded-full px-10 py-3 w-full hover:text-white"
        >
          <span className="text-responsive">History</span>
        </Link>
        <Link
          href={ROUTES.VARIABLES}
          className="flex flex-col items-center justify-center  bg-[#FF87FC] rounded-full px-10 py-3 w-full hover:text-white"
        >
          <span className="text-responsive">Variables</span>
        </Link>
      </div>
    </div>
  );
}
