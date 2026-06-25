# Header

## component

- **name:** Header
- **category:** Navigation
- **description:** Floating pill-shaped main navigation bar, fixed to the top of every page. Contains the theme switcher and accessibility panel (both via Dropdown), plus Work/Fun/LinkedIn/Resume links.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/Header.vue
- **created:** 2026-02-23
- **updated:** 2026-04-29

## usage

Rendered once, globally, by `AppLayout.vue`. Never import Header into an individual page.

- The "Fun" link scrolls to `#side-projects` on the home page (`scrollToFun`), or navigates there as a normal anchor link from any other page.
- Theme options are filtered to a fixed allowlist (`'default', 'neo-brutalism', 'material'`) even though `themeStore.themes` may contain more.

## visual

- Fixed, centered pill: `fixed top-4 left-1/2 -translate-x-1/2`, `rounded-full` nav bar with `shadow-lg`.
- Theme/accessibility trigger icons switch to brand color when their dropdown is open, secondary color otherwise.

## behavior

- **Theme selection:** clicking a theme option calls `themeStore.setTheme(id)` then immediately closes the dropdown via the `themeDropRef.value?.close()` exposed method.
- **Accessibility toggles:** reduce-motion and dyslexia-friendly are checkboxes bound directly to `a11y.reduceMotion`/`a11y.dyslexia`, updated via `a11y.update({...})` on change — Header does not hold this state itself.
- **Scroll-to-fun:** only intercepts the click (`e.preventDefault()`) when already on `/`; otherwise it's a normal navigation to `/#side-projects`.

## props

None.

**Emits:** none.

**Slots:** none.

## accessibility

- Nav has `aria-label="Main"`; the whole element is `<header role="banner">`.
- Both icon-only trigger buttons (theme, accessibility) have explicit `aria-label`s, `aria-haspopup`, and `aria-expanded` synced to dropdown open state.
- The theme listbox uses `role="listbox"`/`role="option"` with `aria-selected` reflecting the active theme; the accessibility panel uses `role="dialog"`.
- Both Dropdown panels are locked at `w-[289px]` — a deliberate, final value from iteration; do not change it.

## aiHints

- Never hardcode a new nav link without checking whether it should scroll-to-anchor (like Fun) or navigate normally — `scrollToFun`'s route-check pattern is the template for any future same-page-anchor link.
- Don't add new themes to the visible picker without updating the `filteredThemes` allowlist — adding a theme to `themeStore.themes` alone will not surface it here.
- Do not change either Dropdown panel's `w-[289px]` width.
- Reduce-motion/dyslexia toggles must stay wired directly to the `useA11yStore` actions — never introduce local component state that could drift from the store.

## examples

```vue
<!-- AppLayout.vue -->
<Header />
```

## composition

- **Dropdown.vue:** two instances — theme picker and accessibility panel — each with a custom icon trigger via the `#trigger` slot.
- **useThemeStore, useA11yStore:** Pinia stores Header reads from and writes to directly.
- **AppLayout.vue:** the only consumer.
