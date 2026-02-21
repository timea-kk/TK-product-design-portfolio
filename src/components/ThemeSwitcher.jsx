/**
 * ThemeSwitcher
 * -------------
 * Dropdown button that shows the current theme name and, when opened, a list of all themes.
 * Selecting an option calls setTheme(id) from ThemeContext; the context then updates <html> class
 * and localStorage. Clicking outside the dropdown closes it (useRef + effect).
 */

import { useState, useRef, useEffect } from 'react';

/** Display names for each theme id (used in the button label and list options). */
const LABELS = {
  bauhaus: 'Bauhaus',
  terminal: 'Terminal',
  'neo-brutalism': 'Neo-brutalism',
  sketch: 'Sketch',
  retro: 'Retro',
  material: 'Material Design',
};

export function ThemeSwitcher({ theme, setTheme, themes }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  /** Close dropdown when user clicks outside the component. */
  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-brand)] focus-visible:outline-offset-2"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choose theme"
      >
        <span aria-hidden>◇</span> {LABELS[theme] ?? theme}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-10 mt-1 min-w-[10rem] rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] py-1 shadow-lg"
          aria-label="Theme options"
        >
          {themes.map((id) => (
            <li key={id} role="option" aria-selected={theme === id}>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-surface)] hover:text-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:text-[var(--color-brand)] focus:outline-none"
                onClick={() => {
                  setTheme(id);
                  setOpen(false);
                }}
              >
                {LABELS[id] ?? id}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
