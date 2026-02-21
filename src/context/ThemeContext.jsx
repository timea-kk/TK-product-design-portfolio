/**
 * ThemeContext
 * -----------
 * Holds the current theme id (e.g. 'bauhaus', 'terminal'). Persists to localStorage and applies
 * a class on <html> (e.g. theme-bauhaus). Theme CSS in src/themes/index.css defines --color-*
 * and --font-* for each theme class, so the whole app updates when theme changes.
 */

import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-theme';
/** All available theme ids; must match the class names in themes/index.css (theme-<id>). */
const THEMES = ['bauhaus', 'terminal', 'neo-brutalism', 'sketch', 'retro', 'material'];

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'bauhaus';
    return window.localStorage.getItem(STORAGE_KEY) || 'bauhaus';
  });

  /** When theme changes: remove all theme classes from <html>, add the current one, and persist. */
  useEffect(() => {
    const id = THEMES.includes(theme) ? theme : 'bauhaus';
    document.documentElement.classList.remove(...THEMES.map((t) => `theme-${t}`));
    document.documentElement.classList.add(`theme-${id}`);
    window.localStorage.setItem(STORAGE_KEY, id);
  }, [theme]);

  /** Only updates if id is one of THEMES. Called by ThemeSwitcher when user picks a theme. */
  const setTheme = (id) => {
    if (THEMES.includes(id)) setThemeState(id);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
