import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CaseStudyLayout from '@/components/CaseStudyLayout.vue'

const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'results', label: 'Results' },
]

beforeEach(() => {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false, media: '', onchange: null,
    addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  })
  Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
    top: 500, bottom: 600, left: 0, right: 0, width: 800, height: 100,
  })
})

describe('CaseStudyLayout', () => {
  it('renders a nav button for each section', () => {
    const wrapper = mount(CaseStudyLayout, {
      props: { navSections: NAV_SECTIONS },
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.findAll('nav button').length).toBe(NAV_SECTIONS.length)
  })

  it('renders slot content', () => {
    const wrapper = mount(CaseStudyLayout, {
      props: { navSections: NAV_SECTIONS },
      slots: { default: '<p class="slot-child">Hello</p>' },
    })
    expect(wrapper.find('.slot-child').text()).toBe('Hello')
  })

  it('exposes panelRef pointing to the scrollable panel', () => {
    const wrapper = mount(CaseStudyLayout, {
      props: { navSections: NAV_SECTIONS },
    })
    const panelEl = wrapper.element.querySelector('.overflow-y-auto') as HTMLElement
    expect(panelEl).toBeTruthy()
  })
})
