/**
 * Component tests for EcosiaOnboardingPage.vue.
 * IntersectionObserver is mocked — jsdom doesn't implement it.
 * Tests cover: nav rendering, scroll-spy active-section logic,
 * scrollToSection behaviour, observer teardown, and section card structure.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import EcosiaOnboardingPage from '@/pages/EcosiaOnboardingPage.vue'

// ── IntersectionObserver mock ─────────────────────────────────────────────────

let observerCallback: IntersectionObserverCallback | null = null
let disconnectSpy = vi.fn()

class MockIntersectionObserver {
  observe = vi.fn()
  disconnect: ReturnType<typeof vi.fn>

  constructor(cb: IntersectionObserverCallback) {
    observerCallback = cb
    disconnectSpy = vi.fn()
    // assign after updating disconnectSpy so both references point to the same fn
    this.disconnect = disconnectSpy
  }
}

// ── Section IDs (must match component) ───────────────────────────────────────

const SECTION_IDS = [
  'overview', 'context', 'problem', 'challenge', 'research',
  'opportunities', 'experimentation', 'strategy', 'execution', 'results',
]

// ── Setup / teardown ──────────────────────────────────────────────────────────

beforeEach(() => {
  observerCallback = null
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

  Element.prototype.scrollTo = vi.fn()
  Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
    top: 100, bottom: 200, left: 0, right: 0, width: 800, height: 100,
  })

  SECTION_IDS.forEach(id => {
    if (!document.getElementById(id)) {
      const el = document.createElement('div')
      el.id = id
      document.body.appendChild(el)
    }
  })
})

afterEach(() => {
  SECTION_IDS.forEach(id => document.getElementById(id)?.remove())
})

// ── Helpers ───────────────────────────────────────────────────────────────────

function fireIntersection(entries: { id: string; intersecting: boolean }[]) {
  observerCallback!(
    entries.map(({ id, intersecting }) => ({
      isIntersecting: intersecting,
      target: document.getElementById(id)!,
    }) as IntersectionObserverEntry),
    {} as IntersectionObserver,
  )
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('EcosiaOnboardingPage — nav rendering', () => {
  it('renders a button for every section', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const buttons = wrapper.findAll('nav button')
    expect(buttons.length).toBe(10)
  })

  it('renders labels in the correct order', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const labels = wrapper.findAll('nav button').map(b => b.text())
    expect(labels).toEqual([
      'Overview', 'Context', 'The Problem', 'The Challenge', 'Research',
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

describe('EcosiaOnboardingPage — scroll spy', () => {
  it('selects the topmost section when multiple are intersecting simultaneously', async () => {
    const wrapper = mount(EcosiaOnboardingPage)

    fireIntersection([
      { id: 'overview', intersecting: true },
      { id: 'context',  intersecting: true },
    ])
    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAll('nav button')
    expect(buttons[0].classes()).toContain('font-semibold')     // overview wins
    expect(buttons[1].classes()).not.toContain('font-semibold')
  })

  it('activates a mid-page section when only it is intersecting', async () => {
    const wrapper = mount(EcosiaOnboardingPage)

    fireIntersection([{ id: 'research', intersecting: true }])
    await wrapper.vm.$nextTick()

    const researchBtn = wrapper.findAll('nav button').find(b => b.text() === 'Research')
    expect(researchBtn?.classes()).toContain('font-semibold')
  })

  it('falls through to context when overview leaves and context stays', async () => {
    const wrapper = mount(EcosiaOnboardingPage)

    fireIntersection([
      { id: 'overview', intersecting: true },
      { id: 'context',  intersecting: true },
    ])
    fireIntersection([{ id: 'overview', intersecting: false }])
    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAll('nav button')
    expect(buttons[1].classes()).toContain('font-semibold')
  })

  it('does not change active section when no sections are intersecting', async () => {
    const wrapper = mount(EcosiaOnboardingPage)

    fireIntersection([{ id: 'strategy', intersecting: true }])
    await wrapper.vm.$nextTick()

    // All leave — active should remain 'strategy' (last known)
    fireIntersection([{ id: 'strategy', intersecting: false }])
    await wrapper.vm.$nextTick()

    const strategyBtn = wrapper.findAll('nav button').find(b => b.text() === 'Strategy')
    expect(strategyBtn?.classes()).toContain('font-semibold')
  })

  it('activates the last section when scrolled to the bottom', async () => {
    const wrapper = mount(EcosiaOnboardingPage)

    fireIntersection([{ id: 'results', intersecting: true }])
    await wrapper.vm.$nextTick()

    const resultsBtn = wrapper.findAll('nav button').find(b => b.text() === 'Results')
    expect(resultsBtn?.classes()).toContain('font-semibold')
  })
})

describe('EcosiaOnboardingPage — scrollToSection', () => {
  it('calls scrollTo on the panel when a nav button is clicked', async () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const scrollToMock = vi.fn()
    const panel = wrapper.find('[style*="background-color"]').element as HTMLElement
    panel.scrollTo = scrollToMock

    await wrapper.findAll('nav button')[2].trigger('click') // "The Problem"
    expect(scrollToMock).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth' }))
  })
})

describe('EcosiaOnboardingPage — lifecycle', () => {
  it('observes all sections on mount', () => {
    const observeSpy = vi.fn()
    class SpyObserver extends MockIntersectionObserver {
      observe = observeSpy
    }
    vi.stubGlobal('IntersectionObserver', SpyObserver)

    mount(EcosiaOnboardingPage)
    expect(observeSpy).toHaveBeenCalledTimes(10)
  })

  it('disconnects the observer on unmount', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    const dc = disconnectSpy
    wrapper.unmount()
    expect(dc).toHaveBeenCalledOnce()
  })
})

describe('EcosiaOnboardingPage — section cards', () => {
  it('renders a card for every section', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    SECTION_IDS.forEach(id => {
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    })
  })

  it('renders the main heading', () => {
    const wrapper = mount(EcosiaOnboardingPage)
    expect(wrapper.find('h1').text()).toContain("Ecosia")
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
