/**
 * Component tests for HomePage.vue.
 * Child components are stubbed so tests focus on the page's own logic:
 * project rendering, scroll indicator visibility, and footer content.
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
    // Reset scrollY between tests
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  })

  it('renders the main landmark', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.find('main').exists()).toBe(true)
  })

  it('renders the hero heading', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('renders the projects section heading', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.find('#projects').exists()).toBe(true)
    expect(wrapper.find('h2').text()).toContain('Recent Projects')
  })

  it('renders exactly three project cards', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.findAll('article')).toHaveLength(3)
  })

  it('each project card has a title and a tagline', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    for (const article of wrapper.findAll('article')) {
      expect(article.find('h3').exists()).toBe(true)
      expect(article.find('p').exists()).toBe(true)
    }
  })

  it('scroll indicator is visible before scrolling', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    const indicator = wrapper.find('a[aria-label="Scroll to projects"]')
    expect(indicator.exists()).toBe(true)
    expect(indicator.classes()).toContain('opacity-100')
  })

  it('scroll indicator fades out after scrolling past 40px', async () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    Object.defineProperty(window, 'scrollY', { value: 50, configurable: true })
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('a[aria-label="Scroll to projects"]').classes()).toContain('opacity-0')
  })

  it('scroll indicator reappears when scrolled back to top', async () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    Object.defineProperty(window, 'scrollY', { value: 50, configurable: true })
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()

    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('a[aria-label="Scroll to projects"]').classes()).toContain('opacity-100')
  })

  it('renders the footer', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('footer contains the copyright notice', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    expect(wrapper.find('footer').text()).toContain('Timea Konya')
  })

  it('footer has LinkedIn and CV links', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    const footerLinks = wrapper.findAll('footer a').map((a) => a.text())
    expect(footerLinks).toContain('LinkedIn')
    expect(footerLinks).toContain('Download CV')
  })

  it('portrait image has an accessible alt attribute', () => {
    const wrapper = mount(HomePage, { global: { stubs: STUBS } })
    const img = wrapper.find('img[alt="Timea Konya"]')
    expect(img.exists()).toBe(true)
  })
})
