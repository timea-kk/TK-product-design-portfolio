# AppLayout

## component

- **name:** AppLayout
- **category:** Layout
- **description:** Shared outer shell rendered once at the app root. Owns the surface background, the fixed Header, the routed page content, and the sticky TimeaAgent chat widget.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/AppLayout.vue
- **created:** 2026-03-17
- **updated:** 2026-04-10

## usage

Rendered exactly once, in `src/App.vue`, above the router. Every page is a child of this shell through `<RouterView />`.

- Never import AppLayout inside a page. It is not a per-page wrapper.
- Per-page chrome (case study nav, footer, etc.) belongs inside the page itself, not in AppLayout.

## visual

- Full-height surface: `min-h-screen bg-[var(--color-surface-decorative)]`.
- No variants, no props. Visual identity comes entirely from the theme's `--color-surface-decorative` token.

## behavior

- Renders `Header` above `<main>` so navigation is always visible regardless of route.
- Renders `TimeaAgent` last so the chat widget stacks on top of page content via its own fixed positioning.
- `<RouterView />` is the only thing that changes between routes; AppLayout itself never re-renders on navigation.

## props

None.

**Emits:** none.

**Slots:** none. Page content comes through `<RouterView />`, not a slot.

## accessibility

- No interactive elements of its own; accessibility is delegated entirely to `Header` and `TimeaAgent`.
- Because Header and TimeaAgent are always mounted, their focus order and landmark roles are consistent across every route.

## aiHints

- Do not add page-specific markup here. If a new page needs unique global chrome, that is a sign the page needs its own layout component (see CaseStudyLayout), not a change to AppLayout.
- Do not wrap `<RouterView />` in anything that affects scroll position; case study pages manage their own internal scroll container.

## examples

Root mount, the only real usage:

```vue
<!-- src/App.vue -->
<AppLayout />
```

## composition

- **Header.vue:** fixed navigation bar, always visible.
- **TimeaAgent.vue:** sticky chat widget, always mounted.
- **RouterView:** swaps in the active page (HomePage, case study pages, DesignSystemPage, etc.).
