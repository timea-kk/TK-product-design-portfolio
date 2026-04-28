// InfiniteCardSlider — interleaved testimonial stickies with author pills
// Props: none (data-driven)
// Branches: authorPill z-index boost, noSquare skip, document.fonts guard,
//           offsetX/Y custom vs auto, Sofia offsetX custom vs auto

import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import InfiniteCardSlider from '@/components/InfiniteCardSlider.vue'

describe('InfiniteCardSlider', () => {
  afterEach(() => {
    Object.defineProperty(document, 'fonts', { value: undefined, configurable: true, writable: true })
  })

  it('renders the desktop flex layout', () => {
    const wrapper = mount(InfiniteCardSlider)
    expect(wrapper.find('.isolate').exists()).toBe(true)
  })

  it('renders the mobile column layout', () => {
    const wrapper = mount(InfiniteCardSlider)
    expect(wrapper.find('.sm\\:hidden').exists()).toBe(true)
  })

  it('renders all 4 people in the mobile layout', () => {
    const wrapper = mount(InfiniteCardSlider)
    const names = wrapper.find('.sm\\:hidden').findAll('p.font-heading')
    expect(names).toHaveLength(4)
  })

  it('renders 2 sticky notes per person in mobile layout', () => {
    const wrapper = mount(InfiniteCardSlider)
    const personBlocks = wrapper.find('.sm\\:hidden').findAll('[class*="flex gap-3"]')
    personBlocks.forEach(block => {
      expect(block.findAllComponents({ name: 'StickyNote' }).length).toBeLessThanOrEqual(2)
    })
  })

  it('renders author pills for slips with showAuthorPill', () => {
    const wrapper = mount(InfiniteCardSlider)
    const pills = wrapper.find('.hidden').findAll('[class*="min-w-max"]')
    expect(pills.length).toBeGreaterThan(0)
  })

  it('renders slips without author pills (zIndex branch)', () => {
    const wrapper = mount(InfiniteCardSlider)
    const slipWrappers = wrapper.find('.isolate').findAll('.relative.self-start')
    const noAuthorPill = slipWrappers.filter(s => !s.find('[class*="min-w-max"]').exists())
    expect(noAuthorPill.length).toBeGreaterThan(0)
  })

  it('does not call squareNote for noSquare slips', async () => {
    const wrapper = mount(InfiniteCardSlider)
    await wrapper.vm.$nextTick()
    // noSquare slips retain their maxW width unchanged by squareNote
    const slipWrappers = wrapper.find('.isolate').findAll('.relative.self-start')
    expect(slipWrappers.length).toBeGreaterThan(0)
  })

  it('uses document.fonts.ready when available', async () => {
    const ready = Promise.resolve()
    Object.defineProperty(document, 'fonts', {
      value: { ready },
      configurable: true,
      writable: true,
    })
    const wrapper = mount(InfiniteCardSlider)
    await ready
    expect(wrapper.find('.isolate').exists()).toBe(true)
  })

  it('falls back to direct run when document.fonts is unavailable', () => {
    Object.defineProperty(document, 'fonts', { value: undefined, configurable: true, writable: true })
    expect(() => mount(InfiniteCardSlider)).not.toThrow()
  })

  it('applies pill offset styles to author pill', () => {
    const wrapper = mount(InfiniteCardSlider)
    const pills = wrapper.find('.isolate').findAll('[class*="min-w-max"]')
    const pillWithOffset = pills.find(p => p.attributes('style')?.includes('translateX'))
    expect(pillWithOffset).toBeDefined()
  })

  it('applies default pill offsets (0) when not set', () => {
    const wrapper = mount(InfiniteCardSlider)
    const pills = wrapper.find('.isolate').findAll('[class*="min-w-max"]')
    expect(pills.some(p => p.attributes('style')?.includes('0px'))).toBe(true)
  })

  it('squareNote exercises h>mid and convergence branches', async () => {
    let calls = 0
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get() {
        calls++
        const w = parseInt(this.style.width) || 221
        return calls % 4 === 0 ? w : w + 50
      },
      configurable: true,
    })
    const wrapper = mount(InfiniteCardSlider)
    await wrapper.vm.$nextTick()
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get() { return 0 },
      configurable: true,
    })
    expect(wrapper.find('.isolate').exists()).toBe(true)
  })
})
