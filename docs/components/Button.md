# Button

## component

- **name:** Button
- **category:** Buttons
- **description:** Shared button component for the portfolio. Supports text, icon+text, and icon-only layouts with default, hover, active, disabled, and focus states. Can render as a native button or be swapped to another tag/component while keeping identical styling.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/Button.vue
- **created:** 2026-04-10 (introduced as part of the DS token rename and portfolio DS page overhaul)
- **updated:** 2026-06-22 (ButtonPrimary and ButtonOutline consolidated into this single component with a `variant` prop)

## usage

Use Button for any clickable action: form submission, navigation triggers, carousel controls, icon-only controls, and CTA links rendered as non-button tags.

- Use `variant="primary"` for the main action in a given context (one primary action per view/section).
- Use `variant="outline"` for secondary actions, paired actions (prev/next), or CTAs on elevated surfaces like cards.
- Use `iconOnly` for icon-only controls and always pair it with `aria-label`.
- Use `tag` when the button needs to render as something other than `<button>`, e.g. a CTA living inside a RouterLink/anchor.

Do not use Button for plain inline text links that aren't actions. Do not build a one-off styled `<button>` or `<a>` for a new action; extend Button instead per the project's component reuse rule.

## behavior

- **variant (primary):** solid background `--color-button-bg-primary`, text `--color-button-text-primary`, `hover:opacity-90 hover:underline`.
- **variant (outline):** background `--color-button-bg-outline`, border `--color-border`, text `--color-button-text-outline`; on hover switches to `--color-brand-primary` text with underline.
- **active:** primary becomes `opacity-75 underline`; outline becomes `--color-brand-primary` text with underline (same end state as outline hover).
- **disabled:** `disabled:opacity-30 disabled:cursor-not-allowed`. The native `disabled` and `type` attributes are only bound when the rendered tag is `button` (no `tag` prop, or `tag="button"`) — they are never applied when `tag` is set to something else, since non-button elements don't support them.
- **iconOnly:** padding switches from `px-5 py-2.5` to `p-2.5`.
- **focus-visible:** `ring-2` in `--color-brand-primary`, with `ring-offset-2` and an underline.
- **border utility:** both variants always render a `border` utility class, transparent on primary and `--color-border` on outline. This is intentional, not a leftover: an earlier version applied the border conditionally per variant, which caused a layout shift when toggling between variants because the border width was added/removed from the box model. Keeping the border always present (just transparent when not needed) avoids that shift. Never make the border conditional on variant.

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'outline'` | `'primary'` | Visual style. |
| `iconOnly` | `boolean` | `false` | Square `p-2.5` padding for icon-only layout. |
| `disabled` | `boolean` | `false` | Reduces opacity, blocks interaction. Only applied as a native attribute when rendered as `<button>`. |
| `active` | `boolean` | `false` | Marks a selected/pressed state. Visual treatment depends on `variant`. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type. Only applied when rendered as `<button>`. |
| `tag` | `string` | `undefined` | Renders as this tag/component instead of `<button>`. |

**Emits:** `click` — fired on the native click event, no payload.

**Slots:** default slot for button content (text, icon, or both).

## accessibility

- Always pass `aria-label` when using `iconOnly`, since there is no visible text for assistive tech to read.
- Disabled state relies on the native `disabled` attribute, which is only present when rendered as `<button>`. If you use `tag` to render a non-button element for a "disabled" CTA, you must handle the disabled semantics yourself (e.g. `aria-disabled`, blocking the click handler) — Button does not do this for you.
- Focus is visible via `focus-visible:ring-2`, not `:focus`, so mouse clicks don't show a focus ring while keyboard navigation does.
- `active:underline` and `focus-visible:underline` give a non-color-only state indicator, supporting users who can't rely on color/opacity changes alone.

## aiHints

- Never split primary/outline back into separate components. They were consolidated into one component with a `variant` prop specifically to follow the project's rule that a fixed, mutually-exclusive set of visual styles belongs in a single enum prop, not separate components.
- Never make the `border` class conditional on `variant`. Both variants must always render a border utility (transparent on primary). This was a deliberate fix for a layout-shift bug; reintroducing a conditional border will reintroduce that bug.
- When wrapping Button in a link (e.g. RouterLink, `<a>`), set `tag="span"` on the Button itself and put the RouterLink/anchor around it. Do not pass `tag="a"` and add `href` separately; follow the CardProject.vue pattern.
- Never bind `disabled` or `type` expecting them to apply when `tag` is set to a non-button value. They are only bound for `<button>`.
- Do not add inline styles or wrapper classes to override Button's typography, spacing, or color. If the visual output is wrong, fix the component, not the call site.
- Do not invent new variants. If a new visual style is needed, propose extending the `variant` enum and updating SEMANTIC_MAP plus the DS page docs in the same change, per the project's golden rule. Don't add it to this component without doing all three.

## examples

Default and outline buttons:

```vue
<Button>Label</Button>
<Button variant="outline">Label</Button>
```

Icon-only, requires aria-label:

```vue
<Button icon-only aria-label="Settings">
  <SettingsIcon class="h-4 w-4" />
</Button>
```

Active and disabled states:

```vue
<Button :active="true">Label</Button>
<Button :disabled="true">Label</Button>
```

CTA inside a link, rendered as `span` (CardProject.vue):

```vue
<Button
  :variant="primaryCta ? 'primary' : 'outline'"
  v-if="!hideCta"
  tag="span"
  :class="['self-start', noHover && 'cursor-pointer']"
>{{ ctaLabel ?? 'Read case study' }} &rarr;</Button>
```

Paired prev/next controls, both outline (CarouselNav.vue):

```vue
<Button variant="outline" :disabled="step === 0 && !infinite" @click="$emit('prev')">&larr; Previous</Button>
<Button variant="outline" :disabled="step === total - 1 && !infinite" @click="$emit('next')">Next &rarr;</Button>
```

## composition

- **CardProject.vue:** renders Button as the card's CTA, with `tag="span"` so the whole card or an outer anchor/RouterLink controls navigation instead of the button itself.
- **CarouselNav.vue:** renders two outline Buttons as prev/next controls, each independently disabled based on carousel position.
