import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import EcosiaOnboardingPage from '@/pages/EcosiaOnboardingPage.vue'
import EcosiaBrowserPage from '@/pages/EcosiaBrowserPage.vue'
import FloraDesignSystemPage from '@/pages/FloraDesignSystemPage.vue'
import DesignSystemPage from '@/pages/DesignSystemPage.vue'
import LolsumoPage from '@/pages/LolsumoPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/work/ecosia-onboarding', component: EcosiaOnboardingPage },
    { path: '/work/ecosia-browser', component: EcosiaBrowserPage },
    { path: '/work/flora-design-system', component: FloraDesignSystemPage },
    { path: '/work/lolsumo', component: LolsumoPage },
    { path: '/design-system', component: DesignSystemPage },
  ],
})
