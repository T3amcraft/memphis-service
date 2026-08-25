<script setup lang="ts">
/** Thumb-reachable call / quote bar. Appears once the hero is behind you. */
const { business } = useAppConfig()
const show = useScrolledPast(520)
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-x-0 bottom-0 z-40 border-t border-cream-100/10 bg-forest-950/95 backdrop-blur-md sm:hidden"
      style="padding-bottom: env(safe-area-inset-bottom);"
    >
      <div class="grid grid-cols-2 gap-2 p-3">
        <UButton
          :href="business.phoneHref"
          size="xl"
          block
          icon="i-lucide-phone"
          variant="outline"
          class="border-cream-100/25 font-semibold text-cream-50"
        >
          Call
        </UButton>
        <UButton
          href="#quote"
          size="xl"
          block
          class="bg-brass-500 font-semibold text-forest-950 hover:bg-brass-400"
        >
          Free Estimate
        </UButton>
      </div>
    </div>
  </Transition>
</template>
