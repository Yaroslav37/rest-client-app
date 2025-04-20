import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Firebase Configuration', () => {
  const originalEnv = process.env;
  let firebaseAppMock: any;
  let firebaseAuthMock: any;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    firebaseAppMock = {
      getApps: vi.fn(() => []),
      getApp: vi.fn(),
      initializeApp: vi.fn(),
    };

    firebaseAuthMock = {
      getAuth: vi.fn(),
    };

    vi.doMock('firebase/app', () => firebaseAppMock);
    vi.doMock('firebase/auth', () => firebaseAuthMock);

    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_FIREBASE_API_KEY: 'test-api-key',
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'test.firebaseapp.com',
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'test-project',
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'test-bucket',
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: 'test-sender-id',
      NEXT_PUBLIC_FIREBASE_APP_ID: 'test-app-id',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('should throw error when required environment variables are missing', () => {
    process.env = { NODE_ENV: 'test' };
    expect(() => require('../../lib/firebase/config')).toThrow();
  });
});
