import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DesignSystemPage from '@/pages/DesignSystemPage.vue'

const NAV_SECTION_IDS = [
  'colors', 'typography',
  'card-callout', 'card-interactive', 'card-stat',
  'case-study-nav', 'case-study-section', 'header',
  'sticky-note', 'timea-agent',
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
    const grid = wrapper.find('.grid-cols-3')
    const primItems = grid.findAll('.space-y-1')[0].findAll('.cursor-default')
    expect(primItems.length).toBeGreaterThan(0)
    await primItems[0].trigger('mouseenter')
    await primItems[0].trigger('mouseleave')
  })

  it('triggers hoverToken and clearHover on mouseenter/mouseleave of a token item', async () => {
    const wrapper = mount(DesignSystemPage)
    const grid = wrapper.find('.grid-cols-3')
    const tokenItems = grid.findAll('.space-y-1')[1].findAll('.cursor-default')
    expect(tokenItems.length).toBeGreaterThan(0)
    await tokenItems[0].trigger('mouseenter')
    await tokenItems[0].trigger('mouseleave')
  })

  it('triggers hoverComponent and clearHover on mouseenter/mouseleave of a component item', async () => {
    const wrapper = mount(DesignSystemPage)
    const grid = wrapper.find('.grid-cols-3')
    const compItems = grid.findAll('.space-y-1')[2].findAll('.cursor-default')
    expect(compItems.length).toBeGreaterThan(0)
    await compItems[0].trigger('mouseenter')
    await compItems[0].trigger('mouseleave')
  })
})
