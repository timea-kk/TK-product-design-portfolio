/**
 * main.ts – Application entry point.
 * Creates the Vue app, installs Pinia (global state management) and vue-router, and mounts into #root.
 * index.css is imported here so Tailwind and font-face declarations load for every page.
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)

// Pinia replaces React context — stores are available throughout the app without providers
app.use(createPinia())
app.use(router)

app.mount('#root')
