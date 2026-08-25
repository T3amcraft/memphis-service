# River City Fence & Seal

Marketing site for a fence painting & sealing business in Memphis, Tennessee.
Single-page scroller, statically generated — no server, no database, and no
third-party request once the page is served. (The *build* does fetch fonts once,
then self-hosts them.)

**Nuxt 4 · Nuxt UI 4 · Tailwind CSS 4 · fully prerendered**

Maintainer documentation lives in [`docs/`](docs/) — architecture, build, business rules, configuration reference, and the task backlog.

---

## Run it

Node 24 is required (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static build → .output/public
npm run preview    # serve the built output locally
npm run typecheck  # vue-tsc over components, composables and config
```

`npm run generate` writes plain HTML, CSS and JS to `.output/public`. That folder
is the whole website — it will run on any static host.

---

## Before you launch — the placeholder checklist

Every item below is a stand-in. Nothing here is real.

| Where | What to replace |
| --- | --- |
| `app/app.config.ts` | Phone, email, address, hours, social links, founding year |
| `app/app.config.ts` | Licence number, review count and average, warranty length |
| `app/app.config.ts` | `forms.quoteEndpoint` — until it is set the form is in demo mode |
| `app/utils/content.ts` | The four reviews. They currently read **"Placeholder review"** on purpose so they cannot ship by accident |
| `public/img/` | All photography (see below) |
| `public/robots.txt` | Uncomment the `Sitemap:` line with your real domain |
| `app/app.vue` | `ogImage` is a root-relative path. Facebook and X may need an absolute `https://yourdomain.com/img/og-cover.jpg` once the domain exists |

The phone number uses the `555-01xx` range, which is reserved for fictional use,
and the email domain is not registered — so nothing can leak to a real person
while you are still building.

### Two files hold everything

- **`app/app.config.ts`** — contact details, credentials, photo paths, form endpoint.
  The things a business owner changes.
- **`app/utils/content.ts`** — services, process steps, FAQ, reviews, service areas.
  The words. Edit the arrays and the layout follows.

---

## Photography

Drop files into `public/img/` and point at them from `app/app.config.ts`:

```ts
media: {
  beforeAfter: {
    before: '/img/before.jpg',
    after: '/img/after.jpg',
    caption: 'Cedar privacy fence, Germantown — soft-washed, then sealed.'
  },
  gallery: [
    { src: '/img/cedar-privacy-fence.jpg', label: 'Cedar privacy fence', meta: 'Germantown · semi-transparent stain', ratio: '4/3' },
    // …
  ]
}
```

Any `src` left as `''` renders a **labelled placeholder frame** at the correct
aspect ratio, with the expected filename printed on it. The layout never
collapses, and it is obvious what is missing.

The before/after slider ships with illustrated picket walls — weathered grey on
one side, freshly stained on the other — so the drag interaction demonstrates
itself before you have photos. Add `before.jpg` and `after.jpg` and they take over.

Everything else on the page (the hero fence line, the coverage map, textures,
the logo) is hand-built SVG. No image files to manage, and it stays crisp at any
size.

**Photo tips:** shoot before and after from the *same spot* at the *same time of
day* — the slider is only convincing if the framing matches. Landscape, roughly
16:10, 1600px wide is plenty.

---

## Wiring up the quote form

A static site has no server, so the form posts to a third-party endpoint. Any of
these work — sign up, copy the endpoint URL, paste it into
`app/app.config.ts` → `forms.quoteEndpoint`:

- [Formspree](https://formspree.io) — `https://formspree.io/f/xxxxxxx`
- [Web3Forms](https://web3forms.com) — free tier, no account needed
- [Basin](https://usebasin.com)

```ts
forms: {
  quoteEndpoint: 'https://formspree.io/f/xxxxxxx'
}
```

With the field empty the form still validates and shows its success state, but
logs the payload to the browser console instead of sending it. Look for
`[quote form] demo mode` in devtools.

The form already includes a honeypot field, so most bot submissions are dropped
before they reach your inbox.

---

## Deploying

The output is static, so every option below is genuinely just "upload a folder".

**Netlify — drag and drop (fastest)**
```bash
npm run generate
```
Then drag `.output/public` onto <https://app.netlify.com/drop>. Live in seconds.

**Netlify / Cloudflare Pages — connected to git**
`netlify.toml` is already configured. For Cloudflare Pages set:
- Build command: `npm run generate`
- Output directory: `.output/public`

**Vercel**
Import the repo. Vercel detects Nuxt automatically; no configuration needed.
Check the current terms first — the free Hobby tier has historically been
non-commercial only, which matters for a real business site.

**GitHub Pages**
```bash
npm run generate
touch .output/public/.nojekyll
```
Publish `.output/public` to your `gh-pages` branch.

**Any web host / cPanel**
Upload the contents of `.output/public` to `public_html`. That is it.

---

## SEO already in place

- `LocalBusiness` (`HousePainter`) structured data with your NAP, hours, service
  area and service catalogue — this is what feeds Google's local pack.
- `FAQPage` structured data generated from the accordion, so the questions are
  eligible for expandable search results.
- Descriptive `<title>`, meta description, and Open Graph / Twitter card tags.
- Semantic headings, one `<h1>`, real landmark elements.

Keep the name, phone and address identical here, on your Google Business
Profile, and in every directory listing. Mismatched details are the single most
common cause of weak local ranking.

---

## Accessibility notes

Worth preserving as you edit:

- Skip link to main content; visible focus rings throughout.
- The before/after comparison is a real `<input type="range">` under the hood, so
  it works with a keyboard and a screen reader — not just a mouse.
- Scroll animations are opt-in via `data-reveal`, are never applied to content
  already on screen, and switch off entirely under
  `prefers-reduced-motion: reduce`.
- Server-rendered HTML ships fully visible. With JavaScript disabled the page
  still reads top to bottom.
- Icon-only buttons carry `aria-label`s; decorative SVG is `aria-hidden`.

---

## Design system

Defined once in `app/assets/css/main.css`:

| Token | Value | Used for |
| --- | --- | --- |
| `forest` | `#1e3a2f` base | Primary — headings, dark sections, buttons |
| `brass` | `#b8945a` base | Accent — eyebrows, icons, the hero CTA |
| `cream` | `#faf6ef` base | Page ground and neutral text scale |
| `--font-serif` | Fraunces | Headlines |
| `--font-sans` | Inter | Body |

Fonts are downloaded and self-hosted at build time by `@nuxt/fonts` — no runtime
request to Google, which keeps the site fast and avoids the consent question
entirely.

Dark mode is deliberately switched off (`ui.colorMode: false` in
`nuxt.config.ts`). The palette is a committed warm-premium look; inverting it
would fight the brand rather than serve it.

---

## Project layout

```
app/
  app.config.ts          ← contact details, photos, form endpoint
  app.vue                ← <head>, structured data, page shell
  assets/css/main.css    ← palette, typography, utilities
  components/            ← one component per section, plus SVG art
  composables/           ← scroll reveal, scroll position
  pages/index.vue        ← section order lives here
  utils/content.ts       ← services, process, FAQ, reviews, areas
public/                  ← favicon, robots.txt, og-cover.jpg, your photos
docs/                    ← maintainer docs (architecture, build, rules, config, tasks)
netlify.toml             ← build config for Netlify
```

To reorder the page, reorder the components in `app/pages/index.vue`.
