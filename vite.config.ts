/**
 * vite.config.ts – Vite build and dev server configuration.
 * Uses the Vue plugin for SFCs and fast refresh. The @ alias maps to src/ so
 * imports like @/components/Header.vue work everywhere without relative paths.
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    // @ = src/; lets you write @/stores/theme instead of ../../stores/theme
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    port: 5175,
    strictPort: true, // fail if port is taken so you don't silently get a different port
  },
})
