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

## 📍 Where we are now

- **Site:** Whiteboard-themed portfolio. Hero page + full Ecosia Onboarding case study (four sections, mobile-responsive, interactive cards). Sticky left nav with scroll-spy. Chat widget (pill → GSAP panel → typewriter reply). Gemini API, local fallback.
- **Stack:** Vue 3 + TypeScript + Pinia + Tailwind + Vite. Vue Router v4. Vitest + @vue/test-utils. ESLint 9 + Prettier. GSAP. Motion.
- **Deploy:** GitHub + Vercel; 5-job CI/CD pipeline. See `AGENT_SETUP.md`.
- **Docs:** `PROJECT_BRIEF.md`, `CV_CONTEXT.md`, `PROJECT_JOURNEY.md`, `AGENT_SETUP.md`, `CLAUDE_CODE_SETUP.md`, `README.md`. Claude Code session rules in `~/.claude/`.

---

## ✏️ How to keep this doc useful

- Add a new milestone when you start a new phase.
- What we built / what went wrong / fix / outcome (always last).
- Keep it scannable. Max 2 bullet points per section.

*Last updated: Mar 2026.*
