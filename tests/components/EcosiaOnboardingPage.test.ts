/**
 * Component tests for EcosiaOnboardingPage.vue.
 * Scroll spy uses a scroll event listener — tests trigger scroll events
 * and mock getBoundingClientRect to control which sections are "active".
 * Tests cover: nav rendering, scroll-spy active-section logic,
 * scrollToSection behaviour, listener teardown, and section card structure.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import EcosiaOnboardingPage from '@/pages/EcosiaOnboardingPage.vue'

// ── Section IDs (must match component) ───────────────────────────────────────

const SECTION_IDS = [
  'overview', 'problem', 'challenge', 'research',
  'opportunities', 'experimentation', 'strategy', 'execution', 'results',
]

// ── Setup / teardown ──────────────────────────────────────────────────────────

let attachTarget: HTMLDivElement

beforeEach(() => {
  Element.prototype.scrollTo = vi.fn()
  // Default: all rects return top: 500 (above threshold when panel top = 0, clientHeight = 0)
  Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
    top: 500, bottom: 600, left: 0, right: 0, width: 800, height: 100,
  })
  attachTarget = document.createElement('div')
  document.body.appendChild(attachTarget)
})

afterEach(() => {
  attachTarget.remove()
  vi.restoreAllMocks()
})

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Mount the component attached to the document so document.getElementById
 * finds the real section elements rendered by the component.
 */
function mountAttached() {
  return mount(EcosiaOnboardingPage, { attachTo: attachTarget })
}

/**
 * Mock section getBoundingClientRect so that the listed sections have
 * top ≤ threshold (panel.top + clientHeight * 0.4).
 * With jsdom clientHeight = 0, threshold = panel.getBoundingClientRect().top.
 * We mock the panel to return top: 0 → threshold = 0.
 * Active sections get top: -1 (≤ 0), inactive get top: 500 (> 0).
 */
function setupScrollPositions(
  wrapper: ReturnType<typeof mountAttached>,
  activeSectionIds: string[],
) {
  const panelEl = (wrapper.vm as unknown as { $refs: { panelRef: HTMLElement } }).$refs.panelRef
  vi.spyOn(panelEl, 'getBoundingClientRect').mockReturnValue({
    top: 0, bottom: 800, left: 0, right: 0, width: 1200, height: 0,
  } as DOMRect)

  SECTION_IDS.forEach(id => {
    const el = document.getElementById(id)
    if (el) {
      vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
        top: activeSectionIds.includes(id) ? -1 : 500,
        bottom: 0, left: 0, right: 0, width: 0, height: 0,
      } as DOMRect)
    }
  })
}

async function triggerScroll(wrapper: ReturnType<typeof mountAttached>) {
  const panelEl = (wrapper.vm as unknown as { $refs: { panelRef: HTMLElement } }).$refs.panelRef
  panelEl.dispatchEvent(new Event('scroll'))
  await wrapper.vm.$nextTick()
}

// ── Nav rendering ─────────────────────────────────────────────────────────────

describe('EcosiaOnboardingPage — nav rendering', () => {
  it('renders a button for every section', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    expect(wrapper.findAll('nav button').length).toBe(9)
  })

  it('renders labels in the correct order', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const labels = wrapper.findAll('nav button').map(b => b.text())
    expect(labels).toEqual([
      'Overview', 'The Problem', 'The Approach', 'Research',
      'Opportunities', 'Experimentation', 'Strategy', 'Execution', 'Results',
    ])
  })

  it('defaults to overview as the active nav item', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const buttons = wrapper.findAll('nav button')
    expect(buttons[0].classes()).toContain('font-semibold')
    expect(buttons[1].classes()).not.toContain('font-semibold')
  })
})

// ── Scroll spy ────────────────────────────────────────────────────────────────

describe('EcosiaOnboardingPage — scroll spy', () => {
  it('activates the last section whose top edge has passed the threshold', async () => {
    const wrapper = mountAttached()
    setupScrollPositions(wrapper, ['overview', 'problem', 'challenge', 'research'])
    await triggerScroll(wrapper)

    const researchBtn = wrapper.findAll('nav button').find(b => b.text() === 'Research')
    expect(researchBtn?.classes()).toContain('font-semibold')
  })

  it('activates overview when no section has passed the threshold', async () => {
    const wrapper = mountAttached()
    setupScrollPositions(wrapper, []) // no section active
    await triggerScroll(wrapper)

    expect(wrapper.findAll('nav button')[0].classes()).toContain('font-semibold')
  })

  it('activates the last section when scrolled to the bottom', async () => {
    const wrapper = mountAttached()
    setupScrollPositions(wrapper, SECTION_IDS) // all sections passed
    await triggerScroll(wrapper)

    const resultsBtn = wrapper.findAll('nav button').find(b => b.text() === 'Results')
    expect(resultsBtn?.classes()).toContain('font-semibold')
  })

  it('updates active section on each scroll event', async () => {
    const wrapper = mountAttached()

    setupScrollPositions(wrapper, ['overview', 'problem'])
    await triggerScroll(wrapper)
    const problemBtn = wrapper.findAll('nav button').find(b => b.text() === 'The Problem')
    expect(problemBtn?.classes()).toContain('font-semibold')

    setupScrollPositions(wrapper, ['overview', 'problem', 'challenge', 'research', 'opportunities'])
    await triggerScroll(wrapper)
    const opportunitiesBtn = wrapper.findAll('nav button').find(b => b.text() === 'Opportunities')
    expect(opportunitiesBtn?.classes()).toContain('font-semibold')
  })

  it('activates a mid-page section correctly', async () => {
    const wrapper = mountAttached()
    setupScrollPositions(wrapper, ['overview', 'problem', 'challenge'])
    await triggerScroll(wrapper)

    const approachBtn = wrapper.findAll('nav button').find(b => b.text() === 'The Approach')
    expect(approachBtn?.classes()).toContain('font-semibold')
  })
})

// ── scrollToSection ───────────────────────────────────────────────────────────

describe('EcosiaOnboardingPage — scrollToSection', () => {
  it('calls scrollTo on the panel when a nav button is clicked', async () => {
    const wrapper = mountAttached()
    const panelEl = (wrapper.vm as unknown as { $refs: { panelRef: HTMLElement } }).$refs.panelRef
    const scrollToMock = vi.fn()
    panelEl.scrollTo = scrollToMock

    await wrapper.findAll('nav button')[1].trigger('click') // "The Problem"
    expect(scrollToMock).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth' }))
  })
})

// ── Lifecycle ─────────────────────────────────────────────────────────────────

describe('EcosiaOnboardingPage — lifecycle', () => {
  it('adds a scroll listener on mount', () => {
    const addSpy = vi.spyOn(HTMLElement.prototype, 'addEventListener')
    mountAttached()
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), expect.objectContaining({ passive: true }))
  })

  it('removes the scroll listener on unmount', () => {
    const removeSpy = vi.spyOn(HTMLElement.prototype, 'removeEventListener')
    const wrapper = mountAttached()
    wrapper.unmount()
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})

// ── Section cards ─────────────────────────────────────────────────────────────

describe('EcosiaOnboardingPage — section cards', () => {
  it('renders a card for every section', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    SECTION_IDS.forEach(id => {
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    })
  })

  it('renders the main heading', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    expect(wrapper.find('h1').text()).toContain('Ecosia')
  })

  it('renders the TL;DR section', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    expect(wrapper.html()).toContain('TL;DR')
  })

  it('renders all three strategy phase cards', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const strategySection = wrapper.find('#strategy')
    expect(strategySection.html()).toContain('Value perception')
    expect(strategySection.html()).toContain('Value experience')
    expect(strategySection.html()).toContain('Value adoption')
  })
})
