/* ==========================================================================
   EDIT ME FIRST.
   Everything a new owner needs to change on day one lives in this file:
   phone, email, address, hours, social links, photo paths, form endpoint.
   All values marked PLACEHOLDER are safe stand-ins — swap them for real ones.
   Long-form copy (services, process, FAQ, reviews) lives in app/utils/content.ts
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
    name: 'River City Fence & Seal',
    shortName: 'River City',
    tagline: 'Fence painting & sealing, Memphis born.',
    /* PLACEHOLDER — replace with the real founding year. */
    established: 2020,

    /* --- Contact. PLACEHOLDER values: 555-01xx numbers are reserved for
       fictional use, and the email domain is not registered. ------------ */
    phoneDisplay: '(901) 555-0142',
    phoneHref: 'tel:+19015550142',
    email: 'quotes@rivercityfenceandseal.com',

    /* PLACEHOLDER — a mailing address is optional for a mobile trade, but
       Google Business Profile ranking loves a consistent city/state/zip. */
    address: {
      street: '2440 Central Ave, Suite 5',
      city: 'Memphis',
      state: 'TN',
      zip: '38104'
    },

    hours: [
      { days: 'Monday – Friday', time: '7:00 am – 6:00 pm' },
      { days: 'Saturday', time: '8:00 am – 2:00 pm' },
      { days: 'Sunday', time: 'Closed' }
    ],

    /* PLACEHOLDER — point these at real profiles, or delete the entries. */
    social: {
      facebook: 'https://facebook.com/',
      instagram: 'https://instagram.com/',
      google: 'https://g.page/'
    },

    /* PLACEHOLDER — shown as trust badges. Only claim what is true. */
    credentials: {
      licenseNumber: 'TN-00000000',
      insured: true,
      warrantyYears: 3,
      reviewCount: 180,
      reviewAverage: 4.9
    }
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
