# ImageCarousel

## component

- **name:** ImageCarousel
- **category:** Decorative
- **description:** Single-image carousel with a GSAP cross-dissolve transition between slides and an attached CarouselNav for stepping through `images`. Locks its aspect ratio to the first loaded image to avoid layout shift.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/ImageCarousel.vue
- **created:** 2026-04-09
- **updated:** 2026-04-24

## usage

- Pass `images` (array of URLs); optionally pass `alts` (parallel array of alt text, indexed by step).
- Use for a sequence of screenshots/visuals in a case study where a simple fade between images is wanted, rather than a slide/swipe carousel.
- Do not use for content that needs swipe gestures or autoplay — neither is implemented here.

## visual

- Bordered frame (`rounded-xl border-2 border-[var(--color-deep-maroon-700)]`) on a matching background color, so the dissolve transition never reveals a mismatched background flash.
- Aspect ratio locks to the first image's natural dimensions (`lockedRatio`) the first time any image loads, and never changes after that — later images are expected to share the same aspect ratio.

## behavior

- **Cross-dissolve:** two stacked `<img>` elements (`frontRef`/`backRef`). On `goTo`, the back image is set to the new source, faded in to opacity 1 over `0.25s` while the front fades to 0 in parallel (a single GSAP timeline with both tweens at position `0`), then roles swap back (front becomes the new image, back resets to hidden) via the timeline's completion callback.
- **Aspect lock:** `lockRatio` only runs once — once `lockedRatio` is set, subsequent image loads do not recompute it.
- **Step source of truth:** `step` is local state owned by ImageCarousel itself (unlike CarouselNav, which is fully controlled) — `goTo` both updates `step` and triggers the dissolve.

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `images` | `string[]` | — | Ordered list of image URLs. |
| `alts` | `string[]` | `undefined` | Parallel alt-text array, indexed by step. Falls back to `''` per image if missing. |

**Emits:** none.

**Slots:** none.

## accessibility

- Alt text falls back to an empty string (`alts?.[step] ?? ''`) when not provided — for meaningful images, always pass `alts` with one entry per image in `images`.
- The transition is a pure CSS/GSAP opacity tween with no announcement of slide changes to assistive tech (no `aria-live`); a screen reader user stepping through via CarouselNav's buttons will get the new image's alt text once focus/DOM settles, but there's no explicit live-region announcement of "slide 2 of 5."

## aiHints

- Never assume all images share the same aspect ratio in code — the component currently does assume this implicitly (locks ratio to the first image only), so if a future case study needs mixed-ratio images, this component needs a design change first, not a one-off override at the call site.
- Don't add autoplay without explicitly checking `prefers-reduced-motion` and the project's `useA11yStore` reduce-motion setting first, per the project's animation rules.
- The dissolve timeline always kills nothing explicitly (no `gsap.killTweensOf`) — if rapid clicking during an in-flight transition becomes a problem, that's the first place to look.

## examples

```vue
<ImageCarousel
  :images="['/project-pages/x/1.webp', '/project-pages/x/2.webp']"
  :alts="['Screen 1: onboarding step', 'Screen 2: confirmation']"
/>
```

## composition

- **CarouselNav.vue:** rendered internally; ImageCarousel owns `step` and updates it in response to CarouselNav's `prev`/`next` events.
- **EcosiaBrowserPage.vue, EcosiaOnboardingPage.vue:** consumers.
