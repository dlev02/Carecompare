import { DEVICE_CATALOG, POPULAR, findDeviceByNameOrId, currency } from './devices.js';

// Bundle model (demo): up to 3 devices for $19.99/mo; extras +$5.99 each.
const BUNDLE_BASE_INCLUDED = 3;
const BUNDLE_BASE_PRICE = 19.99;
const BUNDLE_EXTRA_PRICE = 5.99;

const els = {
  deviceSearch: document.getElementById('deviceSearch'),
  // deviceOptions removed in favor of custom dropdown
  deviceQty: document.getElementById('deviceQty'),
  addDeviceBtn: document.getElementById('addDeviceBtn'),
  deviceDropdown: document.getElementById('deviceDropdown'),
  deviceList: document.getElementById('deviceList'),
  emptyState: document.getElementById('emptyState'),
  quickAddChips: document.getElementById('quickAddChips'),
  individualMonthly: document.getElementById('individualMonthly'),
  individualAnnual: document.getElementById('individualAnnual'),
  bundleMonthly: document.getElementById('bundleMonthly'),
  bundleAnnual: document.getElementById('bundleAnnual'),
  bundleDetails: document.getElementById('bundleDetails'),
  savingsCallout: document.getElementById('savingsCallout'),
  savingsHeadline: document.getElementById('savingsHeadline'),
  savingsDetail: document.getElementById('savingsDetail'),
  themeToggle: document.getElementById('themeToggle'),
};

// App state
let basket = [];
let dropdownState = { open: false, items: [], highlighted: -1 };

function init() {

  // Quick add chips
  for (const id of POPULAR) {
    const dev = DEVICE_CATALOG.find(d => d.id === id);
    if (!dev) continue;
    const chip = document.createElement('button');
    chip.className = 'quick-chip px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm text-xs font-bold transition-all hover:scale-105 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white';
    chip.type = 'button';
    chip.textContent = dev.name;
    chip.addEventListener('click', () => addDevice(dev, 1));
    els.quickAddChips.appendChild(chip);
  }

  // Bind add
  els.addDeviceBtn.addEventListener('click', () => {
    const query = els.deviceSearch.value;
    const qty = Math.max(1, parseInt(els.deviceQty.value || '1', 10));
    const device = findDeviceByNameOrId(query);
    if (device) {
      addDevice(device, qty);
      els.deviceSearch.value = '';
      els.deviceQty.value = '1';
    } else {
      els.deviceSearch.focus();
      els.deviceSearch.select();
    }
  });

  els.deviceSearch.addEventListener('input', onSearchInput);
  els.deviceSearch.addEventListener('focus', onSearchInput);
  els.deviceSearch.addEventListener('keydown', onSearchKeyDown);
  document.addEventListener('click', (e) => {
    if (!els.deviceDropdown.contains(e.target) && e.target !== els.deviceSearch) {
      closeDropdown();
    }
  });

  // Theme: Tailwind dark mode toggle
  applyInitialTheme();
  els.themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch { }
    // trigger subtle icon animation
    try {
      els.themeToggle.classList.remove('theme-burst');
      // reflow
      void els.themeToggle.offsetWidth;
      els.themeToggle.classList.add('theme-burst');
      setTimeout(() => els.themeToggle.classList.remove('theme-burst'), 400);
    } catch { }
  });

  render();
}

function addDevice(device, qty) {
  const existing = basket.find(x => x.id === device.id);
  if (existing) {
    existing.qty += qty;
  } else {
    basket.push({ id: device.id, qty });
  }
  render();
}

function removeDevice(id) {
  basket = basket.filter(x => x.id !== id);
  render();
}

function changeQty(id, delta) {
  const row = basket.find(x => x.id === id);
  if (!row) return;
  row.qty = Math.max(0, row.qty + delta);
  if (row.qty === 0) {
    removeDevice(id);
  } else {
    render();
  }
}

function computeTotals(items) {
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
  const bundleMonthly = (totalQty === 0) ? 0 : (BUNDLE_BASE_PRICE + extra * BUNDLE_EXTRA_PRICE);
  const bundleAnnual = bundleMonthly * 12;

  return { individualMonthly, individualAnnual, bundleMonthly, bundleAnnual, totalQty, extra };
}

function renderList(items) {
  els.deviceList.innerHTML = '';
  if (items.length === 0) {
    els.emptyState.hidden = false;
    els.deviceList.hidden = true;
    return;
  }
  els.emptyState.hidden = true;
  els.deviceList.hidden = false;

  for (const item of items) {
    const dev = DEVICE_CATALOG.find(d => d.id === item.id);
    if (!dev) continue;
    const row = document.createElement('div');
    row.className = 'animate-in flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-white dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10';

    const info = document.createElement('div');
    info.className = 'flex-1 min-w-0';

    const name = document.createElement('div');
    name.className = 'font-bold text-sm truncate';
    name.textContent = dev.name;

    const meta = document.createElement('div');
    meta.className = 'text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5';
    meta.textContent = `${dev.category} • ${currency(dev.monthly)}/mo`;

    info.append(name, meta);

    const controls = document.createElement('div');
    controls.className = 'flex items-center gap-3';

    const qtyWrap = document.createElement('div');
    qtyWrap.className = 'flex items-center bg-white dark:bg-white/10 rounded-xl border border-slate-200 dark:border-white/10 px-1 py-1 shadow-sm';

    const btnClass = 'flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold transition-all hover:bg-slate-100 dark:hover:bg-white/20 active:scale-90';

    const minus = document.createElement('button');
    minus.className = btnClass;
    minus.innerHTML = '−';
    minus.onclick = () => changeQty(item.id, -1);

    const count = document.createElement('span');
    count.className = 'px-3 text-xs font-bold';
    count.textContent = item.qty;

    const plus = document.createElement('button');
    plus.className = btnClass;
    plus.innerHTML = '+';
    plus.onclick = () => changeQty(item.id, 1);

    qtyWrap.append(minus, count, plus);

    const del = document.createElement('button');
    del.className = 'group flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-all hover:bg-red-500 hover:text-white dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white';
    del.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>';
    del.onclick = () => removeDevice(item.id);

    controls.append(qtyWrap, del);
    row.append(info, controls);
    els.deviceList.appendChild(row);
  }
}

function renderTotals() {
  const t = computeTotals(basket);
  els.individualMonthly.textContent = currency(t.individualMonthly);
  els.individualAnnual.textContent = currency(t.individualAnnual);
  els.bundleMonthly.textContent = currency(t.bundleMonthly);
  els.bundleAnnual.textContent = currency(t.bundleAnnual);

  const breakdown = [];
  if (t.extra > 0) {
    els.bundleDetails.textContent = `${t.extra} extra × ${currency(BUNDLE_EXTRA_PRICE)}/mo`;
  } else {
    els.bundleDetails.textContent = '';
  }

  const annualSavings = t.individualAnnual - t.bundleAnnual;
  if (annualSavings > 0.009) {
    els.savingsCallout.hidden = false; // ensure attribute isn't set
    els.savingsCallout.classList.remove('hidden');
    els.savingsHeadline.textContent = `You save ${currency(annualSavings)}/yr`;
    els.savingsDetail.textContent = `Compared to buying AppleCare individually for the same devices.`;
  } else {
    els.savingsCallout.hidden = true;
    els.savingsCallout.classList.add('hidden');
  }
}

function render() {
  renderList(basket);
  renderTotals();
}

// Expose a simple API for debugging
window.__APP__ = {
  addDeviceById: (id, qty = 1) => {
    const dev = DEVICE_CATALOG.find(d => d.id === id);
    if (dev) addDevice(dev, qty);
  }
};

document.addEventListener('DOMContentLoaded', init);

function applyInitialTheme() {
  // Follow system theme by default; respect previous explicit user choice
  let mode = null;
  try { mode = localStorage.getItem('theme'); } catch { }
  if (mode !== 'light' && mode !== 'dark') {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    mode = prefersDark ? 'dark' : 'light';
  }
  applyTheme(mode);
  // Listen for system changes and update when user hasn't explicitly chosen
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', (e) => {
      let explicit = null;
      try { explicit = localStorage.getItem('theme'); } catch { }
      if (explicit === 'light' || explicit === 'dark') return;
      applyTheme(e.matches ? 'dark' : 'light');
    });
  }
}

function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

// ----- Custom search dropdown -----
function onSearchInput() {
  const q = els.deviceSearch.value.trim().toLowerCase();
  const items = (q ? DEVICE_CATALOG.filter(d => d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)) : DEVICE_CATALOG).slice(0, 12);
  dropdownState.items = items;
  dropdownState.highlighted = items.length ? 0 : -1;
  if (!items.length) { closeDropdown(); return; }
  openDropdown();
  renderDropdown();
}

function onSearchKeyDown(e) {
  if (e.key === 'Enter') {
    if (dropdownState.open && dropdownState.highlighted >= 0) {
      selectSuggestion(dropdownState.highlighted);
      e.preventDefault();
    } else {
      // Trigger add if user pressed Enter without dropdown open
      e.preventDefault();
      document.getElementById('addDeviceBtn').click();
    }
    return;
  }
  if (!dropdownState.open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
    onSearchInput();
    e.preventDefault();
    return;
  }
  if (!dropdownState.open) return;
  if (e.key === 'ArrowDown') {
    dropdownState.highlighted = Math.min(dropdownState.items.length - 1, dropdownState.highlighted + 1);
    updateHighlight();
    e.preventDefault();
  } else if (e.key === 'ArrowUp') {
    dropdownState.highlighted = Math.max(0, dropdownState.highlighted - 1);
    updateHighlight();
    e.preventDefault();
  } else if (e.key === 'Escape') {
    closeDropdown();
  }
}

function renderDropdown() {
  els.deviceDropdown.innerHTML = '';
  for (let i = 0; i < dropdownState.items.length; i++) {
    const d = dropdownState.items[i];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all hover:bg-slate-100 dark:hover:bg-white/10';
    if (i === dropdownState.highlighted) btn.classList.add('bg-slate-100', 'dark:bg-white/10');

    const left = document.createElement('div');
    const title = document.createElement('div');
    title.className = 'font-bold text-sm';
    title.textContent = d.name;
    const sub = document.createElement('div');
    sub.className = 'text-[10px] font-bold text-slate-400 uppercase tracking-tighter';
    sub.textContent = d.category;
    left.append(title, sub);

    const price = document.createElement('div');
    price.className = 'text-xs font-bold text-blue-600 dark:text-blue-400';
    price.textContent = `${currency(d.monthly)}/mo`;

    btn.append(left, price);
    btn.addEventListener('click', () => selectSuggestion(i));
    els.deviceDropdown.appendChild(btn);
  }
}

function updateHighlight() {
  const children = Array.from(els.deviceDropdown.children);
  children.forEach((el, idx) => {
    el.classList.remove('bg-slate-100', 'dark:bg-slate-700');
    if (idx === dropdownState.highlighted) {
      el.classList.add('bg-slate-100', 'dark:bg-slate-700');
      el.scrollIntoView({ block: 'nearest' });
    }
  });
}

function selectSuggestion(index) {
  const d = dropdownState.items[index];
  if (!d) return;
  els.deviceSearch.value = d.name;
  closeDropdown();
}

function openDropdown() {
  if (dropdownState.open) return;
  dropdownState.open = true;
  els.deviceDropdown.classList.remove('hidden');
}

function closeDropdown() {
  if (!dropdownState.open) return;
  dropdownState.open = false;
  els.deviceDropdown.classList.add('hidden');
}


