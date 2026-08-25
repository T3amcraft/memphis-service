<script setup lang="ts">
/**
 * A photo, or — until a real one exists — a labelled frame at the right aspect
 * ratio that says exactly what belongs there. Set `src` in app.config.ts
 * (`media.gallery` / `media.beforeAfter`) and the frame is replaced.
 */
const props = withDefaults(defineProps<{
  src?: string
  label: string
  meta?: string
  ratio?: string
}>(), {
  src: '',
  ratio: '4/3'
})

/* Unique per instance — several slots render on one page. */
const patternId = `ps-pickets-${useId()}`

/* Filename hint shown on an empty frame, derived from the label. */
const slug = computed(() =>
  `${props.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.jpg`
)
</script>

<template>
  <figure
    class="group relative overflow-hidden rounded-lg bg-cream-100 ring-1 ring-cream-300/70"
    :style="{ aspectRatio: ratio }"
  >
    <template v-if="src">
      <img
        :src="src"
        :alt="meta ? `${label} — ${meta}` : label"
        loading="lazy"
        decoding="async"
        class="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      >
      <figcaption
        class="absolute inset-x-0 bottom-0 bg-linear-to-t from-forest-950/85 to-transparent px-5 pt-12 pb-4"
      >
        <p class="font-serif text-base text-cream-50">
          {{ label }}
        </p>
        <p v-if="meta" class="mt-0.5 text-xs text-cream-300">
          {{ meta }}
        </p>
      </figcaption>
    </template>

    <!-- Placeholder frame -->
    <template v-else>
      <svg class="absolute inset-0 size-full text-cream-300" aria-hidden="true">
        <defs>
          <pattern
            :id="patternId"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="14" height="26" fill="currentColor" opacity=".28" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" :fill="`url(#${patternId})`" opacity=".5" />
      </svg>
      <div
        class="absolute inset-2 rounded border border-dashed border-cream-400/80"
        aria-hidden="true"
      />

      <figcaption class="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <span class="flex size-11 items-center justify-center rounded-full bg-cream-50/85 text-brass-600 ring-1 ring-cream-300">
          <UIcon name="i-lucide-image-plus" class="size-5" />
        </span>
        <p class="mt-1 font-serif text-base leading-snug font-semibold text-forest-900">
          {{ label }}
        </p>
        <p v-if="meta" class="text-xs text-cream-700">
          {{ meta }}
        </p>
        <code class="mt-2 rounded bg-cream-50/80 px-2 py-1 text-[0.65rem] tracking-tight text-cream-700 ring-1 ring-cream-300/80">
          public/img/{{ slug }}
        </code>
      </figcaption>
    </template>
  </figure>
</template>
