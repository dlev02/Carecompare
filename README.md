# AppleCare Calculator

**Find the best value for your Apple ecosystem — compare individual AppleCare+ plans vs. the AppleCare One bundle.**

**Live at [carecompare.xyz](https://carecompare.xyz)**

## Overview

The **AppleCare Calculator** is a web-based tool that helps you determine whether individual AppleCare+ subscriptions or the unified **AppleCare One** bundle provides optimal value for your devices.

AppleCare One costs **$19.99/month** for up to 3 devices, plus **$5.99/month** for each additional device. This calculator compares that against your individual device costs and shows you exactly how much you could save.

All calculations happen **locally in your browser** — no data is sent to any server.

---

## Features

- **Current Device Catalog**: Full 2026 lineup — iPhone 17 / Air, iPad Pro (M5), MacBook Pro (M5), MacBook Neo, Apple Watch Ultra 3, AirPods Pro 3, Vision Pro, Studio Display, and more
- **Legacy Devices Included**: Discontinued models (iPhone 15/14/SE, Watch Ultra 2, AirPods Pro 2, …) stay in the catalog with their last-published prices, clearly tagged
- **Real-Time Cost Comparison**: Animated count-up prices, cost bars drawn to a common scale, and a clear best-value recommendation
- **Break-Even Hints**: See exactly how much more coverage it takes for AppleCare One to win, and how much annual prepay saves vs. monthly billing
- **Category Filtering & Search**: Browse by device type or search for specific models
- **Swiss Precision Design**: Editorial-brutalist aesthetic with a live ticker-tape of coverage facts
- **Dark/Light Mode**: Follows your system, with a one-click override
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Privacy First**: All calculations run locally — zero server communication

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4 with custom design tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

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

The app will be available at `http://localhost:5173`

---

## How It Works

1. **Select Devices**: Choose from the full catalog or filter by category (iPhone, Mac, etc.)
2. **See the Math**: The calculator compares the total cost of individual AppleCare+ plans against the AppleCare One bundle
3. **Get Recommendations**: The app highlights which option saves you money, your break-even point, and what annual prepay would save
4. **Make Your Decision**: Armed with real numbers, choose the best option for your ecosystem

---

## Pricing Notes

- U.S. AppleCare+ prices verified against Apple's published rates as of **July 2026** (includes the July 15, 2026 Mac/iPad price increase for new sign-ups)
- AppleCare+ is now a single tier with **Theft & Loss included** on iPhone, iPad, and Apple Watch
- Annual billing is **10× the monthly price** (two months free); legacy devices show their last-published monthly rate
- *Not affiliated with Apple Inc. Always verify final pricing on [Apple's official AppleCare page](https://www.apple.com/applecare/).*

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built by [Drew Levinson](https://drewlevinson.me)**
