<template>
  <section id="process" class="paper bg-cream-50 py-24 lg:py-32">
    <div class="mx-auto max-w-(--ui-container) px-6">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-4">
          <div class="lg:sticky lg:top-32">
            <SectionHeading
              :eyebrow="copy.process.eyebrow"
              :title="copy.process.title"
              :lede="copy.process.lede"
            />
            <div class="mt-8 rounded-lg border border-cream-200 bg-cream-100/70 p-5" data-reveal="150">
              <p class="flex items-start gap-2.5 text-sm leading-relaxed text-cream-700">
                <UIcon name="i-lucide-cloud-rain" class="mt-0.5 size-4 shrink-0 text-brass-600" />
                <span>
                  <strong class="font-semibold text-forest-900">{{ copy.process.weatherNoteLead }}</strong>
                  {{ copy.process.weatherNoteBody }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <ol class="relative lg:col-span-8">
          <!-- Timeline spine -->
          <span
            class="absolute top-4 bottom-4 left-6 w-px bg-linear-to-b from-brass-300 via-brass-400/60 to-transparent sm:left-7"
            aria-hidden="true"
          />

          <li
            v-for="(step, i) in processSteps"
            :key="step.number"
            class="relative pb-12 pl-20 last:pb-0 sm:pl-24"
            :data-reveal="i * 90"
          >
            <span
              class="absolute left-0 flex size-13 items-center justify-center rounded-full border border-brass-300 bg-cream-50 font-serif text-lg font-semibold text-brass-700 shadow-[0_0_0_6px_var(--color-cream-50)] sm:size-15"
            >
              {{ step.number }}
            </span>

            <h3 class="font-serif text-2xl leading-snug font-semibold text-forest-900">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-lg leading-relaxed text-forest-900/80">
              {{ step.body }}
            </p>
            <p class="mt-3 text-sm leading-relaxed text-cream-700">
              {{ step.detail }}
            </p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
