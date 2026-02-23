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
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
