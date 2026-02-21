/**
 * RotatingDescriptor
 * -----------------
 * Typewriter effect in the hero: types one phrase (plus space) character by character, then cursor blinks twice,
 * cursor fades out, then the whole block fades and the next phrase types in. Each character gets a theme highlight
 * background (--color-descriptor-bg). Respects reduce-motion: shows first phrase only, no animation.
 */

import { useState, useEffect, useRef } from 'react';
import { useA11y } from '../context/A11yContext';

/** List of phrases that rotate in the headline (e.g. "Growth Product Designer", "Design systems enthusiast"). */
const DESCRIPTORS = [
  'Growth Product Designer',
  'Design systems enthusiast',
  'Coding student',
  'Accessibility advocate',
  'Systems thinker',
];

/** Delay in ms between revealing each character (typewriter speed). */
const TYPE_MS = 70;
/** After typing finishes: time until we start cursor fade (cursor blinks twice in first ~2s, then stays visible, then fades). */
const PAUSE_AFTER_TYPE_MS = 2997;
/** Duration in ms for the cursor to fade out before the whole line fades. */
const CURSOR_FADE_OUT_MS = 400;
/** Duration in ms for the whole descriptor block to fade out before the next phrase appears. */
const FADE_OUT_MS = 350;

/** Returns the string we actually type: phrase plus one trailing space. */
const textToType = (phrase) => phrase + ' ';

export function RotatingDescriptor() {
  /** Index into DESCRIPTORS for the current phrase. */
  const [phraseIndex, setPhraseIndex] = useState(0);
  /** How many characters of the current phrase are visible (0 to fullText.length). */
  const [visibleLength, setVisibleLength] = useState(0);
  /** Lifecycle: 'typing' → 'pause' (blink twice) → 'cursorFadeOut' → 'fadeOut' → back to 'typing'. */
  const [phase, setPhase] = useState('typing');
  const { reduceMotion: a11yReduceMotion } = useA11y();
  /** System preference for reduced motion (we respect both user panel and OS). */
  const [systemReduceMotion, setSystemReduceMotion] = useState(false);
  /** Holds the timeout id so we can clear it on unmount or when dependencies change. */
  const timeoutRef = useRef(null);

  /** Sync with system prefers-reduced-motion so we can disable animations even before user opens a11y panel. */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setSystemReduceMotion(mq.matches);
    const handler = () => setSystemReduceMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const reduceMotion = a11yReduceMotion || systemReduceMotion;
  const phrase = DESCRIPTORS[phraseIndex];
  const fullText = textToType(phrase);

  /** Drives the typewriter and phase transitions via timeouts. Cleans up timeout on re-run or unmount. */
  useEffect(() => {
    if (reduceMotion) {
      setVisibleLength(phrase?.length ?? 0);
      setPhase('pause');
      return;
    }

    const schedule = () => {
      if (phase === 'typing') {
        if (visibleLength < fullText.length) {
          timeoutRef.current = setTimeout(() => setVisibleLength((n) => n + 1), TYPE_MS);
        } else {
          setPhase('pause');
        }
      } else if (phase === 'pause') {
        timeoutRef.current = setTimeout(() => setPhase('cursorFadeOut'), PAUSE_AFTER_TYPE_MS);
      } else if (phase === 'cursorFadeOut') {
        timeoutRef.current = setTimeout(() => setPhase('fadeOut'), CURSOR_FADE_OUT_MS);
      } else if (phase === 'fadeOut') {
        timeoutRef.current = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % DESCRIPTORS.length);
          setVisibleLength(0);
          setPhase('typing');
        }, FADE_OUT_MS);
      }
    };

    schedule();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [reduceMotion, phase, visibleLength, phrase, phraseIndex, fullText]);

  /** When reduce motion is on: show first phrase only, no typewriter or blinking. */
  if (reduceMotion) {
    return (
      <span className="inline-block min-w-[24ch] align-baseline" aria-live="polite" aria-atomic="true">
        {DESCRIPTORS[0]}
      </span>
    );
  }

  const visible = fullText.slice(0, visibleLength);
  /** Cursor is solid while typing; blinks twice in pause; then uses fade-out animation so it doesn't reappear before next phrase. */
  const cursorClass =
    phase === 'pause'
      ? 'cursor-blink-twice'
      : phase === 'cursorFadeOut' || phase === 'fadeOut'
        ? 'cursor-fade-out'
        : '';

  /** Each typed character gets this: theme highlight background and brand text color (see themes for --color-descriptor-bg). */
  const highlightClass = 'bg-[var(--color-descriptor-bg)] py-0.5 text-[var(--color-brand)]';

  return (
    <span
      className={`inline-block min-w-[24ch] align-baseline transition-opacity duration-300 ${
        phase === 'fadeOut' ? 'opacity-0' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      {Array.from(visible, (char, i) => (
        <span key={i} className={highlightClass}>
          {char}
        </span>
      ))}
      <span className={`select-none inline-block ${cursorClass} text-[var(--color-brand)]`} aria-hidden>
        |
      </span>
    </span>
  );
}
