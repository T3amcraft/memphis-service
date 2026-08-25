/* ==========================================================================
   EDIT ME FIRST — identity, contact and integrations.
   Nothing in this file is hardcoded anywhere else, so changing a value here
   changes it everywhere it appears, including the structured data Google reads.
   All values marked PLACEHOLDER are safe stand-ins — swap them for real ones.

   Wording and section copy live in app/utils/content.ts
   ========================================================================== */

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'forest',
      secondary: 'brass',
      neutral: 'cream'
    }
  },

  business: {
    name: 'Tallowbark Fence & Seal',
    shortName: 'Tallowbark',
    /* Shown under the wordmark in the header. */
    locationLine: 'Memphis, Tennessee',
    /* PLACEHOLDER — replace with the real founding year. */
    established: 2020,

    /* --- Contact. PLACEHOLDER values: 555-01xx numbers are reserved for
       fictional use, and `.example` is a TLD reserved by RFC 2606, so the
       address can never reach a real inbox. ------------------------------ */
    phoneDisplay: '(901) 555-0148',
    phoneHref: 'tel:+19015550148',
    email: 'quotes@tallowbark.example',

    /* PLACEHOLDER — a mailing address is optional for a mobile trade, but
       Google Business Profile ranking loves a consistent city/state/zip. */
    address: {
      street: '1147 Kiln Yard Road',
      city: 'Memphis',
      state: 'TN',
      zip: '38104'
    },

    /* --- Opening hours ---------------------------------------------------
       `label` and `display` are what visitors read. `days`, `opens` and
       `closes` are the machine-readable copy that feeds the
       openingHoursSpecification in the LocalBusiness schema, so edit both
       halves of a row together. Set `closed: true` for a day off.
       -------------------------------------------------------------------- */
    hours: [
      {
        label: 'Monday – Friday',
        display: '7:00 am – 6:00 pm',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
        closed: false
      },
      {
        label: 'Saturday',
        display: '8:00 am – 2:00 pm',
        days: ['Saturday'],
        opens: '08:00',
        closes: '14:00',
        closed: false
      },
      {
        label: 'Sunday',
        display: 'Closed',
        days: ['Sunday'],
        opens: '',
        closes: '',
        closed: true
      }
    ],

    /* PLACEHOLDER — example.com is RFC 2606 reserved. Point these at real
       profiles, or delete the entries you do not have. */
    social: {
      facebook: 'https://example.com',
      instagram: 'https://example.com',
      google: 'https://example.com'
    },

    /* PLACEHOLDER — published as fact in trust badges and structured data.
       Only claim what is true. `insured: false` removes every insurance
       claim from the page rather than leaving it to the copy. */
    credentials: {
      licenseNumber: 'TN-00000000',
      insured: true,
      warrantyYears: 3,
      reviewCount: 180,
      reviewAverage: 4.9
    }
  },

  /* --- Search and social preview --------------------------------------- */
  seo: {
    /* Used for <title>, the meta description and the og/twitter tags. */
    titleSuffix: 'Fence Painting & Sealing in Memphis, TN',
    description:
      'Professional fence painting, staining and sealing across Greater Memphis. '
      + 'Soft wash, full prep, spray-and-back-brush application, and a written '
      + 'workmanship warranty. Free on-site estimates.',
    /* Schema.org priceRange. '$' to '$$$$', or '' to omit the property. */
    priceRange: '$$',
    /* 1200×630 social card in public/img/. Scrapers such as Facebook and X
       may require an absolute https:// URL once a domain exists. */
    ogImage: '/img/og-cover.jpg',
    /* Browser UI colour on mobile. Matches --color-forest-800. */
    themeColor: '#1e3a2f'
  },

  /* --- Quote form delivery ---------------------------------------------
     Static hosting has no server, so the form POSTs to a third-party
     endpoint. Paste a Formspree / Web3Forms / Basin URL here and the form
     starts delivering mail immediately.
     Leave it empty and the form stays in DEMO MODE: it validates, shows the
     success state, and logs the payload to the browser console instead of
     sending it anywhere.
     -------------------------------------------------------------------- */
  forms: {
    quoteEndpoint: ''
  },

  /* --- Photography -----------------------------------------------------
     Drop files into public/img/ and reference them as '/img/your-file.jpg'.
     Any entry left as an empty string renders a labelled placeholder frame
     at the correct aspect ratio, so the layout never collapses.
     -------------------------------------------------------------------- */
  media: {
    beforeAfter: {
      /* Empty on purpose: the slider falls back to the generated weathered →
         stained illustration, which is the same wall in two states. A real pair
         must be the same fence shot from the same position, or dragging the
         handle compares two unrelated photos instead of showing a change. */
      before: '',
      after: '',
      caption: 'Cedar privacy fence, Germantown — soft-washed, then sealed with a semi-transparent cedar tone.'
    },
    gallery: [
      { src: '', label: 'Cedar privacy fence', meta: 'Germantown · semi-transparent stain', ratio: '4/3' },
      { src: '', label: 'Board-on-board, 8 ft', meta: 'Collierville · clear penetrating seal', ratio: '4/3' },
      { src: '', label: 'Spray + back-brush pass', meta: 'East Memphis · crew at work', ratio: '4/3' },
      { src: '', label: 'Shadowbox restoration', meta: 'Midtown · solid stain, gate re-hung', ratio: '4/3' },
      { src: '', label: 'Pool-side picket run', meta: 'Cordova · UV-stable clear coat', ratio: '4/3' },
      { src: '', label: 'HOA fence line, 900 ft', meta: 'Arlington · colour-matched to spec', ratio: '4/3' }
    ]
  }
})
