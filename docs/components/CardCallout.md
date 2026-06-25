# CardCallout

## component

- **name:** CardCallout
- **category:** Cards
- **description:** Dual-mode callout box. Stat mode renders a single highlighted metric (label, value, description). Callout mode renders a labeled note, either free-form slot content or a titled `items` list.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/CardCallout.vue
- **created:** 2026-04-05
- **updated:** 2026-04-21

## usage

- Pass `value` to activate stat mode: a single number/metric with a label and short description, typically used in a row of several CardCallouts side by side.
- Omit `value` for callout mode: either pass `items` for a titled list, or use the default slot for free-form text (e.g. a trade-off explanation).
- Use `divided` (default `true`) to control whether `items` entries are separated by a divider line.
- Use `gap="lg"` when callout content needs more vertical breathing room than the default.
- Do not pass both `items` and slot content; `items` takes precedence and the slot is ignored when present (the `v-else` branch on `<div v-else><slot /></div>` only renders when `items` is undefined).
- Do not build a one-off stat box or note box elsewhere in a case study; extend CardCallout instead per the project's component reuse rule.

## visual

- Both modes share `rounded-xl bg-[var(--color-surface-subtle)]` and the same label style: `text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]`.
- Stat mode is centered (`text-center`) and uses a large value: `text-2xl font-extrabold`.
- Callout mode is left-aligned; spacing switches from `space-y-2` to `space-y-4` whenever `gap="lg"` or `items` is present.

## behavior

- **Mode switch:** purely driven by whether `value !== undefined`. There is no explicit `mode` prop.
- **items mode:** entries render in a `space-y-3` stack; `divided` toggles `divide-y divide-black/[0.06]` between entries.
- **slot mode:** the default slot renders only when `items` is not provided.

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Heading shown in brand-colored uppercase text. Required in both modes. |
| `value` | `string` | `undefined` | Providing this activates stat mode. |
| `description` | `string` | `undefined` | Supporting text under `value`, stat mode only. |
| `gap` | `'sm' \| 'lg'` | `'sm'` | Vertical spacing in callout mode. Ignored once `items` is set (items always uses the `'lg'` spacing). |
| `items` | `{ title: string; description: string }[]` | `undefined` | Titled list entries. Activates items layout within callout mode. |
| `divided` | `boolean` | `true` | Whether `items` entries are separated by a divider line. |

**Emits:** none.

**Slots:** default slot, callout mode only, ignored when `items` is set.

## accessibility

- No interactive elements; CardCallout is a presentation container, not a control.
- `v-html`-free: all text in stat/items mode is interpolated, not injected as raw HTML, so no extra escaping burden falls on callers.
- When using the slot for rich text (e.g. `<strong>`), the caller is responsible for any markup; CardCallout does not sanitize slot content.

## aiHints

- Never add a `gap` prop value beyond `'sm' | 'lg'` without updating this doc and the demo controls in DesignSystemPage.vue.
- Do not override CardCallout's padding or background with wrapper classes from the call site. If spacing looks wrong in a specific usage, that's a sign the component needs a new variant, not a one-off override.
- Stat mode CardCallouts are typically placed in a `flex` row by the parent (see CardCallout's own `flex-1` class) — don't hardcode widths on individual instances.

## examples

Stat mode, several in a row:

```vue
<div class="flex gap-4">
  <CardCallout label="Conversion" value="+20-25%" description="increase" />
  <CardCallout label="D1 retention" value="+3%" description="improvement" />
</div>
```

Callout mode with free text (EcosiaOnboardingPage.vue):

```vue
<CardCallout label="Trade-off and impact">
  <p class="text-[var(--color-text-secondary)] leading-relaxed">Research showed emotional messaging was already working...</p>
</CardCallout>
```

Callout mode with items:

```vue
<CardCallout label="Trade-off and impact" :items="[
  { title: 'What we tried', description: '...' },
  { title: 'What we learned', description: '...' },
]" />
```

## composition

- **EcosiaOnboardingPage.vue, EcosiaBrowserPage.vue, LolsumoPage.vue:** use both stat mode (metric rows) and callout mode (trade-off explanations) throughout case study narratives.
