# CardProject

## component

- **name:** CardProject
- **category:** Cards
- **description:** Project card for the home page grid and project listings. Renders title, description, tags, a CTA, and a media area (image or autoplaying video), as a link to a case study page or an external URL.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/CardProject.vue
- **created:** 2026-04-21
- **updated:** 2026-06-22

## usage

- Always pass `to`. If it starts with `http`, the card renders as `<a target="_blank">`; otherwise it renders as a `RouterLink`.
- Use `vertical` to lock the card into column layout at every breakpoint (grid contexts where the row layout would break).
- Use `imageTop` to put the media above the text on mobile instead of below.
- Use `wideBreakpoint` when the card needs to stay stacked until a wider breakpoint (`1440px`) than the default (`1024px`) — used for cards in narrower grid columns.
- Use `hideCta` to omit the CTA entirely, or `ctaLabel` to override its default text ("Read case study").
- Use `primaryCta` to render the CTA in `Button`'s primary variant instead of outline (one primary CTA per grid, typically the featured project).
- Pass `video` instead of `image` for an autoplaying, looped, muted background video; `image` is still required as a fallback/poster concept even when `video` is set conceptually, though the template only renders one or the other.

## visual

- Row layout by default on desktop (text left, media right `lg:flex-row`), column on mobile; `vertical` forces column at all sizes.
- `textMinHeight` (default `420`px) reserves vertical space in the text column so CTA position stays consistent across cards of different description lengths, desktop only.
- `imageRounded` switches the media area from edge-to-edge to an inset, independently-rounded image with padding.
- `imageOutline` adds a `ring-2 ring-[var(--color-deep-maroon-700)]` around the media.
- `transparent` removes the card's `--color-surface-strong` background (for cards placed on an already-styled surface).
- `zoom` and `mediaPosition` control a static transform/object-position on the image or video, independent of the hover zoom effect.

## behavior

- **External vs internal link:** `isExternal` is computed from whether `to` starts with `http`; this fully determines whether the rendered root is `<a>` or `RouterLink`, and whether `target="_blank" rel="noopener noreferrer"` is applied.
- **Responsive media position:** `effectivePosition` uses `mediaPosition` only at the active desktop breakpoint (`lg` or `1440px` depending on `wideBreakpoint`); below that breakpoint it always falls back to `'center'`.
- **Hover zoom:** media scales `1.03x` on hover via `group-hover/img:scale-[1.03]`, independent of any `zoom` prop value (which sets a static base scale).
- **CTA tag:** the Button CTA always renders with `tag="span"`, so the whole `component :is` wrapper (the `<a>`/`RouterLink`) is the actual click target, not the inner Button.

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Card heading. |
| `description` | `string` | `undefined` | Optional supporting paragraph. |
| `image` | `string` | — | Image source. |
| `imageAlt` | `string` | — | Alt text for the image. |
| `video` | `string` | `undefined` | If set, renders an autoplaying video instead of the image. |
| `zoom` | `number` | `undefined` | Static scale added to the media's base transform. |
| `mediaPosition` | `string` | `undefined` | CSS `object-position` value, applied only at the active desktop breakpoint. |
| `imageTop` | `boolean` | `false` | Media above text on mobile (reverses column order). |
| `vertical` | `boolean` | `false` | Locks column layout at every breakpoint. |
| `ctaLabel` | `string` | `undefined` | Overrides the default "Read case study" text. |
| `textMinHeight` | `number` | `420` | Min-height in px for the text column, desktop only. |
| `hideCta` | `boolean` | `false` | Hides the CTA entirely. |
| `primaryCta` | `boolean` | `false` | Renders the CTA Button as `variant="primary"` instead of `"outline"`. |
| `imageRounded` | `boolean` | `false` | Inset, independently-rounded media with padding. |
| `imageOutline` | `boolean` | `false` | Adds a ring outline around the media. |
| `transparent` | `boolean` | `false` | Removes the card's background color. |
| `noHover` | `boolean` | `false` | Disables the pointer cursor on the CTA (card not meant to feel clickable at the CTA itself). |
| `wideBreakpoint` | `boolean` | `false` | Uses `1440px` instead of `1024px` as the desktop breakpoint. |
| `to` | `string` | — | Required. Destination route or external URL. |
| `tags` | `string[]` | `undefined` | Rendered as `TagPill` chips above the CTA. |

**Emits:** none (the whole card is a link).

**Slots:** none.

## accessibility

- The external-link icon (`IconExternalLink`) is purely visual and not labeled separately — the link text itself communicates the destination via `title`.
- External links always get `rel="noopener noreferrer"` alongside `target="_blank"`.
- Video media is `autoplay loop muted playsinline` — always muted, so it does not trigger unexpected audio or violate autoplay policies.

## aiHints

- Never make the CTA itself a separate clickable target. CardProject is one big link; the CTA `Button` always uses `tag="span"` so it never becomes a second nested interactive element (which would be invalid HTML and break click semantics inside an `<a>`).
- Do not add a `disabled` or non-link variant. If a card needs to be non-interactive, that's a different component, not a CardProject prop.
- Do not change `isExternal` detection to anything other than `to.startsWith('http')` — internal routes are expected to be relative paths, never absolute URLs.

## examples

Default project card in a grid:

```vue
<CardProject
  title="Ecosia Browser Onboarding"
  description="Designed and tested the install funnel under a two-month deadline."
  image="/project-pages/ecosia-onboarding/cover.webp"
  image-alt="Ecosia Browser onboarding screens"
  to="/work/ecosia-onboarding"
  :tags="['Product design', 'Growth']"
/>
```

External link card:

```vue
<CardProject
  title="Resume"
  image="/main-page/resume-cover.webp"
  image-alt="Resume preview"
  to="https://drive.google.com/..."
  cta-label="View resume"
/>
```

## composition

- **TagPill.vue:** renders each entry in `tags`.
- **Button.vue:** renders the CTA, always with `tag="span"`.
- **HomePage.vue:** primary consumer, rendering the project grid.
