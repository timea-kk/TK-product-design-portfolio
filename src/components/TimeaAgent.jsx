/**
 * TimeaAgent
 * ---------
 * Single rounded input bar: placeholder + input + submit button inside one field.
 * After the user sends a question, the bar expands vertically to show the thread,
 * with a floating close button. Answers are matched locally via scoring keywords —
 * no API or backend required.
 */

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useA11y } from '../context/A11yContext';
import { getAnswerForQuestion } from '../data/timeaAgentKnowledge';

const PLACEHOLDER = 'Ask about my experience, work at Ecosia, or how to reach me';

export function TimeaAgent() {
  const { reduceMotion } = useA11y();
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = panelRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isThinking) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setExpanded(true);
    setIsThinking(true);

    const reply = getAnswerForQuestion(text);

    // Always keep the thinking dots visible for 2s (fixed delay so it's reliable)
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      setIsThinking(false);
    }, 2000);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-2 pb-2 md:px-4 md:pb-4">
      {/* Single rounded bar; expands to show thread when user has sent a message */}
      <div
        className={`relative flex w-full max-w-2xl flex-col overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-lg transition-[box-shadow] focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--color-surface)] ${expanded ? 'rounded-3xl' : 'rounded-full'}`}
        aria-label="Chat with Timea"
      >
        {/* Floating close button when expanded */}
        {expanded && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-surface-elevated)]/90 text-[var(--color-muted)] shadow-sm backdrop-blur-sm hover:bg-[var(--color-surface)] hover:text-[var(--color-headline)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}

        {/* Messages: only visible when expanded */}
        {expanded && (
          <div
            ref={panelRef}
            className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-12 pb-2"
            style={{ maxHeight: 'min(40vh, 280px)' }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.role === 'user'
                    ? 'ml-auto bg-[var(--color-brand)] text-[var(--color-cta-text)]'
                    : 'mr-auto border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)]'
                }`}
              >
                {m.text}
              </div>
            ))}
            {isThinking && (
              <div className="mr-auto flex items-center gap-0.5 text-xl text-[var(--color-muted)]" aria-hidden>
                <span className="timea-agent-dot">.</span>
                <span className="timea-agent-dot">.</span>
                <span className="timea-agent-dot">.</span>
              </div>
            )}
          </div>
        )}

        {/* Single row: input + submit. When expanded, give this row its own outline and background so it reads as one input field + action. */}
        <form
          onSubmit={handleSubmit}
          className={`flex items-center gap-2 p-2 ${expanded ? 'rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] mx-2 mb-2' : ''}`}
        >
          <label htmlFor="timea-agent-input" className="sr-only">
            Ask Timea about her work and experience
          </label>
          <input
            ref={inputRef}
            id="timea-agent-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={PLACEHOLDER}
            className="min-w-0 flex-1 border-0 bg-transparent px-4 py-2.5 text-sm text-[var(--color-headline)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-0"
            autoComplete="off"
            aria-label="Ask Timea about her work and experience"
          />
          <button
            type="submit"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-[var(--color-cta-text)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] disabled:opacity-50"
            aria-label="Send message"
            disabled={!input.trim() || isThinking}
          >
            <span aria-hidden>↑</span>
          </button>
        </form>
      </div>
    </div>
  );
}
