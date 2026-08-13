# AppleCare Calculator

Compares individual AppleCare+ plans against the AppleCare One bundle so you can see which is cheaper for your devices.

Live at [carecompare.xyz](https://carecompare.xyz)

## Overview

AppleCare One is Apple's bundled coverage plan: $19.99/month covers up to 3 devices, plus $5.99/month for each additional device. This calculator totals up what your devices would cost on individual AppleCare+ plans and compares that to the bundle price, so you can see which one actually saves you money.

All calculations run in your browser. No data is sent to a server.

## Features

- Device catalog covering the current lineup (iPhone 17 / Air, iPad Pro M5, MacBook Pro M5, MacBook Neo, Apple Watch Ultra 3, AirPods Pro 3, Vision Pro, Studio Display, and more) plus discontinued models (iPhone 15/14/SE, Watch Ultra 2, AirPods Pro 2, etc.), which are tagged "Legacy"
- Search and category filtering to find a device
- Prices animate smoothly to their new value instead of snapping
- Cost bars comparing individual vs. bundle pricing on a shared scale
- A break-even hint showing how much more coverage it would take for AppleCare One to win
- A note on how much prepaying annually saves over monthly billing, for devices where Apple offers that option
- Dark/light theme that follows your system setting, including when you change it while the page is open; clicking the toggle pins your choice and remembers it
- Responsive layout for desktop, tablet, and mobile

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Local Development

```bash
# Clone the repository
git clone https://github.com/dlev02/carecompare.git
cd carecompare

# Install dependencies
bun install  # or npm install

# Start dev server
bun run dev  # or npm run dev

# Build for production
bun run build  # or npm run build
```

The dev server runs at `http://localhost:5173`.

## How It Works

1. **Select devices**: browse the catalog, or filter by category and search
2. **See the math**: the calculator totals individual AppleCare+ pricing and compares it to the AppleCare One bundle
3. **Get the result**: it shows which option is cheaper, by how much, and any break-even or annual-prepay notes that apply

## Pricing Notes

- U.S. AppleCare+ prices checked against Apple's published rates as of July 2026 (includes the July 15, 2026 Mac/iPad price increase for new sign-ups)
- AppleCare+ is a single tier that includes Theft & Loss on iPhone, iPad, and Apple Watch
- Annual prepay is roughly 10x the monthly price (about two months free) on devices where Apple publishes an annual rate; legacy devices don't have one, so they stay on monthly billing
- Not affiliated with Apple Inc. Always verify final pricing on [Apple's official AppleCare page](https://www.apple.com/applecare/).

## License

MIT License - see [LICENSE](LICENSE) for details.

Built by [Drew Levinson](https://drewlevinson.me)
