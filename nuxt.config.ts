// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  // The palette is a committed warm-premium light look (cream / forest / brass),
  // so dark mode is switched off rather than half-supported.
  ui: {
    colorMode: false
  },

  // Fully static output: `npm run generate` writes plain HTML to .output/public
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/200.html', '/404.html']
    }
  },

  /* Icons are resolved from the local @iconify-json/lucide package and baked
     into the build. Without this, @nuxt/icon reaches out to the Iconify API at
     prerender time — which silently drops icons on a slow network and leaves
     the finished site making runtime requests to a third party. */
  icon: {
    mode: 'svg',
    serverBundle: 'local',
    clientBundle: {
      /* `.ts` is not scanned by default, and the service icon names live in
         app/utils/content.ts — without it those three render as empty boxes. */
      scan: {
        globInclude: ['**/*.{vue,jsx,tsx,ts}'],
        globExclude: ['node_modules', 'dist', '.output', '.nuxt']
      },
      includeCustomCollections: true
    }
  },

  // Self-hosted at build time by @nuxt/fonts — no runtime call to Google.
  fonts: {
    families: [
      { name: 'Fraunces', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] }
    ]
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en-US' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#1E3A2F' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  }
})
