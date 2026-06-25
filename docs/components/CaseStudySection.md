# CaseStudySection

## component

- **name:** CaseStudySection
- **category:** Navigation
- **description:** White rounded card wrapper used for every section of a case study page, with a floating brand-colored label tab above it. Also the structural unit that `CaseStudyNav`'s scroll-spy targets.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/CaseStudySection.vue
- **created:** 2026-04-03
- **updated:** 2026-04-30

## usage

- Wrap every distinct section of a case study (or the DesignSystemPage) in a CaseStudySection.
- `id` must match the corresponding entry in the page's `NAV_SECTIONS`/`navSections` array exactly, and the DOM order of CaseStudySection blocks must match that array's order.
- `label` is the floating tab text — keep it short, it's positioned absolutely and doesn't wrap.

## visual

- White rounded card: `rounded-2xl bg-white border border-black/[0.06]`, generous padding (`px-5 py-8 sm:px-10 sm:py-10`).
- The `label` renders as a small pill positioned `absolute -top-[35px] left-0`, overlapping the top-left corner of the card.
- `scroll-mt-24` ensures the section doesn't end up hidden under any fixed header when scrolled to directly (e.g. via URL hash or nav click).

## behavior

- Purely structural — no internal state, no computed values. The `id` and `label` props go straight onto the DOM with no transformation.

## props

| Prop | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | — | DOM id; must match the page's nav-sections entry for this section. |
| `label` | `string` | — | Text shown in the floating label tab above the card. |

**Emits:** none.

**Slots:** default slot — the section's full content.

## accessibility

- No landmark role of its own; it's a generic `<div>`. If a section needs to be a labelled region for assistive tech, add `aria-labelledby` pointing at an internal heading at the call site.
- The floating label is decorative/visual orientation only — it duplicates information that should also exist as a proper heading inside the slot content (e.g. an `<h2>`), since the label itself isn't marked up as a heading.

## aiHints

- Never use a generic `<div>` with inline section styling as a substitute for CaseStudySection in a case study page — extend or use this component so the floating label and scroll-spy targeting stay consistent.
- Don't rely on the floating `label` text alone for accessible section identification — always include a real heading inside the slot too.
- If a section needs to render a heading, place it as the first child inside the slot, styled per the page's existing `font-heading text-2xl font-bold text-[var(--color-text-primary)]` convention (see DesignSystemPage.vue's Overview section for the pattern).

## examples

```vue
<CaseStudySection id="overview" label="Overview">
  <h1 id="project-heading" class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Project Title</h1>
  <p class="text-[var(--color-text-secondary)] leading-relaxed">...</p>
</CaseStudySection>
```

## composition

- **CaseStudyLayout.vue:** expects a sequence of CaseStudySection blocks as its default slot content.
- **DesignSystemPage.vue:** uses CaseStudySection directly (not via CaseStudyLayout) for every documented section, including this one's own demo.
- **CaseStudyNav.vue:** indirectly depends on every `id` here existing, for its scroll-spy and click-to-scroll logic.
