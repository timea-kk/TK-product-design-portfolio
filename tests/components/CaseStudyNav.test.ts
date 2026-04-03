/**
 * Component tests for CaseStudyNav.vue.
 * Covers: rendering, hover indicator show/hide (bug fix), scroll listener lifecycle,
 * scroll spy active section, and nav click scrolling.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CaseStudyNav from '@/components/CaseStudyNav.vue'

vi.mock('gsap', () => ({
  default: {
    to: vi.fn(),
    killTweensOf: vi.fn(),
  },
}))

import gsap from 'gsap'

const SECTIONS = [
  { id: 'intro',  label: 'Intro' },
  { id: 'middle', label: 'Middle' },
  { id: 'end',    label: 'End' },
]

beforeEach(() => {
  Element.prototype.scrollTo = vi.fn()
  Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
    top: 0, bottom: 100, left: 0, right: 0, width: 800, height: 50,
  })
  vi.mocked(gsap.to).mockClear()
  vi.mocked(gsap.killTweensOf).mockClear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

// ── Rendering ─────────────────────────────────────────────────────────────────

describe('CaseStudyNav — rendering', () => {
  it('renders a button for each section', () => {
    const wrapper = mount(CaseStudyNav, { props: { sections: SECTIONS, panel: null } })
    expect(wrapper.findAll('button').length).toBe(3)
  })

  it('renders section labels in order', () => {
    const wrapper = mount(CaseStudyNav, { props: { sections: SECTIONS, panel: null } })
    expect(wrapper.findAll('button').map(b => b.text())).toEqual(['Intro', 'Middle', 'End'])
  })

  it('marks the first section active by default', () => {
    const wrapper = mount(CaseStudyNav, { props: { sections: SECTIONS, panel: null } })
    expect(wrapper.findAll('button')[0].classes()).toContain('font-semibold')
    expect(wrapper.findAll('button')[1].classes()).not.toContain('font-semibold')
  })
})

// ── Hover indicator (bug fix) ─────────────────────────────────────────────────

describe('CaseStudyNav — hover indicator', () => {
  it('shows the hover indicator on button mouseenter', async () => {
    const wrapper = mount(CaseStudyNav, { props: { sections: SECTIONS, panel: null } })
    await wrapper.findAll('button')[0].trigger('mouseenter')
    expect(gsap.killTweensOf).toHaveBeenCalled()
    expect(gsap.to).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ opacity: 1 }))
  })

  it('hides the hover indicator on ul mouseleave', async () => {
    const wrapper = mount(CaseStudyNav, { props: { sections: SECTIONS, panel: null } })
    await wrapper.find('ul').trigger('mouseleave')
    expect(gsap.killTweensOf).toHaveBeenCalled()
    expect(gsap.to).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ opacity: 0 }))
  })
})

// ── Scroll listener lifecycle ─────────────────────────────────────────────────

describe('CaseStudyNav — scroll listener lifecycle', () => {
  it('adds a scroll listener when panel is provided at mount', () => {
    const panel = document.createElement('div')
    const addSpy = vi.spyOn(panel, 'addEventListener')
    mount(CaseStudyNav, { props: { sections: SECTIONS, panel } })
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), expect.objectContaining({ passive: true }))
  })

  it('adds a scroll listener when panel prop is set after mount', async () => {
    const panel = document.createElement('div')
    const addSpy = vi.spyOn(panel, 'addEventListener')
    const wrapper = mount(CaseStudyNav, { props: { sections: SECTIONS, panel: null } })
    await wrapper.setProps({ panel })
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), expect.objectContaining({ passive: true }))
  })

  it('removes the scroll listener on unmount', () => {
    const panel = document.createElement('div')
    const removeSpy = vi.spyOn(panel, 'removeEventListener')
    const wrapper = mount(CaseStudyNav, { props: { sections: SECTIONS, panel } })
    wrapper.unmount()
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})

// ── Scroll spy ────────────────────────────────────────────────────────────────

describe('CaseStudyNav — scroll spy', () => {
  function setupScrollPositions(panel: HTMLElement, activeSectionIds: string[]) {
    vi.spyOn(panel, 'getBoundingClientRect').mockReturnValue({
      top: 0, bottom: 800, left: 0, right: 0, width: 1200, height: 0,
    } as DOMRect)

    const mockEls: Record<string, HTMLElement> = {}
    SECTIONS.forEach(({ id }) => {
      const el = document.createElement('div')
      vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
        top: activeSectionIds.includes(id) ? -1 : 500,
        bottom: 0, left: 0, right: 0, width: 0, height: 0,
      } as DOMRect)
      mockEls[id] = el
    })

    vi.spyOn(document, 'getElementById').mockImplementation((id: string) => mockEls[id] ?? null)
  }

  it('activates the last section whose top has passed the threshold', async () => {
    const panel = document.createElement('div')
    const wrapper = mount(CaseStudyNav, { props: { sections: SECTIONS, panel } })
    setupScrollPositions(panel, ['intro', 'middle'])
    panel.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('button').find(b => b.text() === 'Middle')?.classes()).toContain('font-semibold')
  })

  it('stays on the first section when nothing has passed the threshold', async () => {
    const panel = document.createElement('div')
    const wrapper = mount(CaseStudyNav, { props: { sections: SECTIONS, panel } })
    setupScrollPositions(panel, [])
    panel.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('button')[0].classes()).toContain('font-semibold')
  })
})

// ── Nav click ─────────────────────────────────────────────────────────────────

describe('CaseStudyNav — nav click', () => {
  it('calls scrollTo on the panel when a button is clicked', async () => {
    const panel = document.createElement('div')
    const scrollToMock = vi.fn()
    panel.scrollTo = scrollToMock

    const targetEl = document.createElement('div')
    targetEl.id = 'middle'
    vi.spyOn(document, 'getElementById').mockImplementation((id: string) => id === 'middle' ? targetEl : null)

    const wrapper = mount(CaseStudyNav, { props: { sections: SECTIONS, panel } })
    await wrapper.findAll('button')[1].trigger('click')
    expect(scrollToMock).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth' }))
  })
})
