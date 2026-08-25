# Tallowbark Fence & Seal improvement tasks

Living checklist for the marketing site. **One task at a time.**

## Workflow

1. Pick the next `Todo` task (or explicitly choose another).
2. **Plan** that task before coding. Consult user before major decisions.
3. Implement → verify → update this file (`Done` / notes / follow-ups).
4. Only then move to the next task.

Statuses: `Todo` · `In progress` · `Blocked` · `Done`

---

## Done (completed)

### T5 — Add an Open Graph cover image

|                  |                                                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**       | `Done`                                                                                                                                             |
| **Why**          | `app/app.vue` set `ogTitle`/`ogDescription` but the `ogImage` line was commented out, because pointing it at a file that does not exist is worse than omitting it. Shared links previewed as a bare text card. |
| **Goal**         | Links shared to Facebook, WhatsApp and iMessage preview with a branded image.                                                                       |
| **Acceptance**   | `public/img/og-cover.jpg` exists at 1200×630; `ogImage` is set; a share debugger renders the image for the deployed URL.                            |
| **Notes**        | Turned out **not** to depend on T4: the card is rendered headlessly from the site's own palette and `BrandMark` art, so it needed no photography. Shipped with `ogImageWidth`/`Height`/`Alt` and `twitterImage`. **Remaining:** the path is root-relative — Facebook and X may require an absolute `https://` URL, so revisit once a domain exists. |

---

## Backlog

Every open task is a launch blocker: the site is built and verified, but ships
with deliberate placeholder data. T1–T4 must land before the domain goes live.

### T1 — Replace placeholder contact details and credentials

|                  |                                                                                                                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**       | `Todo`                                                                                                                                                                                                                              |
| **Why**          | `app.config.ts` ships fictional data: `phoneDisplay` `(901) 555-0148` is in the reserved `555-01xx` range, `email` is on `tallowbark.example` (RFC 2606 reserved TLD, unregisterable), `licenseNumber` is `TN-00000000`, and `reviewCount` / `reviewAverage` / `established` / `address` are invented. All are published as fact in visible copy **and** in the `HousePainter` JSON-LD. |
| **Goal**         | Every value under `business` is real and matches the Google Business Profile exactly.                                                                                                                                                |
| **Likely touch** | `app/app.config.ts`, `docs/CONFIG-REFERENCE.md` (drop the PLACEHOLDER markers)                                                                                                                                                       |
| **Acceptance**   | No `555-01` string anywhere in `.output/public`; `phoneHref` digits match `phoneDisplay`; `social` entries are profile URLs, not bare domains, or are deleted; name/phone/address identical to the Google Business Profile; every `credentials` claim independently true. |

---

### T2 — Wire the quote form to a delivery endpoint

|                  |                                                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**       | `Todo`                                                                                                                                                                                                     |
| **Why**          | `forms.quoteEndpoint` is `''`, so `QuoteSection.onSubmit` takes the demo-mode branch: it logs the payload to the console and shows the success state without transmitting anything. A visitor who submits believes they have made contact and nobody is notified. |
| **Goal**         | Submissions arrive in a real inbox, and a failed POST is visibly distinguishable from a successful one.                                                                                                     |
| **Likely touch** | `app/app.config.ts`, `docs/BUSINESS-RULES.md`, `docs/CONFIG-REFERENCE.md`                                                                                                                                   |
| **Acceptance**   | A live submit delivers mail containing `name`/`phone`/`email`/`location`/`service`/`fenceLength`/`message`/`source`; provider field mapping follows the **payload** names, not the schema names (`length` is sent as `fenceLength`); the "Demo mode" note no longer renders in the success panel; a deliberately broken endpoint surfaces the error toast. |

---

### T3 — Replace placeholder reviews with permissioned quotes

|                  |                                                                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**       | `Todo`                                                                                                                                                                |
| **Depends on**   | T1 Done — `reviewCount` / `reviewAverage` should be settled first so the aggregate and the quotes agree                                                                |
| **Why**          | All four `testimonials[].name` values in `app/utils/content.ts` read literally `Placeholder review`, which renders on the live page. The quote bodies are invented copy. |
| **Goal**         | Four real reviews, used with the reviewer's permission, attributed the way they agreed to.                                                                             |
| **Likely touch** | `app/utils/content.ts`, `docs/BUSINESS-RULES.md`                                                                                                                       |
| **Acceptance**   | The string `Placeholder review` appears nowhere in `.output/public`; each quote traces to a real customer who consented to its use and to the attribution shown; `area` and `job` match that customer's actual job. |

---

### T4 — Add job photography

|                  |                                                                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**       | `Todo`                                                                                                                                                                                                |
| **Why**          | All six `media.gallery` entries and both `media.beforeAfter` sides have `src: ''`, so the gallery renders six labelled placeholder frames and the slider compares two generated `PicketFill` illustrations. A fence contractor with no photographs of its work is the weakest possible version of this page. |
| **Goal**         | Real photographs in the gallery and on both sides of the comparison slider.                                                                                                                            |
| **Likely touch** | `public/img/`, `app/app.config.ts`, `docs/ARCHITECTURE.md` (runtime assets section)                                                                                                                     |
| **Acceptance**   | No placeholder frame renders on the built page; `before`/`after` are the same fence shot from the same position and time of day, roughly 16:10; gallery `label` values still describe what is shown (the label derives the suggested filename, so re-check after any rename). |
| **Notes**        | A photo pair was trialled and reverted. `before.jpg` was 275×183 (~5× upscale, visibly soft) and `after.jpg` showed a *different* fence — white picket with palm trees — so dragging the handle cut between two unrelated images instead of showing one fence changing. The mismatch, not the resolution, was the disqualifier. Both files were then removed from the repo: their provenance was unverified (downloaded, not shot for this project), so they could not be redistributed under the repo's licence. `media.beforeAfter` is back to `''` so the illustrated fallback renders. |

---

## Suggested order

```
Done:  T5
Open:  T1 ─► T2 ─► T4 ─► T3 (needs T1)
```

**Next suggested:** T1 — nothing else can safely go live while the published phone number, email and licence number are fictional.

---

## Parking lot / out of scope for now

- **Multi-page structure and per-neighbourhood landing pages** — a one-page scroller was chosen deliberately; revisit only if organic search underperforms.
- **CMS / admin UI** — content lives in two typed files (`app.config.ts`, `content.ts`); a CMS is not worth a build pipeline at this size.
- **`shortName`, `tagline`, `credentials.insured`** — declared in `app.config.ts` but read by nothing. Wire them into copy or delete them; harmless either way.

**Never in scope:**

- **Prices anywhere on the page**, including the annual programme — quoting depends on fence length and condition, so the maintenance section deliberately says cost comes with the estimate. Requested and settled during the build.
- **Dark mode** — `ui.colorMode` is `false` on purpose. The cream/forest/brass palette is a committed light look; inverting it fights the brand rather than serving it.

---

## Progress log

| Date | Task | Note |
| ---- | ---- | ---- |
| 2026-08-20 | — | Documentation set created (ARCHITECTURE, BUILD, BUSINESS-RULES, CONFIG-REFERENCE, TASKS); backlog seeded with the pre-launch placeholder blockers. |
| 2026-08-25 | T5 | `og-cover.jpg` generated headlessly from the site palette; `ogImage`/`twitterImage` wired with dimensions and alt text. |
| 2026-08-25 | T4 | Photo pair trialled and reverted — mismatched fences broke the comparison. Slider back to the illustrated fallback; see T4 notes. |
| 2026-08-25 | chore | `after.jpg` downscaled 776 → 416 KB; `engines.node >=24` added; BUILD/ARCHITECTURE updated to match. |
| 2026-08-25 | chore | Trial photos removed from the repo ahead of first push — provenance unverified, so not redistributable. Commit authored with a GitHub noreply address. |

---

## Not specced yet

- Analytics / call tracking — no measurement of form submissions or click-to-call today.
- `sitemap.xml`, plus uncommenting the `Sitemap:` line in `public/robots.txt` once a domain exists.
- Automated checks in CI. There is no test suite; `npm run typecheck` is the only gate, and the icon-bundling failure mode is a build **warning** rather than an error, so it needs an explicit grep to catch.

---

## Related documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — components and integrations
- [BUSINESS-RULES.md](BUSINESS-RULES.md) — form validation, submission modes, media resolution
- [BUILD.md](BUILD.md) — build and deployment
- [CONFIG-REFERENCE.md](CONFIG-REFERENCE.md) — configuration keys
