# TimeaAgent

## component

- **name:** TimeaAgent
- **category:** Agent
- **description:** Sticky chat widget rendered globally at the bottom of every page. Collapsed: a centered pill. Expanded: a panel with three prompt questions (shown before any messages) and a full chat thread. Sends questions to the Gemini API via `/api/chat` and falls back to a local scoring-based knowledge base when the API is unavailable.
- **type:** Vue 3 SFC (script setup, TypeScript)
- **path:** src/components/TimeaAgent.vue
- **created:** 2026-02-23
- **updated:** 2026-04-30

## usage

Rendered once, globally, by `AppLayout.vue`. Never import TimeaAgent into an individual page.

- No props — all behavior (prompt questions, fallback answers) is internal/hardcoded for this portfolio's specific Q&A use case.
- The fallback knowledge base (`getAnswerForQuestion`, in `src/data/timeaAgentKnowledge.ts`) is what answers questions when `/api/chat` is unreachable or errors — keep it reasonably in sync with what the Gemini-backed API would say, since either path can serve any given question.

## visual

- Collapsed pill: rounded, bordered, with the avatar image and "Get to know Timea" text, fixed to the bottom center.
- Expanded panel: rounded `3xl` card, max-width `md`, with a brand-colored header bar, a scrollable message thread (capped at `min(40vh, 280px)`), and a pill-shaped input row.
- User messages are right-aligned on a brand-colored background; assistant messages are left-aligned on a light violet background.
- A 3-dot "thinking" indicator (`timea-agent-dot`, staggered bounce animation) shows while waiting for a reply.

## behavior

- **Collapse/expand:** `expanded` is local boolean state; opening is triggered by clicking the pill or a prompt question, closing by the Close button or `Escape` (a `keydown` listener is attached on mount and removed on unmount).
- **Sending a message:** `sendMessage` pushes the user message immediately, sets `isThinking`, then races a minimum 1.5s delay (`minDelay`) against the actual fetch — this guarantees the thinking indicator is visible for at least 1.5s even if the API responds instantly, avoiding a jarring instant-reply feel.
- **Fallback:** any fetch failure or non-OK response falls back to `getAnswerForQuestion(text)` from the local knowledge base; a successful response without a `reply` field also falls back to the same function.
- **Typewriter reply:** once a reply is ready, `startTyping` reveals it character-by-character on an 18ms interval (separate from, and faster than, RotatingDescriptor's typing effect), tracked by `typingIndex`/`typingText` so only the most recent assistant message animates.
- **Auto-scroll:** a watcher on `[messages, isThinking, typingText]` scrolls the message panel to the bottom after each DOM update.
- **Transitions:** pill and panel each have custom GSAP enter/leave hooks (`:css="false"` on the `<Transition>`) rather than CSS transition classes, for spring-like easing (`back.out(1.4)` on panel enter).

## props

None.

**Emits:** none.

**Slots:** none.

## accessibility

- The input has a visually-hidden `<label for="timea-agent-input">` describing its purpose, in addition to the visible placeholder.
- `Escape` closes the expanded panel from anywhere on the page while it's open, not just while focus is inside it.
- The send button is `disabled` (with `aria-label="Send message"`) whenever the input is empty or a reply is pending, preventing duplicate in-flight requests.
- The thinking-dots indicator is `aria-hidden="true"` since it conveys no information beyond what `isThinking` already implies contextually.
- GSAP transition hooks are marked `/* v8 ignore start/stop */` in tests for coverage purposes, but contain no reduced-motion check — unlike RotatingDescriptor, this component's animations do not currently respect `prefers-reduced-motion` or the app's reduce-motion setting. Worth flagging as a gap if/when this is revisited.

## aiHints

- Never remove the `minDelay` race in `sendMessage`. It's a deliberate UX choice (consistent minimum thinking time), not incidental latency.
- Keep `src/data/timeaAgentKnowledge.ts`'s fallback answers reasonably current with whatever the Gemini prompt/context actually knows — both paths can answer the same question depending on API availability, and they should not contradict each other.
- Do not add new top-level props. This component is intentionally a single hardcoded instance for this specific portfolio's Q&A persona, not a generic chat-widget component.
- If adding new animations, check `useA11yStore`'s reduce-motion setting and `prefers-reduced-motion` first — this component currently does not, which is a known gap, not an intentional decision to copy forward into new code.

## examples

```vue
<!-- AppLayout.vue -->
<TimeaAgent />
```

## composition

- **getAnswerForQuestion (src/data/timeaAgentKnowledge.ts):** local fallback knowledge base.
- **/api/chat:** serverless function backed by the Gemini API.
- **AppLayout.vue:** the only consumer.
