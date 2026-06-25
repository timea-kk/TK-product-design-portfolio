# CarouselNav

## component

- **name:** CarouselNav
- **category:** Navigation
- **description:** Prev/Next control pair with a centered "X / Y" step counter, for driving an externally-owned carousel/stepper. Stateless — the parent owns the current step.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/CarouselNav.vue
- **created:** 2026-04-10
- **updated:** 2026-06-22

## usage

- Pass `step` (0-indexed current position) and `total`; CarouselNav renders "step+1 / total" and disables Prev/Next at the bounds.
- Pass `infinite` to disable the bounds check, so Prev/Next stay enabled even at the first/last step (the parent is expected to wrap around on `prev`/`next`).
- CarouselNav does not move anything itself — the parent must update `step` in response to `prev`/`next` events.

## visual

- Two outline `Button`s flanking a pill-shaped counter (`rounded-full bg-[var(--color-surface-elevation-1)]`), counter text uses `tabular-nums` so digit width doesn't shift between steps.
- Buttons stretch to fill available space on each side (`flex-1 flex justify-start` / `justify-end`) so the counter stays centered regardless of label width.

## behavior

- **Bounds:** Prev disables when `step === 0`, Next disables when `step === total - 1`, unless `infinite` is true.
- **No internal state:** clicking Prev/Next only emits an event; CarouselNav has no `ref` tracking position itself.

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `step` | `number` | — | Current 0-indexed position. |
| `total` | `number` | — | Total number of steps. |
| `infinite` | `boolean` | `false` | Disables bounds checking so both buttons stay enabled at the ends. |

**Emits:** `prev` — Previous clicked, no payload. `next` — Next clicked, no payload.

**Slots:** none.

## accessibility

- Prev/Next render via `Button`, which already provides `disabled:opacity-30 disabled:cursor-not-allowed` and a visible focus ring.
- The step counter ("2 / 5") is plain text content, readable by screen readers without extra ARIA, but is not wrapped in an `aria-live` region — if the count needs to be announced on change, that has to be added at the call site or to this component.

## aiHints

- Never make CarouselNav own the step state. Any future change must keep it a fully controlled, presentational component — state belongs to the parent (see ImageCarousel.vue for the pattern).
- Do not change the bounds logic without checking both `ImageCarousel.vue`'s usage (bounded) and any future `infinite` usage — both code paths must keep working.

## examples

Paired with ImageCarousel (the only real consumer):

```vue
<CarouselNav
  :step="step"
  :total="images.length"
  @prev="goTo(step - 1)"
  @next="goTo(step + 1)"
/>
```

## composition

- **ImageCarousel.vue:** the only consumer. Owns `step` as a ref and calls its own `goTo()` in response to `prev`/`next`.
- **Button.vue:** renders both nav buttons as `variant="outline"`.
