/**
 * Component tests for HomePage.vue.
 * Child components are stubbed so tests focus on the page's own logic:
 * hero structure, portrait image, and project card rendering.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import HomePage from '@/pages/HomePage.vue'

const STUBS = {
  Logo: true,
  RotatingDescriptor: true,
  CardProject: true,
  CaseStudySection: { name: 'CaseStudySection', template: '<div><slot /></div>' },
  RouterLink: { template: '<a><slot /></a>' },
}

function makeMql(matches: boolean) {
  const listeners: Array<(e: { matches: boolean }) => void> = []
  return {
    matches,
    addEventListener: (_: string, cb: (e: { matches: boolean }) => void) => listeners.push(cb),
    removeEventListener: (_: string, cb: (e: { matches: boolean }) => void) => {
      const i = listeners.indexOf(cb); if (i !== -1) listeners.splice(i, 1)
    },
    _fire: (m: boolean) => listeners.forEach(cb => cb({ matches: m })),
  }
}

describe('HomePage', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.className = ''
    localStorage.clear()
  })

  it('renders the hero heading', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('portrait image has an accessible alt attribute', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    const img = wrapper.find('img[alt="Timea Konya"]')
    expect(img.exists()).toBe(true)
  })

  it('renders bare CardProject cards below lg breakpoint', () => {
    vi.stubGlobal('matchMedia', () => makeMql(false))
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.findAllComponents({ name: 'CardProject' })).toHaveLength(4)
    expect(wrapper.findAllComponents({ name: 'CaseStudySection' })).toHaveLength(0)
    vi.unstubAllGlobals()
  })

  it('wraps cards in CaseStudySection at lg breakpoint and above', async () => {
    vi.stubGlobal('matchMedia', () => makeMql(true))
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAllComponents({ name: 'CaseStudySection' })).toHaveLength(4)
    expect(wrapper.findAllComponents({ name: 'CardProject' })).toHaveLength(4)
    vi.unstubAllGlobals()
  })

  it('updates layout when breakpoint changes', async () => {
    const mql = makeMql(false)
    vi.stubGlobal('matchMedia', () => mql)
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.findAllComponents({ name: 'CaseStudySection' })).toHaveLength(0)
    mql._fire(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAllComponents({ name: 'CaseStudySection' })).toHaveLength(4)
    vi.unstubAllGlobals()
  })
})
