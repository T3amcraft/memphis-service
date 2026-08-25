<script setup lang="ts">
const { business, seo } = useAppConfig()

const title = `${business.name} — ${seo.titleSuffix}`

useSeoMeta({
  title,
  description: seo.description,
  ogTitle: title,
  ogDescription: seo.description,
  ogType: 'website',
  ogLocale: 'en_US',
  ogSiteName: business.name,
  twitterCard: 'summary_large_image',
  ogImage: seo.ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: `${business.name} — fence painting and sealing in ${business.address.city}, ${business.address.state}`,
  twitterImage: seo.ogImage
})

/* Derived from business.hours, so the schema can never drift from the hours
   printed on the page. Closed days are omitted rather than sent as empty. */
const openingHours = computed(() =>
  business.hours
    .filter(slot => !slot.closed && slot.opens && slot.closes)
    .map(slot => ({
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': slot.days.length === 1 ? slot.days[0] : slot.days,
      'opens': slot.opens,
      'closes': slot.closes
    }))
)

/* LocalBusiness structured data. Google uses this for the local pack and
   rich results, so every value is read from app.config.ts — keep that file in
   sync with your Google Business Profile, because a mismatched name, phone or
   address hurts local ranking. */
const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'HousePainter',
  'name': business.name,
  'description': seo.description,
  'telephone': business.phoneDisplay,
  'email': business.email,
  'foundingDate': String(business.established),
  ...(seo.priceRange ? { priceRange: seo.priceRange } : {}),
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
    'name': `${area}, ${business.address.state}`
  })),
  'openingHoursSpecification': openingHours.value,
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
  meta: [{ name: 'theme-color', content: seo.themeColor }],
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
