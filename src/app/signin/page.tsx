'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useAuth } from '@/context/authContext';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin } = useAuth();
  const router = useRouter();

  const handleClick = async () => {
    await signin(email, password);
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center w-100 h-100">
      Sign in
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        className="mb-2 p-2 border border-gray-300 rounded bg-amber-200"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        className="mb-2 p-2 border border-gray-300 rounded bg-amber-200"
      />
      <button className="bg-amber-500 mb-2 p-2 border border-gray-500" onClick={handleClick}>
        Sign In
      </button>
    </div>
  );
}
