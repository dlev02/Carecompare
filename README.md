# CareCompare

Compare AppleCare+, AppleCare One Individual, and AppleCare One Family for your devices or your whole household. Live site: [carecompare.xyz](https://carecompare.xyz).

Choose **Just me** or **My family**, add devices for each person, and see the cost of separate coverage, an optimized mix of personal bundles, and Family. Each person can use different plans today. Enter their actual monthly bill under **Current spending** to compare real spending with the alternatives.

All calculations run in your browser. No account, backend, or device data collection. Plan rules, eligibility notes and how the math works live on the [FAQ page](https://carecompare.xyz/faq); the story behind it is on the [About page](https://carecompare.xyz/about).

## Features

- Up to six people with independent device lists, including multiple copies of the same model.
- AppleCare One Individual is calculated separately for each person. The optimizer checks every bundle size and keeps inexpensive devices on AppleCare+ where cheaper.
- One Family is $49.99/month for eligible household devices; devices marked ineligible keep separate AppleCare+ costs in the comparison.
- Monthly and annual AppleCare+ comparisons, with published annual rates where available and monthly fallback otherwise. One plans remain monthly.
- Current spending can be per-device coverage, One Individual, or an entered mixed-plan bill.
- Current and older hardware, including iPhone 18 Pro, Watch Series 12 / Ultra 4, AirPods 5, M3 Max MacBook Pro and Watch Series 9.
- Responsive light/dark interface. Theme follows the system until you choose a preference.

## Pricing and eligibility

U.S. Family availability begins **September 14, 2026**. The six shared annual claims apply to theft/loss on iPhone, iPad and Apple Watch; accidental-damage repairs remain unlimited, with service fees. Eligibility is confirmed by Apple, not by selecting a model here.

Prices and policy were researched September 9, 2026. Older-device rates can reflect refurbished offers or retained historical estimates. They are not proof of an existing subscriber's bill or identical benefits. Enter an actual bill for an accurate current-spending comparison.

See [pricing sources and limitations](docs/pricing-sources.md) for exact sources and billing assumptions. Final prices, eligibility and terms: [AppleCare](https://www.apple.com/applecare/).

## Development

React 19, strict TypeScript, Vite 8, Tailwind CSS 4, Framer Motion, Lucide React. Use Bun and `bun.lock`.

```sh
bun install
bun run dev
bun run lint
bun test tests/calculator.test.ts
bun run build
```

The focused regression tests cover household ownership, bundle boundaries, mixed plans, annual rates, exact ties, duplicates, exclusions and exhaustive optimizer comparisons. Browser checks are also required for interface changes.

MIT License. Built by [Drew Levinson](https://drewlevinson.me).
