// AppleCare+ Pricing & Calculator Logic - Updated Jan 2026

const DEVICE_CATALOG = [
  // iPhone (with Theft & Loss)
  { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', category: 'iPhone', monthly: 13.99, annual: 139.99, theftLossIncluded: true },
  { id: 'iphone-17-pro', name: 'iPhone 17 Pro', category: 'iPhone', monthly: 13.99, annual: 139.99, theftLossIncluded: true },
  { id: 'iphone-17-plus', name: 'iPhone 17 Plus', category: 'iPhone', monthly: 12.99, annual: 129.99, theftLossIncluded: true },
  { id: 'iphone-17', name: 'iPhone 17', category: 'iPhone', monthly: 10.49, annual: 104.99, theftLossIncluded: true },
  { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', category: 'iPhone', monthly: 13.99, annual: 139.99, theftLossIncluded: true },
  { id: 'iphone-16-pro', name: 'iPhone 16 Pro', category: 'iPhone', monthly: 13.99, annual: 139.99, theftLossIncluded: true },
  { id: 'iphone-16-plus', name: 'iPhone 16 Plus', category: 'iPhone', monthly: 12.99, annual: 129.99, theftLossIncluded: true },
  { id: 'iphone-16', name: 'iPhone 16', category: 'iPhone', monthly: 11.99, annual: 119.99, theftLossIncluded: true },

  // Mac 
  { id: 'mac-mini-m4', name: 'Mac mini (M4/M4 Pro)', category: 'Mac', monthly: 3.49, annual: 34.99 },
  { id: 'imac-m4', name: 'iMac (M4)', category: 'Mac', monthly: 5.99, annual: 59.99 },
  { id: 'macbook-pro-14-m4', name: 'MacBook Pro 14" (M4)', category: 'Mac', monthly: 9.99, annual: 99.99 },
  { id: 'macbook-pro-16-m4', name: 'MacBook Pro 16" (M4)', category: 'Mac', monthly: 14.99, annual: 149.99 },
  { id: 'mac-studio', name: 'Mac Studio', category: 'Mac', monthly: 5.99, annual: 59.99 },
  { id: 'mac-pro', name: 'Mac Pro', category: 'Mac', monthly: 17.99, annual: 179.99 },
  { id: 'macbook-air-13', name: 'MacBook Air 13"', category: 'Mac', monthly: 6.99, annual: 69.99 },
  { id: 'macbook-air-15', name: 'MacBook Air 15"', category: 'Mac', monthly: 7.99, annual: 79.99 },

  // iPad
  { id: 'ipad-pro-11-m5', name: 'iPad Pro 11" (M5)', category: 'iPad', monthly: 9.99, annual: 99.99, theftLossIncluded: true },
  { id: 'ipad-pro-13-m5', name: 'iPad Pro 13" (M5)', category: 'iPad', monthly: 10.99, annual: 109.99, theftLossIncluded: true },
  { id: 'ipad-air-11-m4', name: 'iPad Air 11" (M4)', category: 'iPad', monthly: 5.99, annual: 59.99, theftLossIncluded: true },
  { id: 'ipad-air-13-m4', name: 'iPad Air 13" (M4)', category: 'iPad', monthly: 6.99, annual: 69.99, theftLossIncluded: true },
  { id: 'ipad-mini-m4', name: 'iPad mini (M4)', category: 'iPad', monthly: 4.99, annual: 49.99, theftLossIncluded: true },
  { id: 'ipad', name: 'iPad', category: 'iPad', monthly: 4.99, annual: 49.99, theftLossIncluded: true },

  // Watch
  { id: 'watch-series-11', name: 'Apple Watch Series 11', category: 'Watch', monthly: 4.99, annual: 49.99, theftLossIncluded: true },
  { id: 'watch-ultra-3', name: 'Apple Watch Ultra 3', category: 'Watch', monthly: 5.99, annual: 59.99, theftLossIncluded: true },
  { id: 'watch-se-3', name: 'Apple Watch SE (3rd Gen)', category: 'Watch', monthly: 2.99, annual: 29.99, theftLossIncluded: true },
  { id: 'watch-hermes-11', name: 'Apple Watch Hermès 11', category: 'Watch', monthly: 5.99, annual: 59.99, theftLossIncluded: true },

  // Displays & Audio
  { id: 'studio-display', name: 'Apple Studio Display', category: 'Display', monthly: 4.99, annual: 49.99 },
  { id: 'pro-display-xdr', name: 'Pro Display XDR', category: 'Display', monthly: 17.99, annual: 179.99 },
  { id: 'airpods-pro-3', name: 'AirPods Pro (3rd Gen)', category: 'Audio', monthly: 1.49, annual: 14.99 },
  { id: 'airpods-4', name: 'AirPods 4', category: 'Audio', monthly: 1.49, annual: 14.99 },
  { id: 'airpods-max-2', name: 'AirPods Max (2nd Gen)', category: 'Audio', monthly: 2.99, annual: 29.99 },
  { id: 'apple-tv-4k', name: 'Apple TV 4K', category: 'Home', monthly: 0.83, annual: 9.99 },
  { id: 'homepod-2', name: 'HomePod (2nd Gen)', category: 'Home', monthly: 1.67, annual: 19.99 },
  { id: 'apple-vision-pro', name: 'Apple Vision Pro', category: 'Vision', monthly: 24.99, annual: 249.99 },
];

const POPULAR = ['iphone-17-pro', 'macbook-pro-14-m4', 'watch-series-11', 'airpods-pro-3', 'apple-vision-pro'];

// Helper for currency formatting
function currency(amount) {
  if (Number.isNaN(amount) || amount == null) return '$0.00';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

// Bundle model: up to 3 devices for $19.99/mo; extras +$5.99 each.
const BUNDLE_BASE_INCLUDED = 3;
const BUNDLE_BASE_PRICE = 19.99;
const BUNDLE_EXTRA_PRICE = 5.99;

const els = {
  deviceSearch: document.getElementById('deviceSearch'),
  deviceQty: document.getElementById('deviceQty'),
  addDeviceBtn: document.getElementById('addDeviceBtn'),
  deviceDropdown: document.getElementById('deviceDropdown'),
  deviceList: document.getElementById('deviceList'),
  emptyState: document.getElementById('emptyState'),
  quickAddChips: document.getElementById('quickAddChips'),
  individualMonthly: document.getElementById('individualMonthly'),
  bundleMonthly: document.getElementById('bundleMonthly'),
  bundleDetails: document.getElementById('bundleDetails'),
  savingsCallout: document.getElementById('savingsCallout'),
  savingsHeadline: document.getElementById('savingsHeadline'),
  savingsDetail: document.getElementById('savingsDetail'),
  themeToggle: document.getElementById('themeToggle'),
  categoryGrid: document.getElementById('categoryGrid'),
  clearAllBtn: document.getElementById('clearAllBtn'),
  copyBtn: document.getElementById('copyBtn'),
};

// Toast system
function toast(msg, icon = '✅') {
  let t = document.getElementById('app-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'app-toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// App state
let basket = [];
let dropdownState = { open: false, items: [], highlighted: -1 };

function init() {
  // Quick add chips
  const categoryIcons = {
    'iPhone': '📱',
    'Mac': '💻',
    'Watch': '⌚',
    'Audio': '🎧',
    'Vision': '🥽',
    'iPad': '🪄',
    'Display': '🖥️',
    'Home': '🏠'
  };

  POPULAR.forEach(id => {
    const dev = DEVICE_CATALOG.find(d => d.id === id);
    if (!dev) return;
    const chip = document.createElement('button');
    chip.className = 'quick-chip px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm text-xs font-bold transition-all hover:scale-105 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white flex items-center gap-2';

    const icon = categoryIcons[dev.category] || '';
    chip.innerHTML = `<span class="opacity-70">${icon}</span> ${dev.name}`;

    chip.onclick = () => addDevice(dev, 1);
    els.quickAddChips.appendChild(chip);
  });

  // Category Grid
  const categories = [
    { name: 'iPhone', icon: '📱', color: 'bg-blue-50 dark:bg-blue-500/10' },
    { name: 'Mac', icon: '💻', color: 'bg-slate-50 dark:bg-white/5' },
    { name: 'iPad', icon: '🪄', color: 'bg-purple-50 dark:bg-purple-500/10' },
    { name: 'Watch', icon: '⌚', color: 'bg-red-50 dark:bg-red-500/10' },
    { name: 'Audio', icon: '🎧', color: 'bg-green-50 dark:bg-green-500/10' },
    { name: 'Vision', icon: '🥽', color: 'bg-indigo-50 dark:bg-indigo-500/10' },
  ];

  categories.forEach(cat => {
    const card = document.createElement('button');
    card.className = `group shimmer flex flex-col items-center justify-center p-4 rounded-2xl border border-transparent transition-all hover:border-blue-500/30 hover:shadow-premium dark:hover:border-blue-400/30 ${cat.color}`;
    card.innerHTML = `
      <div class="text-3xl mb-2 transition-transform group-hover:scale-110">${cat.icon}</div>
      <div class="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">${cat.name}</div>
    `;
    card.onclick = () => {
      els.deviceSearch.value = cat.name;
      els.deviceSearch.focus();
      onSearchInput();
    };
    els.categoryGrid.appendChild(card);
  });

  // Search Logic
  els.deviceSearch.oninput = onSearchInput;
  els.deviceSearch.onfocus = onSearchInput;
  els.deviceSearch.onkeydown = onSearchKeyDown;

  els.addDeviceBtn.onclick = () => {
    const query = els.deviceSearch.value.trim();
    if (!query) return;
    const qty = Math.max(1, parseInt(els.deviceQty.value || '1', 10));
    const device = DEVICE_CATALOG.find(d => d.name.toLowerCase() === query.toLowerCase())
      || DEVICE_CATALOG.find(d => d.name.toLowerCase().includes(query.toLowerCase()));
    if (device) {
      addDevice(device, qty);
      els.deviceSearch.value = '';
      els.deviceQty.value = '1';
      closeDropdown();
    }
  };

  document.onclick = (e) => {
    if (!els.deviceDropdown.contains(e.target) && e.target !== els.deviceSearch) closeDropdown();
  };

  els.themeToggle.onclick = () => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
  };

  els.clearAllBtn.onclick = () => {
    basket = [];
    render();
    toast('List cleared', '🗑️');
  };

  els.copyBtn.onclick = () => {
    const t = computeTotals(basket);
    const summary = `AppleCare Savings: I'm saving ${currency(t.individualAnnual - t.bundleAnnual)}/yr with AppleCare One for ${t.totalQty} devices!`;
    navigator.clipboard.writeText(summary).then(() => {
      toast('Summary copied to clipboard');
    });
  };

  applyTheme(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  render();
}

function applyTheme(mode) {
  document.documentElement.classList.toggle('dark', mode === 'dark');
  localStorage.setItem('theme', mode);
}

function addDevice(device, qty) {
  const existing = basket.find(x => x.id === device.id);
  if (existing) {
    existing.qty += qty;
  } else {
    basket.push({ id: device.id, qty });
  }
  toast(`${device.name} added`);
  render();
}

function render() {
  els.deviceList.innerHTML = '';
  const hasItems = basket.length > 0;
  els.emptyState.classList.toggle('hidden', hasItems);
  els.deviceList.classList.toggle('hidden', !hasItems);
  els.deviceList.hidden = !hasItems;
  els.clearAllBtn.classList.toggle('hidden', !hasItems);

  let indMonthly = 0;
  let indAnnual = 0;
  let totalQty = 0;

  basket.forEach(item => {
    const dev = DEVICE_CATALOG.find(d => d.id === item.id);
    if (!dev) return;
    indMonthly += dev.monthly * item.qty;
    indAnnual += dev.annual * item.qty;
    totalQty += item.qty;

    const row = document.createElement('div');
    row.className = 'animate-in flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-white/5';
    row.innerHTML = `
      <div class="flex-1 min-w-0">
        <div class="font-bold text-sm truncate">${dev.name}</div>
        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">${currency(dev.monthly)}/mo</div>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <div class="flex items-center bg-white dark:bg-white/10 rounded-xl border border-slate-200 dark:border-white/10 p-1 shadow-sm">
          <button class="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10" onclick="__APP__.changeQty('${item.id}', -1)">−</button>
          <span class="px-2 text-xs font-bold">${item.qty}</span>
          <button class="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10" onclick="__APP__.changeQty('${item.id}', 1)">+</button>
        </div>
        <button class="h-8 w-8 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white dark:bg-red-500/10 dark:text-red-400" onclick="__APP__.remove('${item.id}')">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    `;
    els.deviceList.appendChild(row);
  });

  const extra = Math.max(0, totalQty - BUNDLE_BASE_INCLUDED);
  const bundleMonthly = hasItems ? (BUNDLE_BASE_PRICE + extra * BUNDLE_EXTRA_PRICE) : 0;

  els.individualMonthly.textContent = currency(indMonthly);
  els.bundleMonthly.textContent = currency(bundleMonthly);
  els.bundleDetails.textContent = extra > 0 ? `${extra} additional × ${currency(BUNDLE_EXTRA_PRICE)}` : '';

  const annualSavings = indAnnual - (bundleMonthly * 12);
  if (annualSavings > 1) {
    els.savingsCallout.classList.remove('hidden');
    els.savingsHeadline.textContent = `Save ${currency(annualSavings)}/yr 🎉`;
    els.savingsDetail.textContent = `You're getting more value with AppleCare One.`;
  } else {
    els.savingsCallout.classList.add('hidden');
  }
}

function onSearchInput() {
  const q = els.deviceSearch.value.trim().toLowerCase();
  const items = (q ? DEVICE_CATALOG.filter(d => d.name.toLowerCase().includes(q)) : DEVICE_CATALOG).slice(0, 10);
  dropdownState.items = items;
  dropdownState.highlighted = items.length ? 0 : -1;
  renderDropdown();
}

function renderDropdown() {
  els.deviceDropdown.innerHTML = '';
  if (!dropdownState.items.length) { closeDropdown(); return; }
  els.deviceDropdown.classList.remove('hidden');
  dropdownState.items.forEach((d, i) => {
    const btn = document.createElement('button');
    btn.className = `flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all ${i === dropdownState.highlighted ? 'bg-slate-100 dark:bg-white/10' : ''}`;
    btn.innerHTML = `
      <div>
        <div class="font-bold text-sm dark:text-white">${d.name}</div>
        <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">${d.category}</div>
      </div>
      <div class="text-xs font-bold text-blue-600 dark:text-blue-400">${currency(d.monthly)}<span class="opacity-60">/mo</span></div>
    `;
    btn.onclick = () => { els.deviceSearch.value = d.name; closeDropdown(); };
    els.deviceDropdown.appendChild(btn);
  });
}

function onSearchKeyDown(e) {
  if (e.key === 'Enter') {
    if (dropdownState.highlighted >= 0) {
      els.deviceSearch.value = dropdownState.items[dropdownState.highlighted].name;
      closeDropdown();
    } else els.addDeviceBtn.click();
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    dropdownState.highlighted = Math.min(dropdownState.items.length - 1, dropdownState.highlighted + 1);
    renderDropdown();
  } else if (e.key === 'ArrowUp') {
    dropdownState.highlighted = Math.max(0, dropdownState.highlighted - 1);
    renderDropdown();
  } else if (e.key === 'Escape') closeDropdown();
}

function closeDropdown() {
  els.deviceDropdown.classList.add('hidden');
  dropdownState.highlighted = -1;
}

// Global debug/action helpers
window.__APP__ = {
  changeQty: (id, delta) => {
    const item = basket.find(x => x.id === id);
    if (!item) return;
    item.qty = Math.max(0, item.qty + delta);
    if (item.qty === 0) basket = basket.filter(x => x.id !== id);
    render();
  },
  remove: (id) => {
    basket = basket.filter(x => x.id !== id);
    render();
  }
};

document.addEventListener('DOMContentLoaded', init);
