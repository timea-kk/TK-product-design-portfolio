/**
 * tailwind.config.js – Tailwind CSS configuration.
 * content: where to scan for class names (so unused styles can be purged).
 * theme.extend: we use CSS variables for colors and fonts so themes (src/themes/index.css) can override
 * without changing this file. Optional keyframes/animations are available for future use.
 */

/** @type {import('tailwindcss').Config} */
export default {
  /** Files that may contain Tailwind class names; purge anything not found here in production. */
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      /** Optional utility animations; typewriter cursor uses custom CSS in index.css. */
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        blink: 'blink 1s step-end infinite',
      },
      /** Fonts read from CSS variables so ThemeContext can switch typeface per theme. */
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        heading: ['var(--font-heading)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      /** Semantic color names map to CSS variables; themes override in themes/index.css. */
      colors: {
        brand: 'var(--color-brand)',
        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
      },
    },
  },
  plugins: [],
}
