/**
 * vite.config.js – Vite build and dev server configuration.
 * Uses the React plugin for JSX and fast refresh. For GitHub Pages in a repo subpath (e.g. /Portfolio/),
 * set base: '/Portfolio/' so assets and routes resolve correctly.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // If you deploy to GitHub Pages at username.github.io/Portfolio/, uncomment: base: '/Portfolio/',
})
