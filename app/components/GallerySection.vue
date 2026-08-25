<script setup lang="ts">
const { media } = useAppConfig()

/* Middle column drops down a little on wide screens so the grid reads as a
   composition rather than a spreadsheet. */
const isMiddleColumn = (i: number) => i % 3 === 1
</script>

<template>
  <section class="border-y border-cream-200 bg-cream-100 py-24 lg:py-32">
    <div class="mx-auto max-w-(--ui-container) px-6">
      <div class="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          :eyebrow="copy.gallery.eyebrow"
          :title="copy.gallery.title"
          :lede="copy.gallery.lede"
        />
        <UButton
          href="#quote"
          size="lg"
          variant="outline"
          trailing-icon="i-lucide-arrow-up-right"
          class="border-forest-800/25 font-semibold text-forest-800 hover:bg-cream-200/60"
        >
          {{ copy.gallery.cta }}
        </UButton>
      </div>

      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <PhotoSlot
          v-for="(shot, i) in media.gallery"
          :key="shot.label"
          :src="shot.src"
          :label="shot.label"
          :meta="shot.meta"
          :ratio="shot.ratio"
          :class="isMiddleColumn(i) ? 'lg:mt-12' : ''"
          :data-reveal="(i % 3) * 90"
        />
      </div>
    </div>
  </section>
</template>
