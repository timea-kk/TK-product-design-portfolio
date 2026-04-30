import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FooterSection from '@/components/FooterSection.vue'

describe('FooterSection', () => {
  it('renders the greeting badge', () => {
    const wrapper = mount(FooterSection)
    expect(wrapper.text()).toContain('Thanks for stopping by!')
  })

  it('renders the email link', () => {
    const wrapper = mount(FooterSection)
    expect(wrapper.find('a[href="mailto:work@timea.cc"]').exists()).toBe(true)
  })

  it('renders navigation links', () => {
    const wrapper = mount(FooterSection)
    expect(wrapper.find('a[href="/"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/#side-projects"]').exists()).toBe(true)
  })

  it('renders the resume link with target blank', () => {
    const wrapper = mount(FooterSection)
    const resumeLink = wrapper.find('a[target="_blank"][href*="drive.google.com"]')
    expect(resumeLink.exists()).toBe(true)
  })

  it('renders the repo link', () => {
    const wrapper = mount(FooterSection)
    expect(wrapper.find('a[href*="github.com"]').exists()).toBe(true)
  })

  it('renders the wave image', () => {
    const wrapper = mount(FooterSection)
    expect(wrapper.find('img[src="/main-page/wave.png"]').exists()).toBe(true)
  })
})
