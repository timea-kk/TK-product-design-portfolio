# Timea Konya — Portfolio

Personal portfolio site for Timea Konya, Senior Product Designer based in Berlin.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API + `<script setup>`) |
| Language | TypeScript (strict mode) |
| State management | Pinia |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Build tool | Vite 6 |
| Testing | Vitest + @vue/test-utils |
| Linting | ESLint 9 (flat config) + eslint-plugin-vue + typescript-eslint |
| Formatting | Prettier |

## Getting Started

```bash
npm install
npm run dev        # dev server at http://localhost:5175
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build locally
npm run typecheck    # TypeScript type checking (vue-tsc --noEmit)
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run lint         # Lint all source files
npm run format       # Format src/ with Prettier
```

## Project Structure

```
src/
  main.ts                  # App entry point; mounts Vue + Pinia
  App.vue                  # Root component; bootstraps stores
  env.d.ts                 # TypeScript declarations for .vue modules
  stores/
    theme.ts               # Active theme (Pinia store)
    a11y.ts                # Accessibility preferences (Pinia store)
  components/
    Header.vue             # Sticky navigation bar
    HomePage.vue           # Landing page (hero, projects, footer)
    ThemeSwitcher.vue      # Theme selection dropdown
    A11yPanel.vue          # Accessibility options dropdown
    RotatingDescriptor.vue # Typewriter effect in the hero headline
    TimeaAgent.vue         # Sticky chat widget (local knowledge base)
    Logo.vue               # Inline SVG logo (uses currentColor)
  data/
    timeaAgentKnowledge.ts # Chat agent Q&A entries + scoring function
  index.css                # Tailwind base + @font-face declarations
  themes/
    index.css              # Theme CSS variables and overrides
tests/
  setup.ts                 # Global test setup (jsdom mocks)
  unit/
    timeaAgentKnowledge.test.ts
    stores/
      theme.test.ts
      a11y.test.ts
  components/
    ThemeSwitcher.test.ts
    A11yPanel.test.ts
    RotatingDescriptor.test.ts
```

## Theming System

Themes are driven by CSS custom properties defined in `src/themes/index.css`.
Each theme is a class on `<html>` (e.g. `theme-default`, `theme-bauhaus`). The active class is
managed by `useThemeStore` and persisted to `localStorage` under `portfolio-theme`.

**Available themes:** Default, Bauhaus, Terminal, Neo-brutalism, Sketch, Retro, Material Design

To add a new theme:
1. Add the theme id to `THEMES` in `src/stores/theme.ts`
2. Add a `html.theme-<id> { ... }` block to `src/themes/index.css`
3. Add a display name and description to `LABELS`/`DESCRIPTIONS` in `src/components/ThemeSwitcher.vue`

## Accessibility System

Preferences are managed by `useA11yStore` and persisted to `localStorage` under `portfolio-a11y`.
On change the store toggles utility classes and CSS variables on `<html>`:

| Preference | Effect |
|---|---|
| Reduce motion | `.reduced-motion-none`, `--a11y-motion: 0` |
| High contrast | `.a11y-high-contrast`, `--a11y-contrast: 1` |
| Dyslexia-friendly | `.a11y-dyslexia` (OpenDyslexic font, wider spacing) |
| Text scale | `--a11y-text-scale: <value>` |

The dyslexia font (OpenDyslexic) is self-hosted in `public/fonts/` and declared in `src/index.css`.

## Chat Widget

`TimeaAgent.vue` is a local chat interface. Questions are scored against a knowledge base in
`src/data/timeaAgentKnowledge.ts` — no API calls, no backend needed. Edit `KNOWLEDGE` in that
file to add or update Q&A entries.
