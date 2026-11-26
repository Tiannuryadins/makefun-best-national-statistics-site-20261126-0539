// ARUNIKA router + controls. Hash routes, no network: every page is rendered
// from data.js in this folder.
//
//   #/                overview
//   #/population      population
//   #/economy         economy
//   #/employment      employment
//   #/prices          prices & living standards
//   #/regions         regions
//   #/sources         data sources & method
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { csvFor } from './data.js';
import {
  overview, populationPage, economyPage, employmentPage,
  pricesPage, regionsPage, sourcesPage, missingPage,
} from './views.js';

const app = document.getElementById('app');
const state = {
  ovChart: 'growth',
  popRange: 'all',
  popType: 'bar',
  ecoMetric: 'growth',
  pricesTab: 'inflation',
  regionQuery: '',
  regionSort: 'pop',
};

const TITLES = {
  '/': 'ARUNIKA — Indonesia in Numbers',
  '/population': 'Population | ARUNIKA',
  '/economy': 'Economy | ARUNIKA',
  '/employment': 'Employment | ARUNIKA',
  '/prices': 'Prices & Living Standards | ARUNIKA',
  '/regions': 'Regions | ARUNIKA',
  '/sources': 'Data Sources & Method | ARUNIKA',
};

function render() {
  window.__shotReady = false;
  const route = location.hash.replace(/^#/, '') || '/';
  let html;
  if (route === '/' || route === '') html = overview(state);
  else if (route === '/population') html = populationPage(state);
  else if (route === '/economy') html = economyPage(state);
  else if (route === '/employment') html = employmentPage(state);
  else if (route === '/prices') html = pricesPage(state);
  else if (route === '/regions') html = regionsPage(state);
  else if (route === '/sources') html = sourcesPage();
  else html = missingPage();
  document.title = TITLES[route] || 'Page not found | ARUNIKA';
  app.innerHTML = html;
  document.querySelectorAll('.nav-link').forEach((a) => {
    a.classList.toggle('current', a.getAttribute('href') === `#${route}`);
  });
  const search = document.getElementById('region-search');
  if (search) {
    search.addEventListener('input', () => {
      state.regionQuery = search.value;
      const pos = search.selectionStart;
      render();
      const again = document.getElementById('region-search');
      if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    });
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-action]');
  if (!el) return;
  const action = el.getAttribute('data-action');
  const kind = el.getAttribute('data-kind');
  if (action === 'ov-chart') state.ovChart = kind;
  else if (action === 'pop-range') state.popRange = kind;
  else if (action === 'pop-type') state.popType = kind;
  else if (action === 'eco-metric') state.ecoMetric = kind;
  else if (action === 'prices-tab') state.pricesTab = kind;
  else if (action === 'region-sort') state.regionSort = kind;
  else if (action === 'csv') {
    const csv = csvFor(kind);
    if (!csv) return;
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `indonesia-${kind}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    return;
  } else return;
  render();
});

// Light / dark theme, remembered on this device.
const themeBtn = document.getElementById('theme-toggle');
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? '☀ Light' : '◐ Dark';
  try { localStorage.setItem('arunika-theme', theme); } catch { /* private mode */ }
}
let savedTheme = 'light';
try { savedTheme = localStorage.getItem('arunika-theme') || 'light'; } catch { /* private mode */ }
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeBtn.addEventListener('click', () => {
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

window.addEventListener('hashchange', render);
render();
