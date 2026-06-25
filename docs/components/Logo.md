# Logo

## component

- **name:** Logo
- **category:** Decorative
- **description:** Inline SVG logo mark. Uses `currentColor` so it inherits `--color-brand-primary` from whichever theme is active, keeping the logo on-brand across all themes without per-theme image assets.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/Logo.vue
- **created:** 2026-02-21
- **updated:** 2026-04-10

## usage

Pass a sizing class (e.g. `class="h-8 w-auto"`); Logo disables Vue's automatic attribute inheritance (`inheritAttrs: false`) and manually merges `$attrs.class` onto its wrapper `<span>`, so the size class lands on the right element regardless of how Logo's internal markup changes.

- **Not currently rendered on any live page.** It is only demoed on the DesignSystemPage. If you intend to add it to Header.vue or elsewhere, confirm placement and sizing with the project owner first — this is a gap worth flagging, not assuming.

## visual

- Color comes entirely from `text-[var(--color-brand-primary)]` plus `fill="currentColor"` on the SVG path/circle — there is no hardcoded color in the SVG itself.
- No variants, no size prop — sizing is controlled entirely via the forwarded `class`.

## behavior

Fully static — no reactive state, no props, no computed values. The SVG path data and circle coordinates are hardcoded constants.

## props

None. Accepts a forwarded `class` via `$attrs` (not a declared prop) for sizing.

**Emits:** none.

**Slots:** none.

## accessibility

- `aria-hidden="true"` on the wrapper span — Logo is always treated as decorative. If it's ever used as a standalone link with no other text, the surrounding link/button must carry its own `aria-label`; Logo will not provide one.

## aiHints

- Never hardcode a brand color into the SVG path/circle fill — both must stay `currentColor` so theme switching keeps working.
- Don't add a `size` prop. Sizing is intentionally handled via the forwarded `class` on `$attrs`, consistent with how the rest of the project sizes icons (`@tabler/icons-vue` icons also take a size class, not a prop).
- This component is currently unused outside its own DS demo — before extending its API, confirm there's an actual usage planned; don't speculatively add props for a use case that doesn't exist yet.

## examples

```vue
<Logo class="h-8 w-auto" />
```

## composition

- **DesignSystemPage.vue:** only current usage, in its own component demo section.
