# StickyNote

## component

- **name:** StickyNote
- **category:** Decorative
- **description:** Yellow (by default) post-it note with a translucent tape piece at the top. Renders slot content centered, optionally with a badge label. Outer layout classes (`flex-1`, `w-1/2`, custom widths) are passed through via class fallthrough from the parent.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/StickyNote.vue
- **created:** 2026-04-03
- **updated:** 2026-04-30

## usage

- Pass `rotate` (degrees, e.g. `-1`, `1`, `-0.5`) for a hand-placed tilt; the tape rotates in the opposite direction at 2x the note's rotation for a consistent peeled-corner look.
- Pass `label` for a small badge above the slot content (used for numbered/named callouts in case study "How might we" / pain-point note groups).
- Pass `color` to override the default yellow background (`--color-surface-sticky`) — used by InfiniteCardSlider for per-person testimonial note colors.
- Pass `square` for an aspect-square layout, used for "How might we" style notes where visual uniformity matters more than fitting variable text length.
- Layout sizing (width, flex behavior) is entirely controlled by the parent via a passed-through `class`, not a prop.

## visual

- Tape: a small translucent rectangle (`rgba(210,228,255,0.68)`) positioned above the note, rotated opposite to the note's own tilt.
- Rotation is clamped to `[-2, 2]` degrees (`clampedRotate`) regardless of what's passed in `rotate`, to keep the hand-placed effect subtle even if a caller passes an extreme value.
- Drop shadow (`1px 2px 3px ... 4px 10px 20px ...`) gives the note a slightly raised, papery feel.

## behavior

No reactive state beyond the computed `clampedRotate`/`tapeRotate` derived from the `rotate` prop.

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `rotate` | `number` | — | Degrees of tilt; internally clamped to `[-2, 2]` for the visual effect (the raw value is still used for the outer wrapper's own transform, so very large values will over-rotate the note itself even though the tape's counter-rotation is clamped). |
| `square` | `boolean` | `false` | Aspect-square layout for "How might we"-style notes. |
| `color` | `string` | `undefined` | Overrides the default `--color-surface-sticky` background. |
| `label` | `string` | `undefined` | Badge text rendered above the slot content. |

**Emits:** none.

**Slots:** default slot — note content.

## accessibility

- The badge label uses the shared `.sticky-note-label` utility class (defined in `src/index.css`), so its styling stays consistent with any other use of that class.
- No interactive elements; purely decorative/informational content.
- When used with `v-html` content at the call site (as InfiniteCardSlider does for testimonial quotes), sanitization responsibility lies with the caller, not StickyNote itself.

## aiHints

- Never unclamp the tape's rotation range — `[-2, 2]` degrees was chosen deliberately so the tape effect stays subtle even when carelessly large `rotate` values are passed in for the note itself.
- Note that `rotate` itself is NOT clamped on the outer wrapper, only the tape's counter-rotation is — if a future change clamps the note's own rotation too, verify that doesn't change the visual intent of any existing usage (e.g. InfiniteCardSlider's larger scatter rotations).
- Do not add new layout-sizing props (width, flex behavior). The project's convention is to pass those through `class` from the call site, not as dedicated props.

## examples

Labeled note in a pain-point group (LolsumoPage.vue):

```vue
<StickyNote :rotate="-1" class="w-44 sm:flex-1" label="Casual">
  Needed clear in-game guidance with item guides and builds in real-time.
</StickyNote>
```

Custom color, no label (InfiniteCardSlider.vue):

```vue
<StickyNote :rotate="note.rotate" :color="note.color" class="w-full">
  <div class="text-center" v-html="note.text"></div>
</StickyNote>
```

## composition

- **InfiniteCardSlider.vue:** renders many StickyNotes with custom `color` and `rotate` per testimonial.
- **LolsumoPage.vue, EcosiaBrowserPage.vue, EcosiaOnboardingPage.vue:** render labeled StickyNote groups for pain points / "How might we" content.
