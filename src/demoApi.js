/**
 * Demo data layer.
 *
 * The original app talked to two public services that are now gone:
 *   - a personal mockapi.io project (deleted), and
 *   - the free `financialmodelingprep.com` v3 endpoints (now key-gated / removed).
 *
 * To keep the GitHub Pages demo fully interactive we intercept `window.fetch`
 * for those exact hosts and serve realistic in-memory data. Every other request
 * falls through to the real network untouched.
 */

const MOCK_HOST = '5e8da89e22d8cd0016a798db.mockapi.io';
const FMP_HOST = 'financialmodelingprep.com';

// --- Static catalogue -------------------------------------------------------

const COMPANIES = {
  AAPL: { name: 'Apple Inc.', price: 195.12 },
  MSFT: { name: 'Microsoft Corporation', price: 420.55 },
  GOOGL: { name: 'Alphabet Inc.', price: 175.4 },
  AMZN: { name: 'Amazon.com, Inc.', price: 185.07 },
  TSLA: { name: 'Tesla, Inc.', price: 249.8 },
  NVDA: { name: 'NVIDIA Corporation', price: 1204.3 },
  META: { name: 'Meta Platforms, Inc.', price: 478.9 },
  NFLX: { name: 'Netflix, Inc.', price: 651.2 },
  AMD: { name: 'Advanced Micro Devices, Inc.', price: 162.4 },
  INTC: { name: 'Intel Corporation', price: 31.2 },
  DIS: { name: 'The Walt Disney Company', price: 102.6 },
  KO: { name: 'The Coca-Cola Company', price: 62.3 },
};

// --- Mutable demo state -----------------------------------------------------

const state = {
  balance: 50000,
  holdings: [
    { id: '1', code: 'AAPL', amount: 180.0, purchasePrice: 1800.0 },
    { id: '2', code: 'MSFT', amount: 400.0, purchasePrice: 2000.0 },
    { id: '3', code: 'TSLA', amount: 270.0, purchasePrice: 1350.0 },
    { id: '4', code: 'NVDA', amount: 1000.0, purchasePrice: 2000.0 },
    { id: '5', code: 'AMZN', amount: 185.0, purchasePrice: 925.0 },
    { id: '6', code: 'GOOGL', amount: 170.0, purchasePrice: 1700.0 },
  ],
};

// --- Helpers ----------------------------------------------------------------

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const profileFor = (symbol) => {
  const company = COMPANIES[symbol] || { name: `${symbol} Holdings`, price: 100 };
  return { symbol, profile: { price: company.price, companyName: company.name } };
};

const stockList = () => ({
  symbolsList: Object.entries(COMPANIES).map(([symbol, c]) => ({
    symbol,
    name: c.name,
    price: c.price,
  })),
});

// Generate a believable price series for the chart.
const historicalFor = (symbol) => {
  const base = (COMPANIES[symbol] || { price: 100 }).price;
  const points = 30;
  const today = new Date();
  const historical = [];
  for (let i = points - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const wave = Math.sin(i / 3) * base * 0.04;
    const drift = (points - i) * base * 0.0015;
    historical.push({
      label: d.toISOString().slice(5, 10), // MM-DD
      vwap: Number((base - drift + wave).toFixed(2)),
    });
  }
  return { symbol, historical };
};

// --- Router -----------------------------------------------------------------

function handle(url, options) {
  const method = (options.method || 'GET').toUpperCase();
  const { hostname, pathname, searchParams } = new URL(url);

  if (hostname === MOCK_HOST) {
    // /users/4
    if (/\/users\/\d+$/.test(pathname)) {
      if (method === 'PUT') {
        const body = options.body ? JSON.parse(options.body) : {};
        if (typeof body.currentBalance === 'number') state.balance = body.currentBalance;
        return json({ id: '4', currentBalance: state.balance });
      }
      return json({ id: '4', currentBalance: state.balance });
    }
    // /users/4/stocks
    if (/\/users\/\d+\/stocks$/.test(pathname)) {
      if (method === 'POST') {
        const body = options.body ? JSON.parse(options.body) : {};
        const record = { id: String(state.holdings.length + 1), ...body };
        state.holdings.push(record);
        return json(record, 201);
      }
      return json(state.holdings);
    }
  }

  if (hostname === FMP_HOST) {
    if (pathname.includes('/company/profile/')) {
      const symbol = decodeURIComponent(pathname.split('/').pop());
      return json(profileFor(symbol));
    }
    if (pathname.includes('/company/stock/list')) {
      return json(stockList());
    }
    if (pathname.includes('/historical-price-full/')) {
      const symbol = decodeURIComponent(pathname.split('/').pop());
      return json(historicalFor(symbol, searchParams));
    }
  }

  return null; // not handled here
}

// --- Install ----------------------------------------------------------------

const realFetch = window.fetch.bind(window);

window.fetch = (input, options = {}) => {
  const url = typeof input === 'string' ? input : input.url;
  try {
    const response = handle(url, options);
    if (response) {
      // Tiny latency so loading states are visible, just like a real API.
      return new Promise((resolve) => setTimeout(() => resolve(response), 150));
    }
  } catch (err) {
    // fall through to the real network on any parsing surprise
    console.warn('[demoApi] passthrough due to', err);
  }
  return realFetch(input, options);
};
