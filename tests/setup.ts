/**
 * tests/setup.ts – Global test setup.
 * Runs before every test file. Mocks browser APIs that jsdom doesn't implement
 * but that our stores and components depend on.
 */

import { vi } from 'vitest'

/**
 * jsdom doesn't implement window.matchMedia, but RotatingDescriptor uses it to
 * detect prefers-reduced-motion. This mock makes it always return false (no preference)
 * so tests work without needing to configure media queries.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated but some libraries still call it
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
