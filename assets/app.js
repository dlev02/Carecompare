// AppleCare+ Pricing & Calculator Logic - Updated Jan 2026

const DEVICE_CATALOG = [
  // iPhone
  { id: 'iphone-16e', name: 'iPhone 16e', category: 'iPhone', monthly: 9.99, annual: 99.99 },
  { id: 'iphone-17', name: 'iPhone 17', category: 'iPhone', monthly: 11.99, annual: 119.99 },
  { id: 'iphone-16', name: 'iPhone 16', category: 'iPhone', monthly: 11.99, annual: 119.99 },
  { id: 'iphone-16-plus', name: 'iPhone 16 Plus', category: 'iPhone', monthly: 12.99, annual: 129.99 },
  { id: 'iphone-air', name: 'iPhone Air', category: 'iPhone', monthly: 13.99, annual: 139.99 },
  { id: 'iphone-17-pro', name: 'iPhone 17 Pro', category: 'iPhone', monthly: 13.99, annual: 139.99 },
  { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', category: 'iPhone', monthly: 13.99, annual: 139.99 },

  // Mac
  { id: 'mac-mini', name: 'Mac mini', category: 'Mac', monthly: 3.49, annual: 34.99 },
  { id: 'mac-studio', name: 'Mac Studio', category: 'Mac', monthly: 5.99, annual: 59.99 },
  { id: 'imac', name: 'iMac', category: 'Mac', monthly: 5.99, annual: 59.99 },
  { id: 'macbook-air-13', name: 'MacBook Air 13-inch', category: 'Mac', monthly: 6.99, annual: 69.99 },
  { id: 'macbook-air-15', name: 'MacBook Air 15-inch', category: 'Mac', monthly: 7.99, annual: 79.99 },
  { id: 'macbook-pro-14', name: 'MacBook Pro 14-inch', category: 'Mac', monthly: 9.99, annual: 99.99 },
  { id: 'macbook-pro-16', name: 'MacBook Pro 16-inch', category: 'Mac', monthly: 14.99, annual: 149.99 },
  { id: 'mac-pro', name: 'Mac Pro', category: 'Mac', monthly: 17.99, annual: 179.99 },

  // Displays
  { id: 'studio-display', name: 'Apple Studio Display', category: 'Display', monthly: 4.99, annual: 49.99 },
  { id: 'pro-display-xdr', name: 'Pro Display XDR', category: 'Display', monthly: 17.99, annual: 179.99 },

  // iPad
  { id: 'ipad', name: 'iPad', category: 'iPad', monthly: 4.99, annual: 49.99 },
  { id: 'ipad-mini', name: 'iPad mini', category: 'iPad', monthly: 4.99, annual: 49.99 },
  { id: 'ipad-air-11-m3', name: 'iPad Air 11-inch (M3)', category: 'iPad', monthly: 5.99, annual: 59.99 },
  { id: 'ipad-air-13-m3', name: 'iPad Air 13-inch (M3)', category: 'iPad', monthly: 6.99, annual: 69.99 },
  { id: 'ipad-pro-11-m5', name: 'iPad Pro 11-inch (M5)', category: 'iPad', monthly: 9.99, annual: 99.99 },
  { id: 'ipad-pro-13-m5', name: 'iPad Pro 13-inch (M5)', category: 'iPad', monthly: 10.99, annual: 109.99 },

  // Watch
  { id: 'watch-se', name: 'Apple Watch SE', category: 'Watch', monthly: 2.99, annual: 29.99 },
  { id: 'watch-series-11', name: 'Apple Watch Series 11', category: 'Watch', monthly: 4.99, annual: 49.99 },
  { id: 'watch-ultra-3', name: 'Apple Watch Ultra 3', category: 'Watch', monthly: 5.99, annual: 59.99 },
  { id: 'watch-hermes', name: 'Apple Watch Hermès', category: 'Watch', monthly: 5.99, annual: 59.99 },
  { id: 'watch-hermes-ultra', name: 'Apple Watch Hermès Ultra', category: 'Watch', monthly: 5.99, annual: 59.99 },

  // Vision
  { id: 'apple-vision-pro', name: 'Apple Vision Pro', category: 'Vision', monthly: 19.99, annual: 199.99 },

  // Audio
  { id: 'airpods-4', name: 'AirPods 4', category: 'Audio', monthly: 1.49, annual: 14.99 },
  { id: 'beats', name: 'Beats', category: 'Audio', monthly: 1.49, annual: 14.99 },
  { id: 'airpods-pro-3', name: 'AirPods Pro 3', category: 'Audio', monthly: 1.99, annual: 19.99 },
  { id: 'airpods-max', name: 'AirPods Max', category: 'Audio', monthly: 2.99, annual: 29.99 },
];

const POPULAR = ['iphone-17-pro', 'macbook-pro-14', 'watch-series-11', 'ipad-pro-11-m5', 'airpods-max'];

// Helper for currency formatting
function currency(amount) {
  if (Number.isNaN(amount) || amount == null) return '$0.00';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

const BUNDLE_BASE_INCLUDED = 3;
const BUNDLE_BASE_PRICE = 19.99;
const BUNDLE_EXTRA_PRICE = 5.99;

const els = {
  searchTrigger: document.getElementById('searchTrigger'),
  searchOverlay: document.getElementById('searchOverlay'),
  overlayBackdrop: document.getElementById('overlayBackdrop'),
  closeExplorerBtn: document.getElementById('closeExplorerBtn'),
  deviceSearch: document.getElementById('deviceSearch'),
  explorerBody: document.getElementById('explorerBody'),
  categoryGrid: document.getElementById('categoryGrid'),
  deviceDropdown: document.getElementById('deviceDropdown'),
  deviceList: document.getElementById('deviceList'),
  quickAddChips: document.getElementById('quickAddChips'),
  individualMonthly: document.getElementById('individualMonthly'),
  bundleMonthly: document.getElementById('bundleMonthly'),
  bundleDetails: document.getElementById('bundleDetails'),
  savingsCallout: document.getElementById('savingsCallout'),
  savingsHeadline: document.getElementById('savingsHeadline'),
  savingsDetail: document.getElementById('savingsDetail'),
  themeToggle: document.getElementById('themeToggle'),
  clearAllBtn: document.getElementById('clearAllBtn'),
  totalsArea: document.getElementById('totalsArea'),
  inventoryColumn: document.getElementById('inventoryColumn'),
  summaryColumn: document.getElementById('summaryColumn'),
  scaleContainer: document.getElementById('scaleContainer'),
};

// Global system
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

// Global state
let basket = [];
let explorerState = {
  isOpen: false,
  view: 'categories', // 'categories' | 'list'
  currentCategory: null,
  highlighted: -1,
  results: []
};

function init() {
  const categoryIcons = {
    'Audio': '🎧', 'Vision': '🥽', 'iPad': '🪄',
    'Display': '🖥️', 'Home': '🏠'
  };

  // 1. Populate Popular Chips on landing
  POPULAR.forEach(id => {
    const dev = DEVICE_CATALOG.find(d => d.id === id);
    if (!dev) return;
    const chip = document.createElement('button');
    chip.className = 'quick-chip px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm text-xs font-bold transition-all hover:scale-105 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white flex items-center gap-2';
    const icon = categoryIcons[dev.category] || '';
    chip.innerHTML = `<span class="opacity-70">${icon}</span> ${dev.name}`;
    chip.onclick = (e) => { e.stopPropagation(); addDevice(dev, 1); };
    els.quickAddChips.appendChild(chip);
  });

  // 2. Populate Category Grid
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
    card.onclick = (e) => { e.stopPropagation(); drillDown(cat.name); };
    els.categoryGrid.appendChild(card);
  });

  // 3. Event Listeners
  els.searchTrigger.onclick = openExplorer;
  els.overlayBackdrop.onclick = closeExplorer;
  els.closeExplorerBtn.onclick = (e) => {
    e.stopPropagation();
    if (explorerState.view === 'list' && !els.deviceSearch.value) {
      showCategories();
    } else {
      closeExplorer();
    }
  };

  els.deviceSearch.oninput = onSearch;
  els.deviceSearch.onkeydown = onKey;

  els.themeToggle.onclick = () => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
  };

  els.clearAllBtn.onclick = () => { basket = []; render(); toast('List cleared', '🗑️'); };


  // Keyboard: Command + K and Escape
  window.onkeydown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openExplorer(); }
    if (e.key === 'Escape' && explorerState.isOpen) closeExplorer();
  };

  applyTheme(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  render();
}

// Explorer Actions
function openExplorer() {
  explorerState.isOpen = true;
  els.searchOverlay.classList.remove('hidden');
  document.body.classList.add('no-scroll');
  els.deviceSearch.focus();
  showCategories();
}

function closeExplorer() {
  explorerState.isOpen = false;
  els.searchOverlay.classList.add('hidden');
  document.body.classList.remove('no-scroll');
  els.deviceSearch.value = '';
}

function showCategories() {
  explorerState.view = 'categories';
  els.categoryGrid.classList.remove('hidden');
  els.deviceDropdown.classList.add('hidden');
  els.closeExplorerBtn.innerHTML = '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>';
}

function drillDown(category) {
  explorerState.view = 'list';
  explorerState.currentCategory = category;
  els.categoryGrid.classList.add('hidden');
  els.deviceDropdown.classList.remove('hidden');
  els.closeExplorerBtn.innerHTML = '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>';

  const items = DEVICE_CATALOG.filter(d => d.category === category);
  renderExplorerList(items);
}

function onSearch() {
  const q = els.deviceSearch.value.trim().toLowerCase();
  if (!q) {
    if (explorerState.currentCategory && explorerState.view === 'list') {
      drillDown(explorerState.currentCategory);
    } else {
      showCategories();
    }
    return;
  }

  explorerState.view = 'list';
  els.categoryGrid.classList.add('hidden');
  els.deviceDropdown.classList.remove('hidden');

  const results = DEVICE_CATALOG.filter(d =>
    d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)
  ).slice(0, 15);

  renderExplorerList(results);
}

function renderExplorerList(items) {
  explorerState.results = items;
  explorerState.highlighted = items.length ? 0 : -1;
  els.deviceDropdown.innerHTML = '';

  items.forEach((d, i) => {
    const btn = document.createElement('button');
    btn.className = `flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-all ${i === explorerState.highlighted ? 'bg-blue-50 dark:bg-blue-500/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`;
    btn.innerHTML = `
      <div class="flex items-center gap-4 pointer-events-none">
        <div class="h-10 w-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-xl shadow-sm border border-slate-100 dark:border-white/5">
          ${getIcon(d.category)}
        </div>
        <div>
          <div class="font-bold text-sm dark:text-white">${d.name}</div>
          <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">${d.category}</div>
        </div>
      </div>
      <div class="text-right pointer-events-none">
        <div class="text-xs font-bold text-blue-600 dark:text-blue-400">${currency(d.monthly)}<span class="opacity-60">/mo</span></div>
        <div class="text-[9px] text-slate-400">${currency(d.annual)}/yr</div>
      </div>
    `;
    btn.onclick = (e) => { e.stopPropagation(); addDevice(d, 1); closeExplorer(); };
    els.deviceDropdown.appendChild(btn);
  });
}

function getIcon(cat) {
  const mapping = {
    'iPhone': '📱',
    'Mac': '💻',
    'Watch': '⌚',
    'Audio': '🎧',
    'Vision': '🥽',
    'iPad': '🪄',
    'Display': '🖥️',
    'Home': '🏠'
  };
  return mapping[cat] || '';
}

function onKey(e) {
  const items = explorerState.results;
  if (!items.length) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    explorerState.highlighted = (explorerState.highlighted + 1) % items.length;
    renderExplorerList(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    explorerState.highlighted = (explorerState.highlighted - 1 + items.length) % items.length;
    renderExplorerList(items);
  } else if (e.key === 'Enter' && explorerState.highlighted >= 0) {
    addDevice(items[explorerState.highlighted], 1);
    closeExplorer();
  }
}

// Core App Logic
function addDevice(device, qty) {
  const existing = basket.find(x => x.id === device.id);
  if (existing) {
    existing.qty += qty;
  } else {
    basket.push({ id: device.id, qty });
  }

  render();
}

function render() {
  els.deviceList.innerHTML = '';
  const hasItems = basket.length > 0;
  els.inventoryColumn.classList.toggle('hidden', !hasItems);
  els.summaryColumn.classList.toggle('hidden', !hasItems);
  els.clearAllBtn.classList.toggle('hidden', !hasItems);

  basket.forEach(item => {
    const dev = DEVICE_CATALOG.find(d => d.id === item.id);
    if (!dev) return;

    const row = document.createElement('div');
    row.className = 'animate-in flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-white/5';
    row.innerHTML = `
      <div class="flex-1 min-w-0">
        <div class="font-bold text-sm truncate">${dev.name}</div>
        <div class="text-[10px] font-bold text-slate-400 mt-0.5">${currency(dev.monthly)}/mo</div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center bg-white dark:bg-white/10 rounded-xl border border-slate-200 dark:border-white/10 p-1">
          <button class="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10" onclick="__APP__.changeQty('${item.id}', -1)">−</button>
          <span class="px-2 text-xs font-bold">${item.qty}</span>
          <button class="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10" onclick="__APP__.changeQty('${item.id}', 1)">+</button>
        </div>
        <button class="h-8 w-8 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white dark:bg-red-500/10" onclick="__APP__.remove('${item.id}')">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    `;
    els.deviceList.appendChild(row);
  });

  const totals = computeTotals(basket);
  els.individualMonthly.textContent = currency(totals.individualMonthly);
  els.bundleMonthly.textContent = currency(totals.bundleMonthly);
  els.bundleDetails.textContent = totals.extra > 0 ? `+ ${totals.extra} additional × ${currency(BUNDLE_EXTRA_PRICE)}` : 'Incl. 3 devices';

  // Calculate Tilt
  if (els.scaleContainer) {
    const diff = totals.individualMonthly - totals.bundleMonthly;
    // Scale the tilt based on price ratio, maxing at +/- 12 degrees
    let tilt = 0;
    if (totals.individualMonthly > 0) {
      const ratio = diff / Math.max(totals.individualMonthly, totals.bundleMonthly);
      tilt = ratio * 35; // 35 degree base weighting for dramatic effect
      tilt = Math.max(-18, Math.min(18, tilt));
    }
    els.scaleContainer.style.setProperty('--scale-tilt', `${tilt}deg`);
  }

  const annual_savings = totals.individualAnnual - (totals.bundleMonthly * 12);
  const diff_monthly = totals.individualMonthly - totals.bundleMonthly;

  if (diff_monthly > 0.01) {
    // Bundle is cheaper
    els.savingsCallout.classList.remove('hidden');
    els.savingsCallout.classList.remove('bg-blue-600', 'dark:bg-blue-700');
    els.savingsCallout.classList.add('bg-green-500', 'dark:bg-green-600');

    const display_savings = Math.max(annual_savings, diff_monthly * 12);
    els.savingsHeadline.textContent = `Save ${currency(display_savings)}/yr 🎉`;
    els.savingsDetail.textContent = `You're getting more value with AppleCare One.`;
  } else if (diff_monthly < -0.01) {
    // Individual is cheaper
    els.savingsCallout.classList.remove('hidden');
    els.savingsCallout.classList.remove('bg-green-500', 'dark:bg-green-600');
    els.savingsCallout.classList.add('bg-blue-600', 'dark:bg-blue-700');

    const individual_savings = Math.abs(diff_monthly) * 12;
    els.savingsHeadline.textContent = `${currency(individual_savings)}/yr cheaper `;
    els.savingsDetail.textContent = `Individual subscriptions are currently your best value.`;
  } else {
    els.savingsCallout.classList.add('hidden');
  }
}

function computeTotals(b) {
  let indMonthly = 0, indAnnual = 0, totalQty = 0;
  b.forEach(item => {
    const dev = DEVICE_CATALOG.find(d => d.id === item.id);
    if (!dev) return;
    indMonthly += dev.monthly * item.qty;
    indAnnual += dev.annual * item.qty;
    totalQty += item.qty;
  });
  const extra = Math.max(0, totalQty - BUNDLE_BASE_INCLUDED);
  const bundleMonthly = b.length > 0 ? (BUNDLE_BASE_PRICE + extra * BUNDLE_EXTRA_PRICE) : 0;
  return { individualMonthly: indMonthly, individualAnnual: indAnnual, bundleMonthly, bundleAnnual: bundleMonthly * 12, totalQty, extra };
}

function applyTheme(mode) {
  document.documentElement.classList.toggle('dark', mode === 'dark');
  localStorage.setItem('theme', mode);
}

// Global helpers
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
