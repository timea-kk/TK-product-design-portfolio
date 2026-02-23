/**
 * stores/a11y.ts – Pinia store for accessibility preferences.
 *
 * Replaces A11yContext.jsx. Holds reduce-motion, high-contrast, text scale, and dyslexia
 * settings. Persists to localStorage under 'portfolio-a11y'. On each change it applies
 * CSS variables and utility classes to <html> so index.css and themes/index.css can react.
 *
 * CSS side effects:
 *   --a11y-text-scale  → used by index.css to scale font-size on <html>
 *   --a11y-motion      → 0 = no motion, 1 = motion allowed
 *   --a11y-contrast    → 1 = high contrast mode on
 *   .reduced-motion-none   → disables CSS transitions/animations
 *   .a11y-high-contrast    → stronger borders / focus ring
 *   .a11y-dyslexia         → OpenDyslexic font + wider spacing
 */

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'portfolio-a11y'

export interface A11yState {
  reduceMotion: boolean
  highContrast: boolean
  textScale: number
  dyslexia: boolean
}

const defaults: A11yState = {
  reduceMotion: false,
  highContrast: false,
  textScale: 1,
  dyslexia: false,
}

/** Load saved preferences from localStorage; return defaults if missing or malformed. */
function load(): A11yState {
  try {
    const s = window.localStorage.getItem(STORAGE_KEY)
    if (!s) return { ...defaults }
    const o = JSON.parse(s) as Partial<A11yState>
    return {
      reduceMotion: !!o.reduceMotion,
      highContrast: !!o.highContrast,
      textScale:
        typeof o.textScale === 'number' ? Math.max(0.9, Math.min(1.3, o.textScale)) : 1,
      dyslexia: !!o.dyslexia,
    }
  } catch {
    return { ...defaults }
  }
}

export const useA11yStore = defineStore('a11y', () => {
  const loaded = load()
  const reduceMotion = ref(loaded.reduceMotion)
  const highContrast = ref(loaded.highContrast)
  const textScale = ref(loaded.textScale)
  const dyslexia = ref(loaded.dyslexia)

  /** Apply all CSS side effects and persist to localStorage. Called whenever any pref changes. */
  function applyAndPersist() {
    const root = document.documentElement
    root.style.setProperty('--a11y-text-scale', String(textScale.value))
    root.style.setProperty('--a11y-motion', reduceMotion.value ? '0' : '1')
    root.style.setProperty('--a11y-contrast', highContrast.value ? '1' : '0')
    root.classList.toggle('reduced-motion-none', reduceMotion.value)
    root.classList.toggle('a11y-high-contrast', highContrast.value)
    root.classList.toggle('a11y-dyslexia', dyslexia.value)
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          reduceMotion: reduceMotion.value,
          highContrast: highContrast.value,
          textScale: textScale.value,
          dyslexia: dyslexia.value,
        }),
      )
    } catch {
      // localStorage unavailable (private browsing, storage full) — preferences won't persist
    }
  }

  // Watch all prefs together; immediate: true applies them before the first render
  watch([reduceMotion, highContrast, textScale, dyslexia], applyAndPersist, { immediate: true })

  /** Update one or more preferences at once. Example: update({ reduceMotion: true }) */
  function update(patch: Partial<A11yState>) {
    if (patch.reduceMotion !== undefined) reduceMotion.value = patch.reduceMotion
    if (patch.highContrast !== undefined) highContrast.value = patch.highContrast
    if (patch.textScale !== undefined) textScale.value = patch.textScale
    if (patch.dyslexia !== undefined) dyslexia.value = patch.dyslexia
  }

  return { reduceMotion, highContrast, textScale, dyslexia, update }
})
