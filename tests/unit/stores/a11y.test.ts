/**
 * Unit tests for useA11yStore.
 * Verifies CSS class toggling, CSS variable setting, localStorage persistence,
 * and the update() partial-patch API.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { useA11yStore } from '@/stores/a11y'

describe('useA11yStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.className = ''
    document.documentElement.removeAttribute('style')
    localStorage.clear()
  })

  it('has correct defaults', () => {
    const store = useA11yStore()
    expect(store.reduceMotion).toBe(false)
    expect(store.highContrast).toBe(false)
    expect(store.textScale).toBe(1)
    expect(store.dyslexia).toBe(false)
  })

  it('applies the default CSS variables on init', () => {
    useA11yStore()
    expect(document.documentElement.style.getPropertyValue('--a11y-text-scale')).toBe('1')
    expect(document.documentElement.style.getPropertyValue('--a11y-motion')).toBe('1')
    expect(document.documentElement.style.getPropertyValue('--a11y-contrast')).toBe('0')
  })

  it('update({ reduceMotion: true }) adds reduced-motion-none class', async () => {
    const store = useA11yStore()
    store.update({ reduceMotion: true })
    await nextTick()
    expect(store.reduceMotion).toBe(true)
    expect(document.documentElement.classList.contains('reduced-motion-none')).toBe(true)
    expect(document.documentElement.style.getPropertyValue('--a11y-motion')).toBe('0')
  })

  it('update({ reduceMotion: false }) removes reduced-motion-none class', async () => {
    const store = useA11yStore()
    store.update({ reduceMotion: true })
    await nextTick()
    store.update({ reduceMotion: false })
    await nextTick()
    expect(document.documentElement.classList.contains('reduced-motion-none')).toBe(false)
  })

  it('update({ highContrast: true }) adds a11y-high-contrast class', async () => {
    const store = useA11yStore()
    store.update({ highContrast: true })
    await nextTick()
    expect(document.documentElement.classList.contains('a11y-high-contrast')).toBe(true)
    expect(document.documentElement.style.getPropertyValue('--a11y-contrast')).toBe('1')
  })

  it('update({ dyslexia: true }) adds a11y-dyslexia class', async () => {
    const store = useA11yStore()
    store.update({ dyslexia: true })
    await nextTick()
    expect(document.documentElement.classList.contains('a11y-dyslexia')).toBe(true)
  })

  it('update({ textScale: 1.2 }) sets the CSS variable', async () => {
    const store = useA11yStore()
    store.update({ textScale: 1.2 })
    await nextTick()
    expect(store.textScale).toBe(1.2)
    expect(document.documentElement.style.getPropertyValue('--a11y-text-scale')).toBe('1.2')
  })

  it('persists preferences to localStorage after update', async () => {
    const store = useA11yStore()
    store.update({ highContrast: true, textScale: 1.1 })
    await nextTick()
    const saved = JSON.parse(localStorage.getItem('portfolio-a11y')!)
    expect(saved.highContrast).toBe(true)
    expect(saved.textScale).toBe(1.1)
  })

  it('loads saved preferences from localStorage on init', () => {
    localStorage.setItem(
      'portfolio-a11y',
      JSON.stringify({ reduceMotion: true, highContrast: false, textScale: 1.3, dyslexia: false }),
    )
    const store = useA11yStore()
    expect(store.reduceMotion).toBe(true)
    expect(store.textScale).toBe(1.3)
  })

  it('clamps textScale to valid range when loaded from storage', () => {
    localStorage.setItem('portfolio-a11y', JSON.stringify({ textScale: 99 }))
    const store = useA11yStore()
    expect(store.textScale).toBe(1.3) // clamped to max
  })

  it('update() only changes the specified keys, leaving others unchanged', async () => {
    const store = useA11yStore()
    store.update({ highContrast: true })
    await nextTick()
    // reduceMotion, textScale, dyslexia should still be at defaults
    expect(store.reduceMotion).toBe(false)
    expect(store.textScale).toBe(1)
    expect(store.dyslexia).toBe(false)
  })
})
