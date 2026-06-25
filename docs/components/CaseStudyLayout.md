# CaseStudyLayout

## component

- **name:** CaseStudyLayout
- **category:** Layout
- **description:** Shared shell for every case study page. Renders the dotted "whiteboard" panel, the sticky left section nav, and a centered content column for the page's slot content.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/CaseStudyLayout.vue
- **created:** 2026-04-30
- **updated:** 2026-04-30

## usage

Wrap a case study page's content in CaseStudyLayout and pass `navSections`; fill the default slot with `CaseStudySection` blocks in the same order as `navSections` (DOM order must match nav order for scroll-spy to work correctly).

- Every case study page (EcosiaOnboardingPage, EcosiaBrowserPage, LolsumoPage, FloraDesignSystemPage) uses this layout.
- Do not build a new top-level case study shell; extend this component if a new layout need arises.

## visual

- Full-height (`h-screen`) panel with a dotted background (`radial-gradient` of `rgba(0,0,0,0.13)` dots at `22px` spacing) on `--color-surface-canvas`.
- Rounded corners and a border appear only at `sm` and above; on mobile the panel is edge-to-edge.
- A hidden `w-52` spacer balances the left nav's width on desktop so the content column stays visually centered.

## behavior

- **Scroll container:** the inner `panelRef` div is the actual scrollable element (`overflow-y-auto`), not the page body — `CaseStudyNav`'s scroll-spy and smooth-scroll logic both target this element via `defineExpose({ panelRef })`.
- **Left nav visibility:** `CaseStudyNav` itself hides below `lg` (see CaseStudyNav.vue); CaseStudyLayout doesn't duplicate that logic, it just always renders it.

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `navSections` | `{ id: string; label: string }[]` | — | Passed straight through to `CaseStudyNav`. |

**Emits:** none.

**Slots:** default slot — case study page content, expected to be a sequence of `CaseStudySection` blocks matching `navSections` order.

**Exposes:** `panelRef` — the scrollable container element, for any parent code that needs to read/control scroll position directly.

## accessibility

- Root `<section>` has `aria-labelledby="project-heading"` — every case study page must render an element with `id="project-heading"` (typically the page's H1) for this to resolve correctly.
- Scroll behavior is smooth-scroll based (see CaseStudyNav), which should be checked against reduced-motion preferences at the call site if introduced as an explicit toggle later.

## aiHints

- Never add page-specific markup directly inside CaseStudyLayout. Page-specific content belongs in the slot, inside `CaseStudySection` wrappers.
- The DOM order of `CaseStudySection` children in the slot must exactly match `navSections` order — divergence breaks scroll-spy highlighting in `CaseStudyNav`. This mirrors the same rule enforced for `NAV_SECTIONS` on `DesignSystemPage.vue`.
- Don't forget `id="project-heading"` on the page's heading element — `aria-labelledby` silently fails to resolve without it.

## examples

Typical case study page skeleton:

```vue
<CaseStudyLayout :nav-sections="NAV_SECTIONS">
  <CaseStudySection id="overview" label="Overview">
    <h1 id="project-heading">...</h1>
  </CaseStudySection>
  <CaseStudySection id="problem" label="The Problem">...</CaseStudySection>
</CaseStudyLayout>
```

## composition

- **CaseStudyNav.vue:** rendered internally as the sticky left nav, receiving `navSections` and the exposed `panelRef`.
- **CaseStudySection.vue:** expected (not enforced) as the direct children of the default slot.
- **EcosiaOnboardingPage.vue, EcosiaBrowserPage.vue, LolsumoPage.vue, FloraDesignSystemPage.vue:** consumers.
