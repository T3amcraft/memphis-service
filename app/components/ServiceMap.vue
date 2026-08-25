<script setup lang="ts">
/**
 * Stylised — not geographically exact — map of the coverage area: the river on
 * the west, Memphis at the centre, and dashed rings at roughly 10, 20 and 30
 * miles out.
 */
const places = [
  /* `anchor: 'end'` flips a label to the left of its dot; positions are laid
     out so no label crosses another dot or another label. */
  { name: 'Millington', x: 236, y: 84, anchor: 'start' },
  { name: 'Bartlett', x: 290, y: 148, anchor: 'start' },
  { name: 'Lakeland', x: 356, y: 132, anchor: 'start' },
  { name: 'Arlington', x: 402, y: 176, anchor: 'start' },
  { name: 'Cordova', x: 318, y: 186, anchor: 'start' },
  { name: 'Midtown', x: 216, y: 194, anchor: 'start' },
  { name: 'East Memphis', x: 252, y: 224, anchor: 'start' },
  { name: 'Germantown', x: 320, y: 250, anchor: 'start' },
  { name: 'Eads', x: 400, y: 222, anchor: 'start' },
  { name: 'Collierville', x: 350, y: 292, anchor: 'start' },
  { name: 'Piperton', x: 428, y: 322, anchor: 'end' }
]

const rings = [
  { r: 72, miles: '10 mi' },
  { r: 132, miles: '20 mi' },
  { r: 192, miles: '30 mi' }
]

const CX = 186
const CY = 205
</script>

<template>
  <svg
    viewBox="0 0 500 420"
    class="size-full"
    role="img"
    aria-label="Stylised map of the Greater Memphis service area, covering roughly a 30 mile radius from downtown Memphis out to Arlington, Collierville and Piperton"
  >
    <defs>
      <pattern id="sm-grid" width="25" height="25" patternUnits="userSpaceOnUse">
        <path d="M25 0H0v25" fill="none" stroke="var(--color-cream-300)" stroke-width=".6" opacity=".55" />
      </pattern>
      <linearGradient id="sm-river" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--color-forest-300)" />
        <stop offset="100%" stop-color="var(--color-forest-400)" />
      </linearGradient>
      <radialGradient id="sm-glow" :cx="CX / 500" :cy="CY / 420" r="0.42">
        <stop offset="0%" stop-color="var(--color-brass-400)" stop-opacity=".22" />
        <stop offset="100%" stop-color="var(--color-brass-400)" stop-opacity="0" />
      </radialGradient>
    </defs>

    <rect width="500" height="420" fill="var(--color-cream-100)" />
    <rect width="500" height="420" fill="url(#sm-grid)" />
    <rect width="500" height="420" fill="url(#sm-glow)" />

    <!-- Mississippi River -->
    <path
      d="M92 -10c-16 60 22 96 4 150s-30 84-8 136 14 74 2 154"
      fill="none"
      stroke="url(#sm-river)"
      stroke-width="26"
      stroke-linecap="round"
      opacity=".5"
    />
    <path
      d="M92 -10c-16 60 22 96 4 150s-30 84-8 136 14 74 2 154"
      fill="none"
      stroke="var(--color-forest-500)"
      stroke-width="1.2"
      opacity=".35"
    />
    <text
      x="58"
      y="330"
      fill="var(--color-forest-600)"
      font-size="10"
      font-style="italic"
      opacity=".8"
      transform="rotate(-84 58 330)"
    >Mississippi River</text>

    <!-- Coverage rings -->
    <g fill="none" stroke="var(--color-brass-500)">
      <circle
        v-for="ring in rings"
        :key="ring.r"
        :cx="CX"
        :cy="CY"
        :r="ring.r"
        stroke-width="1"
        stroke-dasharray="5 7"
        opacity=".55"
      />
    </g>
    <g fill="var(--color-brass-700)" font-size="9" font-weight="600" letter-spacing=".08em">
      <text
        v-for="ring in rings"
        :key="`t-${ring.r}`"
        :x="CX + 8"
        :y="CY - ring.r + 13"
        opacity=".85"
      >{{ ring.miles }}</text>
    </g>

    <!-- Surrounding communities. Every dot is labelled — an unlabelled marker
         just makes the reader wonder what it is. -->
    <g>
      <g v-for="place in places" :key="place.name">
        <circle
          :cx="place.x"
          :cy="place.y"
          r="4.5"
          fill="var(--color-forest-700)"
        />
        <circle
          :cx="place.x"
          :cy="place.y"
          r="9"
          fill="none"
          stroke="var(--color-forest-500)"
          stroke-width="1"
          opacity=".35"
        />
        <text
          :x="place.anchor === 'end' ? place.x - 13 : place.x + 13"
          :y="place.y + 4"
          :text-anchor="place.anchor"
          fill="var(--color-forest-800)"
          font-size="11.5"
          font-weight="500"
        >{{ place.name }}</text>
      </g>
    </g>

    <!-- Memphis -->
    <g>
      <circle :cx="CX" :cy="CY" r="15" fill="var(--color-brass-500)" opacity=".22" />
      <circle :cx="CX" :cy="CY" r="7.5" fill="var(--color-forest-800)" />
      <circle :cx="CX" :cy="CY" r="3" fill="var(--color-brass-300)" />
      <text
        :x="CX - 8"
        :y="CY + 32"
        fill="var(--color-forest-900)"
        font-size="15"
        font-weight="700"
        text-anchor="middle"
      >Memphis</text>
    </g>
  </svg>
</template>
