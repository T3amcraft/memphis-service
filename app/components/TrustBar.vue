<script setup lang="ts">
const { business } = useAppConfig()
const { credentials } = business

const stats = [
  { value: `Est. ${business.established}`, label: 'Memphis owned & operated', icon: 'i-lucide-landmark' },
  { value: `${credentials.reviewAverage} ★`, label: `${credentials.reviewCount}+ homeowner reviews`, icon: 'i-lucide-star' },
  { value: `${credentials.warrantyYears} years`, label: 'Written workmanship warranty', icon: 'i-lucide-badge-check' },
  { value: 'Licensed', label: `& fully insured · ${credentials.licenseNumber}`, icon: 'i-lucide-shield-check' }
]
</script>

<template>
  <section class="border-b border-cream-200 bg-cream-100" aria-label="Credentials">
    <div class="mx-auto grid max-w-(--ui-container) grid-cols-2 gap-y-8 px-6 py-10 lg:grid-cols-4 lg:divide-x lg:divide-cream-300/60">
      <div
        v-for="(stat, i) in stats"
        :key="stat.value"
        class="flex flex-col items-center gap-1.5 px-4 text-center"
        :data-reveal="i * 70"
      >
        <UIcon :name="stat.icon" class="size-5 text-brass-600" />
        <p class="mt-1 font-serif text-xl font-semibold text-forest-900">
          {{ stat.value }}
        </p>
        <p class="text-xs leading-relaxed text-cream-700">
          {{ stat.label }}
        </p>
      </div>
    </div>
  </section>
</template>
