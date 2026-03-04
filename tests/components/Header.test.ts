/**
 * Component tests for Header.vue.
 * Verifies the nav links render, the theme and a11y panels toggle correctly,
 * and that selecting a theme updates the store and closes the panel.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import Header from '@/components/Header.vue'
import { useThemeStore } from '@/stores/theme'

describe('Header', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.className = ''
    localStorage.clear()
  })

  it('renders a nav landmark', () => {
    const wrapper = mount(Header)
    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('renders Work, About Me, and Resume links', () => {
    const wrapper = mount(Header)
    const texts = wrapper.findAll('a').map((a) => a.text())
    expect(texts).toContain('Work')
    expect(texts).toContain('About Me')
    expect(texts).toContain('Resume')
  })

  it('renders a theme toggle button and an accessibility button', () => {
    const wrapper = mount(Header)
    expect(wrapper.find('button[aria-label="Choose theme"]').exists()).toBe(true)
    expect(wrapper.find('button[aria-label="Accessibility options"]').exists()).toBe(true)
  })

  it('shows no panel by default', () => {
    const wrapper = mount(Header)
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('opens the theme panel on palette button click', async () => {
    const wrapper = mount(Header)
    await wrapper.find('button[aria-label="Choose theme"]').trigger('click')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true)
  })

  it('closes the theme panel when palette button is clicked again', async () => {
    const wrapper = mount(Header)
    const btn = wrapper.find('button[aria-label="Choose theme"]')
    await btn.trigger('click')
    await btn.trigger('click')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
  })

  it('opens the a11y panel on accessibility button click', async () => {
    const wrapper = mount(Header)
    await wrapper.find('button[aria-label="Accessibility options"]').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })

  it('closes the a11y panel when accessibility button is clicked again', async () => {
    const wrapper = mount(Header)
    const btn = wrapper.find('button[aria-label="Accessibility options"]')
    await btn.trigger('click')
    await btn.trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('shows one theme option per available theme', async () => {
    const wrapper = mount(Header)
    const store = useThemeStore()
    await wrapper.find('button[aria-label="Choose theme"]').trigger('click')
    expect(wrapper.findAll('[role="option"]')).toHaveLength(store.themes.length)
  })

  it('switching to the a11y panel hides the theme panel', async () => {
    const wrapper = mount(Header)
    await wrapper.find('button[aria-label="Choose theme"]').trigger('click')
    await wrapper.find('button[aria-label="Accessibility options"]').trigger('click')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })

  it('updates the store when a theme is selected', async () => {
    const wrapper = mount(Header)
    const store = useThemeStore()
    await wrapper.find('button[aria-label="Choose theme"]').trigger('click')
    const bauhaus = wrapper
      .findAll('[role="option"] button')
      .find((o) => o.text().includes('Bauhaus'))
    await bauhaus!.trigger('click')
    expect(store.theme).toBe('bauhaus')
  })

  it('closes the theme panel after a theme is selected', async () => {
    const wrapper = mount(Header)
    await wrapper.find('button[aria-label="Choose theme"]').trigger('click')
    await wrapper.find('[role="option"] button').trigger('click')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
  })

  it('sets aria-expanded to true on the active panel button', async () => {
    const wrapper = mount(Header)
    const btn = wrapper.find('button[aria-label="Choose theme"]')
    await btn.trigger('click')
    expect(btn.attributes('aria-expanded')).toBe('true')
  })

  it('shows a description under each theme name', async () => {
    const wrapper = mount(Header)
    await wrapper.find('button[aria-label="Choose theme"]').trigger('click')
    expect(wrapper.findAll('[role="option"] .opacity-60').length).toBeGreaterThan(0)
  })

  it('closes the panel when clicking outside the header', async () => {
    const wrapper = mount(Header, { attachTo: document.body })
    await wrapper.find('button[aria-label="Choose theme"]').trigger('click')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true)

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
    wrapper.unmount()
  })
})
