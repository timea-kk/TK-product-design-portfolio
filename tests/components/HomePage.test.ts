/**
 * Component tests for HomePage.vue.
 * Child components are stubbed so tests focus on the page's own logic:
 * hero structure, portrait image, and project card rendering.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import HomePage from '@/pages/HomePage.vue'

// Header and TimeaAgent are no longer part of HomePage -- they live in AppLayout
const STUBS = {
  Logo: true,
  RotatingDescriptor: true,
  CardProject: true,
  RouterLink: { template: '<a><slot /></a>' },
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

  it('renders a CardProject for each project', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.findAllComponents({ name: 'CardProject' })).toHaveLength(4)
  })
})
