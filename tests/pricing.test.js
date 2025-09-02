import test from 'node:test';
import assert from 'node:assert/strict';
import { computeTotals, BUNDLE_BASE_PRICE, BUNDLE_EXTRA_PRICE } from '../assets/pricing.js';

// Helper to round to cents for consistent comparisons
const cents = (n) => Math.round(n * 100) / 100;

test('computes totals under bundle limit', () => {
  const items = [
    { id: 'iphone-16', qty: 1 },
    { id: 'macbook-air-13', qty: 1 },
  ];
  const totals = computeTotals(items);
  assert.equal(cents(totals.individualMonthly), cents(11.99 + 6.99));
  assert.equal(cents(totals.individualAnnual), cents(119.99 + 69.99));
  assert.equal(totals.totalQty, 2);
  assert.equal(totals.extra, 0);
  assert.equal(cents(totals.bundleMonthly), cents(BUNDLE_BASE_PRICE));
});

test('computes bundle extras above included amount', () => {
  const items = [
    { id: 'iphone-16', qty: 4 },
  ];
  const totals = computeTotals(items);
  assert.equal(totals.totalQty, 4);
  assert.equal(totals.extra, 1);
  assert.equal(cents(totals.bundleMonthly), cents(BUNDLE_BASE_PRICE + BUNDLE_EXTRA_PRICE));
});
