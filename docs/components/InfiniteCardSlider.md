# InfiniteCardSlider

## component

- **name:** InfiniteCardSlider
- **category:** Decorative
- **description:** Testimonial display for the home page. Desktop: a fixed-canvas scatter of absolutely-positioned StickyNotes with attached person "pill" badges. Mobile: a single-column stack of per-person pill + two sticky notes. Despite the name, it does not currently auto-scroll or loop — it's a static scatter layout.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/InfiniteCardSlider.vue
- **created:** 2026-04-28
- **updated:** 2026-04-30

## usage

This component's content (`notes`, `people`) is hardcoded testimonial data specific to this portfolio, not props-driven. There is exactly one intended usage: the home page testimonials section.

- Do not pass new testimonial content via props — to change testimonials, edit the `notes`/`people` arrays directly in this file.
- `notes` drives desktop layout, `people` drives the mobile layout; the two arrays currently duplicate the same quotes in different groupings, so any content change must be made in both places.

## visual

- Desktop (`xl:` and above): each note is independently absolutely positioned within a fixed `1026 x 680`px canvas (`CANVAS_W`/`CANVAS_H`), with explicit `x`, `y`, `z` (stacking), and per-note `rotate` for a hand-scattered look.
- Mobile: one column, each person rendered as a colored pill (name + role + photo) followed by up to 2 sticky notes side by side.
- Square auto-sizing: `squareNote` binary-searches a width for each note (unless `noSquare` is set) so the note's rendered height matches its width, producing a square sticky note regardless of text length.
- Decorative SVG stickers (sparkles, thumbs-up, heart, +1, fire) are absolutely positioned over the desktop canvas, `aria-hidden`.

## behavior

- **Square-fitting:** runs once on mount, after web fonts are ready (`document.fonts.ready`), since text measurement before fonts load would produce wrong results. Binary search narrows note width over 16 iterations until height is within 2px of width.
- **Stacking order:** notes with a `pill` get `zIndex: 999` (always on top, since the pill badge overlaps the note above it); others use their own `z` value.
- **No actual sliding/looping:** despite the component name, there is no scroll, autoplay, or infinite-loop behavior implemented — both layouts are static.

## props

None — all content is internal to the component.

**Emits:** none.

**Slots:** none.

## accessibility

- Quote text is injected via `v-html` (`note.text`, `slip.text`) because quotes contain inline `<strong>` tags for emphasis. This is safe only because the strings are hardcoded in this file, not user-supplied — never wire this to dynamic/external data without sanitizing first.
- All decorative sticker SVGs use `alt=""` and `aria-hidden="true"`.
- Person photos use real `alt` text (the person's name).

## aiHints

- Never make `notes`/`people` props-driven without also addressing the `v-html` usage — if testimonial text ever comes from an external source (CMS, API), it must be sanitized before reaching this component, since the current `v-html` calls assume trusted, hardcoded input.
- Don't rename this component to something more accurate (e.g. "TestimonialScatter") without doing the full three-part update — it's referenced in NAV_SECTIONS/SEMANTIC_MAP-adjacent docs and tests by its current name.
- If a note's text is long, prefer setting `noSquare: true` over manually tuning `maxW` — the square-fit algorithm assumes squarable content by default and `noSquare` is the documented escape hatch.
- The desktop canvas dimensions (`CANVAS_W`/`CANVAS_H`) and each note's `x`/`y` were hand-placed to avoid overlap; changing canvas size requires re-checking all note positions, not just scaling them proportionally.

## examples

```vue
<!-- HomePage.vue -->
<InfiniteCardSlider />
```

## composition

- **StickyNote.vue:** renders every individual testimonial note, both desktop and mobile.
- **HomePage.vue:** the only consumer.
