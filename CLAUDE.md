# AppleCare Calculator

A single-page React app that compares the cost of individual AppleCare+ plans against the AppleCare One bundle, so you can see which is cheaper for a given set of devices. Live at [carecompare.xyz](https://carecompare.xyz).

Everything runs client-side. There is no backend, no API, and no data collection — device prices are hardcoded in the app and all math happens in the browser.

## Tech Stack

- React 19 + TypeScript (strict mode)
- Vite 8, `@vitejs/plugin-react`
- Tailwind CSS 4 (via `@tailwindcss/vite`), custom CSS variables for theming in `src/index.css`
- Framer Motion for animations (springs, layout transitions, marquee)
- Lucide React for icons
- ESLint 9 (flat config) with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`

Package manager is bun (`bun.lock` is the committed lockfile); npm also works since there's no bun-specific tooling in the scripts.

## File Structure

- `src/main.tsx` — entry point, mounts `<App />` in `StrictMode`
- `src/App.tsx` — page layout: hero, ticker header, theme toggle, device selector + results grid, footer
- `src/data/devices.ts` — the device catalog (`DEVICE_CATALOG`) and category list (`CATEGORIES`); this is the source of truth for every device name, price, and tag
- `src/hooks/useCalculator.ts` — the pricing math (see below); exports `useCalculator` and the `APPLECARE_ONE` constants
- `src/components/DeviceSelector.tsx` — search box, category filter buttons, and the scrollable device grid
- `src/components/ResultsDisplay.tsx` — price cards, cost bars, savings callout, and footnotes (break-even hint, annual-prepay hint, legacy-device hint)
- `src/components/AnimatedPrice.tsx` — a `$X.XX` value that springs to a new number via `framer-motion`'s `useSpring`, instead of snapping
- `src/components/ThemeToggle.tsx` — dark/light toggle
- `src/components/TickerTape.tsx` — the scrolling marquee of coverage facts under the header
- `src/components/deviceIcons.ts` — maps each device's `IconName` string to a Lucide icon component
- `src/index.css` — Tailwind entry point plus the `swiss-*` design tokens and utility classes (light/dark CSS variables, grid background, ticker animation, etc.)
- `public/favicon.svg` — the only static asset

## How the Calculation Works

All of this lives in `src/hooks/useCalculator.ts`.

AppleCare One pricing:
- `$19.99/mo` covers up to 3 devices (`APPLECARE_ONE.baseSlots`)
- `+$5.99/mo` for each additional device beyond 3

Given the selected devices:
- **Individual monthly** = sum of each device's `monthlyPrice`
- **Individual annual** = individual monthly × 12 (what you'd pay billed monthly for a year)
- **Individual annual prepay** = sum of each device's `annualPrice` where set, falling back to `monthlyPrice × 12` for devices that don't have one. Only current-generation and recent devices have an `annualPrice` in the catalog (roughly, but not exactly, 10× the monthly price — Apple's real annual prices round to a `.99` ending rather than landing on a clean 10×). Devices marked `legacy` have no `annualPrice`, so prepaying them saves nothing over monthly billing.
- **Bundle monthly** = `$19.99 + $5.99 × max(0, deviceCount − 3)`
- **Bundle annual** = bundle monthly × 12
- **Recommendation** is whichever of individual/bundle monthly total is lower (`equal` if they tie, which is also the default when nothing is selected)
- **Savings percent** = the difference divided by the larger of the two monthly totals

The UI in `ResultsDisplay.tsx` also derives a couple of extra hints from this result: how many bundle slots are still open before the bundle price changes, and whether prepaying annually would beat monthly billing.

## Device Catalog

`src/data/devices.ts` is a flat array of `Device` objects, each with an `id`, `name`, `category` (`iphone` | `ipad` | `mac` | `watch` | `airpods` | `other`), an icon name, a `monthlyPrice`, an optional `annualPrice`, and two optional boolean flags:
- `isNew` — shows a "New" tag in the picker (current-generation hardware)
- `legacy` — shows a "Legacy" tag (no longer sold new; last-published monthly price only, no annual option)

To add or update a device, edit this file directly — there's no CMS or external data source. Prices were last checked against apple.com/applecare in July 2026.

## Conventions

- Components are one per file, PascalCase, function components with named exports (`export function Foo()`), not default exports (except `App.tsx`)
- Hooks live in `src/hooks/`, camelCase with a `use` prefix
- Styling is Tailwind utility classes plus a handful of custom CSS variables/classes prefixed `swiss-` in `src/index.css` — these drive the light/dark theme colors and the poster-style layout (hard borders, offset drop shadows, monospace labels)
- Money values are formatted inline with `.toFixed(2)`, not through a shared formatter — there's no `formatCurrency()` helper in this codebase
- No routing — it's a single page

## Development

```bash
bun install      # or npm install
bun run dev      # starts Vite dev server on http://localhost:5173
bun run build    # tsc -b && vite build
bun run lint     # eslint .
bun run preview  # preview the production build
```

`dist/` is gitignored and not committed — it's build output only.
