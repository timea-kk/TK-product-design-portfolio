# RotatingDescriptor

## component

- **name:** RotatingDescriptor
- **category:** Decorative
- **description:** Typewriter effect for the hero headline. Types a phrase character by character, blinks the cursor twice, fades it out, then fades the whole block before typing the next phrase. Cycles through a fixed list of phrases indefinitely.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/RotatingDescriptor.vue
- **created:** 2026-02-23
- **updated:** 2026-04-29

## usage

Drop into the hero headline; it is fully self-contained (own phrase list, own timers) and takes no props.

- The phrase list (`DESCRIPTORS`) is hardcoded in this file — to change the rotating phrases, edit the array directly.
- Designed to sit inside a fluid-width heading (`clamp()` font-size) so text never overflows at any breakpoint; the "ghost" element technique it uses assumes the parent doesn't constrain width unexpectedly.

## visual

- Each revealed character gets a highlight background + brand-colored text (`bg-[var(--color-highlight)] text-[var(--color-brand-primary)]`), applied per-character as it's typed.
- A blinking `|` cursor follows the typed text; blinking behavior is driven entirely by CSS animation classes (`cursor-blink-twice`, `cursor-fade-out`) defined in `src/index.css`, not inline styles.
- A zero-opacity "ghost" copy of the full current phrase reserves layout height in advance, so the block doesn't jump in height as characters are typed in.

## behavior

- **State machine:** `typing` → `pause` (cursor blinks twice, ~3s) → `cursorFadeOut` (~0.4s) → `fadeOut` (whole block fades, ~0.35s) → back to `typing` with the next phrase. Implemented as a single `schedule()` function re-run via a `watch` on all its own state dependencies.
- **Reduced motion:** if either the user's `useA11yStore` reduce-motion setting OR the OS-level `prefers-reduced-motion` media query is active, the component skips all animation and statically shows only the first phrase (`DESCRIPTORS[0]`) with a static cursor.
- **Live OS preference changes:** listens for `change` on the `prefers-reduced-motion` media query, so if the user toggles their OS setting while the page is open, the component reacts without a reload.
- **Timer cleanup:** every phase transition clears any prior pending timeout before scheduling a new one, and the component clears its timer on unmount.

## props

None.

**Emits:** none.

**Slots:** none.

## accessibility

- The visible text region uses `aria-live="polite"` and `aria-atomic="true"` (on both the reduced-motion and animated branches), so assistive tech announces phrase changes without interrupting other speech.
- The blinking cursor span is `aria-hidden="true"` since it carries no semantic meaning.
- Reduced-motion handling checks both an app-level setting and the OS-level media query, covering users who have set a system preference even if they haven't visited this app's own accessibility panel.

## aiHints

- Never add a new phrase to `DESCRIPTORS` without checking it reads naturally as a sentence fragment after "Senior Product Designer" style phrasing already in the list — they're meant to be parallel in tone.
- Do not bypass the `reduceMotion` computed value when adding new animation; any new motion in this component must respect both the app setting and the OS setting, per the project's animation rules.
- The ghost-element layout-reservation technique depends on the ghost and the real content rendering with identical font/line-height — if the component's typography classes change, verify the ghost still reserves the correct height.
- Timing constants (`TYPE_MS`, `PAUSE_AFTER_TYPE_MS`, `CURSOR_FADE_OUT_MS`, `FADE_OUT_MS`) are tuned together; changing one without checking the others can desync the cursor animation classes (defined in `src/index.css`) from the component's own phase timing.

## examples

```vue
<!-- HomePage.vue hero -->
<h1>
  <RotatingDescriptor />
</h1>
```

## composition

- **useA11yStore:** read for the app-level reduce-motion setting.
- **src/index.css:** defines the `cursor-blink-twice`/`cursor-fade-out` keyframe animations this component's cursor span relies on.
- **HomePage.vue:** the only consumer, in the hero headline.
