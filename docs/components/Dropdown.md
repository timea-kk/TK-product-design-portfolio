# Dropdown

## component

- **name:** Dropdown
- **category:** Overlays
- **description:** Generic trigger-and-panel shell. Manages open/close state, outside-click dismissal, and ARIA wiring. Either renders a default text-button trigger or accepts a fully custom trigger via scoped slot.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/Dropdown.vue
- **created:** 2026-04-23
- **updated:** 2026-04-25

## usage

- Use the default slot for panel content (menu items, a form, anything).
- Use the named `#trigger` scoped slot (`{ open, toggle }`) for a custom trigger button — Header.vue's theme and accessibility icon buttons both do this.
- If `#trigger` is omitted, Dropdown renders its own default text button using the `label` prop.
- Use `panelClass` to position the panel (default `right-0 top-full mt-1`); override when the panel needs to open from the left or needs a fixed width.
- Use `haspopup` (`'true' | 'listbox' | 'dialog'` etc.) and `panelRole`/`panelAriaLabel` together to get correct ARIA semantics for the specific pattern (listbox for theme selection, dialog for the accessibility panel).
- Call the exposed `close()` method (via template ref) to close the dropdown programmatically, e.g. after an option is selected.

## visual

- No fixed visual style for the panel beyond `rounded border ... bg-[var(--color-surface-elevation-1)] py-1 shadow-lg` — width/position is fully controlled by `panelClass`.
- The default trigger button is a plain text button; custom triggers (icon buttons in Header.vue) define their own appearance entirely.

## behavior

- **Outside-click dismissal:** a document-level click listener (added on mount, passive) closes the dropdown whenever a click lands outside `containerRef`.
- **Toggle:** the trigger slot receives `toggle` and `open` so any custom trigger can drive the same open state Dropdown manages internally.
- **Programmatic close:** `defineExpose({ close })` lets a parent close the dropdown after, e.g., selecting an option from a list rendered in the default slot (see Header.vue's `themeDropRef.value?.close()`).

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Text for the default trigger button; also the fallback `aria-label` for it. |
| `triggerAriaLabel` | `string` | `undefined` | Overrides the trigger's `aria-label` (falls back to `label`). |
| `haspopup` | `string` | `'true'` | Value for the trigger's `aria-haspopup` (e.g. `'listbox'`, `'dialog'`). |
| `panelClass` | `string` | `'right-0 top-full mt-1'` | Tailwind classes controlling panel position/size. |
| `panelRole` | `string` | `undefined` | `role` attribute on the panel (e.g. `'dialog'`). |
| `panelAriaLabel` | `string` | `undefined` | `aria-label` on the panel. |

**Emits:** none.

**Slots:** `#trigger` (scoped: `{ open, toggle }`) — custom trigger; default slot — panel content.

**Exposes:** `close()` — closes the dropdown.

## accessibility

- The trigger always gets `aria-haspopup` and `aria-expanded`, whether using the default or a custom trigger (custom triggers must wire these themselves using the scoped slot's `open` value, as Header.vue does).
- The panel only renders `role`/`aria-label` when explicitly passed — for a `listbox` or `dialog` pattern, the caller is responsible for the panel's internal ARIA structure (e.g. `role="listbox"` + `role="option"` on items, as in Header's theme picker).
- Outside-click dismissal does not currently include an Escape-key handler inside Dropdown itself — Header.vue's own accessibility dropdown content doesn't add one either; if a future panel needs Escape-to-close, it must be added explicitly (TimeaAgent.vue's panel has its own separate Escape handler for reference).

## aiHints

- Never duplicate Dropdown's open/close/outside-click logic inline in a new component. If something dropdown-shaped is needed, use this component with a custom `#trigger` slot.
- Both dropdown panels in Header.vue are locked at `w-[289px]` via `panelClass` — this value was iterated to deliberately and must not change without explicit instruction.
- When adding a new dropdown-based UI, decide the correct `haspopup`/`panelRole` combination up front (listbox for an exclusive-choice list, dialog for a settings-style panel) rather than defaulting to `'true'`.

## examples

Custom icon trigger with a listbox panel (Header.vue):

```vue
<Dropdown
  ref="themeDropRef"
  label="Themes"
  trigger-aria-label="Choose theme"
  haspopup="listbox"
  panel-class="left-0 top-full mt-4 w-[289px]"
>
  <template #trigger="{ open, toggle }">
    <button @click="toggle" :aria-expanded="open" aria-haspopup="listbox">
      <IconPalette class="h-4 w-4" />
    </button>
  </template>
  <ul role="listbox">...</ul>
</Dropdown>
```

Default text trigger:

```vue
<Dropdown label="Options">
  <button @click="...">Item</button>
</Dropdown>
```

## composition

- **Header.vue:** two Dropdown instances — theme picker (listbox) and accessibility panel (dialog) — both using custom icon triggers.
