<!--
  FooterSection.vue – Shared footer card. Placed inside the content column on each page,
  so it inherits the column width at every breakpoint automatically.
-->

<script setup lang="ts">
</script>

<template>
  <div class="w-full pb-16">
    <div class="relative rounded-2xl bg-white border border-black/[0.06] p-8 sm:p-12 isolate">
      <p
        class="absolute -top-[60px] left-0 text-2xl font-medium text-white bg-[var(--color-brand-primary)] rounded-2xl px-5 py-2 select-none"
        style="box-shadow: 0 1px 4px rgba(0,0,0,0.06); border: 5px solid var(--color-dusty-violet-100);"
      >Thanks for stopping by!</p>
      <img src="/main-page/wave.png" alt="" aria-hidden="true" class="bottom-[5px] sm:bottom-[10px]" style="position:absolute;right:20px;width:90px;pointer-events:none;z-index:10;transform:rotate(10deg);" />
      <div class="grid grid-cols-1 sm:grid-cols-2 min-[1440px]:grid-cols-4 gap-10">
        <div class="flex flex-col gap-3">
          <p class="font-heading font-black leading-tight tracking-tight text-[var(--color-text-primary)] text-2xl sm:text-3xl">Let's connect</p>
          <a href="mailto:work@timea.cc" class="text-lg text-[var(--color-text-secondary)] hover:underline hover:text-[var(--color-brand-primary)] transition-colors">work@timea.cc</a>
        </div>
        <div class="flex flex-col gap-3">
          <p class="font-heading font-black leading-tight tracking-tight text-[var(--color-text-primary)] text-2xl sm:text-3xl">Navigation</p>
          <div class="flex flex-col gap-2">
            <a href="/" class="text-lg text-[var(--color-text-secondary)] hover:underline hover:text-[var(--color-brand-primary)] transition-colors">Work</a>
            <a href="/#side-projects" class="text-lg text-[var(--color-text-secondary)] hover:underline hover:text-[var(--color-brand-primary)] transition-colors">Fun</a>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <p class="font-heading font-black leading-tight tracking-tight text-[var(--color-text-primary)] text-2xl sm:text-3xl">Links</p>
          <div class="flex flex-col gap-2">
            <a href="#" class="text-lg text-[var(--color-text-secondary)] hover:underline hover:text-[var(--color-brand-primary)] transition-colors">LinkedIn</a>
            <a href="#" class="text-lg text-[var(--color-text-secondary)] hover:underline hover:text-[var(--color-brand-primary)] transition-colors">GitHub</a>
            <a href="https://drive.google.com/file/d/1AM8_Ibyub_9inWriySCqUcdfbBm2mOtJ/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="text-lg text-[var(--color-text-secondary)] hover:underline hover:text-[var(--color-brand-primary)] transition-colors">Resume</a>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-5 flex flex-col gap-3">
            <span class="text-xs font-mono text-white/40">// how I made this</span>
            <p class="text-sm font-mono text-[var(--color-text-white)] leading-relaxed">Built by hand with a little help from Claude Code.</p>
            <a
              href="https://github.com/timea-kk/TK-product-design-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs font-mono text-[var(--color-brand-primary)] hover:underline transition-colors"
            >$ view repo &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
