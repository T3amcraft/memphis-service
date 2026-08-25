<script setup lang="ts">
const { business } = useAppConfig()
</script>

<template>
  <section id="areas" class="paper bg-cream-50 py-24 lg:py-32">
    <div class="mx-auto max-w-(--ui-container) px-6">
      <div class="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div class="lg:col-span-5">
          <SectionHeading
            :eyebrow="copy.areas.eyebrow"
            :title="copy.areas.title"
            :lede="copy.areas.lede"
          />

          <ul class="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-2">
            <li
              v-for="(area, i) in serviceAreas"
              :key="area"
              class="flex items-center gap-2.5 text-forest-900/85"
              :data-reveal="Math.min(i * 40, 320)"
            >
              <UIcon name="i-lucide-map-pin" class="size-3.5 shrink-0 text-brass-600" />
              <span>{{ area }}</span>
            </li>
          </ul>

          <p class="mt-8 rounded-lg border border-cream-200 bg-cream-100/70 p-5 text-sm leading-relaxed text-cream-700" data-reveal>
            <UIcon name="i-lucide-phone-call" class="mr-1.5 inline size-4 align-[-2px] text-brass-600" />
            {{ copy.areas.outsideNoteLead }}
            <a :href="business.phoneHref" class="font-semibold text-forest-800 underline decoration-brass-400 decoration-2 underline-offset-2">{{ business.phoneDisplay }}</a>
            {{ copy.areas.outsideNoteTail }}
          </p>
        </div>

        <div class="lg:col-span-7" data-reveal="80">
          <div class="overflow-hidden rounded-xl border border-cream-200 shadow-[0_30px_60px_-40px_rgba(13,27,22,0.4)]">
            <ServiceMap />
          </div>
          <p class="mt-3 text-center text-xs text-cream-600 italic">
            {{ copy.areas.mapCaption }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
