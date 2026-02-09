# AppleCare Calculator

**Find the best value for your Apple ecosystem — compare individual AppleCare+ plans vs. the AppleCare One bundle.**

## Overview

The **AppleCare Calculator** is a web-based tool that helps you determine whether individual AppleCare+ monthly subscriptions or the unified **AppleCare One** bundle provides optimal value for your devices.

AppleCare One costs **$19.99/month** for up to 3 devices, plus **$5.99/month** for each additional device. This calculator compares that against your individual device costs and shows you exactly how much you could save.

All calculations happen **locally in your browser** — no data is sent to any server.

---

## Features

- **Complete Device Catalog**: iPhone, iPad, Mac, Apple Watch, AirPods, Apple TV, HomePod, and Vision Pro (updated with 2026 pricing)
- **Real-Time Cost Comparison**: Instantly see monthly and annual costs side-by-side
- **Smart Recommendations**: Clear visual indication of which option saves you money
- **Category Filtering**: Browse by device type or search for specific models
- **Swiss Precision Design**: Neo-brutalist minimalist aesthetic with bold typography
- **Dark/Light Mode**: Toggle between themes with a single click
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Privacy First**: All calculations run locally — zero server communication

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
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

1. **Select Devices**: Choose from the complete catalog or filter by category (iPhone, Mac, etc.)
2. **See the Math**: The calculator shows you the total cost of individual AppleCare+ plans vs. the AppleCare One bundle
3. **Get Recommendations**: The app highlights which option saves you money and shows your potential savings
4. **Make Your Decision**: Armed with real numbers, choose the best option for your ecosystem

---

## Disclaimer

*Pricing based on current U.S. AppleCare+ rates as of February 2026. Not affiliated with Apple Inc. Always verify final pricing on [Apple's official AppleCare page](https://www.apple.com/shop/product/applecare).*

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built by [Drew Levinson](https://drewlevinson.me)**
