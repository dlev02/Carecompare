# CLAUDE.md

## Project Overview
AppleCare Calculator — a web app that compares AppleCare+ individual plan costs against AppleCare One bundle pricing. Live at [carecompare.xyz](https://carecompare.xyz).

## Tech Stack
- Vanilla HTML/CSS/JavaScript (no build step)
- Tailwind CSS via CDN
- Hosted on Netlify

## Workflow
- After completing a change, commit with a clear message and push to `main` (deploys automatically).
- This is a **public repository** — commit messages must be professional and follow [Conventional Commits](https://www.conventionalcommits.org/) style (e.g. `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).
- Keep messages concise, lowercase after the prefix, and focused on the "why" or "what" rather than implementation details.

## Code Style
- No build tooling — edits go directly to `assets/app.js`, `assets/styles.css`, and `index.html`.
- Prefer semantic HTML and accessible patterns (aria labels, sr-only text, reduced-motion support).
- Dark mode is supported via a `.dark` class on `<html>` and Tailwind's `dark:` variants.
