/**
 * vitest.config.ts – Test runner configuration.
 * Uses jsdom to simulate a browser environment (needed for DOM-touching stores and components).
 * globals: true means describe/it/expect are available without importing them.
 * The @ alias must match vite.config.ts so test imports resolve correctly.
 */

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,vue}'],
      exclude: ['src/main.ts', 'src/data/**'],
      // Fail the CI run (and pre-commit hook) if coverage drops below these levels.
      thresholds: {
        lines: 95,
        functions: 75,
        branches: 85,
        statements: 95,
      },
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
