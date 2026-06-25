# SegmentedControl

## component

- **name:** SegmentedControl
- **category:** Navigation
- **description:** Pill-shaped multi-option toggle with a sliding brand-colored background that animates between options. Fully controlled via `v-model`.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/SegmentedControl.vue
- **created:** 2026-04-10
- **updated:** 2026-04-24

## usage

- Use `v-model` (a number, the selected option's index) bound to `options` (the label strings, same length and order as the indices they represent).
- Use for a small, fixed set of mutually exclusive choices (2-4 options) where a pill toggle reads better than a dropdown or radio group — e.g. switching between two views of the same data.
- Do not use for more than a handful of options; the sliding background's width is computed as an even split (`100% / options.length`), so it degrades visually with many options.

## visual

- Track: `rounded-full border ... bg-[var(--color-surface-elevation-1)] p-1`.
- Sliding indicator: `absolute` div sized to `1/options.length` of the track, animated with a CSS `transform: translateX()` transition (`duration-300 ease-in-out`) rather than animating `left`/`width` directly, for smoother GPU-accelerated movement.
- Selected option's text turns white (to sit on top of the brand-colored indicator); unselected options use secondary text color.

## behavior

- **Selection:** clicking an option emits `update:modelValue` with that option's index — SegmentedControl holds no internal state, `modelValue` is the single source of truth.
- **Indicator position:** purely a function of `modelValue` — `translateX(calc(${modelValue} * 100%))` shifts the indicator by whole-segment-widths.

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `string[]` | — | Labels for each segment, in order. |
| `modelValue` | `number` | — | Selected option's index. |

**Emits:** `update:modelValue` — `[value: number]`, the newly selected index.

**Slots:** none.

## accessibility

- Root has `role="group"`; each option is a real `<button>` with `aria-pressed` reflecting selection — this is a toggle-button-group pattern, not a native radio group, so `aria-pressed` rather than `aria-checked`/`role="radio"` is the correct choice here.
- Selected state is communicated via both background color and text color, not color alone.

## aiHints

- Never make this a single-select replacement for more than ~4 options — the equal-width-segment math and the visual pill metaphor both assume a small, fixed option count.
- Do not add internal state for the selected index. SegmentedControl must remain a fully controlled component driven by `modelValue`/`update:modelValue`, matching the project's other controlled-component patterns (CarouselNav, Dropdown's `open` via slot).
- If animating the indicator differently is ever needed, keep using `transform: translateX()` rather than animating `left` or `width` — it's deliberately chosen for smoother, GPU-accelerated movement.

## examples

Before/After image toggle (EcosiaOnboardingPage.vue):

```vue
<SegmentedControl
  :options="['Before', 'After']"
  :model-value="beforeAfterStep"
  @update:model-value="(i) => beforeAfterDissolve(i)"
/>
```

## composition

- **EcosiaOnboardingPage.vue:** consumer, used as a Before/After toggle driving an image dissolve transition.
