import { useContext } from 'react';

import { AuthContext } from '@/context/authContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider with a value that's not undefined",
    );
  }
  return context;
}
