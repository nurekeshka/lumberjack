import { defineConfig } from 'vitest/config';

export default defineConfig({
  appType: 'custom',
  test: {
    name: 'core',
    globals: true,
    environment: 'node',
    include: ['./**/*.spec.ts'],
    exclude: ['./node_modules/**', './dist/**'],
  },
});
