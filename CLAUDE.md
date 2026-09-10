# AppleCare Calculator

A single-page React app that compares AppleCare+, AppleCare One Individual and AppleCare One Family for one person or up to six Family Sharing members. Live at [carecompare.xyz](https://carecompare.xyz).

Everything runs client-side. There is no backend, no API, and no data collection — device prices are hardcoded in the app and all math happens in the browser.

## Working scope and verification

Complete requested changes and relevant verification while preserving unrelated working and staged edits. Use existing patterns for routine choices; ask only for material ambiguity or missing authorization. Questions and report-only audits remain read-only. Publishing requires release authorization, which carries forward once given.

Use lint/build checks for relevant source changes and inspect affected UI when appearance or interaction changes. For pricing logic, check empty selections, the three-device boundary, additional slots, equal totals, and annual-price fallbacks. Documentation-only changes need content/link/diff checks. Run `bun test tests/calculator.test.ts` for the focused pricing regression tests; do not describe a build as a passing test suite. Repeat passing checks only for changed inputs or unresolved concerns.

When changing prices or eligibility claims, verify Apple's current official terms for the intended market and record the source/date. The catalog and constants are implementation data, not proof of current policy. Keep the calculation client-side and preserve the no-data-collection design.

## Tech Stack

- React 19 + TypeScript (strict mode)
- Vite 8, `@vitejs/plugin-react`
- Tailwind CSS 4 (via `@tailwindcss/vite`), custom CSS variables for theming in `src/index.css`
- Framer Motion for animations (springs, layout transitions, marquee)
- Lucide React for icons
- ESLint 9 (flat config) with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`

Use Bun and the committed `bun.lock`. Read `package.json` for current versions and commands; do not introduce another lockfile during routine work.

## File Structure

- `src/App.tsx` — hero, individual/family mode, people state, billing selector and coverage guide.
- `src/data/devices.ts` — catalog, model categories and pricing provenance flags.
- `src/hooks/useCalculator.ts` — pure `calculate` function, memoized hook, types and plan constants.
- `src/components/HouseholdEditor.tsx` — people, owned device instances, eligibility and current spending.
- `src/components/DeviceSelector.tsx` — searchable catalog; each click adds an independent device instance.
- `src/components/ResultsDisplay.tsx` — comparison rows, actual-spending savings and per-person allocation explanation.
- `src/components/AnimatedPrice.tsx` — animated price display.
- `src/components/ThemeToggle.tsx` — follows system theme until the visitor explicitly chooses a stored preference.
- `src/components/TickerTape.tsx`, `Footer.tsx`, `deviceIcons.ts` — shared page elements.
- `src/index.css` — Swiss editorial design tokens and responsive layouts.
- `tests/calculator.test.ts` — focused pricing regression tests.
- `docs/pricing-sources.md` — authoritative source links, verification date and unresolved historical-price limitations.

## How the Calculation Works

`calculate` compares integer annual cents; display divides by 100 for yearly totals or 1200 for monthly equivalents. Monthly mode uses monthly rates × 12. Annual mode uses published annual AppleCare+ rates with monthly × 12 fallback. One stays monthly in both modes.

Each `Person` has independent `OwnedDevice` instances, a name, and current spending. Duplicate models are allowed. Switching to Just me retains other people in state but compares only the first person's list. Family mode allows at most six people.

For each person, compare AppleCare+ for all devices with every possible One Individual bundle size. Sort eligible devices by their separate cost; the most expensive plans go into the bundle. Remaining and ineligible devices stay on AppleCare+. One costs $19.99 for up to three devices, then $5.99 per extra device. Individual slots cannot be shared between people.

Family costs $49.99/month plus separate coverage for devices marked ineligible. Compare it with the sum of each person's cheapest separate setup. Equal totals are exact ties. Empty selections show no recommendation or payable Family cost.

Current spending defaults to catalog monthly rates, can model one Individual plan per person, or accepts a custom monthly total for mixed/grandfathered/prepaid plans. Invalid custom amounts suppress current-spending savings without blocking plan comparisons. Device selection and eligibility do not certify actual coverage.

## Device Catalog

`Device` has `id`, `name`, `category`, `icon`, `monthlyPrice`, optional `annualPrice`, `isNew`, `legacy`, and `pricingStatus`.

- `isNew`: current-generation tag; remove when superseded.
- `legacy`: older hardware only. It does not establish billing availability or bundle eligibility.
- `pricingStatus: 'refurbished'`: verified current Apple refurbished-product offer; an existing subscription may differ.
- `pricingStatus: 'unrefreshed'`: inherited older rate not independently verified in this update. UI labels it Older rate.
- Omitted pricingStatus: verified current official AppleCare model-table price.

Source/date records belong in `docs/pricing-sources.md`. Never fabricate historical rates or infer a price from another product's name. No backend or CMS is involved.

## Conventions

- Components are one per file, PascalCase, function components with named exports (`export function Foo()`), not default exports (except `App.tsx`)
- Hooks live in `src/hooks/`, camelCase with a `use` prefix
- Styling is Tailwind utility classes plus a handful of custom CSS variables/classes prefixed `swiss-` in `src/index.css` — these drive the light/dark theme colors and the poster-style layout (hard borders, offset drop shadows, monospace labels)
- Money values are formatted inline with `.toFixed(2)`, not through a shared formatter — there's no `formatCurrency()` helper in this codebase
- No routing — it's a single page

## Development

```bash
bun install      # preserve bun.lock as the sole lockfile
bun run dev      # starts Vite dev server on http://localhost:5173
bun run build    # tsc -b && vite build
bun run lint     # eslint .
bun test tests/calculator.test.ts  # focused pricing tests
bun run preview  # preview the production build
```

`dist/` is gitignored and not committed — it's build output only.
