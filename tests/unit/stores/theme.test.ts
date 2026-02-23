/**
 * Unit tests for useThemeStore.
 * Verifies that localStorage persistence, HTML class management, and setTheme validation
 * all work correctly.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '@/stores/theme'

describe('useThemeStore', () => {
  beforeEach(() => {
    // Fresh Pinia instance before each test so stores don't bleed state between tests
    setActivePinia(createPinia())
    // Reset the HTML element and storage
    document.documentElement.className = ''
    localStorage.clear()
  })

  it('defaults to the "default" theme', () => {
    const store = useThemeStore()
    expect(store.theme).toBe('default')
  })

  it('applies theme-default class to <html> immediately on init', () => {
    useThemeStore()
    expect(document.documentElement.classList.contains('theme-default')).toBe(true)
  })

  it('exposes all 7 themes in the themes list', () => {
    const store = useThemeStore()
    expect(store.themes).toHaveLength(7)
    expect(store.themes).toContain('default')
    expect(store.themes).toContain('bauhaus')
    expect(store.themes).toContain('terminal')
  })

  it('setTheme switches the active theme', async () => {
    const store = useThemeStore()
    store.setTheme('bauhaus')
    // The watcher is immediate, so the class is applied synchronously on first run
    // but subsequent changes are async — we use await nextTick in the check
    expect(store.theme).toBe('bauhaus')
  })

  it('setTheme removes the old class and adds the new one', async () => {
    const { nextTick } = await import('vue')
    const store = useThemeStore()
    store.setTheme('terminal')
    await nextTick()
    expect(document.documentElement.classList.contains('theme-terminal')).toBe(true)
    expect(document.documentElement.classList.contains('theme-default')).toBe(false)
  })

  it('persists the chosen theme to localStorage', async () => {
    const { nextTick } = await import('vue')
    const store = useThemeStore()
    store.setTheme('retro')
    await nextTick()
    expect(localStorage.getItem('portfolio-theme')).toBe('retro')
  })

  it('loads the saved theme from localStorage on init', () => {
    localStorage.setItem('portfolio-theme', 'sketch')
    const store = useThemeStore()
    expect(store.theme).toBe('sketch')
  })

  it('ignores invalid theme ids and keeps current theme', () => {
    const store = useThemeStore()
    store.setTheme('not-a-real-theme')
    expect(store.theme).toBe('default')
  })

  it('only one theme-* class is present at a time', async () => {
    const { nextTick } = await import('vue')
    const store = useThemeStore()
    store.setTheme('bauhaus')
    await nextTick()
    store.setTheme('material')
    await nextTick()
    const classes = Array.from(document.documentElement.classList)
    const themeClasses = classes.filter((c) => c.startsWith('theme-'))
    expect(themeClasses).toHaveLength(1)
    expect(themeClasses[0]).toBe('theme-material')
  })
})
