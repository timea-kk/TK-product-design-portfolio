<!--
  App.vue – Root component.
  Imports the theme CSS so --color-* and --font-* CSS variables are available globally.
  Accessing the stores here ensures their watchers run before the first render,
  so theme classes and a11y CSS vars are applied to <html> before anything is painted.
-->

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { useA11yStore } from '@/stores/a11y'
import HomePage from '@/components/HomePage.vue'
import '@/themes/index.css'

// Initialise stores on app boot — their immediate watchers apply HTML classes and CSS vars
useThemeStore()
useA11yStore()
</script>

<template>
  <HomePage />
</template>
