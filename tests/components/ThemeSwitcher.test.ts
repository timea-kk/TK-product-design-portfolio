/**
 * Component tests for ThemeSwitcher.vue.
 * Verifies the dropdown open/close behaviour and that selecting a theme updates the store.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { useThemeStore } from '@/stores/theme'

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.className = ''
    localStorage.clear()
  })

  it('renders a button labelled "Themes"', () => {
    const wrapper = mount(ThemeSwitcher)
    expect(wrapper.find('button').text()).toBe('Themes')
  })

  it('does not show the dropdown by default', () => {
    const wrapper = mount(ThemeSwitcher)
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
  })

  it('opens the dropdown when the button is clicked', async () => {
    const wrapper = mount(ThemeSwitcher)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true)
  })

  it('shows one option for each available theme', async () => {
    const wrapper = mount(ThemeSwitcher)
    const store = useThemeStore()
    await wrapper.find('button').trigger('click')
    const options = wrapper.findAll('[role="option"]')
    expect(options).toHaveLength(store.themes.length)
  })

  it('closes the dropdown after selecting a theme', async () => {
    const wrapper = mount(ThemeSwitcher)
    await wrapper.find('button').trigger('click')
    // Click the first option button inside the first listbox item
    await wrapper.find('[role="option"] button').trigger('click')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
  })

  it('updates the store when a theme is selected', async () => {
    const wrapper = mount(ThemeSwitcher)
    const store = useThemeStore()
    await wrapper.find('button').trigger('click')

    // Find the 'bauhaus' option and click it
    const options = wrapper.findAll('[role="option"] button')
    const bauhaus = options.find((o) => o.text().includes('Bauhaus'))
    expect(bauhaus).toBeDefined()
    await bauhaus!.trigger('click')

    expect(store.theme).toBe('bauhaus')
  })

  it('shows a description under each theme name', async () => {
    const wrapper = mount(ThemeSwitcher)
    await wrapper.find('button').trigger('click')
    // Each option should contain a small description span
    const descriptions = wrapper.findAll('[role="option"] .opacity-60')
    expect(descriptions.length).toBeGreaterThan(0)
  })
})
