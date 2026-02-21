/**
 * Header
 * ------
 * Sticky top bar with: logo (links to home), main nav (Home for now), theme switcher, and accessibility panel trigger.
 * Logo is the inline SVG component (see Logo.jsx); theme and a11y state come from context.
 */

import { useState } from 'react';
import { Accessibility } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { A11yPanel } from './A11yPanel';
import { Logo } from './Logo';

export function Header() {
  /** Whether the accessibility options panel is open. Toggled by the a11y button. */
  const [a11yOpen, setA11yOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      role="banner"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo links to home; aria-label for screen readers since logo has no visible text */}
        <a href="/" className="flex items-center gap-2 focus-visible:rounded" aria-label="Timea Konya – Home">
          <Logo className="h-8 w-auto" />
        </a>

        <nav className="flex items-center gap-2" aria-label="Main">
          <a
            href="/"
            className="rounded px-3 py-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-brand)] focus-visible:outline-offset-2"
          >
            Home
          </a>

          <ThemeSwitcher theme={theme} setTheme={setTheme} themes={themes} />
          {/* Opens the accessibility panel (reduce motion, high contrast, text size). aria-expanded reflects open state. */}
          <button
            type="button"
            onClick={() => setA11yOpen((o) => !o)}
            className="rounded p-2 text-[var(--color-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-brand)] focus-visible:outline-offset-2"
            aria-label="Accessibility options"
            aria-expanded={a11yOpen}
            aria-haspopup="dialog"
          >
            <Accessibility aria-hidden className="h-5 w-5" strokeWidth={2} />
          </button>
        </nav>
      </div>

      {a11yOpen && (
        <A11yPanel onClose={() => setA11yOpen(false)} />
      )}
    </header>
  );
}
