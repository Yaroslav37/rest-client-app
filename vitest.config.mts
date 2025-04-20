import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    include: ['**/*.test.tsx'],
    exclude: ['**/node_modules/**', 'src/App.tsx', '**/*.ts'],
    globals: true,
    restoreMocks: true,
    setupFiles: './src/tests/setup.ts',
    server: {
      deps: {
        inline: ['next'],
      },
    },
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['src/**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/__tests__/**',
        '**/*.d.ts',
        'src/context/authContext.tsx',
        'src/hooks/useVariablesForm.tsx',
        'src/hooks/useAuth.tsx',
        'src/app/loading.tsx',
        'src/components/ui/Logo/Logo.tsx',
        '**/*.config.ts',
        'src/main.tsx',
        '**/*.ts',
      ],
    },
  },
});
