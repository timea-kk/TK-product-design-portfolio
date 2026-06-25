# CardInteractive

## component

- **name:** CardInteractive
- **category:** Cards
- **description:** Clickable step card for multi-step interactive walkthroughs. Shows label, title, description, and goal text; reveals an image when active. Used as one tab in a tab-like group of steps.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/CardInteractive.vue
- **created:** 2026-04-05
- **updated:** 2026-04-10

## usage

Render a row of CardInteractive instances representing steps in a flow; the parent owns the `activeStep` state and passes `:active` to exactly one card at a time, toggling it on click.

- Use for step-by-step strategy/process walkthroughs where each step has its own supporting image.
- Do not use for static, non-interactive step lists; use CardTimeline instead.
- The `image` is only shown on mobile (`sm:hidden`) when the card is active — on desktop the image is expected to live elsewhere in the layout (e.g. a shared preview panel).

## visual

- `rounded-xl border-2`; active state switches the border and a subtle background tint to `--color-brand-primary`, inactive uses a neutral black border that darkens on hover.
- Label text switches between brand color (active) and secondary text color (inactive).
- The `goal` line is pinned to the bottom of the card via `!mt-auto`, regardless of how much description text precedes it.

## behavior

- **active prop:** purely visual — CardInteractive does not track its own state. The parent must manage which card is active and re-render `:active` on each card.
- **click:** emits `click` with no payload; the parent decides what "click" means (usually: set this card as the active step).
- **image reveal:** `v-if="image"` combined with `v-show="active"` — the image element exists in the DOM whenever an image is provided, but is only visible when active, and only below the `sm` breakpoint.

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Small uppercase eyebrow (e.g. "Step 1"). |
| `title` | `string` | — | Card heading. |
| `description` | `string` | — | Supporting paragraph. |
| `goal` | `string` | — | Bottom-pinned goal text (e.g. "Goal: make a search"). |
| `active` | `boolean` | — | Marks this card as the selected step. |
| `image` | `string` | `undefined` | Mobile-only image shown when `active` is true. |
| `imageAlt` | `string` | `undefined` | Alt text for `image`. Defaults to `''` if omitted. |

**Emits:** `click` — fired on the native button click, no payload.

**Slots:** none.

## accessibility

- Renders as a native `<button>`, so it is keyboard-focusable and triggers `click` on both mouse and keyboard activation by default.
- The active/inactive visual distinction relies on both border color and background tint, not color alone.
- `image` decorative reveal uses `v-show`, so the image is present in the accessibility tree even when hidden — pass a meaningful `imageAlt` since it is not marked `aria-hidden`.

## aiHints

- Do not add an `aria-pressed` attribute without checking whether the parent's step-group semantics call for `role="tablist"`/`role="tab"` instead — this component does not currently implement tab ARIA semantics, just a plain button group.
- Never hardcode which step is active inside this component. Active state must always come from the parent via the `active` prop.
- The bottom-pinned goal text depends on `!mt-auto` inside a `flex flex-col` parent container — do not change the card's outer `flex flex-col` without re-checking that this pinning still works.

## examples

A 3-step strategy group (EcosiaOnboardingPage.vue):

```vue
<CardInteractive
  label="Step 1"
  title="Value Perception"
  description="See the product's value in context of their situation, enough to get them to try it."
  goal="Goal: make a search"
  :active="activeStrategyStep === 0"
  image="/project-pages/ecosia-onboarding/ecosia-onboarding-10.webp"
  @click="activeStrategyStep = 0"
/>
```

## composition

- **EcosiaOnboardingPage.vue:** renders three CardInteractive instances as a strategy walkthrough, with a single `activeStrategyStep` ref controlling which one is active.
