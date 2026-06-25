# CardTimeline

## component

- **name:** CardTimeline
- **category:** Cards
- **description:** Static numbered timeline. Renders a vertical line connecting numbered circles, each paired with a label and a rich-text description.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/CardTimeline.vue
- **created:** 2026-04-09
- **updated:** 2026-04-24

## usage

Use for a sequence of process steps that don't need interactivity (no active/click state) — for an interactive equivalent, use CardInteractive instead.

- Pass the full `steps` array; the component numbers entries automatically from `1` based on array index.
- `description` supports inline HTML (e.g. `<strong>`) for emphasis within a step.

## visual

- Single rounded card (`rounded-xl bg-black/[0.03]`) containing the whole sequence, not one card per step.
- Numbered circles (`w-6 h-6 rounded-full bg-[var(--color-brand-primary)]`) connected by a vertical line; the line is omitted after the last step.
- Step label uses the standard label style: `text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]`.

## behavior

- **Numbering:** purely positional — `{{ i + 1 }}` from the `v-for` index. There is no way to override a step's number.
- **Connecting line:** rendered for every step except the last (`i < steps.length - 1`).

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `steps` | `{ label: string; description: string }[]` | — | Ordered list of timeline steps. `description` is rendered as HTML. |

**Emits:** none.

**Slots:** none.

## accessibility

- `description` is rendered via `v-html`, which can introduce XSS risk if the string ever comes from user input or external data. The component source carries an explicit warning: step descriptions must be compile-time static strings, never user input or API data.
- No interactive elements; the timeline is read-only.

## aiHints

- Never pass `steps[].description` from a runtime data source (API response, user input, CMS content) without sanitizing it first — the `v-html` binding trusts the string completely. The existing code comment in the component flags this explicitly.
- Do not add a `current`/`active` step concept to this component. If a step needs to be highlighted as in-progress, use CardInteractive's `active` pattern instead, or propose a new prop and update this doc plus SEMANTIC_MAP usage in the same change.

## examples

Design system governance timeline (FloraDesignSystemPage.vue):

```vue
<CardTimeline
  :steps="[
    { label: 'Establish structure', description: 'I set up the <strong>Flora Jira board, workflows, and review process</strong>...' },
    { label: 'Document everything', description: 'I wrote and organized guidelines in Confluence...' },
  ]"
/>
```

## composition

- **FloraDesignSystemPage.vue:** renders a 4-step governance timeline.
