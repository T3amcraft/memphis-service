<template>
  <section id="services" class="paper bg-cream-50 py-24 lg:py-32">
    <div class="mx-auto max-w-(--ui-container) px-6">
      <SectionHeading
        eyebrow="What we do"
        title="Two services, done properly — and a plan so you only book once."
        lede="Most fence companies treat coating as an afternoon with a sprayer. The prep is what decides whether it still looks right in three years, so that is where most of our time goes."
      />

      <div class="mt-16 grid gap-6 lg:grid-cols-3">
        <article
          v-for="(service, i) in services"
          :id="service.id"
          :key="service.id"
          class="group relative flex flex-col rounded-xl border border-cream-200 bg-cream-50/80 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brass-300 hover:shadow-[0_24px_50px_-30px_rgba(13,27,22,0.45)]"
          :data-reveal="i * 110"
        >
          <span
            class="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-brass-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />

          <span class="flex size-13 items-center justify-center rounded-lg bg-forest-800 text-brass-300 shadow-sm">
            <UIcon :name="service.icon" class="size-6" />
          </span>

          <h3 class="mt-6 font-serif text-2xl leading-snug font-semibold text-forest-900">
            {{ service.title }}
          </h3>

          <p class="mt-3 leading-relaxed text-cream-700">
            {{ service.lede }}
          </p>

          <ul class="mt-6 space-y-3 border-t border-cream-200 pt-6">
            <li
              v-for="point in service.points"
              :key="point"
              class="flex gap-3 text-sm leading-relaxed text-forest-900/85"
            >
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 size-4 shrink-0 text-brass-600"
              />
              <span>{{ point }}</span>
            </li>
          </ul>

          <p class="mt-auto pt-6 font-serif text-sm italic text-cream-600">
            {{ service.footnote }}
          </p>
        </article>
      </div>

      <p class="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-cream-700" data-reveal>
        <UIcon name="i-lucide-info" class="size-4 text-brass-600" />
        Not sure which your fence needs?
        <a href="#quote" class="font-semibold text-forest-800 underline decoration-brass-400 decoration-2 underline-offset-4 hover:text-forest-950">
          Ask for an honest assessment
        </a>
        — we will tell you if it can wait a year.
      </p>
    </div>
  </section>
</template>
