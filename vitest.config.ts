import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config';

export default defineConfig({
    base: '/',
  plugins: [tsconfigPaths(), react()],
    test: {
      coverage: {
      provider: 'v8',
      },
      environment: 'jsdom',
      include: ['**/*.test.tsx'],
      exclude: ['**/node_modules/**', 'src/App.tsx', '**/*.ts'],
      globals: true,
      restoreMocks: true,
      setupFiles: '/src/tests/setup.ts',
    },
  })