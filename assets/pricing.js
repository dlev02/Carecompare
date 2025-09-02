import { DEVICE_CATALOG } from './devices.js';

export const BUNDLE_BASE_INCLUDED = 3;
export const BUNDLE_BASE_PRICE = 19.99;
export const BUNDLE_EXTRA_PRICE = 5.99;

export function computeTotals(items) {
  let individualMonthly = 0;
  let individualAnnual = 0;

  for (const item of items) {
    const dev = DEVICE_CATALOG.find(d => d.id === item.id);
    if (!dev) continue;
    individualMonthly += (dev.monthly || 0) * item.qty;
    individualAnnual += (dev.annual || 0) * item.qty;
  }

  const totalQty = items.reduce((s, x) => s + x.qty, 0);
  const extra = Math.max(0, totalQty - BUNDLE_BASE_INCLUDED);
  const bundleMonthly = totalQty === 0 ? 0 : BUNDLE_BASE_PRICE + extra * BUNDLE_EXTRA_PRICE;
  const bundleAnnual = bundleMonthly * 12;

  return { individualMonthly, individualAnnual, bundleMonthly, bundleAnnual, totalQty, extra };
}
