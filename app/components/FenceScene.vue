<script setup lang="ts">
/**
 * Illustrated fence line in one-point perspective.
 *
 * The pickets are generated rather than hand-drawn: every board is scaled about
 * a single horizon line, so the tops and bases converge correctly and the run
 * reads as depth instead of a row of shrinking rectangles.
 */
const HORIZON = 330
const BASE_Y = 640
const PICKET_H = 250
const PITCH = 52
const WIDTH_AT_FRONT = 44
const COUNT = 90
const DEPTH = 9

const stains = ['#a86e40', '#9a6339', '#b57a48', '#9f683a', '#ad7344']

const pickets = computed(() => {
  const boards: {
    x: number
    y: number
    w: number
    h: number
    peak: number
    fill: string
    grain: boolean
  }[] = []

  let x = -80

  for (let i = 0; i < COUNT; i++) {
    const t = i / (COUNT - 1)
    const scale = 1 / (1 + DEPTH * t)
    const base = HORIZON + (BASE_Y - HORIZON) * scale
    const h = PICKET_H * scale
    const w = WIDTH_AT_FRONT * scale

    boards.push({
      x,
      y: base - h,
      w,
      h,
      peak: Math.max(1.5, 9 * scale),
      fill: stains[i % stains.length]!,
      grain: w > 14
    })

    x += PITCH * scale
  }

  return boards
})

/** Two rails, drawn as quads that narrow toward the vanishing point. */
const rails = computed(() => {
  const first = pickets.value[0]!
  const last = pickets.value[pickets.value.length - 1]!

  return [0.3, 0.68].map((frac) => {
    const yNear = first.y + first.h * frac
    const yFar = last.y + last.h * frac
    const thickNear = 22
    const thickFar = 22 * (last.w / first.w)
    return `M${first.x} ${yNear} L${last.x + last.w} ${yFar} L${last.x + last.w} ${yFar + thickFar} L${first.x} ${yNear + thickNear} Z`
  })
})
</script>

<template>
  <svg
    viewBox="0 0 1200 700"
    preserveAspectRatio="xMidYMax slice"
    role="img"
    aria-label="Illustration of a freshly stained wooden privacy fence receding into a warm evening haze"
  >
    <defs>
      <linearGradient id="fs-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a1912" />
        <stop offset="34%" stop-color="#152c22" />
        <stop offset="100%" stop-color="#3c6450" />
      </linearGradient>

      <!-- Low sun just above the horizon; this is what lights the fence. -->
      <radialGradient id="fs-sun" cx="0.72" cy="0.47" r="0.55">
        <stop offset="0%" stop-color="#f7dda9" stop-opacity=".8" />
        <stop offset="34%" stop-color="#d6a468" stop-opacity=".34" />
        <stop offset="68%" stop-color="#b8945a" stop-opacity=".12" />
        <stop offset="100%" stop-color="#b8945a" stop-opacity="0" />
      </radialGradient>

      <linearGradient id="fs-haze" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0d1b16" stop-opacity="0" />
        <stop offset="60%" stop-color="#12241d" stop-opacity=".18" />
        <stop offset="100%" stop-color="#12241d" stop-opacity=".5" />
      </linearGradient>

      <linearGradient id="fs-ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2b5c44" />
        <stop offset="100%" stop-color="#0d1f18" />
      </linearGradient>

      <linearGradient id="fs-rail" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#8a5c35" />
        <stop offset="100%" stop-color="#4a331f" />
      </linearGradient>
    </defs>

    <rect width="1200" height="700" fill="url(#fs-sky)" />
    <rect width="1200" height="700" fill="url(#fs-sun)" />

    <!-- Distant tree line, three depth layers -->
    <g fill="#1a3529">
      <path d="M0 336c60-26 96 6 138-14s86-30 132-6 78-4 126 12 96-8 140 8 92-6 138 10 108-4 152 12 116 2 174-2v20H0z" opacity=".9" />
    </g>
    <g fill="#12261f">
      <path d="M0 344c74-16 118 12 176-2s104-22 158-4 96 14 156 2 112-16 168 2 118 10 178 0 122-14 164-2v14H0z" opacity=".85" />
    </g>

    <!-- Ground -->
    <rect y="336" width="1200" height="364" fill="url(#fs-ground)" />

    <!-- Rails behind the pickets -->
    <path
      v-for="(d, i) in rails"
      :key="`rail-${i}`"
      :d="d"
      fill="url(#fs-rail)"
      opacity=".95"
    />

    <!-- Picket run -->
    <g>
      <g v-for="(p, i) in pickets" :key="`p-${i}`">
        <path
          :d="`M${p.x} ${p.y + p.peak} L${p.x + p.w / 2} ${p.y} L${p.x + p.w} ${p.y + p.peak} L${p.x + p.w} ${p.y + p.h} L${p.x} ${p.y + p.h} Z`"
          :fill="p.fill"
        />
        <!-- Warm rim light on the sun-facing edge -->
        <rect
          :x="p.x + p.w - Math.max(0.8, p.w * 0.13)"
          :y="p.y + p.peak"
          :width="Math.max(0.8, p.w * 0.13)"
          :height="p.h - p.peak"
          fill="#f4cd93"
          opacity=".5"
        />
        <!-- Shadow gap on the trailing edge -->
        <rect
          :x="p.x"
          :y="p.y + p.peak"
          :width="Math.max(0.6, p.w * 0.09)"
          :height="p.h - p.peak"
          fill="#3a2415"
          opacity=".5"
        />
        <template v-if="p.grain">
          <rect
            :x="p.x + p.w * 0.34"
            :y="p.y + p.peak + 6"
            width="1.1"
            :height="p.h - p.peak - 16"
            fill="#5e3b21"
            opacity=".4"
          />
          <rect
            :x="p.x + p.w * 0.62"
            :y="p.y + p.peak + 14"
            width="0.9"
            :height="p.h - p.peak - 30"
            fill="#5e3b21"
            opacity=".3"
          />
        </template>
      </g>
    </g>

    <!-- Atmospheric haze thickening toward the vanishing point -->
    <rect width="1200" height="700" fill="url(#fs-haze)" />

    <!-- Foreground grass tufts -->
    <g stroke="#163024" stroke-width="2.5" stroke-linecap="round" opacity=".95">
      <path v-for="n in 26" :key="`g-${n}`" :d="`M${n * 46 - 20} 700 q ${n % 2 ? 6 : -6} -${18 + (n % 5) * 7} ${n % 2 ? 1 : -1} -${26 + (n % 4) * 9}`" />
    </g>
    <rect y="648" width="1200" height="52" fill="#0b1712" opacity=".65" />
  </svg>
</template>
