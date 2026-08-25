<script setup lang="ts">
const { media } = useAppConfig()

const changes = [
  { icon: 'i-lucide-sparkles', text: 'Oxidised grey layer washed off, true colour brought back' },
  { icon: 'i-lucide-shield', text: 'Water beads instead of soaking into the grain' },
  { icon: 'i-lucide-sun', text: 'UV inhibitors slow the fade through our long summers' }
]
</script>

<template>
  <section id="work" class="relative overflow-hidden bg-forest-900 py-24 lg:py-32">
    <div
      class="absolute inset-0 opacity-[0.06]"
      style="background-image: radial-gradient(circle at 1px 1px, #faf6ef 1px, transparent 0); background-size: 22px 22px;"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-(--ui-container) px-6">
      <div class="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <SectionHeading
            tone="light"
            eyebrow="Before &amp; after"
            title="The grey is not the wood. It is a layer sitting on top of it."
            lede="Most Memphis fences that look finished are simply dirty and dried out. Wash, brighten, then seal, and the timber underneath is usually in far better shape than the owner expected."
          />

          <ul class="mt-10 space-y-4">
            <li
              v-for="(change, i) in changes"
              :key="change.text"
              class="flex items-start gap-3.5 text-cream-200/90"
              :data-reveal="120 + i * 90"
            >
              <span class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brass-500/15 text-brass-300 ring-1 ring-brass-400/25">
                <UIcon :name="change.icon" class="size-4" />
              </span>
              <span class="leading-relaxed">{{ change.text }}</span>
            </li>
          </ul>

          <UButton
            href="#quote"
            size="lg"
            trailing-icon="i-lucide-arrow-right"
            class="mt-10 bg-brass-500 font-semibold text-forest-950 hover:bg-brass-400"
          >
            See what yours could look like
          </UButton>
        </div>

        <div class="lg:col-span-7" data-reveal="80">
          <BeforeAfterSlider
            :before="media.beforeAfter.before"
            :after="media.beforeAfter.after"
            before-label="Before"
            after-label="After"
          />
          <p class="mt-4 flex items-start gap-2 text-sm leading-relaxed text-cream-300/75">
            <UIcon name="i-lucide-move-horizontal" class="mt-0.5 size-4 shrink-0 text-brass-400" />
            <span>
              Drag the handle to compare.
              <span class="text-cream-400/80">{{ media.beforeAfter.caption }}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
