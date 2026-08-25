# River City Fence & Seal — Configuration Reference

Every configuration key, by group.

Authoritative source: `app/app.config.ts`, `nuxt.config.ts`, `app/assets/css/main.css`, `netlify.toml`

Values marked **PLACEHOLDER** are committed stand-ins, not real data. See [TASKS.md](TASKS.md) for the pre-launch replacement work.

## Business identity — `app.config.ts` → `business`

| Key | Default | Purpose |
|-----|---------|---------|
| `name` | `River City Fence & Seal` | Wordmark, `<title>`, JSON-LD `name`, footer copyright |
| `shortName` | `River City` | Declared but not currently read by any component |
| `tagline` | `Fence painting & sealing, Memphis born.` | Declared but not currently read by any component |
| `established` | `2014` | **PLACEHOLDER.** Footer "Established", JSON-LD `foundingDate`, `TrustBar` |

## Contact — `business`

| Key | Default | Purpose |
|-----|---------|---------|
| `phoneDisplay` | `(901) 555-0142` | **PLACEHOLDER** (`555-01xx` is reserved for fiction). Every visible phone number |
| `phoneHref` | `tel:+19015550142` | **PLACEHOLDER.** `href` of every call link. Must be kept in sync with `phoneDisplay` by hand |
| `email` | `quotes@rivercityfenceandseal.com` | **PLACEHOLDER** (domain unregistered). `mailto:` links in FAQ, quote and footer |

## Address — `business.address`

Optional for a mobile trade, but consistency with the Google Business Profile affects local ranking (see BUSINESS-RULES.md).

| Key | Default | Purpose |
|-----|---------|---------|
| `street` | `2440 Central Ave, Suite 5` | **PLACEHOLDER.** Footer, JSON-LD `streetAddress` |
| `city` | `Memphis` | JSON-LD `addressLocality` |
| `state` | `TN` | JSON-LD `addressRegion` |
| `zip` | `38104` | **PLACEHOLDER.** JSON-LD `postalCode` |

## Hours — `business.hours`

Array of `{ days, time }`. Rendered verbatim in the quote section and footer. The JSON-LD `openingHoursSpecification` in `app/app.vue` is **hardcoded separately** (Mon–Fri 07:00–18:00, Sat 08:00–14:00) — editing this array does not update the structured data.

| Index | Default |
|-------|---------|
| 0 | `Monday – Friday` · `7:00 am – 6:00 pm` |
| 1 | `Saturday` · `8:00 am – 2:00 pm` |
| 2 | `Sunday` · `Closed` |

## Social — `business.social`

Rendered as footer icon buttons. Keys are fixed: `SiteFooter` looks up exactly `google`, `facebook`, `instagram`.

| Key | Default | Purpose |
|-----|---------|---------|
| `facebook` | `https://facebook.com/` | **PLACEHOLDER.** Bare domain, not a profile |
| `instagram` | `https://instagram.com/` | **PLACEHOLDER.** Bare domain, not a profile |
| `google` | `https://g.page/` | **PLACEHOLDER.** Bare domain, not a profile |

## Credentials — `business.credentials`

Published as fact in trust badges and structured data. Only claim what is true.

| Key | Default | Purpose |
|-----|---------|---------|
| `licenseNumber` | `TN-00000000` | **PLACEHOLDER.** Top strip, `TrustBar`, footer |
| `insured` | `true` | Declared but not currently read — the "fully insured" copy is hardcoded |
| `warrantyYears` | `3` | Hero trust row, `TrustBar` |
| `reviewCount` | `180` | **PLACEHOLDER.** Hero and reviews heading ("180+ reviews") |
| `reviewAverage` | `4.9` | **PLACEHOLDER.** Hero and reviews heading |

## Quote form delivery — `app.config.ts` → `forms`

| Key | Default | Purpose |
|-----|---------|---------|
| `quoteEndpoint` | `''` (empty) | Third-party `POST` URL (Formspree / Web3Forms / Basin). Empty keeps the form in demo mode — it validates and shows success but transmits nothing. See BUSINESS-RULES.md |

## Photography — `app.config.ts` → `media`

Any `src` left as `''` renders a labelled placeholder frame instead of collapsing the layout.

| Key | Default | Purpose |
|-----|---------|---------|
| `beforeAfter.before` | `''` | Weathered "before" photo; empty falls back to a grey `PicketFill` illustration |
| `beforeAfter.after` | `''` | Finished "after" photo; empty falls back to a stained `PicketFill` illustration |
| `beforeAfter.caption` | Cedar privacy fence, Germantown… | Caption under the slider |
| `gallery[]` | 6 entries, all `src: ''` | Gallery slots. Each is `{ src, label, meta, ratio }` |

Per-entry `gallery` fields:

| Field | Purpose |
|-------|---------|
| `src` | Path such as `/img/foo.jpg`, served from `public/img/`. Empty → placeholder frame |
| `label` | Caption headline. **Also derives the suggested filename** shown on an empty frame |
| `meta` | Sub-caption (neighbourhood · treatment) |
| `ratio` | CSS `aspect-ratio`, all `4/3` by default |

## Theme colours — `app.config.ts` → `ui.colors`

Maps Nuxt UI's semantic aliases onto palettes defined in `app/assets/css/main.css`.

| Key | Default | Purpose |
|-----|---------|---------|
| `primary` | `forest` | Deep green; buttons, headings, dark sections |
| `secondary` | `brass` | Aged gold accent |
| `neutral` | `cream` | Warm page ground and neutral text scale |

Each palette needs a full 50–950 shade range declared under `@theme static` in `main.css`; Nuxt UI's `--ui-*` semantic tokens are remapped onto them in the `:root` block below it.

## Build configuration — `nuxt.config.ts`

| Key | Default | Purpose |
|-----|---------|---------|
| `compatibilityDate` | `2025-07-15` | Nitro behaviour pin |
| `modules` | `['@nuxt/ui']` | Pulls in `@nuxt/fonts`, `@nuxt/icon`, `@nuxtjs/color-mode` transitively |
| `css` | `['~/assets/css/main.css']` | Single stylesheet entry |
| `ui.colorMode` | `false` | Disables dark mode outright — the palette is a committed light look |
| `ssr` | `true` | Required for prerendering |
| `nitro.prerender.routes` | `['/', '/200.html', '/404.html']` | Routes written as static HTML |
| `nitro.prerender.crawlLinks` | `true` | Follows internal links when prerendering |
| `icon.mode` | `'svg'` | Inlines each icon as `<svg>` rather than CSS masks |
| `icon.serverBundle` | `'local'` | Resolves icons from the installed `@iconify-json/lucide` |
| `icon.clientBundle.scan.globInclude` | `['**/*.{vue,jsx,tsx,ts}']` | **`.ts` is load-bearing** — icon names live in `app/utils/content.ts`. See BUILD.md |
| `icon.clientBundle.scan.globExclude` | `['node_modules', 'dist', '.output', '.nuxt']` | Scan exclusions |
| `icon.clientBundle.includeCustomCollections` | `true` | Bundles any custom collections client-side |
| `fonts.families` | Fraunces, Inter — weights 400/500/600/700 | Downloaded and self-hosted at build time |
| `app.head.htmlAttrs.lang` | `en-US` | Document language |
| `app.head.meta` `theme-color` | `#1E3A2F` | Browser UI colour (forest-800) |
| `app.head.link` icon | `/favicon.svg` | Favicon |

## Deployment configuration — `netlify.toml`

| Key | Default | Purpose |
|-----|---------|---------|
| `build.command` | `npm run generate` | Static build |
| `build.publish` | `.output/public` | Deploy directory |
| `build.environment.NODE_VERSION` | `24` | Matches `.nvmrc` |
| `headers` for `/_nuxt/*` | `public, max-age=31536000, immutable` | Hashed assets cached for a year |

## Secrets

**There are none.** The build reads no environment variable and the repository stores no credential. The only credential-shaped value is `forms.quoteEndpoint`, which is a public third-party URL and is necessarily visible in the shipped client bundle — treat abuse protection as the form provider's responsibility, not this site's. Do not add secrets to `app.config.ts`: it is compiled into the public bundle.

## Related documentation

- [BUILD.md](BUILD.md) — build and deployment
- [BUSINESS-RULES.md](BUSINESS-RULES.md) — form and media behaviour
- [ARCHITECTURE.md](ARCHITECTURE.md) — components and integrations
- [TASKS.md](TASKS.md) — backlog
