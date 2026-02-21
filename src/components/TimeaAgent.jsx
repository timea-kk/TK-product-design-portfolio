/**
 * TimeaAgent
 * ---------
 * Sticky chat bar: visitors ask questions about Timea's experience. Tries the LLM API first
 * (api/chat.js on Vercel with OPENAI_API_KEY); if that fails or isn't available, falls back
 * to the local keyword knowledge base (timeaAgentKnowledge.js).
 */

import { useState, useRef, useEffect } from 'react';
import { useA11y } from '../context/A11yContext';
import { getAnswerForQuestion } from '../data/timeaAgentKnowledge';

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';

export function TimeaAgent() {
  const { reduceMotion } = useA11y();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = panelRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isThinking) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setIsThinking(true);

    let reply;
    try {
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && typeof data.reply === 'string') {
        reply = data.reply.trim();
      } else {
        reply = getAnswerForQuestion(text);
      }
    } catch {
      reply = getAnswerForQuestion(text);
    }

    if (reduceMotion) {
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      setIsThinking(false);
    } else {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
        setIsThinking(false);
      }, 300);
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-2 pb-2 md:px-4 md:pb-4">
      {/* Single chat field: messages and input inside one box */}
      <div
        className={`flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-lg transition-[box-shadow] focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--color-surface)] ${
          open ? 'ring-2 ring-[var(--color-brand)] ring-offset-2 ring-offset-[var(--color-surface)]' : ''
        }`}
        aria-label="Chat with Timea"
      >
        {/* Messages: scrollable area inside the chat field */}
        <div
          ref={panelRef}
          className="flex max-h-[min(40vh,280px)] min-h-[80px] flex-col gap-3 overflow-y-auto p-4"
        >
          {messages.length === 0 && (
            <p className="text-sm text-[var(--color-muted)]">
              Ask me about my work and experience—e.g. “Where are you based?”, “What do you do at Ecosia?”, “What are your skills?”
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                m.role === 'user'
                  ? 'ml-auto bg-[var(--color-brand)] text-[var(--color-cta-text)]'
                  : 'mr-auto bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)]'
              }`}
            >
              {m.text}
            </div>
          ))}
          {isThinking && (
            <div className="mr-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-muted)]">
              …
            </div>
          )}
        </div>

        {/* Input row: inside the same chat field, at the bottom */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-[var(--color-border)] bg-[var(--color-surface)] p-3"
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
            onFocus={() => setOpen(true)}
            placeholder="Ask me about my work and experience..."
            className="min-w-0 flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2.5 text-sm text-[var(--color-muted)] placeholder-[var(--color-muted)] focus:border-[var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)]"
            autoComplete="off"
            aria-label="Ask Timea about her work and experience"
          />
          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-[var(--color-cta-text)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] disabled:opacity-50"
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
