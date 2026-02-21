/**
 * A11yPanel
 * ---------
 * Dropdown panel opened from the header accessibility button. Lets users set: reduce motion,
 * high contrast, and text size (90%–130%). All values are stored in A11yContext and applied
 * as CSS variables/classes on <html> (see A11yContext and index.css).
 */

import { useA11y } from '../context/A11yContext';

export function A11yPanel({ onClose }) {
  const a11y = useA11y();

  return (
    <div
      role="dialog"
      aria-label="Accessibility options"
      className="border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-4"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={a11y.reduceMotion}
            onChange={(e) => a11y.update({ reduceMotion: e.target.checked })}
            className="h-4 w-4 rounded border-[var(--color-border)]"
          />
          <span className="text-sm">Reduce motion</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={a11y.highContrast}
            onChange={(e) => a11y.update({ highContrast: e.target.checked })}
            className="h-4 w-4 rounded border-[var(--color-border)]"
          />
          <span className="text-sm">High contrast</span>
        </label>
        <div className="flex items-center gap-2">
          <label htmlFor="a11y-text-scale" className="text-sm">
            Text size
          </label>
          <select
            id="a11y-text-scale"
            value={a11y.textScale}
            onChange={(e) => a11y.update({ textScale: Number(e.target.value) })}
            className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-sm"
          >
            <option value={0.9}>90%</option>
            <option value={1}>100%</option>
            <option value={1.1}>110%</option>
            <option value={1.2}>120%</option>
            <option value={1.3}>130%</option>
          </select>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded px-3 py-1 text-sm font-medium text-[var(--color-brand)] hover:underline focus-visible:outline-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}
