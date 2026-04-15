/**
 * Component tests for EcosiaBrowserPage.vue.
 * Covers: nav rendering, section card structure, heading.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import EcosiaBrowserPage from '@/pages/EcosiaBrowserPage.vue'

const SECTION_IDS = [
  'overview', 'context', 'problem', 'challenge',
  'research', 'features', 'concept', 'refinement', 'launch', 'design-system', 'results',
]

const NAV_LABELS = [
  'Overview', 'Context', 'The Problem', 'My Approach',
  'Research', 'Features', 'Concept', 'Refinement', 'Launch', 'Design System', 'Results',
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

describe('EcosiaBrowserPage', () => {
  it('renders a nav button for every section', () => {
    const wrapper = mount(EcosiaBrowserPage)
    const buttons = wrapper.findAll('nav button')
    expect(buttons).toHaveLength(SECTION_IDS.length)
  })

  it('renders nav labels in the correct order', () => {
    const wrapper = mount(EcosiaBrowserPage)
    const labels = wrapper.findAll('nav button').map(b => b.text())
    expect(labels).toEqual(NAV_LABELS)
  })

  it('renders a section for every section id', () => {
    const wrapper = mount(EcosiaBrowserPage)
    for (const id of SECTION_IDS) {
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    }
  })

  it('renders the main heading', () => {
    const wrapper = mount(EcosiaBrowserPage)
    expect(wrapper.find('h1').text()).toContain('Install Funnel for the Ecosia Browser')
  })
})
