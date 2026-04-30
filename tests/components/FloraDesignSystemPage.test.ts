/**
 * Component tests for FloraDesignSystemPage.vue.
 * Covers: nav rendering, section card structure, heading, TL;DR.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FloraDesignSystemPage from '@/pages/FloraDesignSystemPage.vue'

vi.mock('gsap', () => ({
  default: {
    to: vi.fn(),
    set: vi.fn(),
    killTweensOf: vi.fn(),
    timeline: vi.fn(() => ({ to: vi.fn().mockReturnThis() })),
  },
}))

const SECTION_IDS = [
  'overview', 'context', 'problem',
  'process', 'establishing-ownership', 'contribution-model', 'ds-health', 'evolving-system',
  'contribution', 'results',
]

beforeEach(() => {
  Element.prototype.scrollTo = vi.fn()
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false, media: '', onchange: null,
    addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  })
  Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
    top: 500, bottom: 600, left: 0, right: 0, width: 800, height: 100,
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('FloraDesignSystemPage', () => {
  it('renders a nav button for every section', () => {
    const wrapper = mount(FloraDesignSystemPage)
    const buttons = wrapper.findAll('nav button')
    expect(buttons).toHaveLength(SECTION_IDS.length)
  })

  it('renders nav labels in the correct order', () => {
    const wrapper = mount(FloraDesignSystemPage)
    const labels = wrapper.findAll('nav button').map(b => b.text())
    expect(labels).toEqual([
      'Overview', 'Context', 'The Problem',
      'My Approach', 'Ownership', 'Contribution', 'DS Health', 'Evolution',
      'Highlight', 'Results',
    ])
  })

  it('renders a section card for every section id', () => {
    const wrapper = mount(FloraDesignSystemPage)
    for (const id of SECTION_IDS) {
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    }
  })

  it('renders the main heading', () => {
    const wrapper = mount(FloraDesignSystemPage)
    expect(wrapper.find('h1').text()).toContain('Scaling Design Operations at Ecosia')
  })

  it('renders the TL;DR section', () => {
    const wrapper = mount(FloraDesignSystemPage)
    expect(wrapper.find('h2').text()).toContain('TL;DR')
  })
})
