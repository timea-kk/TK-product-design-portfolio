/**
 * stores/theme.ts – Pinia store for the active theme.
 *
 * Replaces ThemeContext.jsx. Holds the current theme id (e.g. 'bauhaus', 'terminal').
 * On change it removes all theme-* classes from <html>, adds the new one, and persists
 * the choice to localStorage so it survives page refresh.
 *
 * The inline script in index.html applies the saved theme class before Vue loads,
 * preventing a flash of the wrong theme on first paint.
 */

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'portfolio-theme'

/** All available theme ids; must match the class names in themes/index.css (theme-<id>). */
export const THEMES = [
  'default',
  'bauhaus',
  'terminal',
  'neo-brutalism',
  'sketch',
  'retro',
  'material',
] as const

export type Theme = (typeof THEMES)[number]

/** Read saved theme from localStorage, fall back to 'default'. */
function loadTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return (THEMES as readonly string[]).includes(stored ?? '') ? (stored as Theme) : 'default'
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(loadTheme())

  // Whenever theme changes: swap the theme-* class on <html> and persist
  watch(
    theme,
    (id) => {
      const root = document.documentElement
      THEMES.forEach((t) => root.classList.remove(`theme-${t}`))
      root.classList.add(`theme-${id}`)
      window.localStorage.setItem(STORAGE_KEY, id)
    },
    { immediate: true }, // run immediately so the class is set before first render
  )

  /** Switch to a new theme. Ignored if id is not in THEMES. */
  function setTheme(id: string) {
    if ((THEMES as readonly string[]).includes(id)) {
      theme.value = id as Theme
    }
  }

  return { theme, themes: THEMES, setTheme }
})
