<!--
  AppLayout.vue – Shared shell for every page.
  Owns the outer surface background, the fixed header, and the sticky chat widget.
  Each page renders its own content via <RouterView />.
-->

<script setup lang="ts">
import Header from '@/components/Header.vue'
import TimeaAgent from '@/components/TimeaAgent.vue'
</script>

<template>
  <div class="min-h-screen bg-[var(--color-surface-decorative)]">
    <Header />
    <main>
      <RouterView />
    </main>
    <TimeaAgent />
  </div>
</template>
