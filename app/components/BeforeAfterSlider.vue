<script setup lang="ts">
/**
 * Drag-to-reveal comparison.
 *
 * The control is a real range input stretched over the frame at zero opacity:
 * pointer dragging, touch and arrow-key operation all come from the platform,
 * which is far more reliable — and more accessible — than hand-rolled
 * mousemove handlers.
 */
withDefaults(defineProps<{
  before?: string
  after?: string
  beforeLabel?: string
  afterLabel?: string
}>(), {
  before: '',
  after: '',
  beforeLabel: 'Before',
  afterLabel: 'After'
})

const position = ref(52)
const clip = computed(() => `inset(0 ${100 - position.value}% 0 0)`)
</script>

<template>
  <div class="group relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-cream-200 ring-1 ring-cream-300 select-none">
    <!-- AFTER: the full frame -->
    <div class="absolute inset-0">
      <img
        v-if="after"
        :src="after"
        :alt="`${afterLabel} — fence after washing, staining and sealing`"
        class="size-full object-cover"
        loading="lazy"
        decoding="async"
      >
      <PicketFill v-else tone="stained" />
    </div>

    <!-- BEFORE: clipped from the right by the handle -->
    <div class="absolute inset-0" :style="{ clipPath: clip }">
      <img
        v-if="before"
        :src="before"
        :alt="`${beforeLabel} — weathered, untreated fence`"
        class="size-full object-cover"
        loading="lazy"
        decoding="async"
      >
      <PicketFill v-else tone="weathered" />
    </div>

    <!-- Corner labels -->
    <p
      class="pointer-events-none absolute top-4 left-4 rounded-full bg-forest-950/75 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.14em] text-cream-100 uppercase backdrop-blur-sm transition-opacity"
      :class="position < 14 ? 'opacity-0' : 'opacity-100'"
    >
      {{ beforeLabel }}
    </p>
    <p
      class="pointer-events-none absolute top-4 right-4 rounded-full bg-brass-500/90 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.14em] text-forest-950 uppercase backdrop-blur-sm transition-opacity"
      :class="position > 86 ? 'opacity-0' : 'opacity-100'"
    >
      {{ afterLabel }}
    </p>

    <!-- Filename hints, only while the frames are illustrations -->
    <code
      v-if="!before"
      class="pointer-events-none absolute bottom-4 left-4 rounded bg-cream-50/85 px-2 py-1 text-[0.65rem] text-cream-800"
    >public/img/before.jpg</code>
    <code
      v-if="!after"
      class="pointer-events-none absolute bottom-4 right-4 rounded bg-cream-50/85 px-2 py-1 text-[0.65rem] text-cream-800"
    >public/img/after.jpg</code>

    <!-- Divider + grip -->
    <div
      class="pointer-events-none absolute inset-y-0 w-px bg-cream-50/90 shadow-[0_0_12px_rgba(13,27,22,0.5)]"
      :style="{ left: `${position}%` }"
      aria-hidden="true"
    >
      <span
        class="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream-50/80 bg-forest-900/85 text-cream-50 shadow-xl backdrop-blur-sm transition-transform duration-200 group-hover:scale-110"
      >
        <UIcon name="i-lucide-chevrons-left-right" class="size-5" />
      </span>
    </div>

    <!-- The actual control -->
    <input
      v-model.number="position"
      type="range"
      min="0"
      max="100"
      step="0.5"
      class="absolute inset-0 size-full cursor-ew-resize appearance-none bg-transparent opacity-0"
      aria-label="Drag, or use the arrow keys, to compare the fence before and after treatment"
      :aria-valuetext="`${Math.round(position)}% revealed`"
    >
  </div>
</template>
