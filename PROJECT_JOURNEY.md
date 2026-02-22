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

## 📍 Where we are now

- **Site:** One page — hero, themes, a11y, chat bar (pill input → expands on send → 2s thinking dots → reply). No API.
- **Agent:** ~35 entries in `src/data/timeaAgentKnowledge.js`; scoring algorithm; honest fallback. The `api/` folder is still in the repo but not called.
- **Deploy:** GitHub + Vercel; branch workflow; preview URLs. See `AGENT_SETUP.md`.
- **Docs:** `PROJECT_BRIEF.md`, `CV_CONTEXT.md`, `PROJECT_JOURNEY.md`, `AGENT_SETUP.md`, `CLAUDE_CODE_SETUP.md`.

---

## ✏️ How to keep this doc useful

- Add a new milestone when you start a new phase.
- What we built / what went wrong / fix / what I learned / **outcome (always last)**.
- Keep it scannable. 🚀

*Last updated: Feb 2026.*
