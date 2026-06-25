# FooterSection

## component

- **name:** FooterSection
- **category:** Layout
- **description:** Shared footer card with contact info, navigation links, external links, and a "how I made this" repo callout. Placed inside each page's content column so it inherits that column's width at every breakpoint automatically.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/FooterSection.vue
- **created:** 2026-04-30
- **updated:** 2026-04-30

## usage

Render once near the end of a page's content, inside the same content column as the rest of the page (it has no props, so it relies entirely on the parent's layout context for sizing).

- Do not place FooterSection outside a page's normal content column — it has `w-full` but no max-width of its own.
- All link targets (email, nav anchors, LinkedIn, GitHub, resume) are currently hardcoded; there is no prop-based configuration.

## visual

- White rounded card (`rounded-2xl bg-white border border-black/[0.06]`) with a large floating "Thanks for stopping by!" label tab, similar in spirit to CaseStudySection's label but bigger and with a 5px violet border.
- A decorative wave image (`/main-page/wave.png`) is absolutely positioned in the corner, `aria-hidden`.
- 4-column grid on wide screens (`min-[1440px]:grid-cols-4`), collapsing to 2 then 1 column at smaller widths.
- The fourth column is a dark "how I made this" callout styled like a terminal snippet (`font-mono`, dark background).

## behavior

No reactive state — fully static markup with hardcoded links.

## props

None.

**Emits:** none.

**Slots:** none.

## accessibility

- The decorative wave image has `alt=""` and `aria-hidden="true"`, correctly excluded from the accessibility tree.
- Several links currently point to `href="#"` placeholders (LinkedIn, GitHub) rather than real URLs — flag this if real profile links become available, since `href="#"` is not a meaningful destination for assistive tech or keyboard users.
- External links (GitHub repo, resume) use `target="_blank" rel="noopener noreferrer"` correctly.

## aiHints

- Do not parameterize this component with props unless a second footer variant is actually needed — it is intentionally a single hardcoded instance, not a configurable component.
- If real LinkedIn/GitHub profile URLs are provided, update the `href="#"` placeholders directly in this file.
- Never wrap FooterSection in its own max-width container — it's designed to inherit the page's existing content column width.

## examples

```vue
<!-- near the end of a page's content column -->
<FooterSection />
```

## composition

- Used at the end of case study pages and the home page, inside their respective content columns. No child components.
