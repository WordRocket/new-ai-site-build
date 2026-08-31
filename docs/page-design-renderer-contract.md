# Page Design Renderer Contract

This document specifies how the Astro template repo consumes `pageSchemas` from `site-config.json` to render block-based page layouts. It is the contract between the RankSite dashboard (which composes and publishes schemas) and the template renderer (which turns them into HTML).

## Payload shape

`pageSchemas` arrives as a top-level key in `site-config.json`:

```json
{
  "pageSchemas": {
    "service": {
      "pageType": "service",
      "theme": { "colorPrimary": "#0d9488" },
      "blocks": [
        { "id": "hero-1", "slotType": "hero", "blockKey": "hero.splitMockup", "locked": true, "position": 1, "props": { ... } },
        { "id": "cta-1", "slotType": "cta", "blockKey": "cta.centeredGradient", "locked": true, "position": 7, "props": { ... } }
      ]
    }
  }
}
```

### PageSchema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `pageType` | `string` | yes | Page type key (`home`, `service`, `about`, `contact`, `faq`, `ourWork`, `resources`, `blogIndex`, `categoryIndex`, `page`, `industry`, `location`) |
| `blocks` | `BlockInstance[]` | yes | Ordered array of block instances |
| `theme` | `Theme` | no | Theme override for this page type |

### BlockInstance

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | yes | Unique identifier for the block on the page |
| `slotType` | `string` | yes | Semantic slot: `hero`, `trust`, `features`, `services`, `testimonials`, `interactive`, `cta`, `contact`, `footer`, `breadcrumbs`, `faq`, `content` |
| `blockKey` | `string` | yes | Registry key (see Block Registry below) |
| `locked` | `boolean` | yes | Whether the editor locks this block from removal |
| `position` | `number` | yes | Sort order (1-based, ascending) |
| `props` | `object` | yes | Block-specific props (see each block's interface) |

### Theme

All fields optional. When present, emitted as a `:root { ... }` CSS override block once per page.

| Field | CSS variable | Description |
|-------|-------------|-------------|
| `colorPrimary` | `--color-primary` | Brand primary color |
| `colorSecondary` | `color-secondary` | Brand secondary color |
| `colorAccent` | `--color-accent` | Accent color for highlights |
| `colorBg` | `--color-bg` | Page background |
| `colorSurface` | `--color-surface` | Card/surface background |
| `colorText` | `--color-text` | Primary text color |
| `colorTextMuted` | `--color-text-muted` | Secondary text color |
| `colorOnPrimary` | `--color-on-primary` | Text color on primary backgrounds |
| `fontHeading` | `--font-heading` | Heading font family |
| `fontBody` | `--font-body` | Body font family |
| `radius` | `--radius` | Border radius scale |

## Token bridge

The template's `global.css` defines a `:root` bridge that aliases block-facing tokens to theme tokens:

```css
:root {
  --color-primary: var(--rs-brand);
  --color-secondary: var(--rs-brand-secondary);
  --color-accent: var(--rs-accent);
  --color-bg: var(--rs-bg);
  --color-surface: var(--rs-surface);
  --color-on-primary: var(--rs-on-brand, #fff);
  --font-heading: var(--rs-font-display);
  --font-body: var(--rs-font-body);
  --radius: var(--rs-radius-md);
}
```

The `<html>` tag receives inline `--rs-*` tokens from `site-config.json`'s theme fields. The per-page `theme` override (emitted as a `:root` block) takes CSS specificity precedence over the bridge defaults.

Dark mode is controlled by `data-skin="dark"` on `<html>`, which overrides `--rs-bg`, `--rs-surface`, `--color-text`, and `--color-text-muted` to dark values.

## Block registry

All 13 registered block keys and their prop interfaces:

### `hero.splitMockup` (slot: hero, locked)

Hero with headline, CTA, and a mockup panel showing jobs/metrics.

Key props: `eyebrow`, `headline`, `headlineAccent`, `subheadline`, `primaryCta: {label, href}`, `secondaryCta: {label, href}`, `trustItems: [{icon, value?, label}]`, `panel: {title, timestamp, jobs: [{time, title, meta, status, tone, value}], metric: {label, value, delta, series}}`, `panelDescription`, `headingLevel` (default 1).

### `trust.statCounters` (slot: trust)

Row of large stat counters.

Props: `stats: [{value, unit?, label}]`, `srHeading`, `headingLevel` (default 2).

### `features.bento` (slot: features)

Bento-grid of feature tiles with mixed content types (quote, days, people, bars, seal).

Props: `eyebrow`, `headline`, `tiles: [{kind, span, rows, ...tile-specific}]`, `headingLevel` (default 2).

### `serviceList.numbered` (slot: services)

Numbered list of services with descriptions.

Props: `eyebrow`, `headline`, `lede`, `services: [{title, description, price?, href?}]`, `headingLevel` (default 2).

### `testimonials.marquee` (slot: testimonials)

Scrolling marquee of testimonial cards.

Props: `headline`, `note`, `rows: [[{quote, name, meta, initials}]]`, `headingLevel` (default 2).

### `cta.centeredGradient` (slot: cta, locked)

Centered CTA band with gradient mesh background.

Props: `availability`, `headline`, `subheadline`, `primaryCta: {label, href}`, `phone: {label, href}`, `headingLevel` (default 2).

### `interactive.roiCalculator` (slot: interactive)

Interactive ROI calculator with 4 inputs and live-computed results. Requires client hydration.

Props: `eyebrow`, `headline`, `subheadline`, `currencySymbol` (default "$"), `defaults: {monthlyLeads, closeRate, avgDealSize, monthlyCost}`, `ctaLabel`, `ctaHref`, `headingLevel` (default 2).

### `footer.standard` (slot: footer, locked)

Site footer with brand, nav links, contact info, and social links.

Props: `brandName`, `tagline?`, `navLinks: [{label, href}]`, `phone?`, `email?`, `address?`, `city?`, `state?`, `zip?`, `socialLinks: [{label, href, icon?}]`, `copyrightYear?`.

### `breadcrumbs.standard` (slot: breadcrumbs)

Breadcrumb navigation trail.

Props: `items: [{label, href}]`.

### `contact.mapHours` (slot: contact, locked)

Contact info, business hours, and optional Google Maps embed.

Props: `phone?`, `email?`, `address?`, `city?`, `state?`, `zip?`, `mapEmbedUrl?`, `hours: [{day, hours}]`, `headingLevel` (default 2).

### `faq.accordion` (slot: faq)

Interactive FAQ accordion with expand/collapse. Requires client hydration.

Props: `eyebrow?`, `headline?`, `items: [{question, answer}]`, `headingLevel` (default 2).

### `content.richText` (slot: content)

Rich text content section (renders raw HTML).

Props: `eyebrow?`, `headline?`, `html`, `headingLevel` (default 2).

### `content.postGrid` (slot: content)

Grid of post/blog cards.

Props: `eyebrow?`, `headline?`, `posts: [{title, excerpt?, href, date?, category?, image?, imageAlt?}]`, `columns` (2/3/4, default 3), `headingLevel` (default 2).

## Rendering rules

1. **Fallback**: If `pageSchemas` is absent from `site-config.json`, or no schema exists for the current page type, or the schema fails validation, render the existing fixed template. This is the default state — block rendering is opt-in per page type.

2. **Hero owns the only H1**: The hero block renders with `headingLevel: 1` by default. All other blocks default to `headingLevel: 2`. This ensures exactly one `<h1>` per page.

3. **Heading levels come from props**: Every block accepts a `headingLevel` prop (1-6) that determines the actual heading tag rendered. Do not hard-code heading tags.

4. **Unknown block keys must be skipped, not fatal**: If a `blockKey` is not in the registry, validation fails and the entire page falls back to the fixed template. This prevents partial/broken renders.

5. **Missing optional props render nothing**: Blocks must gracefully handle missing optional props by rendering nothing for that section — never throw.

6. **Interactive blocks need hydration**: Blocks in `interactiveBlockKeys` (`interactive.roiCalculator`, `faq.accordion`) must be rendered with `client:visible` (Astro island directive). All other blocks are server-rendered only (no hydration).

7. **Theme override is emitted once per page**: The `theme` object produces a single `<style>:root { ... }</style>` block at the top of the page. Do not emit it per-block.

8. **Blocks are sorted by position**: The `position` field (1-based, ascending) determines render order.

## Validation rules

The renderer validates each schema before rendering. On failure, it logs a warning and falls back to the fixed template:

- `blocks` array must be non-empty
- Exactly one block with `slotType: "hero"` must be present
- Locked slot types `hero` and `cta` must be present (with `locked: true`)
- Every `blockKey` must exist in the registry
- Every block must have an `id`

## Page type wiring

The following page types are wired to the block renderer (with fallback to fixed template):

| Page route | pageType key |
|-----------|-------------|
| `index.astro` | `home` |
| `services/[slug].astro` | `service` |
| `[slug].astro` | `page`, `industry`, `location` |
| `about.astro` | `about` |
| `contact.astro` | `contact` |
| `faq.astro` | `faq` |
| `our-work.astro` | `ourWork` |
| `resources.astro` | `resources` |
| `blog/index.astro` | `blogIndex` |
| `category/index.astro` | `categoryIndex` |

Pages not listed here (blog posts, category pages, author pages, legal pages) always use their fixed templates.

## Real captured example

From ClearPath Junk Removal 2 (published 2026-08-31), the `pageSchemas` key in `site-config.json` contains entries for all 7 page types. The `service` page type includes blocks: `hero.splitMockup` → `trust.statCounters` → `features.bento` → `serviceList.numbered` → `testimonials.marquee` → `interactive.roiCalculator` → `cta.centeredGradient`, with a theme override of `colorPrimary: #2563eb`.
