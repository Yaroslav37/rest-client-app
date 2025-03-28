'use client';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';

import { auth } from '@/lib/firebase/config';

interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthUserProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthUserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        resolve();
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          let returnAuth = '';
          switch (error.code) {
            case 'auth/email-already-in-use':
              returnAuth = 'Email is already in use';
              break;
            default:
              returnAuth = error.message;
          }
          reject(returnAuth);
        } else {
          reject('An unknown error occurred');
        }
      }
    });
  };

  const signin = async (email: string, password: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        resolve();
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          let returnAuth = '';
          switch (error.code) {
            case 'auth/user-not-found':
              returnAuth = 'User not found';
              break;
            case 'auth/invalid-credential':
              returnAuth = 'Invalid credential';
              break;
            case 'auth/wrong-password':
              returnAuth = 'Wrong password';
              break;
            case 'auth/invalid-email':
              returnAuth = 'Invalid email';
              break;
            default:
              returnAuth = 'Unexpected error';
          }
          reject(returnAuth);
        } else {
          reject('Unexpected error');
        }
      }
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    signup,
    signin,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider with a value that's not undefined",
    );
  }
  return context;
}
