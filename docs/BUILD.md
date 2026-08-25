# River City Fence & Seal — Build and Deployment

Authoritative source: `package.json`, `nuxt.config.ts`, `netlify.toml`, `.nvmrc`, `tsconfig.json`

## Prerequisites

| Requirement | Notes |
|-------------|-------|
| Node 24 | Pinned in `.nvmrc` and enforced by `engines.node` (`>=24`) in `package.json`, so npm fails loudly on an older runtime rather than part-way through the build. |
| npm | Lockfile is `package-lock.json`; no other package manager is configured. |
| Build-time network access | `@nuxt/fonts` fetches Fraunces and Inter from `fonts.googleapis.com` / `fonts.gstatic.com` during the build. Icons need no network — they resolve from `node_modules`. |

## Repository layout

```
.
  app/                     # all application source (Nuxt 4 srcDir)
    app.config.ts          # business identity, media paths, form endpoint
    app.vue                # head, SEO meta, JSON-LD, page shell
    assets/css/main.css    # palette, typography, utilities, reveal styles
    components/            # section components + generated SVG art
    composables/           # useScrollReveal, useScrolledPast
    pages/index.vue        # the only route; section order lives here
    utils/                 # content.ts (copy), nav.ts (anchors)
  public/                  # favicon.svg, robots.txt, img/ (photos go here)
  docs/                    # this documentation set
  nuxt.config.ts           # modules, static output, icon + font config
  netlify.toml             # Netlify build command and cache headers
  tsconfig.json            # references the configs Nuxt generates into .nuxt/
```

## Build

From the repository root:

```bash
npm install
npm run generate     # static build -> .output/public
```

`npm run dev` serves at `http://localhost:3000`. `npm run preview` serves the built output via `npx serve .output/public`.

A `postinstall` hook runs `nuxt prepare`, which generates `.nuxt/tsconfig.*.json`. Those files must exist before `typecheck` will run.

### Run tests

There is **no test suite**. The only automated gate is:

```bash
npm run typecheck    # vue-tsc across components, composables, config
```

Expected result: exit 0 with no diagnostics. It also prints two `Resolve plugin path failed: vue-router/volar/sfc-route-blocks` warnings — a `vue-tsc` / `vue-router` 5 tooling mismatch, not a project error.

### Icon bundling constraint

`icon.clientBundle.scan.globInclude` in `nuxt.config.ts` is widened to include `.ts`. The default glob covers only `.vue`/`.jsx`/`.tsx`/`.md*`, and the three service icon names are string literals in `app/utils/content.ts`. Narrowing the glob makes those icons render as empty boxes while the build still exits 0 — the failure is a `WARN  [Icon] failed to load icon …` line, not an error. Grep the build log for `failed to load icon` after touching icon config.

## Outputs

| Artifact | Path |
|----------|------|
| Static site (the deployable) | `.output/public/` |
| Convenience symlink to the above | `dist` → `.output/public` (created by `nuxt generate`) |
| Prerendered routes | `index.html`, `200.html`, `404.html` |
| Self-hosted fonts | `.output/public/_fonts/*.woff2` |
| Hashed JS/CSS | `.output/public/_nuxt/` |

`.output`, `.nuxt`, `dist`, and `node_modules` are gitignored.

## Release / deploy

The output is static, so every target is "upload a directory". `netlify.toml` is committed and sets the build command, publish directory, `NODE_VERSION = "24"`, and immutable caching for `/_nuxt/*`.

| Target | Setup |
|--------|-------|
| Netlify (drag and drop) | `npm run generate`, then drop `.output/public` on `app.netlify.com/drop` |
| Netlify / Cloudflare Pages (git) | Build `npm run generate`, publish `.output/public` |
| Vercel | Import the repo; Nuxt is auto-detected |
| GitHub Pages | `npm run generate`, `touch .output/public/.nojekyll`, publish that directory |
| Any static host | Upload the contents of `.output/public` |

Nothing in the build reads an environment variable, so all targets build identically. Before a real launch, work the placeholder checklist in [TASKS.md](TASKS.md) — the committed contact details and reviews are deliberate stand-ins.

## Related documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — components and integrations
- [CONFIG-REFERENCE.md](CONFIG-REFERENCE.md) — configuration keys
- [BUSINESS-RULES.md](BUSINESS-RULES.md) — form and media behaviour
- [TASKS.md](TASKS.md) — backlog
