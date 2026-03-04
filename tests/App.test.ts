/**
 * Tests for App.vue (root component).
 * HomePage is stubbed to avoid mounting the full tree.
 * The key things to verify are that App mounts cleanly, renders its only
 * child, and initialises the theme and a11y stores on boot.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import App from '@/App.vue'
import { useThemeStore } from '@/stores/theme'
import { useA11yStore } from '@/stores/a11y'

const STUBS = { HomePage: true }

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.className = ''
    document.documentElement.removeAttribute('style')
    localStorage.clear()
  })

  it('mounts without errors', () => {
    const wrapper = mount(App, { global: { stubs: STUBS } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the HomePage component', () => {
    const wrapper = mount(App, { global: { stubs: STUBS } })
    expect(wrapper.findComponent({ name: 'HomePage' }).exists()).toBe(true)
  })

  it('initialises the theme store on boot', () => {
    mount(App, { global: { stubs: STUBS } })
    const store = useThemeStore()
    expect(store.theme).toBeDefined()
  })

  it('initialises the a11y store on boot', () => {
    mount(App, { global: { stubs: STUBS } })
    const store = useA11yStore()
    expect(store.reduceMotion).toBeDefined()
  })
})
