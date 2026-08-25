<script setup lang="ts">
const { business } = useAppConfig()
const scrolled = useScrolledPast(40)
const mobileOpen = ref(false)

const route = useRoute()
watch(() => route.hash, () => {
  mobileOpen.value = false
})
</script>

<template>
  <!-- Slim credibility strip. Scrolls away with the page. -->
  <div class="hidden bg-forest-950 text-cream-200 lg:block">
    <div class="mx-auto flex max-w-(--ui-container) items-center justify-between px-6 py-2 text-xs">
      <p class="flex items-center gap-6">
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-shield-check" class="size-3.5 text-brass-400" />
          Licensed &amp; insured
        </span>
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-map-pin" class="size-3.5 text-brass-400" />
          Serving Greater Memphis &amp; Shelby County
        </span>
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-clipboard-check" class="size-3.5 text-brass-400" />
          Free on-site estimates
        </span>
      </p>
      <a
        :href="business.phoneHref"
        class="font-semibold tracking-wide text-cream-50 transition-colors hover:text-brass-300"
      >
        {{ business.phoneDisplay }}
      </a>
    </div>
  </div>

  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'border-b border-cream-200 bg-cream-50/92 shadow-[0_1px_24px_-12px_rgba(13,27,22,0.35)] backdrop-blur-md'
      : 'border-b border-transparent bg-forest-900'"
  >
    <div class="mx-auto flex h-20 max-w-(--ui-container) items-center gap-3 px-6 sm:gap-6">
      <a
        href="#top"
        class="group flex min-w-0 items-center gap-2.5 sm:gap-3"
        :aria-label="`${business.name} — back to top`"
      >
        <BrandMark
          class="size-9 shrink-0 transition-colors duration-300 sm:size-10"
          :class="scrolled ? 'text-forest-800' : 'text-brass-400'"
        />
        <span class="flex min-w-0 flex-col leading-none">
          <span
            class="truncate font-serif text-base font-semibold tracking-tight transition-colors duration-300 sm:text-xl"
            :class="scrolled ? 'text-forest-900' : 'text-cream-50'"
          >{{ business.name }}</span>
          <span
            class="mt-1 hidden text-[0.65rem] font-medium tracking-[0.18em] uppercase transition-colors duration-300 sm:block"
            :class="scrolled ? 'text-cream-600' : 'text-brass-300/90'"
          >Memphis, Tennessee</span>
        </span>
      </a>

      <nav class="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="relative rounded-md px-3 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brass-500 after:transition-transform after:duration-300 hover:after:scale-x-100"
          :class="scrolled
            ? 'text-cream-700 hover:text-forest-900'
            : 'text-cream-200 hover:text-cream-50'"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="ml-auto flex items-center gap-2 lg:ml-0">
        <UButton
          :href="business.phoneHref"
          icon="i-lucide-phone"
          size="lg"
          variant="ghost"
          :ui="{ base: 'font-semibold' }"
          :class="scrolled
            ? 'text-forest-800 hover:bg-cream-200/70'
            : 'text-cream-100 hover:bg-white/10 hover:text-white'"
          class="hidden sm:inline-flex lg:hidden"
          :aria-label="`Call ${business.phoneDisplay}`"
        />
        <UButton
          href="#quote"
          size="lg"
          trailing-icon="i-lucide-arrow-right"
          class="hidden font-semibold sm:inline-flex"
          :class="scrolled
            ? 'bg-forest-800 text-cream-50 hover:bg-forest-700'
            : 'bg-brass-500 text-forest-950 hover:bg-brass-400'"
        >
          Free Estimate
        </UButton>

        <UButton
          :icon="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          size="xl"
          variant="ghost"
          class="lg:hidden"
          :class="scrolled ? 'text-forest-900' : 'text-cream-50'"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          @click="mobileOpen = !mobileOpen"
        />
      </div>
    </div>

    <!-- Mobile nav -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        id="mobile-nav"
        class="border-t border-cream-200 bg-cream-50 lg:hidden"
      >
        <nav class="mx-auto max-w-(--ui-container) px-6 py-4" aria-label="Mobile">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="flex items-center justify-between border-b border-cream-200/80 py-3.5 font-serif text-lg text-forest-900 last:border-0"
            @click="mobileOpen = false"
          >
            {{ link.label }}
            <UIcon name="i-lucide-chevron-right" class="size-4 text-brass-500" />
          </a>
          <div class="mt-4 grid gap-2">
            <UButton
              href="#quote"
              size="xl"
              block
              class="bg-forest-800 font-semibold text-cream-50 hover:bg-forest-700"
              @click="mobileOpen = false"
            >
              Get a Free Estimate
            </UButton>
            <UButton
              :href="business.phoneHref"
              size="xl"
              block
              variant="outline"
              icon="i-lucide-phone"
              class="border-forest-800/25 font-semibold text-forest-800"
            >
              {{ business.phoneDisplay }}
            </UButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
