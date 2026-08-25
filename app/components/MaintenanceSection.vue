<script setup lang="ts">
const { business } = useAppConfig()
</script>

<template>
  <section class="relative overflow-hidden bg-forest-800 py-24 lg:py-28">
    <!-- Brass ring ornament -->
    <svg
      class="pointer-events-none absolute -top-24 -right-24 size-[28rem] text-brass-400/12"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="196" stroke="currentColor" stroke-width="2" />
      <circle cx="200" cy="200" r="148" stroke="currentColor" stroke-width="1" />
      <circle cx="200" cy="200" r="100" stroke="currentColor" stroke-width="1" />
      <circle cx="200" cy="200" r="52" stroke="currentColor" stroke-width="1" />
    </svg>

    <div class="relative mx-auto max-w-(--ui-container) px-6">
      <div class="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            tone="light"
            eyebrow="The Delta Guard Program"
            title="Book us once. Then stop thinking about your fence."
            lede="A fence that is inspected, washed and re-sealed on a rhythm does not enter the replacement cycle. One annual visit is the difference between maintaining a fence and buying a new one."
          />

          <div class="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal="120">
            <UButton
              href="#quote"
              size="xl"
              trailing-icon="i-lucide-arrow-right"
              class="justify-center bg-brass-500 px-7 font-semibold text-forest-950 hover:bg-brass-400"
            >
              Ask about Delta Guard
            </UButton>
            <UButton
              :href="business.phoneHref"
              size="xl"
              variant="ghost"
              icon="i-lucide-phone"
              class="justify-center px-7 font-semibold text-cream-100 hover:bg-white/10"
            >
              {{ business.phoneDisplay }}
            </UButton>
          </div>

          <p class="mt-6 flex items-start gap-2 text-sm leading-relaxed text-cream-300/70" data-reveal="180">
            <UIcon name="i-lucide-ruler" class="mt-0.5 size-4 shrink-0 text-brass-400" />
            Program cost depends on the length and condition of your fence, so we
            quote it alongside your estimate — no sign-up needed to get the number.
          </p>
        </div>

        <div
          class="rounded-xl border border-cream-100/15 bg-forest-900/50 p-8 backdrop-blur-sm lg:p-10"
          data-reveal="80"
        >
          <p class="eyebrow text-brass-300 before:bg-brass-400">
            Included every year
          </p>

          <ul class="mt-7 space-y-4">
            <li
              v-for="benefit in maintenanceBenefits"
              :key="benefit"
              class="flex gap-3.5 text-cream-100/90"
            >
              <UIcon
                name="i-lucide-circle-check"
                class="mt-0.5 size-5 shrink-0 text-brass-400"
              />
              <span class="leading-relaxed">{{ benefit }}</span>
            </li>
          </ul>

          <p class="mt-8 border-t border-cream-100/12 pt-6 font-serif text-lg text-cream-200 italic">
            “The cheapest fence you will ever own is the one you already have.”
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
