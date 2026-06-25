# CaseStudyNav

## component

- **name:** CaseStudyNav
- **category:** Navigation
- **description:** Sticky left-side section nav for case study pages and the DesignSystemPage. Handles scroll-spy (highlighting the active section), GSAP-animated hover/active indicators, optional group labels, and smooth-scroll-to-section on click.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/CaseStudyNav.vue
- **created:** 2026-04-03
- **updated:** 2026-04-25

## usage

- Pass `sections` (an ordered array of `{ id, label, group? }`) and `panel` (the scrollable container element the sections live inside — typically `CaseStudyLayout`'s exposed `panelRef`).
- Each `sections[].id` must match an element with that `id` actually present in the DOM inside `panel`, or scroll-spy and click-to-scroll will silently no-op.
- Use the optional `group` field to insert a group label above the first item of a new group — groups must be contiguous in the array (a group label renders whenever `group` differs from the previous item's `group`).

## visual

- Hidden below `lg` (`hidden lg:block`) — case study sections must remain reachable without this nav on mobile (e.g. via normal page scroll).
- Frosted glass panel: `backdrop-filter: blur(2px)` over `rgba(255,255,255,0.3)`.
- Two indicator bars on a shared track: a hover indicator (fades in/out, `--color-dusty-violet-300`) and an active indicator (always visible, `--color-brand-primary`), both animated with GSAP `to()`/`killTweensOf()`.

## behavior

- **Scroll-spy:** on every `scroll` event (passive listener on `panel`), the section whose top is above `panel.getBoundingClientRect().top + panel.clientHeight * 0.4` (the lowest such section) becomes `activeSection`.
- **Click-to-scroll:** clicking a nav item computes a target scroll offset (accounting for `LABEL_ABOVE_CARD` and `NAV_STICKY_TOP` constants) and calls `panel.scrollTo({ behavior: 'smooth' })`. A `navClickLock` suppresses scroll-spy-driven indicator updates for 800ms after a click, so the indicator doesn't visually flicker through intermediate sections during the smooth scroll.
- **Indicator positioning:** computed per-item from each nav button's measured position relative to the indicator track (`getIndicatorTop`), recalculated on hover and on active-section change.
- **Panel swap:** if the `panel` prop changes (e.g. becomes available after mount), the old scroll listener is removed and a new one attached; this is the mechanism that lets `CaseStudyLayout` pass `panelRef` in even though it starts as `null`.

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `sections` | `{ id: string; label: string; group?: string }[]` | — | Ordered list of section ids/labels, optionally grouped. |
| `panel` | `HTMLElement \| null` | — | The scrollable container the sections live in. |

**Emits:** none.

**Slots:** none.

## accessibility

- Rendered as `<nav aria-label="Page sections">` with section links as real `<button type="button">` elements, so they're keyboard-focusable and operable without a mouse.
- Active vs. inactive state is communicated via both font-weight and color, not color alone.
- The animated indicator bars are purely decorative positioning aids; they carry no semantic information of their own (the button's own styling already communicates active/inactive state).

## aiHints

- Never assume `panel` is non-null on mount. It frequently starts `null` and becomes available once the parent's template ref resolves — that's why every panel-dependent function has an early `if (!panel) return` guard (some marked `/* c8 ignore next */` since the null branch is only hit during the brief unmounted window).
- Don't change `updateActiveSection`'s 0.4 threshold without checking both `CaseStudyNav`'s own visual feel and `DesignSystemPage.vue`'s usage — it's tuned for case-study-length sections.
- If adding a new section to a page that uses this nav, the new entry's `id` must exist as a real DOM id inside `panel` — there is no runtime warning if it doesn't, the click/scroll-spy logic just silently skips it.
- Per the project's DOM-order rule: the `sections` array order must match the actual DOM order of the corresponding elements inside `panel`, or scroll-spy will report the wrong active section.

## examples

Used directly by DesignSystemPage.vue, and indirectly (via CaseStudyLayout) by every case study page:

```vue
<CaseStudyNav :sections="NAV_SECTIONS" :panel="panelRef" />
```

Grouped sections:

```js
const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview', group: 'Foundations' },
  { id: 'colors',   label: 'Colors',   group: 'Foundations' },
  { id: 'button',   label: 'Button',   group: 'Components' },
]
```

## composition

- **CaseStudyLayout.vue:** renders CaseStudyNav internally, supplying `panelRef` once mounted.
- **DesignSystemPage.vue:** renders CaseStudyNav directly (not through CaseStudyLayout) for its own section list.
