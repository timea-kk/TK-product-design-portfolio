import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DesignSystemPage from '@/pages/DesignSystemPage.vue'

const NAV_SECTION_IDS = [
  'foundations', 'callout-card', 'interactive-card', 'sticky-note',
  'stat-card', 'case-study-section', 'case-study-nav', 'header',
  'timea-agent', 'patterns',
]

beforeEach(() => {
  Element.prototype.scrollTo = vi.fn()
  window.matchMedia = vi.fn().mockReturnValue({ matches: false })
  Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
    top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0,
  })
})

describe('DesignSystemPage', () => {
  it('mounts without errors', () => {
    const wrapper = mount(DesignSystemPage)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders a nav button for every section', () => {
    const wrapper = mount(DesignSystemPage)
    // The page's own CaseStudyNav is the first nav; the demo nav inside the page adds extra buttons.
    const firstNav = wrapper.find('nav')
    const buttons = firstNav.findAll('button')
    expect(buttons).toHaveLength(NAV_SECTION_IDS.length)
  })

  it('renders the main heading', () => {
    const wrapper = mount(DesignSystemPage)
    expect(wrapper.find('h1').text()).toContain('Portfolio Design System')
  })

  it('renders a section element for every section id', () => {
    const wrapper = mount(DesignSystemPage)
    for (const id of NAV_SECTION_IDS) {
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    }
  })
})
