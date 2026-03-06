/**
 * Component tests for HomePage.vue.
 * Child components are stubbed so tests focus on the page's own logic:
 * hero structure and footer content.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import HomePage from '@/components/HomePage.vue'

const STUBS = {
  Header: true,
  Logo: true,
  RotatingDescriptor: true,
  TimeaAgent: true,
}

describe('HomePage', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.className = ''
    localStorage.clear()
  })

  it('renders the main landmark', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.find('main').exists()).toBe(true)
  })

  it('renders the hero heading', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('renders the footer', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('footer contains the copyright notice', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.find('footer').text()).toContain('Timea Konya')
  })

  it('footer has LinkedIn and Resume links', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    const footerLinks = wrapper.findAll('footer a').map((a) => a.text())
    expect(footerLinks).toContain('LinkedIn')
    expect(footerLinks).toContain('Resume')
  })

  it('portrait image has an accessible alt attribute', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    const img = wrapper.find('img[alt="Timea Konya"]')
    expect(img.exists()).toBe(true)
  })
})
