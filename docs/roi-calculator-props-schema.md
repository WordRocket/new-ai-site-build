# `interactive.roiCalculator` — Props Schema

**Block key:** `interactive.roiCalculator`
**Component:** `RoiCalculator` (React, client-hydrated via `client:visible`)
**Interactivity:** Yes — 4 user-adjustable number inputs that recompute results live via `useState` + `useMemo`.

## Props (input — what the editor/Lovable sends)

All props are optional. The component renders standalone with defaults.

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `id` | `string` | **yes** (injected by render layer) | — | Unique DOM id. Also used to scope input `id` attributes for label association. |
| `headingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | no | `2` | Semantic heading level for the section headline. Never hardcoded inside the component. |
| `eyebrow` | `string` | no | — | Small uppercase label above the headline. |
| `headline` | `string` | no | `"Calculate Your ROI"` | The section's heading text. |
| `subheadline` | `string` | no | — | Supporting paragraph below the headline. |
| `currencySymbol` | `string` | no | `"$"` | Prepended to all formatted currency values (revenue, profit, annual). |
| `defaults` | `object` | no | see below | Initial values for the 4 calculator inputs. |
| `defaults.monthlyLeads` | `number` | no | `50` | Starting number of monthly leads. Min 0. |
| `defaults.closeRate` | `number` | no | `20` | Starting close rate as a percentage (0–100). Clamped to 0–100. |
| `defaults.avgDealSize` | `number` | no | `2500` | Starting average deal size in the site's currency. Min 0. |
| `defaults.monthlyCost` | `number` | no | `2000` | Starting monthly service cost. Min 0. |
| `ctaLabel` | `string` | no | `"Get Started"` | Label on the call-to-action button below the results. |
| `ctaHref` | `string` | no | `"/contact"` | URL the CTA button links to. |

## Computed outputs (display only — not props)

These are derived from the 4 input values via `useMemo`. They are NOT props — they're rendered live in the results panel. Lovable's editor preview should show them updating in real time as the user drags inputs.

| Field | Formula | Display location |
|---|---|---|
| `roi` | `round((monthlyProfit / monthlyCost) * 100)` if `monthlyCost > 0`, else `0` | Large number in the primary-colored hero card, shown as `N%` |
| `monthlyRevenue` | `monthlyLeads * (closeRate / 100) * avgDealSize` | Card labeled "Monthly revenue" |
| `monthlyProfit` | `monthlyRevenue - monthlyCost` | Card labeled "Monthly profit" (green if ≥ 0, red if < 0) |
| `annualRevenue` | `monthlyRevenue * 12` | Card labeled "Projected annual revenue" |

## Example props object (as it appears in a `pageSchemas` block instance)

```json
{
  "eyebrow": "See your numbers",
  "headline": "What's your dispatch chaos costing you?",
  "subheadline": "Adjust the sliders to see how much revenue you could recover with automated dispatch and invoicing.",
  "currencySymbol": "$",
  "defaults": {
    "monthlyLeads": 120,
    "closeRate": 35,
    "avgDealSize": 1800,
    "monthlyCost": 1500
  },
  "ctaLabel": "Start your free trial",
  "ctaHref": "/contact"
}
```

The `id` and `headingLevel` fields are injected by the render layer at render time and do NOT appear in the `props` object stored in the page schema.

## Validation rules the editor should enforce

- `defaults.closeRate` must be 0–100 (the component clamps on input, but the editor should validate on save)
- All numeric defaults must be ≥ 0
- `ctaHref` should be a non-empty string if `ctaLabel` is provided
- No upper bound on `monthlyLeads`, `avgDealSize`, or `monthlyCost` — the calculator handles arbitrarily large numbers

## CSS tokens used

All styling is token-driven via `var()` — no hardcoded hex values:

- `--color-primary` (hero card background, CTA button, accent labels)
- `--color-on-primary` (text on primary-colored surfaces)
- `--color-surface` (section background)
- `--color-bg` (input card background, result cards)
- `--color-text` (input values, result numbers)
- `--color-text-muted` (labels, helper text)
- `--font-heading` (result numbers, headline)
- `--font-body` (body text, labels)
- `--radius` (input fields, cards, button)

Exception: the monthly-profit value uses `#22c55e` (green) or `#ef4444` (red) directly to signal positive/negative — this is a semantic color that should not be themed, as it communicates state.
