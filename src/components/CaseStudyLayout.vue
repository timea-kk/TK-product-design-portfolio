<!--
  CaseStudyLayout.vue – Shared shell for all case study pages.
  Renders the dotted whiteboard panel, sticky left nav, and content column.
  Pass navSections and fill the default slot with page content.
-->

<script setup lang="ts">
import { ref } from 'vue'
import CaseStudyNav from '@/components/CaseStudyNav.vue'

defineProps<{
  navSections: { id: string; label: string }[]
}>()

const panelRef = ref<HTMLElement | null>(null)
defineExpose({ panelRef })
</script>

<template>
  <section
    class="h-screen p-0 sm:p-6 lg:p-[40px] flex flex-col"
    aria-labelledby="project-heading"
  >
    <div
      ref="panelRef"
      class="h-full w-full overflow-y-auto sm:rounded-3xl sm:border sm:border-black/[0.06]"
      style="
        background-color: var(--color-surface-canvas);
        background-image: radial-gradient(circle, rgba(0,0,0,0.13) 1.2px, transparent 1.2px);
        background-size: 22px 22px;
      "
    >
      <div class="flex gap-8 justify-center pt-20 pb-14 sm:pt-10 sm:pb-14" style="padding-left: clamp(2rem, 4vw, 3.5rem); padding-right: clamp(2rem, 4vw, 3.5rem);">

        <!-- ── Left nav (desktop only) ── -->
        <CaseStudyNav :sections="navSections" :panel="panelRef" />

        <!-- ── Main content ── -->
        <div class="w-full min-w-0 max-w-4xl space-y-24">
          <slot />
        </div><!-- /content -->

        <!-- Balances the left nav so content stays centered -->
        <div class="hidden lg:block w-52 shrink-0"></div>

      </div><!-- /sidebar + content -->

    </div><!-- /whiteboard panel -->
  </section>
</template>
