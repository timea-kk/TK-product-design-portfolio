import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import EcosiaOnboardingPage from '@/pages/EcosiaOnboardingPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/work/ecosia-onboarding', component: EcosiaOnboardingPage },
  ],
})
