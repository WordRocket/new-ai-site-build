# @ranksite/blocks

Shared block component library for the RankSite visual design system.

## Install (private — requires deploy key or token)

```json
"@ranksite/blocks": "git+https://x-access-token:${BLOCKS_TOKEN}@github.com/ranksite/blocks.git#v0.1.0"
```

## Usage

```tsx
import { registry } from '@ranksite/blocks';

const Component = registry['hero.splitMockup'];
<Component {...block.props} id={block.id} />
```

## Block registry

| Key | Component | Interactive |
|---|---|---|
| `hero.splitMockup` | HeroSplitMockup | no |
| `trust.statCounters` | TrustStatCounters | no |
| `features.bento` | FeatureGridBento | no |
| `serviceList.numbered` | ServiceListNumbered | no |
| `testimonials.marquee` | TestimonialsMarquee | no |
| `cta.centeredGradient` | CtaBandGradient | no |
| `interactive.roiCalculator` | RoiCalculator | yes |

## CSS token contract

All components reference these CSS custom properties — no hardcoded colors:

`--color-primary`, `--color-secondary`, `--color-accent`, `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-on-primary`, `--font-heading`, `--font-body`, `--radius`

## License

Proprietary. (c) RankSite.
