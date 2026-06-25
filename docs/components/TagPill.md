# TagPill

## component

- **name:** TagPill
- **category:** Cards
- **description:** Small inline pill for categorizing work (e.g. "Product design", "Growth"). Used in project card tags and project page headers.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/TagPill.vue
- **created:** 2026-04-21
- **updated:** 2026-04-21

## usage

Render one TagPill per category/tag, typically in a `flex flex-wrap gap-2` row.

- Use for short categorical labels only (a few words at most) — TagPill has no text-wrapping or truncation handling.
- Do not use for status indicators with semantic color meaning (success/warning/error) — TagPill has a single neutral visual style with no variant prop.

## visual

- Neutral pill: `rounded-full border border-black/10 bg-black/[0.04]`, secondary text color, no hover/active states.

## behavior

Fully static — no reactive state.

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | The tag text. |

**Emits:** none.

**Slots:** none.

## accessibility

- Renders as a plain `<span>` — purely informational text, not interactive, so no button/link semantics are needed.

## aiHints

- Do not add a click handler or interactive behavior to TagPill without first confirming the use case — it's used inline within `CardProject`'s tag row and adding interactivity there would create a nested-interactive-element problem inside CardProject's outer link.
- Don't introduce a color/variant prop for semantic meaning. If a status pill is needed, that's a different component, not an extension of TagPill.

## examples

```vue
<div class="flex flex-wrap gap-2">
  <TagPill label="Product design" />
  <TagPill label="Growth" />
</div>
```

## composition

- **CardProject.vue:** renders one TagPill per entry in its `tags` prop.
- **EcosiaBrowserPage.vue, LolsumoPage.vue, EcosiaOnboardingPage.vue:** render TagPill directly in page headers.
