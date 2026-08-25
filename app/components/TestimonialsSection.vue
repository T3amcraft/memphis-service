<script setup lang="ts">
const { business } = useAppConfig()
const { credentials } = business
</script>

<template>
  <section id="reviews" class="paper bg-cream-50 py-24 lg:py-32">
    <div class="mx-auto max-w-(--ui-container) px-6">
      <div class="flex flex-wrap items-end justify-between gap-10">
        <SectionHeading
          :eyebrow="copy.reviews.eyebrow"
          :title="copy.reviews.title"
        />

        <div class="flex items-center gap-5 rounded-lg border border-cream-200 bg-cream-100/70 px-6 py-4" data-reveal>
          <p class="font-serif text-4xl leading-none font-semibold text-forest-900">
            {{ credentials.reviewAverage }}
          </p>
          <div>
            <div class="flex gap-0.5" aria-hidden="true">
              <UIcon
                v-for="n in 5"
                :key="n"
                name="i-lucide-star"
                class="size-4 text-brass-500 [&_path]:fill-current"
              />
            </div>
            <p class="mt-1.5 text-sm text-cream-700">
              {{ fill(copy.reviews.aggregate, { count: credentials.reviewCount }) }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-14 grid gap-6 md:grid-cols-2">
        <figure
          v-for="(review, i) in testimonials"
          :key="i"
          class="relative flex flex-col rounded-xl border border-cream-200 bg-cream-100/50 p-8 pt-10"
          :data-reveal="(i % 2) * 100"
        >
          <UIcon
            name="i-lucide-quote"
            class="absolute top-6 right-7 size-8 text-brass-300/60"
            aria-hidden="true"
          />

          <div class="flex gap-0.5" :aria-label="`${review.stars} out of 5 stars`">
            <UIcon
              v-for="n in review.stars"
              :key="n"
              name="i-lucide-star"
              class="size-4 text-brass-500 [&_path]:fill-current"
            />
          </div>

          <blockquote class="mt-5 font-serif text-lg leading-relaxed text-forest-900/90">
            “{{ review.quote }}”
          </blockquote>

          <figcaption class="mt-auto flex items-center gap-3 border-t border-cream-200 pt-6">
            <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-800 text-brass-300">
              <UIcon name="i-lucide-user-round" class="size-4" />
            </span>
            <span class="text-sm">
              <span class="block font-semibold text-forest-900">{{ review.name }}</span>
              <span class="block text-cream-600">{{ review.area }} · {{ review.job }}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
