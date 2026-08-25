<script setup lang="ts">
const { business } = useAppConfig()

const description
  = 'Professional fence painting, staining and sealing across Greater Memphis. '
    + 'Soft wash, full prep, spray-and-back-brush application, and a written workmanship warranty. Free on-site estimates.'

useSeoMeta({
  title: `${business.name} — Fence Painting & Sealing in Memphis, TN`,
  description,
  ogTitle: `${business.name} — Fence Painting & Sealing in Memphis, TN`,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'en_US',
  ogSiteName: business.name,
  twitterCard: 'summary_large_image',
  /* Most scrapers need an absolute URL. A root-relative path works on Slack
     and iMessage but Facebook and X may skip it — set the full
     https://yourdomain.com/img/og-cover.jpg once the domain is live. */
  ogImage: '/img/og-cover.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: `${business.name} — fence painting and sealing in Memphis, Tennessee`,
  twitterImage: '/img/og-cover.jpg'
})

/* LocalBusiness structured data. Google uses this for the local pack and
   rich results, so keep it in sync with app.config.ts and your Google
   Business Profile — mismatched name/phone/address hurts local ranking. */
const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'HousePainter',
  'name': business.name,
  'description': description,
  'telephone': business.phoneDisplay,
  'email': business.email,
  'foundingDate': String(business.established),
  'priceRange': '$$',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': business.address.street,
    'addressLocality': business.address.city,
    'addressRegion': business.address.state,
    'postalCode': business.address.zip,
    'addressCountry': 'US'
  },
  'areaServed': serviceAreas.map(area => ({
    '@type': 'City',
    'name': `${area}, TN`
  })),
  'openingHoursSpecification': [
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '07:00',
      'closes': '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': 'Saturday',
      'opens': '08:00',
      'closes': '14:00'
    }
  ],
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Fence services',
    'itemListElement': services.map(service => ({
      '@type': 'Offer',
      'itemOffered': { '@type': 'Service', 'name': service.title }
    }))
  }
}))

/* FAQPage markup makes the accordion eligible for expandable SERP results. */
const faqData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqs.map(faq => ({
    '@type': 'Question',
    'name': faq.label,
    'acceptedAnswer': { '@type': 'Answer', 'text': faq.content }
  }))
}))

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: () => JSON.stringify(structuredData.value) },
    { type: 'application/ld+json', innerHTML: () => JSON.stringify(faqData.value) }
  ]
})

useScrollReveal()
</script>

<template>
  <UApp>
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream-50"
    >
      Skip to content
    </a>

    <SiteHeader />

    <main id="main">
      <NuxtPage />
    </main>

    <SiteFooter />
    <MobileCallBar />
  </UApp>
</template>
