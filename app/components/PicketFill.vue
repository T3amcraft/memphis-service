<script setup lang="ts">
/**
 * Flat-on fence wall, used to fill the before/after comparison until real job
 * photos are dropped in. Two palettes: oxidised grey, and freshly stained.
 *
 * It reads as a fence rather than as panelling because of three things: the
 * boards have dog-eared tops, the gaps between them are genuinely transparent,
 * and two rails sit behind — so you see through to them, exactly as you would
 * standing in front of the real thing.
 */
const props = defineProps<{ tone: 'weathered' | 'stained' }>()

const uid = useId()
const boardsId = `pf-boards-${uid}`
const skyId = `pf-sky-${uid}`
const vignetteId = `pf-vig-${uid}`

const palette = computed(() =>
  props.tone === 'weathered'
    ? {
        skyTop: '#eceae5',
        skyLow: '#c8c4bb',
        board: '#b4afa5',
        shadow: '#918c85',
        grain: '#8a857e',
        rail: '#7b7770',
        vignette: '#5c5852'
      }
    : {
        skyTop: '#f0d3a2',
        skyLow: '#c98f52',
        board: '#a86e40',
        shadow: '#7a4c28',
        grain: '#6b4425',
        rail: '#5b3d24',
        vignette: '#39230f'
      }
)

/* Geometry, in viewBox units. TILE = board + gap. */
const TOP = 78
const TILE = 64
const BOARD_W = 54
const EAR = 11
</script>

<template>
  <svg
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid slice"
    class="size-full"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="skyId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="palette.skyTop" />
        <stop offset="100%" :stop-color="palette.skyLow" />
      </linearGradient>

      <!-- One board plus its gap. Everything outside the path stays
           transparent, which is what lets the rails behind show through. -->
      <pattern :id="boardsId" :width="TILE" height="600" patternUnits="userSpaceOnUse">
        <path
          :d="`M2 ${TOP + EAR} L${2 + EAR} ${TOP} L${2 + BOARD_W - EAR} ${TOP} L${2 + BOARD_W} ${TOP + EAR} L${2 + BOARD_W} 600 L2 600 Z`"
          :fill="palette.board"
        />
        <rect x="2" :y="TOP + EAR" width="3.5" height="600" :fill="palette.shadow" opacity=".55" />
        <rect x="19" :y="TOP + 26" width="1.6" height="500" :fill="palette.grain" opacity=".4" />
        <rect x="37" :y="TOP + 58" width="1.2" height="430" :fill="palette.grain" opacity=".3" />
        <rect x="46" :y="TOP + 40" width="1" height="360" :fill="palette.grain" opacity=".26" />
      </pattern>

      <radialGradient :id="vignetteId" cx="0.5" cy="0.42" r="0.78">
        <stop offset="55%" :stop-color="palette.vignette" stop-opacity="0" />
        <stop offset="100%" :stop-color="palette.vignette" stop-opacity=".45" />
      </radialGradient>
    </defs>

    <rect width="800" height="600" :fill="`url(#${skyId})`" />

    <!-- Rails, seen through the gaps between boards -->
    <g :fill="palette.rail">
      <rect y="212" width="800" height="34" />
      <rect y="442" width="800" height="34" />
    </g>

    <rect width="800" height="600" :fill="`url(#${boardsId})`" />

    <rect width="800" height="600" :fill="`url(#${vignetteId})`" />
  </svg>
</template>
