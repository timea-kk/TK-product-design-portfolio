/**
 * Component tests for EcosiaOnboardingPage.vue.
 * Scroll spy uses a scroll event listener — tests mock document.getElementById
 * and getBoundingClientRect to control which sections are "active", then
 * dispatch a scroll event on the panel ref.
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

beforeEach(() => {
  Element.prototype.scrollTo = vi.fn()
  Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
    top: 500, bottom: 600, left: 0, right: 0, width: 800, height: 100,
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

// ── Helpers ───────────────────────────────────────────────────────────────────

type Wrapper = ReturnType<typeof mount<typeof EcosiaOnboardingPage>>

function getPanelEl(wrapper: Wrapper): HTMLElement {
  return (wrapper.vm as unknown as { $refs: { panelRef: HTMLElement } }).$refs.panelRef
}

/**
 * Mock panel and section elements so the scroll spy resolves correctly.
 * threshold = panel.getBoundingClientRect().top + clientHeight * 0.4
 * jsdom clientHeight = 0, so threshold = panel top.
 * Panel mocked to top: 0 → threshold = 0.
 * Active sections get top: -1 (≤ 0), inactive get top: 500 (> 0).
 */
function setupScrollPositions(wrapper: Wrapper, activeSectionIds: string[]) {
  const panelEl = getPanelEl(wrapper)
  vi.spyOn(panelEl, 'getBoundingClientRect').mockReturnValue({
    top: 0, bottom: 800, left: 0, right: 0, width: 1200, height: 0,
  } as DOMRect)

  const mockEls: Record<string, HTMLElement> = {}
  SECTION_IDS.forEach(id => {
    const el = document.createElement('div')
    el.id = id
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      top: activeSectionIds.includes(id) ? -1 : 500,
      bottom: 0, left: 0, right: 0, width: 0, height: 0,
    } as DOMRect)
    mockEls[id] = el
  })

  vi.spyOn(document, 'getElementById').mockImplementation(
    (id: string) => mockEls[id] ?? null,
  )
}

async function triggerScroll(wrapper: Wrapper) {
  getPanelEl(wrapper).dispatchEvent(new Event('scroll'))
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
    const wrapper = mount(EcosiaOnboardingPage)
    setupScrollPositions(wrapper, ['overview', 'problem', 'challenge', 'research'])
    await triggerScroll(wrapper)

    const researchBtn = wrapper.findAll('nav button').find(b => b.text() === 'Research')
    expect(researchBtn?.classes()).toContain('font-semibold')
  })

  it('activates overview when no section has passed the threshold', async () => {
    const wrapper = mount(EcosiaOnboardingPage)
    setupScrollPositions(wrapper, [])
    await triggerScroll(wrapper)

    expect(wrapper.findAll('nav button')[0].classes()).toContain('font-semibold')
  })

  it('activates the last section when scrolled to the bottom', async () => {
    const wrapper = mount(EcosiaOnboardingPage)
    setupScrollPositions(wrapper, SECTION_IDS)
    await triggerScroll(wrapper)

    const resultsBtn = wrapper.findAll('nav button').find(b => b.text() === 'Results')
    expect(resultsBtn?.classes()).toContain('font-semibold')
  })

  it('updates active section on each scroll event', async () => {
    const wrapper = mount(EcosiaOnboardingPage)

    setupScrollPositions(wrapper, ['overview', 'problem'])
    await triggerScroll(wrapper)
    expect(wrapper.findAll('nav button').find(b => b.text() === 'The Problem')?.classes()).toContain('font-semibold')

    setupScrollPositions(wrapper, ['overview', 'problem', 'challenge', 'research', 'opportunities'])
    await triggerScroll(wrapper)
    expect(wrapper.findAll('nav button').find(b => b.text() === 'Opportunities')?.classes()).toContain('font-semibold')
  })

  it('activates a mid-page section correctly', async () => {
    const wrapper = mount(EcosiaOnboardingPage)
    setupScrollPositions(wrapper, ['overview', 'problem', 'challenge'])
    await triggerScroll(wrapper)

    const approachBtn = wrapper.findAll('nav button').find(b => b.text() === 'The Approach')
    expect(approachBtn?.classes()).toContain('font-semibold')
  })
})

// ── scrollToSection ───────────────────────────────────────────────────────────

describe('EcosiaOnboardingPage — scrollToSection', () => {
  it('calls scrollTo on the panel when a nav button is clicked', async () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const panelEl = getPanelEl(wrapper)
    const scrollToMock = vi.fn()
    panelEl.scrollTo = scrollToMock

    const problemEl = document.createElement('div')
    problemEl.id = 'problem'
    vi.spyOn(document, 'getElementById').mockImplementation(
      (id: string) => id === 'problem' ? problemEl : null,
    )

    await wrapper.findAll('nav button')[1].trigger('click') // "The Problem"
    expect(scrollToMock).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth' }))
  })
})

// ── Lifecycle ─────────────────────────────────────────────────────────────────

describe('EcosiaOnboardingPage — lifecycle', () => {
  it('adds a scroll listener on mount', () => {
    const addSpy = vi.spyOn(HTMLElement.prototype, 'addEventListener')
    mount(EcosiaOnboardingPage)
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), expect.objectContaining({ passive: true }))
  })

  it('removes the scroll listener on unmount', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const removeSpy = vi.spyOn(HTMLElement.prototype, 'removeEventListener')
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
    expect(strategySection.html()).toContain('Value Perception')
    expect(strategySection.html()).toContain('Value Experience')
    expect(strategySection.html()).toContain('Value Adoption')
  })

  it('switches strategy image when step cards are clicked', async () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const buttons = wrapper.findAll('#strategy button')

    await buttons[1].trigger('click')
    expect(wrapper.find('#strategy').html()).toContain('ecosia-onboarding-11.png')

    await buttons[2].trigger('click')
    expect(wrapper.find('#strategy').html()).toContain('ecosia-onboarding-12.png')

    await buttons[0].trigger('click')
    expect(wrapper.find('#strategy').html()).toContain('ecosia-onboarding-10.png')
  })

  it('switches execution image when step cards are clicked', async () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const buttons = wrapper.findAll('#execution button')

    await buttons[1].trigger('click')
    expect(wrapper.find('#execution').html()).toContain('ecosia-onboarding-15.png')

    await buttons[2].trigger('click')
    expect(wrapper.find('#execution').html()).toContain('ecosia-onboarding-14.png')

    await buttons[0].trigger('click')
    expect(wrapper.find('#execution').html()).toContain('ecosia-onboarding-13.png')
  })

  it('switches before/after image in experimentation section', async () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const experimentationSection = wrapper.find('#experimentation')
    const buttons = experimentationSection.findAll('button')
    const afterBtn = buttons.find(b => b.text() === 'After')!
    const beforeBtn = buttons.find(b => b.text() === 'Before')!

    await afterBtn.trigger('click')
    expect(experimentationSection.html()).toContain('ecosia-onboarding-6.png')

    await beforeBtn.trigger('click')
    expect(experimentationSection.html()).toContain('ecosia-onboarding-5.png')
  })

  it('navigates SERP images with arrow buttons', async () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const experimentationSection = wrapper.find('#experimentation')

    expect(experimentationSection.html()).toContain('ecosia-onboarding-7.png')

    const nextBtn = experimentationSection.findAll('button').find(b => b.html().includes('→'))!
    await nextBtn.trigger('click')
    expect(experimentationSection.html()).toContain('ecosia-onboarding-8.png')

    const nextBtn2 = experimentationSection.findAll('button').find(b => b.html().includes('→'))!
    await nextBtn2.trigger('click')
    expect(experimentationSection.html()).toContain('ecosia-onboarding-9.png')

    const prevBtn = experimentationSection.findAll('button').find(b => b.html().includes('←'))!
    await prevBtn.trigger('click')
    expect(experimentationSection.html()).toContain('ecosia-onboarding-8.png')
  })
})
