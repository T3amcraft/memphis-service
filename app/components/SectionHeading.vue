<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  lede?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
}>(), {
  align: 'left',
  tone: 'dark'
})
</script>

<template>
  <div
    :class="[
      align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
    ]"
    data-reveal
  >
    <p
      v-if="eyebrow"
      class="eyebrow"
      :class="[
        tone === 'light' ? 'text-brass-300 before:bg-brass-400' : 'text-brass-700',
        align === 'center' ? 'justify-center' : ''
      ]"
    >
      {{ eyebrow }}
    </p>

    <h2
      class="mt-5 font-serif text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-[2.75rem]"
      :class="tone === 'light' ? 'text-cream-50' : 'text-forest-900'"
    >
      {{ title }}
    </h2>

    <p
      v-if="lede"
      class="mt-5 text-lg leading-relaxed"
      :class="tone === 'light' ? 'text-cream-200/85' : 'text-cream-700'"
    >
      {{ lede }}
    </p>
  </div>
</template>
