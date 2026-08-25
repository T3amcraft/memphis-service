<script setup lang="ts">
const { business } = useAppConfig()
const { credentials } = business
</script>

<template>
  <section id="top" class="relative isolate overflow-hidden bg-forest-950">
    <!-- Illustrated backdrop -->
    <div class="absolute inset-0 -z-10">
      <FenceScene class="size-full object-cover" />
    </div>
    <!-- Legibility wash: dark on the left where the copy sits -->
    <div
      class="absolute inset-0 -z-10 bg-linear-to-r from-forest-950/95 via-forest-950/60 via-45% to-forest-950/5"
      aria-hidden="true"
    />
    <!-- Narrow screens: the copy spans the full width, so it sits over the
         brightest part of the fence. This veil keeps body text above 4.5:1
         without re-flattening the artwork on desktop. -->
    <div class="absolute inset-0 -z-10 bg-forest-950/45 lg:hidden" aria-hidden="true" />
    <div
      class="absolute inset-x-0 top-0 -z-10 h-32 bg-linear-to-b from-forest-950/80 to-transparent"
      aria-hidden="true"
    />

    <div class="mx-auto flex min-h-[86svh] max-w-(--ui-container) flex-col justify-center px-6 py-20 lg:py-28">
      <div class="max-w-2xl">
        <p class="eyebrow text-brass-300">
          Memphis · Germantown · Collierville
        </p>

        <h1 class="mt-6 font-serif text-4xl leading-[1.05] font-semibold text-cream-50 text-balance sm:text-5xl lg:text-6xl">
          Fence painting &amp; sealing, built for
          <span class="relative whitespace-nowrap text-brass-300">Memphis weather<svg
            class="absolute -bottom-2 left-0 h-3 w-full text-brass-500/70"
            viewBox="0 0 300 12"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          ><path
            d="M2 8c46-4 92-5 148-4s102 3 148 5"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          /></svg></span>.
        </h1>

        <p class="mt-8 max-w-xl text-lg leading-relaxed text-cream-200/90">
          Fifty inches of rain a year, relentless humidity and a UV season that
          never really ends. We soft-wash, prep, stain and seal — both sides,
          every board — so your fence stops losing that fight.
        </p>

        <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <UButton
            href="#quote"
            size="xl"
            trailing-icon="i-lucide-arrow-right"
            class="justify-center bg-brass-500 px-7 font-semibold text-forest-950 shadow-lg shadow-brass-950/30 transition-transform hover:-translate-y-0.5 hover:bg-brass-400"
          >
            Get a Free Estimate
          </UButton>
          <UButton
            :href="business.phoneHref"
            size="xl"
            variant="outline"
            icon="i-lucide-phone"
            class="justify-center border-cream-100/30 px-7 font-semibold text-cream-50 backdrop-blur-sm hover:border-cream-100/60 hover:bg-white/10"
          >
            {{ business.phoneDisplay }}
          </UButton>
        </div>

        <!-- Trust row -->
        <dl class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-cream-100/15 pt-8 text-sm">
          <div class="flex items-center gap-2.5">
            <div class="flex" aria-hidden="true">
              <UIcon
                v-for="n in 5"
                :key="n"
                name="i-lucide-star"
                class="size-4 text-brass-400 [&_path]:fill-current"
              />
            </div>
            <dt class="sr-only">Customer rating</dt>
            <dd class="text-cream-200">
              <span class="font-semibold text-cream-50">{{ credentials.reviewAverage }}</span>
              from {{ credentials.reviewCount }}+ local reviews
            </dd>
          </div>

          <div class="flex items-center gap-2.5">
            <UIcon name="i-lucide-shield-check" class="size-4 shrink-0 text-brass-400" />
            <dt class="sr-only">Insurance</dt>
            <dd class="text-cream-200">Licensed &amp; fully insured</dd>
          </div>

          <div class="flex items-center gap-2.5">
            <UIcon name="i-lucide-badge-check" class="size-4 shrink-0 text-brass-400" />
            <dt class="sr-only">Warranty</dt>
            <dd class="text-cream-200">
              {{ credentials.warrantyYears }}-year workmanship warranty
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Estimate promise, floated over the artwork on wide screens -->
    <div class="pointer-events-none absolute right-8 bottom-10 hidden xl:block">
      <div class="pointer-events-auto w-64 rounded-lg border border-cream-100/15 bg-forest-950/70 p-5 backdrop-blur-md">
        <p class="eyebrow text-brass-300">
          No-obligation
        </p>
        <p class="mt-3 font-serif text-xl text-cream-50">
          On-site estimates, usually within 48 hours
        </p>
        <p class="mt-2 text-sm text-cream-300/80">
          We measure the run, probe the posts, and put it in writing.
        </p>
      </div>
    </div>
  </section>
</template>
