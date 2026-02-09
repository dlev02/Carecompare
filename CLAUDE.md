# CLAUDE.md

## Project Overview

AppleCare Calculator — a web app that compares individual AppleCare+ per-device costs against a hypothetical "AppleCare One" bundle price. Users search for and add their Apple devices, then see a real-time side-by-side cost breakdown. Live at [carecompare.xyz](https://carecompare.xyz).

## Tech Stack & Dependencies

- **Language:** Vanilla HTML, CSS, JavaScript — no framework, no build step
- **Styling:** Tailwind CSS loaded via CDN (`cdn.tailwindcss.com`), with a custom config inline in `index.html`
- **Custom CSS:** `assets/styles.css` for animations, glassmorphism, typewriter cursor, dark mode overrides
- **Font:** Inter via Google Fonts
- **Icons:** Inline SVG icon library defined in `ICONS` object in `app.js` (Lucide-style)
- **PWA:** Web app manifest at `assets/site.webmanifest` with splash screens and maskable icons in `assets/icons/`
- **No npm/node dependencies** — everything runs client-side with zero build tooling

## Hosting & Deployment

- **Hosting:** Netlify (auto-deploys on push to `main`)
- **Custom domain:** `carecompare.xyz` (configured via `CNAME` file)
- **Repository:** GitHub — [github.com/dlev02/carecompare](https://github.com/dlev02/carecompare) (public)

## File Structure

```
index.html              — Single-page app entry point, Tailwind config, all markup
assets/
  app.js                — All application logic: device catalog, pricing, search, UI state
  styles.css            — Custom animations, glassmorphism, typewriter cursor, theme overrides
  favicon.png           — App favicon
  site.webmanifest      — PWA manifest
  icons/                — PWA splash screens and app icons (various sizes)
CNAME                   — Custom domain for Netlify
```

## Key Architecture

- `DEVICE_CATALOG` array in `app.js` holds all devices with id, name, category, monthly/annual pricing
- `POPULAR` array defines the quick-pick buttons shown on the home screen
- Pricing logic: AppleCare One bundle = $19.99/mo base for 3 devices + $5.99/mo per additional device
- Device explorer: modal with category drill-down and fuzzy search
- Theme system: light/dark/auto with manual override via long-press, follows system preference in real-time
- Typewriter animation cycles through device names in the search bar placeholder
- All state is in-memory (no backend, no localStorage persistence)

## Git & Commit Practices

- This is a **public repository** — commit messages must be professional
- Follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`
- Keep messages concise, lowercase after the prefix, focused on "why" or "what"
- After completing a change, commit and push to `main` (triggers auto-deploy)
- Always verify the change doesn't break anything before pushing

## Code Style

- Edit files directly: `assets/app.js`, `assets/styles.css`, `index.html`
- Semantic HTML with accessible patterns (aria labels, `sr-only` text, `prefers-reduced-motion` support)
- Dark mode via `.dark` class on `<html>` and Tailwind `dark:` variants
- Keep inline Tailwind config in `index.html` in sync with any design token changes

## MCP Servers & Tools

- **Context7:** Use `resolve-library-id` + `get-library-docs` to look up documentation for any library/dependency (e.g. Tailwind CSS utilities) before writing code
- **Supabase:** Available if a backend is ever added
- **Netlify:** Use the Netlify MCP tools for deploy status, project settings, and environment variables

## UI/UX Changes

When making any visual or design changes (layout, colors, typography, components, animations, responsive behavior), always use the `ui-ux-pro-max` skill first via the Skill tool. This ensures design decisions are informed by proper UI/UX methodology rather than ad-hoc guesses.
