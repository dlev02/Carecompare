// AppleCare+ pricing dataset (US). Updated Jan 2026.
// Reflects latest iPhone 17, M4/M5 Macs & iPads, and AppleCare One bundling.

export const DEVICE_CATALOG = [
  // iPhone (with Theft & Loss)
  { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', category: 'iPhone', monthly: 13.99, annual: 139.99, theftLossIncluded: true },
  { id: 'iphone-17-pro', name: 'iPhone 17 Pro', category: 'iPhone', monthly: 13.99, annual: 139.99, theftLossIncluded: true },
  { id: 'iphone-17-plus', name: 'iPhone 17 Plus', category: 'iPhone', monthly: 12.99, annual: 129.99, theftLossIncluded: true },
  { id: 'iphone-17', name: 'iPhone 17', category: 'iPhone', monthly: 10.49, annual: 104.99, theftLossIncluded: true },
  { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', category: 'iPhone', monthly: 13.99, annual: 139.99, theftLossIncluded: true },
  { id: 'iphone-16-pro', name: 'iPhone 16 Pro', category: 'iPhone', monthly: 13.99, annual: 139.99, theftLossIncluded: true },
  { id: 'iphone-16-plus', name: 'iPhone 16 Plus', category: 'iPhone', monthly: 12.99, annual: 129.99, theftLossIncluded: true },
  { id: 'iphone-16', name: 'iPhone 16', category: 'iPhone', monthly: 11.99, annual: 119.99, theftLossIncluded: true },

  // Mac (AppleCare+; annual here treated as 1-year equivalent for comparison)
  { id: 'mac-mini-m4', name: 'Mac mini (M4/M4 Pro)', category: 'Mac', monthly: 3.49, annual: 34.99 },
  { id: 'imac-m4', name: 'iMac (M4)', category: 'Mac', monthly: 5.99, annual: 59.99 },
  { id: 'macbook-pro-14-m4', name: 'MacBook Pro 14" (M4)', category: 'Mac', monthly: 9.99, annual: 99.99 },
  { id: 'macbook-pro-16-m4', name: 'MacBook Pro 16" (M4)', category: 'Mac', monthly: 14.99, annual: 149.99 },
  { id: 'mac-studio', name: 'Mac Studio', category: 'Mac', monthly: 5.99, annual: 59.99 },
  { id: 'mac-pro', name: 'Mac Pro', category: 'Mac', monthly: 17.99, annual: 179.99 },
  { id: 'macbook-air-13', name: 'MacBook Air 13"', category: 'Mac', monthly: 6.99, annual: 69.99 },
  { id: 'macbook-air-15', name: 'MacBook Air 15"', category: 'Mac', monthly: 7.99, annual: 79.99 },

  // iPad (with Theft & Loss where applicable)
  { id: 'ipad-pro-11-m5', name: 'iPad Pro 11" (M5)', category: 'iPad', monthly: 9.99, annual: 99.99, theftLossIncluded: true },
  { id: 'ipad-pro-13-m5', name: 'iPad Pro 13" (M5)', category: 'iPad', monthly: 10.99, annual: 109.99, theftLossIncluded: true },
  { id: 'ipad-air-11-m4', name: 'iPad Air 11" (M4)', category: 'iPad', monthly: 5.99, annual: 59.99, theftLossIncluded: true },
  { id: 'ipad-air-13-m4', name: 'iPad Air 13" (M4)', category: 'iPad', monthly: 6.99, annual: 69.99, theftLossIncluded: true },
  { id: 'ipad-mini-m4', name: 'iPad mini (M4)', category: 'iPad', monthly: 4.99, annual: 49.99, theftLossIncluded: true },
  { id: 'ipad', name: 'iPad', category: 'iPad', monthly: 4.99, annual: 49.99, theftLossIncluded: true },

  // Watch (with Theft & Loss)
  { id: 'watch-series-11', name: 'Apple Watch Series 11', category: 'Watch', monthly: 4.99, annual: 49.99, theftLossIncluded: true },
  { id: 'watch-ultra-3', name: 'Apple Watch Ultra 3', category: 'Watch', monthly: 5.99, annual: 59.99, theftLossIncluded: true },
  { id: 'watch-se-3', name: 'Apple Watch SE (3rd Gen)', category: 'Watch', monthly: 2.99, annual: 29.99, theftLossIncluded: true },
  { id: 'watch-hermes-11', name: 'Apple Watch Hermès 11', category: 'Watch', monthly: 5.99, annual: 59.99, theftLossIncluded: true },

  // Displays
  { id: 'studio-display', name: 'Apple Studio Display', category: 'Display', monthly: 4.99, annual: 49.99 },
  { id: 'pro-display-xdr', name: 'Pro Display XDR', category: 'Display', monthly: 17.99, annual: 179.99 },

  // Audio
  { id: 'airpods-pro-3', name: 'AirPods Pro (3rd Gen)', category: 'Audio', monthly: 1.49, annual: 14.99 },
  { id: 'airpods-4', name: 'AirPods 4', category: 'Audio', monthly: 1.49, annual: 14.99 },
  { id: 'airpods-max-2', name: 'AirPods Max (2nd Gen)', category: 'Audio', monthly: 2.99, annual: 29.99 },
  { id: 'beats', name: 'Beats (eligible models)', category: 'Audio', monthly: 1.49, annual: 14.99 },

  // TV / Home (annual-only; monthly approximated)
  { id: 'apple-tv-4k', name: 'Apple TV 4K', category: 'Home', monthly: +(9.99 / 12).toFixed(2), annual: 9.99 },
  { id: 'homepod-mini', name: 'HomePod mini', category: 'Home', monthly: +(9.99 / 12).toFixed(2), annual: 9.99 },
  { id: 'homepod-2', name: 'HomePod (2nd Gen)', category: 'Home', monthly: +(19.99 / 12).toFixed(2), annual: 19.99 },

  // Vision
  { id: 'apple-vision-pro', name: 'Apple Vision Pro', category: 'Vision', monthly: 24.99, annual: 249.99 },
];

export const POPULAR = [
  'iphone-17-pro',
  'macbook-pro-14-m4',
  'watch-series-11',
  'airpods-pro-3',
  'apple-vision-pro'
];

export function findDeviceByNameOrId(query) {
  if (!query) return null;
  const normalized = String(query).trim().toLowerCase();
  return (
    DEVICE_CATALOG.find(d => d.id === normalized) ||
    DEVICE_CATALOG.find(d => d.name.toLowerCase() === normalized) ||
    DEVICE_CATALOG.find(d => d.name.toLowerCase().includes(normalized)) ||
    null
  );
}

export function currency(amount) {
  if (Number.isNaN(amount) || amount == null) return '$0.00';
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(amount);
}
