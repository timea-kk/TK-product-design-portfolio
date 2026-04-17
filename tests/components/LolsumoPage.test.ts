/**
 * Component tests for LolsumoPage.vue.
 * Covers: nav rendering, section card structure, heading.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LolsumoPage from '@/pages/LolsumoPage.vue'

const SECTION_IDS = [
  'overview', 'context', 'problem', 'approach',
  'research', 'community', 'casual', 'advanced', 'pro', 'revenue', 'results',
]

const NAV_LABELS = [
  'Overview', 'Context', 'The Problem', 'My Approach',
  'Research', 'Community', 'Casual Players', 'Advanced Players', 'PRO Features', 'Revenue', 'Results',
]

beforeEach(() => {
  Element.prototype.scrollTo = vi.fn()
  window.matchMedia = vi.fn().mockReturnValue({ matches: false })
  Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
    top: 500, bottom: 600, left: 0, right: 0, width: 800, height: 100,
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('LolsumoPage', () => {
  it('renders a nav button for every section', () => {
    const wrapper = mount(LolsumoPage)
    const buttons = wrapper.findAll('nav button')
    expect(buttons).toHaveLength(SECTION_IDS.length)
  })

  it('renders nav labels in the correct order', () => {
    const wrapper = mount(LolsumoPage)
    const labels = wrapper.findAll('nav button').map(b => b.text())
    expect(labels).toEqual(NAV_LABELS)
  })

  it('renders a section for every section id', () => {
    const wrapper = mount(LolsumoPage)
    for (const id of SECTION_IDS) {
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    }
  })

  it('renders the main heading', () => {
    const wrapper = mount(LolsumoPage)
    expect(wrapper.find('h1').text()).toContain('Lolsumo: a coaching app for League of Legends')
  })
})
