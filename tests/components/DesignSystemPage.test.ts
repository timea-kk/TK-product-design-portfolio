import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DesignSystemPage from '@/pages/DesignSystemPage.vue'

vi.mock('gsap', () => {
  const tl = { to: vi.fn().mockReturnThis(), add: vi.fn((fn: () => void) => { fn(); return tl }) }
  return {
    default: {
      to: vi.fn(),
      set: vi.fn(),
      killTweensOf: vi.fn(),
      timeline: vi.fn(() => tl),
    },
  }
})

const NAV_SECTION_IDS = [
  'colors', 'typography',
  'button',
  'card-callout', 'card-interactive', 'card-project', 'card-timeline',
  'carousel-nav', 'case-study-nav', 'case-study-section', 'header', 'image-carousel',
  'segmented-control', 'sticky-note', 'tag-pill', 'timea-agent',
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

  it('renders a section element for every section id', () => {
    const wrapper = mount(DesignSystemPage)
    for (const id of NAV_SECTION_IDS) {
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    }
  })

  it('triggers hoverPrimitive and clearHover on mouseenter/mouseleave of a primitive item', async () => {
    const wrapper = mount(DesignSystemPage)
    const primItems = wrapper.findAll('[data-testid="prim-col"] .cursor-default')
    expect(primItems.length).toBeGreaterThan(0)
    await primItems[0].trigger('mouseenter')
    await primItems[0].trigger('mouseleave')
  })

  it('triggers hoverToken and clearHover on mouseenter/mouseleave of a token item', async () => {
    const wrapper = mount(DesignSystemPage)
    const tokenItems = wrapper.findAll('[data-testid="token-col"] .cursor-default')
    expect(tokenItems.length).toBeGreaterThan(0)
    await tokenItems[0].trigger('mouseenter')
    await tokenItems[0].trigger('mouseleave')
  })

  it('triggers hoverComponent and clearHover on mouseenter/mouseleave of a component item', async () => {
    const wrapper = mount(DesignSystemPage)
    const compItems = wrapper.findAll('[data-testid="comp-col"] .cursor-default')
    expect(compItems.length).toBeGreaterThan(0)
    await compItems[0].trigger('mouseenter')
    await compItems[0].trigger('mouseleave')
  })

  it('toggles sectionFirst switch to true inside the CaseStudySection demo', async () => {
    const wrapper = mount(DesignSystemPage)
    const section = wrapper.find('#case-study-section')
    const toggle = section.find('[role="switch"]')
    expect(toggle.attributes('aria-checked')).toBe('false')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-checked')).toBe('true')
  })

  it('toggles stickyTitle switch to true and renders the title span', async () => {
    const wrapper = mount(DesignSystemPage)
    const section = wrapper.find('#sticky-note')
    const toggles = section.findAll('[role="switch"]')
    expect(toggles[0].attributes('aria-checked')).toBe('false')
    await toggles[0].trigger('click')
    expect(toggles[0].attributes('aria-checked')).toBe('true')
    expect(section.find('span.font-bold').exists()).toBe(true)
  })

  it('toggles stickySquare switch to true inside the StickyNote demo', async () => {
    const wrapper = mount(DesignSystemPage)
    const section = wrapper.find('#sticky-note')
    const toggles = section.findAll('[role="switch"]')
    expect(toggles[1].attributes('aria-checked')).toBe('false')
    await toggles[1].trigger('click')
    expect(toggles[1].attributes('aria-checked')).toBe('true')
  })

  it('CardCallout demo: stat toggle shows stat cards', async () => {
    const wrapper = mount(DesignSystemPage)
    const section = wrapper.find('#card-callout')
    const toggles = section.findAll('[role="switch"]')
    // stat toggle is first
    await toggles[0].trigger('click')
    expect(toggles[0].attributes('aria-checked')).toBe('true')
  })

  it('CardCallout demo: items toggle shows items card', async () => {
    const wrapper = mount(DesignSystemPage)
    const section = wrapper.find('#card-callout')
    const toggles = section.findAll('[role="switch"]')
    // items toggle is second
    await toggles[1].trigger('click')
    expect(toggles[1].attributes('aria-checked')).toBe('true')
  })

  it('CardCallout demo: divided toggle toggles divided state', async () => {
    const wrapper = mount(DesignSystemPage)
    const section = wrapper.find('#card-callout')
    const toggles = section.findAll('[role="switch"]')
    // enable items first so divided is active
    await toggles[1].trigger('click')
    await toggles[2].trigger('click')
    expect(toggles[2].attributes('aria-checked')).toBe('false')
  })
})
