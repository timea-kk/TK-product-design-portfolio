# 🌱 The story of this portfolio

Build journey for **Timea Konya**'s portfolio — what we built, what broke, and how we fixed it.

---

## 🎯 Where it started

- **Goal:** Replace the Framer site with a hand-coded portfolio (professional, accessible, growth/product design).
- **Stack:** Vite, React, Tailwind. No CMS.
- **References:** `PROJECT_BRIEF.md`, `CV_CONTEXT.md`, and the live Framer site for content.

---

## 📍 Milestone 1: The foundation

**What we built**
- Hero with typewriter-style rotating descriptors; cursor blinks twice at end of phrase, then fades.
- Six themes (e.g. Bauhaus, Terminal); colors/fonts theme-aware.
- Accessibility panel: reduce motion, high contrast, text size.

**What the agent learned**
- You want comments in code and documentation written for a designer, not an engineer. Plain language over jargon.

**Outcome:** ✅ One page, a11y-friendly, ready for more pages.

---

## 📍 Milestone 2: Git and first deploy

**What went wrong**
- Commit got stuck (Cursor opened `COMMIT_EDITMSG`; commit never finished). Push failed because no remote was set.

**Fix:** Close the tab, commit in terminal, add GitHub remote, push.

**What the agent learned**
- Deployment isn't magic. You need to know why the live site only updates when the right branch is pushed.

**Outcome:** ✅ Repo on GitHub, deploys via Vercel.

---

## 📍 Milestone 3: The Timea Agent (chat bar)

**What we built**
- v1: keyword matching only. v2: OpenAI behind a Vercel API (`/api/chat`) with fallback to keyword list.

**What went wrong**
- Agent didn't know how many years of experience you had, and mentioned print work.

**Fix:** System prompt told the model to deduce from CV dates. Fallback answer added too.

**What the agent learned**
- Answers need to sound like you. Not corporate, not generic. First person, calm, direct.

**Outcome:** ✅ Chat that sounds like Timea, with fallback when API isn't there.

---

## 📍 Milestone 4: Teaching the agent everything

**What we built**
- Full CV, Framer content (About, onboarding, Design Ops/Flora, Ecosia Browser), and personality in `api/timeaSystemPrompt.js`.

**What went wrong**
- Agent still said "I'm not sure" for things it should know. Turned out the API wasn't being called at all (wrong branch deployed, missing env vars).

**Fix:** Documented in `AGENT_SETUP.md`. Added those answers to fallback too.

**What the agent learned**
- When something doesn't work, check the boring stuff first (env vars, deployed branch, Network tab) before assuming the code is wrong.

**Outcome:** ✅ One system prompt + fallback. Agent only uses LLM when the API is actually called.

---

## 📍 Milestone 5: Working on a branch (not main)

**What went wrong**
- Branch `refining-TimeaAgent` didn't appear in Vercel deployments. Live site was still showing old `main`.

**Fix:** Vercel only auto-deploys the production branch. Use the preview URL for branch testing, then merge to `main` when happy.

**What the agent learned**
- You need to understand the why, not just the fix. Telling you "use the preview URL" without explaining why Vercel works that way would leave you stuck next time.

**Outcome:** ✅ Branch workflow documented in `AGENT_SETUP.md`.

---

## 📍 Milestone 6: The chat UI

**Aim:** One rounded input bar; expands upward on send; floating close button.

**What went wrong**
- Empty rectangle above input (leftover min-height). Input + button had no outline when expanded. Input itself got a border it shouldn't have.

**Fixes:** Messages area only has height when there's content. The whole input row gets the outline when expanded, not the input element itself.

**What the agent learned**
- You notice small visual things immediately. "Extra field inside the input" was a one-pixel detail, but it was wrong and you caught it. Precision matters.

**Outcome:** ✅ One pill bar → expands on send → clear input row → close collapses.

---

## 📍 Milestone 7: The thinking dots

**Aim:** Three bouncing dots while the agent is "thinking."

**What went wrong**
- Dots flashed away instantly because the fallback is synchronous. Then they were made too small.

**Fix:** Fixed 2-second delay so dots always show, regardless of how fast the answer comes. Bigger dots, bounce animation, respects reduce motion.

**What the agent learned**
- Don't change things you weren't asked to change. The agent adjusted the delay without being asked and got called out on it. Touch only what was asked.

**Outcome:** ✅ Three bouncing dots for 2 seconds, then reply.

---

## 📍 Milestone 8: Localhost and "I don't see any changes"

**What went wrong**
- Dev server kept picking new ports (5173 → 5174 → 5175). Wrong URL = old code.

**Fix:** Set port 5175 with `strictPort: true` in `vite.config.js`. One URL: **http://localhost:5175/**. Hard refresh or private window if still seeing old code.

**What the agent learned**
- You need a reliable, repeatable setup. Moving targets (ports, URLs) create confusion. Lock things down.

**Outcome:** ✅ Stable dev URL.

---

## 📍 Milestone 9: Dropping the OpenAI API entirely

**Why**
- OpenAI free tier kept hitting rate limits (429s), so the fallback ran anyway. No point paying for API calls on a portfolio.

**What we built**
- Removed the API call from `TimeaAgent.jsx` entirely. Agent now runs 100% locally.
- Upgraded keyword matching from first-match to **scoring-based**: each entry scores points for every keyword found in the message; highest scorer wins.
- Expanded knowledge base from ~24 to ~35 entries.

**What the agent learned**
- You're pragmatic. When something isn't working and the cost isn't worth it, you drop it. Don't gold-plate a solution when a simpler one does the job.

**Outcome:** ✅ No API, no cost, no rate limits.

---

## 📍 Milestone 10: Teaching the agent what it actually knows

**What went wrong**
- Agent invented answers for: weaknesses, advice for juniors, career path, Ecosia culture. None of it was in the CV.
- Answers had em dashes. You don't want em dashes.
- "When can you start?" and "What are you looking for in your next role?" had no answers at all.

**Rule established:** Only add answers that come from the CV or that you explicitly provide. If we don't know it, we don't write it.

**Fixes:** Removed all fabricated entries. Replaced em dashes across all answers. Added availability (May 2026) and next role answer with your own words.

**What the agent learned**
- You'd rather the agent say "I don't know, email me" than make something up. Accuracy over completeness.

**Outcome:** ✅ Honest agent. Grounded in real content.

---

## 📍 Milestone 11: QA, bugs, and actually running the code

**What went wrong**
- The previous "QA" was static code analysis, not real testing. Several questions routed to the wrong answer or DEFAULT because of keyword logic issues.
- Critical bug: changing `>` to `>=` in the scoring loop meant zero-score entries still "won," making DEFAULT_ANSWER unreachable. The Hobbies entry was winning everything that didn't match.

**Fixes**
- Changed condition to `score > 0 && score >= bestScore`. DEFAULT_ANSWER reachable again.
- Fixed ~15 routing bugs found by actually running 79 test questions through the function.
- Updated salary answer to redirect to email without acknowledging rates. Updated remote/hybrid answer to reflect real preference: remote preferred, open to hybrid in Berlin.

**What the agent learned**
- "QA" means asking it questions and reading the answers, not reading the code. When you said "I'm tired of finding these bugs myself," that was direct feedback to do the actual work, not a shortcut version of it.

**Outcome:** ✅ 79 questions tested and passing. Agent routes correctly.

---

## 📍 Milestone 12: Dyslexia mode + visual polish

**What we built**
- Dyslexia-friendly option in the A11y panel: OpenDyslexic font, wider letter spacing, bigger line height.
- Retro theme.

**What went wrong**
- "Hi, I'm" + Logo SVG lost vertical alignment in dyslexia mode — OpenDyslexic's bigger line-height pushed the paragraph below the SVG baseline.
- Typing cursor jumped to the next line mid-word for long descriptors like "design system enthusiast."

**Fixes:** Targeted CSS in the dyslexia section (`.flex > p { line-height: 1; margin-bottom: 0; }`). Added `whitespace-nowrap` to the RotatingDescriptor span.

**What the agent learned**
- You catch one-pixel issues immediately. Precision matters more than speed.

**Outcome:** ✅ Dyslexia mode aligned. Cursor stays on the same line.

---

## 📍 Milestone 13: React → Vue 3 + TypeScript

**Why**
- React worked but Vue 3 is a cleaner fit — less boilerplate, Composition API reads like the logic it describes. Wanted TypeScript, automated tests, and consistent formatting locked in.

**What we built**
- Full rewrite: all `.jsx` components → `.vue` SFCs with `<script setup lang="ts">`.
- Replaced React Context with Pinia stores. TypeScript strict mode throughout.
- 51 Vitest tests (knowledge scoring, stores, components). ESLint 9 + Prettier. README rewritten.

**What went wrong**
- Apostrophes inside single-quoted strings in `timeaAgentKnowledge.ts` caused a build error (`Expected } but found m`) on words like `I'm` and `I'd`.

**Fix:** Changed those strings to double quotes. Prettier's `singleQuote: true` switches automatically — run the formatter before building.

**What the agent learned**
- The test suite is the net that catches regressions. Write tests before shipping, not after finding bugs.

**Outcome:** ✅ 51/51 tests passing. Zero TypeScript errors. Clean build.

---

## 📍 Milestone 14: Chat header, hero, scroll indicator

**What we built**
- Switched to @tabler/icons-vue (`IconPalette`, `IconAccessible`).
- Gemini API wired as chat backend; local knowledge base as fallback.
- TimeaAgent chat header: brand-color strip, larger avatar, name, subtitle, pill Close button.
- 1.5s minimum loading delay (held in `finally` block so dots always show).
- Typewriter animation on assistant replies.
- Hero fills the viewport; projects pushed below fold.
- Scroll-wheel SVG indicator that fades on scroll; hero content shifted up for balance.

**What went wrong**
- Site broke: wrong image filename (`timea.jpeg` vs `timea.jpg`).
- Tailwind opacity slash (`/85`) doesn't work with CSS variables. Used standalone `opacity-75`.
- Retro theme had black CTA text on a blue background. Changed `--color-cta-text` to `#ffffff`.
- Retro and neo-brutalism `border-radius: 0 !important` made the avatar square. Fixed with targeted `img.rounded-full` override.
- Bauhaus had a `border-bottom: 4px solid` on all headers. Removed.

**What the agent learned**
- `!important` theme resets silently break unrelated components. Check all themes visually after touching theme CSS.

**Outcome:** ✅ Chat polished, loading reliable, hero full-viewport, scroll indicator working.

---

## 📍 Milestone 15: CI/coverage, system prompt refinement, agent fixes

**What we built**
- CI pipeline (GitHub Actions): runs 106 Vitest tests + coverage on every PR to main. Codecov integration. 70% coverage threshold blocks deploys.
- New tests for Logo, Header, HomePage, TimeaAgent, App — coverage up from ~40% to 86%+ functions.
- Conversation history passed to Gemini so it has context to rephrase repeated questions.
- Auto-scroll during typewriter animation (was only scrolling when a message landed, not while text was being typed).

**What went wrong**
- `'hi '` (trailing space) in greeting keywords meant a bare "hi" message scored 0 and fell through to the default rejection answer.
- Greeting rule was ordered after the off-topic rejection rule, so "hi" triggered "That's outside what I can answer" before reaching the greeting logic.
- Gemini was being called stateless (no history) — "vary your answers" instruction was impossible to follow without conversation context.
- Daily Gemini free-tier quota exhausted during testing (1,500 req/day). All responses were silently coming from the local static fallback, not Gemini.

**Fix:** Removed trailing space from `'hi'` keyword. Moved greeting rule to top of system prompt. Added `history` to API request; API maps prior messages to Gemini's `contents` format. Added "before Ecosia" entry to local fallback so pre-Ecosia role questions no longer return the Ecosia answer. Created a new Gemini API key for fresh quota.

**What the agent learned**
- Static fallback answers always look correct until you realise Gemini hasn't been called once. Check the Network tab, not just the UI.

**Outcome:** ✅ 106 tests, CI enforced, greeting fixed, history wired, auto-scroll working.

---

## 📍 Milestone 16: CI/CD pipeline

**What we built**
- 5-job GitHub Actions pipeline: lint, typecheck, and test run in parallel → build → deploy (main only).
- Deploy uses Vercel CLI + GitHub secrets. Vercel auto-deploy disabled (`exit 1`) so the pipeline is the only thing that publishes the site.

**What went wrong**
- ESLint was linting the `coverage/` folder (generated files, shouldn't be checked).
- `tseslint.configs.recommended` overrides the Vue parser for `.vue` files — all components failed with "Type expected". Fix: scope tseslint to `**/*.ts` only.

**What I learned**
- More jobs = better visibility and faster runs (parallel). One big job hides which checks actually passed.
- Vercel deploys on its own even when you have GitHub Actions — you have to explicitly turn it off.

**Outcome:** ✅ 5-job pipeline running, all checks green, deploy wired to main.

---

## 📍 Milestone 17: Homepage polish and responsive fixes

**What we built**
- Nav: Resume link (header + footer) → Google Drive, opens in new tab. LinkedIn wired up. "About Me" hidden. Scroll indicator and placeholder projects hidden.
- Hero: new photo, updated descriptors (Senior Product Designer, Designer who codes), headline restructured into a guaranteed 3-line layout.

**What went wrong**
- Image cut off on the right at 800–1200px: `w-full` on the text div forced 100% width in flex-row, pushing the image off-screen. Also `min-w-[24ch]` on the descriptor created a large blank gap mid-headline for short phrases.

**Fixes**
- Two-column layout moved to `lg` (1024px) breakpoint; text div uses `w-full lg:w-auto`. Removed `min-w-[24ch]`. h1 split into three `<span class="block">` lines.

**What I learned**
- `w-full` on a flex child in a row layout overrides flex sizing. Use `lg:w-auto` to restore it on desktop.

**Outcome:** ✅ Clean nav, real links, responsive hero, stable 3-line headline.

---

## 📍 Where we are now

- **Site:** One page — hero (full viewport, photo, 3-line typewriter headline, bio), 7 themes, a11y panel, chat bar (pill → expands → dots → typewriter reply). Projects and scroll indicator hidden until content is ready. Gemini API, local fallback.
- **Stack:** Vue 3 + TypeScript + Pinia + Tailwind + Vite. Vitest + @vue/test-utils. ESLint 9 + Prettier.
- **Agent:** ~35 entries in `src/data/timeaAgentKnowledge.ts`; scoring algorithm; honest fallback.
- **Deploy:** GitHub + Vercel; 5-job CI/CD pipeline (lint → typecheck → test → build → deploy). See `AGENT_SETUP.md`.
- **Docs:** `PROJECT_BRIEF.md`, `CV_CONTEXT.md`, `PROJECT_JOURNEY.md`, `AGENT_SETUP.md`, `CLAUDE_CODE_SETUP.md`, `README.md`.

---

## ✏️ How to keep this doc useful

- Add a new milestone when you start a new phase.
- What we built / what went wrong / fix / what I learned / **outcome (always last)**.
- Keep it scannable.

*Last updated: Mar 2026.*
