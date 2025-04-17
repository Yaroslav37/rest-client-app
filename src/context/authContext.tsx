'use client';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';

import { auth } from '@/lib/firebase/config';
import { ROUTES } from '@/shared/routes';
export interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthUserProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthUserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const token = await user.getIdToken();
        Cookies.set('firebase-token', token, { expires: 7 });
      } else {
        Cookies.remove('firebase-token');
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        Cookies.set('firebase-token', token, { expires: 7 });
        resolve();
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          let returnAuth = '';
          switch (error.code) {
            case 'auth/email-already-exists':
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
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        Cookies.set('firebase-token', token, { expires: 7 });
        resolve();
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          let returnAuth = '';
          switch (error.code) {
            case 'auth/invalid-credential':
              returnAuth = 'Invalid credentials';
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
    try {
      Cookies.remove('firebase-token', { path: '/' });
      await signOut(auth);
      window.location.href = ROUTES.MAIN;
    } catch (error) {
      toast.error('Logout error');
    }
  };

  const value = {
    signup,
    signin,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}
