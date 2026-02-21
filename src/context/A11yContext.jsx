/**
 * A11yContext
 * -----------
 * Holds accessibility preferences: reduce motion, high contrast, and text scale (90%–130%).
 * Persists to localStorage under key 'portfolio-a11y'. On load we apply these as CSS variables
 * and classes on <html> so the rest of the app can react (e.g. index.css uses .reduced-motion-none and .a11y-high-contrast).
 */

import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-a11y';

const defaults = {
  reduceMotion: false,
  highContrast: false,
  textScale: 1,
};

/** Reads saved preferences from localStorage; returns defaults if missing or invalid. */
function load() {
  try {
    const s = window.localStorage.getItem(STORAGE_KEY);
    if (!s) return defaults;
    const o = JSON.parse(s);
    return {
      reduceMotion: !!o.reduceMotion,
      highContrast: !!o.highContrast,
      textScale: typeof o.textScale === 'number' ? Math.max(0.9, Math.min(1.3, o.textScale)) : 1,
    };
  } catch {
    return defaults;
  }
}

/** Writes current state to localStorage so preferences survive refresh. */
function save(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
}

const A11yContext = createContext(null);

export function A11yProvider({ children }) {
  const [state, setState] = useState(defaults);

  /** On mount, load saved preferences (e.g. after refresh). */
  useEffect(() => {
    setState(load());
  }, []);

  /** Whenever state changes: set CSS variables on :root and toggle utility classes. index.css uses these. */
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement.style;
    root.setProperty('--a11y-text-scale', String(state.textScale));
    root.setProperty('--a11y-motion', state.reduceMotion ? '0' : '1');
    root.setProperty('--a11y-contrast', state.highContrast ? '1' : '0');
    document.documentElement.classList.toggle('reduced-motion-none', state.reduceMotion);
    document.documentElement.classList.toggle('a11y-high-contrast', state.highContrast);
    save(state);
  }, [state]);

  /** Call update({ reduceMotion: true }) etc. from A11yPanel to change preferences. */
  const update = (patch) => setState((prev) => ({ ...prev, ...patch }));

  return (
    <A11yContext.Provider value={{ ...state, update }}>
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error('useA11y must be used within A11yProvider');
  return ctx;
}
