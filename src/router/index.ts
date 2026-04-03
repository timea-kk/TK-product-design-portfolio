import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import EcosiaOnboardingPage from '@/pages/EcosiaOnboardingPage.vue'
import FloraDesignSystemPage from '@/pages/FloraDesignSystemPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/work/ecosia-onboarding', component: EcosiaOnboardingPage },
    { path: '/work/flora-design-system', component: FloraDesignSystemPage },
  ],
})
