# River City Fence & Seal — Business Rules

Behaviour that is not evident from signatures: quote-form validation and delivery, how media slots resolve, and the content couplings that drive layout.

Authoritative source: `app/components/QuoteSection.vue`, `app/components/PhotoSlot.vue`, `app/components/BeforeAfterSlider.vue`, `app/composables/useScrollReveal.ts`, `app/utils/content.ts`, `app/app.vue`

## Quote form validation

Schema is zod, declared in `QuoteSection.vue`. Every field starts `undefined` in `state`, so each string field needs an explicit type-level `error` as well as a constraint message — without it a blank submit reports `Invalid input: expected string, received undefined` instead of the copy below.

| Field | Rule | Message on failure |
|-------|------|--------------------|
| `name` | required, min 2 | Please enter your name |
| `phone` | required, min 10, matches `/^[\d\s()+.-]{10,20}$/` | Please enter a phone number we can reach you on · Digits, spaces, brackets and dashes only |
| `email` | required, `z.email()` | Please check the email address |
| `location` | required, min 3 | A street or neighbourhood is enough |
| `service` | required, min 1 | Pick the closest match |
| `length` | required, min 1 | A rough estimate is fine |
| `message` | optional, max 1200 | Please keep this under 1200 characters |
| `consent` | must be literal `true` | We need your permission to reply |
| `company` | honeypot; max length 0 | *(never surfaced — see below)* |

- `email`, and `consent` as a `z.literal`, already report their custom message for `undefined`; only `z.string()` fields need the `error` parameter.
- `service` and `length` are free strings validated against nothing, not enums. The dropdown options in `serviceOptions` / `lengthOptions` are presentational; adding an option needs no schema change.

## Quote form submission

Two modes, selected by whether `forms.quoteEndpoint` is a non-empty string:

| `forms.quoteEndpoint` | Behaviour |
|---|---|
| empty (shipped default) | **Demo mode.** Logs `[quote form] demo mode, nothing was sent.` plus the payload to the console, waits 700 ms, then shows the success state. Nothing is transmitted. The success panel additionally renders a "Demo mode" note naming `app/app.config.ts`. |
| a URL | `POST`s the payload as JSON via `$fetch`, then shows the success state. |

- **Honeypot:** a truthy `company` returns from `onSubmit` before `pending` is ever set — the bot sees no error, no success state, and no request. The field is wrapped in `sr-only` (not `display:none`, and not an off-screen negative offset, which would widen the page).
- **Payload shape differs from the form state:** `length` is sent as `fenceLength`, `message` defaults to `''` rather than being omitted, and a constant `source` field is added. A receiving endpoint's field mapping must follow the payload, not the schema.
- **On thrown error:** an error toast tells the visitor to phone instead, quoting `business.phoneDisplay`. `sent` stays false so the form remains filled and resubmittable.
- Success is a one-way transition — `sent` is never reset, so a visitor cannot submit twice without reloading.

## Media resolution

`PhotoSlot` and `BeforeAfterSlider` both treat an empty `src` as "no photo yet" rather than an error:

- **`PhotoSlot`** with `src: ''` renders a labelled placeholder frame — picket pattern, dashed border, the slot's `label`/`meta`, and a `public/img/<slug>.jpg` filename hint. `slug` is derived from `label`: lowercased, every non-alphanumeric run collapsed to `-`, leading/trailing `-` trimmed, `.jpg` appended. **Renaming a gallery `label` therefore changes the filename the frame asks for.**
- The frame is locked to the slot's `ratio` (default `4/3`), so layout never shifts when a real photo arrives.
- **`BeforeAfterSlider`** falls back per side independently: whichever of `before`/`after` is empty renders a `PicketFill` illustration — `weathered` (grey) for before, `stained` (brown) for after — and shows that side's `public/img/*.jpg` hint. One real photo and one illustration is a valid intermediate state.
- Each `PhotoSlot` derives a per-instance SVG `patternId` from `useId()`; several slots on one page must not share a pattern id.

## Comparison slider interaction

- The control is a real `<input type="range">` stretched over the frame at `opacity-0`, so pointer drag, touch, and arrow keys all come from the platform. Replacing it with mousemove handlers would silently drop keyboard and screen-reader support.
- The `BEFORE` / `AFTER` corner badges fade out below 14% and above 86% respectively, so a fully-swept slider does not caption the wrong image.

## Progressive reveal

`useScrollReveal` is deliberately additive, and the order matters:

1. Server-rendered HTML carries **no** hidden state — every section ships visible, so the page is complete without JavaScript and safe for crawlers.
2. On mount, if `prefers-reduced-motion: reduce` matches, the composable returns immediately and nothing is ever hidden.
3. Otherwise it selects `[data-reveal]` elements and keeps only those whose top is below 85% of the viewport. Elements already on screen are never hidden, which is what prevents a visible flash on load.
4. Only then is the `.reveal` class added and an `IntersectionObserver` attached; `data-reveal="150"` sets a stagger delay in milliseconds via `--reveal-delay`.

Adding `class="reveal"` directly in markup would break rule 1 and hide content from no-JS visitors.

## Content couplings

- **`services[].id` doubles as an in-page anchor.** `ServicesSection` renders each `id` onto its `<article>`, and `SiteFooter` links to `#<id>`. Renaming an id breaks those footer links silently.
- **`app/utils/nav.ts` `href` values must match section ids** in `index.vue`'s children (`#services`, `#work`, `#process`, `#areas`, `#reviews`, `#faq`, plus `#top` and `#quote` used by CTAs).
- **`faqs` feeds both the accordion and `FAQPage` JSON-LD** in `app.vue`. Editing FAQ copy changes structured-data output, so answers must stay self-contained and accurate.
- **`serviceAreas` feeds three places:** the area list, `areaServed` in the `HousePainter` JSON-LD, and the footer, which shows `slice(0, 8)` only.
- **`services` feeds `hasOfferCatalog`** in the same JSON-LD block.
- Section order is `app/pages/index.vue` alone; no component references its neighbours.

## Structured data

`app.vue` emits `HousePainter` (a `LocalBusiness` subtype) and `FAQPage` JSON-LD built from `app.config.ts` and `content.ts`. Name, phone, and address must stay identical here, on the Google Business Profile, and in directory listings — mismatched NAP is the usual cause of weak local ranking. Anything claimed in `credentials` (licence number, warranty years, review count and average) is published as fact and must be true before launch.

## Placeholder conventions

The shipped placeholders are chosen so they cannot quietly become live data:

- Phone numbers use the `555-01xx` range, reserved for fictional use.
- `quotes@rivercityfenceandseal.com` is on an unregistered domain.
- All four `testimonials[].name` values read literally `Placeholder review`, so an unreplaced review is visible on the rendered page rather than hidden in source.

## Related documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — components and integrations
- [CONFIG-REFERENCE.md](CONFIG-REFERENCE.md) — configuration keys
- [BUILD.md](BUILD.md) — build and deployment
- [TASKS.md](TASKS.md) — backlog
