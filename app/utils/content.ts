/* ==========================================================================
   Editorial copy. Auto-imported by Nuxt — edit the text, the layout follows.
   Contact details, credentials, photos and integrations live in
   app/app.config.ts
   ========================================================================== */

/* --- Section wording -----------------------------------------------------
   Every heading, lede and inline note on the page. Nothing here is repeated
   in a component, so a change lands in exactly one place.
   ------------------------------------------------------------------------ */
export const copy = {
  header: {
    /* Slim strip above the header on wide screens. */
    strip: [
      { icon: 'i-lucide-shield-check', text: 'Licensed & insured', needsInsured: true },
      { icon: 'i-lucide-map-pin', text: 'Serving Greater Memphis & Shelby County', needsInsured: false },
      { icon: 'i-lucide-clipboard-check', text: 'Free on-site estimates', needsInsured: false }
    ],
    ctaLabel: 'Free Estimate',
    mobileCtaLabel: 'Get a Free Estimate'
  },

  hero: {
    eyebrow: 'Memphis · Germantown · Collierville',
    /* The headline renders as: "<lead> <accent>." with the accent underlined. */
    headlineLead: 'Fence painting & sealing, built for',
    headlineAccent: 'Memphis weather',
    lede:
      'Fifty inches of rain a year, relentless humidity and a UV season that '
      + 'never really ends. We soft-wash, prep, stain and seal — both sides, '
      + 'every board — so your fence stops losing that fight.',
    ctaPrimary: 'Get a Free Estimate',
    trust: {
      reviews: 'from {count}+ local reviews',
      insured: 'Licensed & fully insured',
      licensedOnly: 'Licensed contractor',
      warranty: '{years}-year workmanship warranty'
    },
    promise: {
      eyebrow: 'No-obligation',
      title: 'On-site estimates, usually within 48 hours',
      body: 'We measure the run, probe the posts, and put it in writing.'
    }
  },

  trustBar: {
    established: 'Memphis owned & operated',
    reviews: '{count}+ homeowner reviews',
    warranty: 'Written workmanship warranty',
    licence: '& fully insured · {licence}',
    licenceNoInsurance: 'Licence {licence}'
  },

  services: {
    eyebrow: 'What we do',
    title: 'Two services, done properly — and a plan so you only book once.',
    lede:
      'Most fence companies treat coating as an afternoon with a sprayer. The '
      + 'prep is what decides whether it still looks right in three years, so '
      + 'that is where most of our time goes.',
    footnotePrefix: 'Not sure which your fence needs?',
    footnoteLink: 'Ask for an honest assessment',
    footnoteSuffix: '— we will tell you if it can wait a year.'
  },

  beforeAfter: {
    eyebrow: 'Before & after',
    title: 'The grey is not the wood. It is a layer sitting on top of it.',
    lede:
      'Most Memphis fences that look finished are simply dirty and dried out. '
      + 'Wash, brighten, then seal, and the timber underneath is usually in far '
      + 'better shape than the owner expected.',
    changes: [
      { icon: 'i-lucide-sparkles', text: 'Oxidised grey layer washed off, true colour brought back' },
      { icon: 'i-lucide-shield', text: 'Water beads instead of soaking into the grain' },
      { icon: 'i-lucide-sun', text: 'UV inhibitors slow the fade through our long summers' }
    ],
    cta: 'See what yours could look like',
    dragHint: 'Drag the handle to compare.'
  },

  process: {
    eyebrow: 'How the job runs',
    title: 'Five steps, and none of them get skipped.',
    lede:
      'Coating is the quick part. Everything before it is what makes the finish '
      + 'last — so here is exactly what happens, in order, from the first phone call.',
    weatherNoteLead: 'Weather moves schedules.',
    weatherNoteBody: 'We do not coat damp wood or work ahead of rain. You will get a call, not a rushed job.'
  },

  gallery: {
    eyebrow: 'Recent work',
    title: 'Fence lines around Shelby County.',
    lede: 'Cedar, pine, board-on-board, shadowbox and picket — residential runs and full HOA fence lines.',
    cta: 'Start your project'
  },

  reviews: {
    eyebrow: 'What neighbours say',
    title: 'Rated for prep work, straight answers and a clean site.',
    aggregate: '{count}+ reviews across Google & Facebook'
  },

  maintenance: {
    eyebrow: 'The Delta Guard Program',
    title: 'Book us once. Then stop thinking about your fence.',
    lede:
      'A fence that is inspected, washed and re-sealed on a rhythm does not '
      + 'enter the replacement cycle. One annual visit is the difference between '
      + 'maintaining a fence and buying a new one.',
    cta: 'Ask about Delta Guard',
    includedLabel: 'Included every year',
    costNote:
      'Program cost depends on the length and condition of your fence, so we '
      + 'quote it alongside your estimate — no sign-up needed to get the number.',
    pullQuote: 'The cheapest fence you will ever own is the one you already have.'
  },

  areas: {
    eyebrow: 'Where we work',
    title: 'Greater Memphis, and about thirty miles out.',
    lede:
      'We are based in Memphis and stay inside Shelby County and its immediate '
      + 'neighbours. That is deliberate — a crew that is not driving two hours '
      + 'can be back on your fence the next morning when the weather turns.',
    outsideNoteLead: 'Just outside the ring, or across the state line in North Mississippi? Call',
    outsideNoteTail: 'and ask — larger jobs we will happily travel for.',
    mapCaption: 'Illustrative coverage map — not to scale.'
  },

  faq: {
    eyebrow: 'Straight answers',
    title: 'Questions we get on almost every estimate.',
    lede:
      'If yours is not here, ask it. We would rather talk you out of work you do '
      + 'not need than sell you a coat of stain your fence cannot hold.'
  },

  quote: {
    eyebrow: 'Free estimate',
    title: 'Tell us about your fence.',
    lede:
      'Send the details and we will come out, measure it, read the condition of '
      + 'the wood, and give you a straight number in writing.',
    nextSteps: [
      'We call or text back the same working day',
      'We walk the fence line with you and measure the run',
      'A written, itemised quote — valid for 30 days'
    ],
    /* Dropdown options. Free text — the schema validates only that something
       was chosen, so adding an option needs no code change. */
    serviceOptions: [
      'Fence painting & staining',
      'Sealing & waterproofing',
      'Delta Guard annual program',
      'Not sure — please advise'
    ],
    lengthOptions: [
      'Under 100 ft',
      '100 – 200 ft',
      '200 – 350 ft',
      '350 – 600 ft',
      'Over 600 ft',
      'Not sure'
    ],
    /* Field labels and the example text shown inside each empty input.
       The phone example uses the reserved 555-01xx range. */
    fields: {
      name: { label: 'Your name', placeholder: 'Jordan Whitaker' },
      phone: { label: 'Phone', placeholder: '(901) 555-0148' },
      email: { label: 'Email', placeholder: 'you@example.com' },
      location: { label: 'Street or neighbourhood', placeholder: 'Germantown, 38139' },
      service: { label: 'What do you need?', placeholder: 'Choose a service' },
      length: { label: 'Roughly how much fence?', placeholder: 'Estimate is fine' },
      message: {
        label: 'Anything else we should know?',
        hint: 'Optional',
        placeholder: 'Age of the fence, wood type, whether it has been stained before, gates, HOA colour requirements — anything helps.'
      }
    },
    submitLabel: 'Request my free estimate',
    submitPending: 'Sending…',
    successTitle: 'Request received',
    successBody:
      'Thank you — we will be in touch the same working day to book your on-site '
      + 'estimate. If it is urgent, calling is always fastest.',
    smallPrint: 'No obligation, no deposit, and no sales visit disguised as an estimate. Prefer to talk?',
    consentLabel: 'Yes, contact me about this request.',
    consentHint: 'We use your details for this estimate only — never sold, never added to a mailing list.',
    errorTitle: 'That did not go through',
    errorBody: 'Sorry — please call {phone} and we will take the details over the phone.'
  },

  footer: {
    blurb: 'Fence painting, staining and sealing across Greater Memphis. Established {year}, still answering our own phone.',
    servicesHeading: 'Services',
    areasHeading: 'Service area',
    contactHeading: 'Get in touch',
    beforeAfterLink: 'Before & after',
    areasLink: 'See full area →',
    backToTop: 'Back to top'
  }
}

/** Replace {placeholders} in a copy string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ''))
}

export interface Service {
  id: string
  icon: string
  title: string
  lede: string
  points: string[]
  footnote: string
}

export const services: Service[] = [
  {
    id: 'painting-staining',
    icon: 'i-lucide-paint-roller',
    title: 'Fence Painting & Staining',
    lede: 'Colour that holds its tone through a Memphis August instead of chalking out by the second summer.',
    points: [
      'Solid, semi-transparent and transparent stains — cedar, walnut, driftwood grey, or matched to your spec',
      'Sprayed for even coverage, then back-brushed by hand so the coating is worked into the grain',
      'Both faces of the fence plus post caps, rails and end grain — not just the side you can see',
      'HOA and neighbourhood-covenant colours confirmed in writing before a drop is opened'
    ],
    footnote: 'Best for weathered pine, previously painted fences, and anyone who wants a specific colour.'
  },
  {
    id: 'sealing-waterproofing',
    icon: 'i-lucide-droplets',
    title: 'Sealing & Waterproofing',
    lede: 'The Delta throws 50-plus inches of rain and brutal UV at your fence every year. Sealer is what stands in the way.',
    points: [
      'Penetrating water-repellent sealers that soak in rather than sitting on top as a peelable film',
      'UV inhibitors to slow the grey-out, plus mildewcide for our shaded, humid back yards',
      'End grain, post bases and the bottom rail saturated first — that is where rot actually starts',
      'Water-bead test walked with you at the final inspection'
    ],
    footnote: 'Best for newer or already-good-looking wood you want to keep that way.'
  },
  {
    id: 'reseal-program',
    icon: 'i-lucide-calendar-check',
    title: 'Annual Re-Seal Program',
    lede: 'One visit a year keeps a fence out of the replacement cycle for a decade or more.',
    points: [
      'Yearly inspection with photos of anything starting to move, split or sit wet',
      'Soft wash to clear mildew, pollen and irrigation staining',
      'Re-seal on the schedule your wood actually needs, not a generic calendar',
      'Priority scheduling ahead of the spring rush, and member pricing on any repair'
    ],
    footnote: 'Best for anyone who would rather never think about their fence again.'
  }
]

export interface ProcessStep {
  number: string
  title: string
  body: string
  detail: string
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Free on-site estimate',
    body: 'We walk the fence line with you, measure the run, and read the condition of the wood.',
    detail: 'Moisture check, rot probe on the posts, and an honest answer on stain vs. seal. Written quote, no pressure, no upsell script.'
  },
  {
    number: '02',
    title: 'Soft wash & brighten',
    body: 'Low-pressure cleaning lifts mildew, pollen and the grey oxidised layer.',
    detail: 'We never blast wood at high pressure — it furs the grain and drives water into the joints. A wood brightener resets the pH so the coating can bond.'
  },
  {
    number: '03',
    title: 'Dry, prep & protect',
    body: 'The fence dries fully, then we make it ready for coating.',
    detail: 'Popped nails set, splinters sanded, hardware masked. Plants, beds, pools, driveways and siding covered before anything is sprayed.'
  },
  {
    number: '04',
    title: 'Coat & saturate',
    body: 'Spray for consistency, back-brush for penetration, both sides every time.',
    detail: 'End grain, post tops and the bottom six inches get extra product, because that is where water sits and rot begins.'
  },
  {
    number: '05',
    title: 'Walkthrough & warranty',
    body: 'We inspect it together before we load the trailer.',
    detail: 'Site left cleaner than we found it, product and colour recorded for your file, and your written warranty registered the same day.'
  }
]

export interface Faq {
  label: string
  content: string
}

export const faqs: Faq[] = [
  {
    label: 'How often does a fence need re-sealing in Memphis?',
    content: 'Every two to three years for most of the Mid-South. Our humidity, 50-plus inches of annual rain and long UV season are harder on wood than almost anywhere else in the country. A south- or west-facing run takes the most punishment and often needs attention first. If water soaks straight in and darkens the board instead of beading up, it is time.'
  },
  {
    label: 'Should I stain or paint my fence?',
    content: 'For wood fences we recommend stain nearly every time. Stain penetrates and fades gradually, so a refresh is a wash-and-recoat. Paint forms a surface film that eventually peels — and once it peels, you are scraping, not recoating. The exception is a fence already carrying several coats of paint, where matching paint is the practical choice. We will tell you which situation you are in during the estimate.'
  },
  {
    label: 'How long does the job take, and when can pets and kids back outside?',
    content: 'A typical residential fence is a two- to three-day job: wash on day one, dry overnight, coat on day two. Most coatings are dry to the touch within two to four hours and safe for pets and children the following morning. Weather moves the schedule — we do not coat damp wood or work ahead of rain, and we will call you rather than rush it.'
  },
  {
    label: 'My fence is brand new. Can you seal it right away?',
    content: 'Usually not immediately. New pressure-treated pine arrives wet with treatment chemicals and has to release moisture before it will accept a coating — commonly three to six months in our climate. Kiln-dried cedar can often be sealed within weeks. We will test the moisture content and give you a straight answer instead of taking the job early and watching the finish fail.'
  },
  {
    label: 'Can a grey, weathered fence actually be brought back?',
    content: 'In most cases, yes, and it surprises people how far. That silver-grey is a thin oxidised layer, not the true colour of the wood. A soft wash plus a wood brightener strips it and reveals sound timber underneath, ready to take stain. Boards that are cupped, cracked through, or soft at the base are past saving — we flag those and quote replacement separately rather than coating over a problem.'
  },
  {
    label: 'Will you protect my plants, pool and siding?',
    content: 'Always, and it is part of the quoted price. Beds and shrubs get covered, pools and hardscape get masked, and adjacent siding is protected before a sprayer is picked up. We work in low wind and shield the spray line. Overspray is a preparation failure, not an accident.'
  },
  {
    label: 'Do you handle HOA colour approvals?',
    content: 'We work inside HOA and covenant requirements across Germantown, Collierville, Arlington and the surrounding communities regularly. Send us the approved palette or the covenant page and we will match it, then put the exact product and colour code in writing on your quote so your submission is straightforward.'
  },
  {
    label: 'What does the warranty cover?',
    content: 'Our workmanship warranty covers peeling, flaking and premature coating failure on the surfaces we treated. It does not cover normal fading, storm damage, impact, irrigation aimed directly at the fence, or boards that were already failing and documented as such at estimate. The full terms come with your quote — read them before you sign, not after.'
  }
]

/* PLACEHOLDER REVIEWS — fictional, for layout only.
   Replace with real, permissioned quotes before the site goes live. */
export interface Testimonial {
  quote: string
  name: string
  area: string
  job: string
  stars: number
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Our fence had gone silver-grey and I assumed we were looking at replacing the whole run. They washed it, brightened it and stained it cedar, and it honestly looks newer than the day it went in. Three days, no mess, no surprises on the invoice.',
    name: 'Placeholder review',
    area: 'Germantown',
    job: '210 ft cedar privacy · stain & seal',
    stars: 5
  },
  {
    quote: 'What sold me was the estimate. He probed the posts, showed me two that were going soft, and told me which ones could wait a year. Nobody else who came out even looked at the base of the fence.',
    name: 'Placeholder review',
    area: 'East Memphis',
    job: '160 ft board-on-board · seal',
    stars: 5
  },
  {
    quote: 'Our HOA has a very specific colour and a very particular board. They matched it, put the product code on the quote, and the approval went through first time. Second year on the maintenance plan now.',
    name: 'Placeholder review',
    area: 'Collierville',
    job: '340 ft HOA fence line · annual program',
    stars: 5
  },
  {
    quote: 'They covered every bed and my pool before touching a sprayer, and swept the patio twice on the way out. Rain pushed us back a day and they called me instead of coating a wet fence. That is the whole review.',
    name: 'Placeholder review',
    area: 'Cordova',
    job: '120 ft shadowbox · wash, stain & seal',
    stars: 5
  }
]

export const serviceAreas: string[] = [
  'Memphis',
  'Midtown',
  'East Memphis',
  'Germantown',
  'Collierville',
  'Cordova',
  'Bartlett',
  'Arlington',
  'Lakeland',
  'Millington',
  'Eads',
  'Piperton'
]

export const maintenanceBenefits: string[] = [
  'Annual inspection with photo notes on anything starting to move or sit wet',
  'Soft wash every visit — mildew, pollen and irrigation staining cleared',
  'Re-seal on the schedule your wood needs, tracked year over year',
  'Priority booking ahead of the spring rush',
  'Member rate on board, post and gate repairs',
  'One number to call, one crew who already knows your fence'
]
