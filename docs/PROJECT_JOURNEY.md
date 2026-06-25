# 🌱 The story of this portfolio

Build journey for **Timea Konya**'s portfolio — what we built, what broke, and how we fixed it.

---

## 🎯 Where it started

- **Goal:** Replace the Framer site with a hand-coded portfolio (professional, accessible, growth/product design).
- **Stack:** Vite, React, Tailwind. No CMS.

---

## 📍 Milestone 1: The foundation

**What we built**
- Hero with typewriter-style rotating descriptors; six themes; accessibility panel (reduce motion, high contrast, text size).

**What the agent learned**
- Comments and docs should be written for a designer, not an engineer. Plain language over jargon.

**Outcome:** ✅ One page, a11y-friendly, ready for more pages.

---

## 📍 Milestone 2: Git and first deploy

**What went wrong**
- Commit got stuck (Cursor opened `COMMIT_EDITMSG`); push failed because no remote was set.

**Fix:** Close the tab, commit in terminal, add GitHub remote, push.

**Outcome:** ✅ Repo on GitHub, deploys via Vercel.

---

## 📍 Milestone 3: The Timea Agent (chat bar)

**What we built**
- v1: keyword matching. v2: OpenAI behind a Vercel API (`/api/chat`) with fallback to keyword list.

**Fix:** System prompt told the model to deduce years of experience from CV dates. Fallback added.

**Outcome:** ✅ Chat that sounds like Timea, with fallback when API isn't there.

---

## 📍 Milestone 4: Teaching the agent everything

**What we built**
- Full CV, Framer content, and personality in `api/timeaSystemPrompt.js`. Answers added to fallback too.

**What the agent learned**
- Check the boring stuff first (env vars, deployed branch, Network tab) before assuming code is wrong.

**Outcome:** ✅ One system prompt + fallback. Agent only uses LLM when the API is actually called.

---

## 📍 Milestone 5: Working on a branch (not main)

**What went wrong**
- Branch didn't appear in Vercel deployments. Live site was still showing old `main`.

**Fix:** Vercel only auto-deploys the production branch. Use preview URL for branch testing, merge to `main` when ready.

**Outcome:** ✅ Branch workflow documented in `AGENT_SETUP.md`.

---

## 📍 Milestone 6: The chat UI

**What we built**
- One rounded input bar; expands upward on send; floating close button.

**Fixes:** Messages area only has height when there's content. The whole input row gets the outline when expanded.

**Outcome:** ✅ One pill bar → expands on send → clear input row → close collapses.

---

## 📍 Milestone 7: The thinking dots

**What we built**
- Three bouncing dots while the agent is thinking. Fixed 2-second delay so dots always show.

**What the agent learned**
- Don't change things you weren't asked to change.

**Outcome:** ✅ Three bouncing dots for 2 seconds, then reply.

---

## 📍 Milestone 8: Localhost and "I don't see any changes"

**Fix:** Set port 5175 with `strictPort: true` in `vite.config.js`. One URL: **http://localhost:5175/**.

**What the agent learned**
- Moving targets (ports, URLs) create confusion. Lock things down.

**Outcome:** ✅ Stable dev URL.

---

## 📍 Milestone 9: Dropping the OpenAI API entirely

**What we built**
- Removed API call entirely. Agent runs 100% locally. Upgraded to scoring-based keyword matching. ~35 entries.

**What the agent learned**
- When something isn't working and the cost isn't worth it, drop it. Don't gold-plate a solution.

**Outcome:** ✅ No API, no cost, no rate limits.

---

## 📍 Milestone 10: Teaching the agent what it actually knows

**What went wrong**
- Agent invented answers for weaknesses, career path, Ecosia culture. Em dashes throughout.

**Fix:** Removed all fabricated entries. Replaced em dashes. Added availability and next role answers with real words.

**Outcome:** ✅ Honest agent. Grounded in real content.

---

## 📍 Milestone 11: QA, bugs, and actually running the code

**What went wrong**
- `>` changed to `>=` in scoring loop meant zero-score entries won, making DEFAULT_ANSWER unreachable. ~15 routing bugs.

**Fix:** `score > 0 && score >= bestScore`. Ran 79 test questions through the function. All routing corrected.

**Outcome:** ✅ 79 questions tested and passing. Agent routes correctly.

---

## 📍 Milestone 12: Dyslexia mode + visual polish

**What we built**
- Dyslexia-friendly option: OpenDyslexic font, wider letter spacing, bigger line height. Retro theme added.

**Fixes:** Targeted CSS for OpenDyslexic alignment. `whitespace-nowrap` on RotatingDescriptor to prevent cursor wrap.

**Outcome:** ✅ Dyslexia mode aligned. Cursor stays on the same line.

---

## 📍 Milestone 13: React → Vue 3 + TypeScript

**What we built**
- Full rewrite: all `.jsx` → `.vue` SFCs. Pinia stores. TypeScript strict mode. 51 Vitest tests. ESLint 9 + Prettier.

**What went wrong**
- Apostrophes inside single-quoted strings in `timeaAgentKnowledge.ts` caused a build error.

**Outcome:** ✅ 51/51 tests passing. Zero TypeScript errors. Clean build.

---

## 📍 Milestone 14: Chat header, hero, scroll indicator

**What we built**
- Gemini API as chat backend with local fallback. Chat header with avatar. Typewriter on replies. Hero fills viewport.

**What went wrong**
- Wrong image filename. Tailwind opacity slash doesn't work with CSS variables. Theme `!important` resets broke avatar radius.

**Outcome:** ✅ Chat polished, loading reliable, hero full-viewport, scroll indicator working.

---

## 📍 Milestone 15: CI/coverage, system prompt refinement, agent fixes

**What we built**
- CI pipeline: 106 Vitest tests + coverage on every PR. Codecov. 70% coverage threshold. Conversation history to Gemini.

**What went wrong**
- `'hi '` trailing space meant "hi" scored 0 and triggered the rejection answer. Gemini quota exhausted silently.

**Outcome:** ✅ 106 tests, CI enforced, greeting fixed, history wired, auto-scroll working.

---

## 📍 Milestone 16: CI/CD pipeline

**What we built**
- 5-job GitHub Actions pipeline: lint → typecheck → test (parallel) → build → deploy (main only via Vercel CLI).

**What went wrong**
- ESLint linted `coverage/` folder. `tseslint.configs.recommended` broke Vue parser for `.vue` files.

**Outcome:** ✅ 5-job pipeline running, all checks green, deploy wired to main.

---

## 📍 Milestone 17: Homepage polish and responsive fixes

**What we built**
- Resume link to Google Drive, LinkedIn wired, headline restructured into a guaranteed 3-line layout.

**Fix:** Two-column layout moved to `lg` breakpoint. `w-full lg:w-auto` on text div. Removed `min-w-[24ch]`.

**Outcome:** ✅ Clean nav, real links, responsive hero, stable 3-line headline.

---

## 📍 Milestone 18: Whiteboard theme branch

**What we built**
- Hero redesigned: Bricolage Grotesque 900, scrollable whiteboard panel (dotted `#f7f6f2`), sticky note photo, Lissajous cursor animation. TimeaAgent rebuilt with GSAP open/close animations and prompt questions.

**What went wrong**
- Pill and panel were in the same flex container, so both existed side-by-side during transition. `flex-1` made gap changes invisible regardless of value.

**Outcome:** ✅ 97 tests passing, whiteboard hero on branch, chat widget rebuilt, CI green.

---

## 📍 Milestone 19: Vue Router + project case study pages

**What we built**
- Vue Router v4 installed. `AppLayout.vue` created as shared shell (Header, TimeaAgent, RouterView). `HomePage.vue` moved to `src/pages/` and stripped to content-only. `EcosiaOnboardingPage.vue` added at `/work/ecosia-onboarding` with the full Ecosia onboarding case study.
- Project page layout: scrollable whiteboard panel, sticky left nav (IntersectionObserver scroll-spy), white Figma-frame section cards, FigJam-style floating labels above each card.

**What went wrong**
- IntersectionObserver used viewport as root instead of the scroll container, so active section detection was wrong. `scrollIntoView` scrolled the window, not the panel. Labels overlapped cards when position math didn't account for `space-y-16` adding margin only to non-first children.
- Scroll alignment took many iterations: the fix was `mt-[35px]` on the first card (no automatic `space-y` margin) with `padding-top: 40px` on the flex container, so label top = 40px = nav sticky top.

**Outcome:** ✅ 98 tests passing, routing works, project page live, scroll-spy nav correct.

---

## 📍 Milestone 20: Ecosia Onboarding case study content

**What we built**
- Full case study page with four sections: Problem, Strategy, Execution, and Experimentation. Interactive step cards with inline images, cross-fade image transitions, FigJam sticky notes, and stat cards.
- Mobile-responsive layout throughout: sticky notes replaced with bullet lists on small screens, cards stacked vertically, inline images per card, and spacing tuned for mobile breakpoints.

**What went wrong**
- Cross-fade animation on Execution section cards broke the interaction model and had to be reverted. Mobile inline images required a wrapper div pattern to sit correctly inside the card flow.

**Outcome:** ✅ All 117 tests passing. Full case study live and responsive across breakpoints.

---

## 📍 Milestone 21: Security audit and Claude Code session setup

**What we built**
- Audited the Vercel API endpoint and chat component. Fixed a CORS wildcard vulnerability, added message schema validation for conversation history, sanitized error messages to prevent information leakage, and added HTTP status validation before JSON parsing in the frontend.
- Added Claude Code session instruction files: `behavior.md`, `memory.md`, `git.md`, and `environment.md`. These are read at the start of every session and define how Claude Code should behave, handle memory, run git operations, and confirm environment state.

**What went wrong**
- Tests for the chat component had to be updated to include the HTTP `ok` property on mocked fetch responses, which the new status check required.

**Outcome:** ✅ All high-severity vulnerabilities resolved. Session behaviour rules in place. No regressions.

---

## 📍 Milestone 22: Flora Design System case study + Portfolio Design System page

**What we built**
- Full Flora case study (`/work/flora-design-system`): ownership model, CardTimeline for initiatives, ImageCarousel, and a co-ownership section.
- Portfolio Design System page (`/design-system`): live token browser with hover states, component demos, and a scroll-spy nav. Design tokens renamed for consistency. Agent config files (`developer.yml`, `writer.yml`, `design-system.yml`) introduced.

**What went wrong**
- DS page section order diverged from `NAV_SECTIONS` array, breaking scroll-spy highlighting. Fixed by enforcing a rule: DOM order must exactly match nav order.

**Outcome:** ✅ Flora case study live. Design System page live and documented. 185 tests passing.

---

## 📍 Milestone 23: Ecosia Browser and Lolsumo case studies

**What we built**
- Ecosia Browser case study (`/work/ecosia-browser`): context, problem, research, concept, and launch sections with images and video.
- Lolsumo case study (`/work/lolsumo`): full page from scratch.
- Responsive centering fixed across all case study pages at the `lg` breakpoint.

**What went wrong**
- Carousel images referenced the wrong index range (11-13 instead of 14-16). Fixed by correcting asset references.

**Outcome:** ✅ All four case study pages live.

---

## 📍 Milestone 24: Homepage — layout, decorations, and side projects

**What we built**
- Full homepage (`/`): hero above-the-fold with rotating descriptors, stat cards, decorative SVGs (paperclips, pins, squiggles, dotted paths), side projects section with CardProject cards, and a footer card with columns.
- All portfolio images converted to WebP at 950px. Videos re-encoded and compressed.
- `CardProject` extended with `mediaPosition`, `textMinHeight`, and `wideBreakpoint` props. Hover-lift and title-underline-on-hover removed permanently.

**What went wrong**
- Index-based positioning for decorative elements cascaded badly when any item was added or removed. Refactored everything to absolute coordinates.
- Hero overlap on mobile Safari required explicit `min-h-[100svh]` handling.

**Outcome:** ✅ Homepage complete. All assets optimised.

---

## 📍 Milestone 25: Testimonials carousel

**What we built**
- `InfiniteCardSlider.vue`: GSAP-driven infinite carousel of testimonial sticky notes. Each testimonial is a cluster of `StickyNote` components with per-note absolute offsets, author pills, and quote marks. Mobile layout collapses to a simpler stacked view.

**What went wrong**
- Square sticky notes for longer quotes failed twice (overflow-hidden approach, then a binary search capped at 168px). Landed on explicit `noSquare` flag per note.
- Author pill repositioning on one note cascaded to adjacent notes unexpectedly; required coordinated counter-offsets.

**Outcome:** ✅ Testimonials carousel live. Absolute positioning throughout.

---

## 📍 Milestone 26: Shared footer and See also cards

**What we built**
- `FooterSection.vue`: shared footer card placed inside each page's content column so it inherits width automatically at all breakpoints.
- See also section on every project and design system page, cross-linked in a ring: Onboarding → Flora → Browser → Lolsumo → Design System → Onboarding. Uses `wideBreakpoint` prop so both the card and footer switch to mobile layout below 1440px.

**What went wrong**
- Placing the footer outside the content column caused width misalignment. Fix: move it inside.

**Outcome:** ✅ Footer and See also on all pages. 291 tests passing.

---

## 📍 Milestone 27: Making the design system AI-ready

**What we built**
- Consolidated ButtonPrimary/ButtonOutline into a single Button component with a `variant` prop, then wrote its LLM-readable doc (component/usage/visual/behavior/props/accessibility/aiHints/examples/composition) as the template for the rest.
- Installed the design-system-ops skill pack, ran a system-health assessment, and used the AI-readiness gap it surfaced (1 of 21 components documented) to roll the same doc format out to the remaining 20 components — plus a live Stats section on the Design System page showing the health table and a current-state summary.

**What went wrong**
- The first health check correctly flagged the gap as Weak — closing it meant reading each component's actual source and usage across the codebase to write accurate docs, not templating guesses.

**Outcome:** ✅ All 21 components documented in `docs/components/`. AI readiness and Documentation both moved to Strong on re-assessment.

---

## 📍 Where we are now — v1 complete

- **Site:** Full whiteboard-themed portfolio. Four case studies, Design System page, and a complete homepage with testimonials, side projects, and decorations. Shared footer and cross-linked See also cards on every page. Chat widget with Gemini API and local fallback.
- **Stack:** Vue 3 + TypeScript + Pinia + Tailwind + Vite. Vue Router v4. Vitest + @vue/test-utils. ESLint 9 + Prettier. GSAP.
- **Deploy:** GitHub + Vercel; 5-job CI/CD pipeline. 291 tests, 100% branch coverage enforced by pre-commit hook and Codecov.
- **Docs:** `PROJECT_BRIEF.md`, `CV_CONTEXT.md`, `PROJECT_JOURNEY.md`, `AGENT_SETUP.md`, `README.md`, plus LLM-readable per-component docs in `docs/components/` (21 of 21). Agent config in `agents/`. Claude Code session rules in `~/.claude/`.

---

## ✏️ How to keep this doc useful

- Add a new milestone when you start a new phase.
- What we built / what went wrong / fix / outcome (always last).
- Keep it scannable. Max 2 bullet points per section.

*Last updated: Jun 2026. v1 shipped.*
