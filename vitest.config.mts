import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
   plugins: [tsconfigPaths(), react()],
    test: {
      coverage: {
      provider: 'v8',
      enabled: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/__tests__/**',
        '**/*.d.ts',
        '**/*.config.ts',
        'src/main.tsx'
      ],
      },
      environment: 'jsdom',
      include: ['**/*.test.tsx'],
      exclude: ['**/node_modules/**', 'src/App.tsx', '**/*.ts'],
      globals: true,
      restoreMocks: true,
      setupFiles: './src/tests/setup.ts',
      server: {
      deps: {
        inline: ['next']
      }
    }
    },
  })