// Capture ARUNIKA screenshots + interaction tests in headless Chrome via
// playwright-core (from the npx cache, as previous entries did). Run from the
// repo root. Serves app/ on 127.0.0.1:8081 — start `node serve.ts --port 8081` first.
const { chromium } = require('/home/hatch/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const { join, resolve } = require('node:path');
const { statSync, readFileSync } = require('node:fs');

const here = resolve(__dirname);
const BASE = 'http://127.0.0.1:8081';
const shots = JSON.parse(readFileSync(join(here, 'shots.json'), 'utf8'));

(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/hatch/cft-dl/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-gpu', '--force-color-profile=srgb'],
  });
  const errors = [];
  const externalRequests = [];
  const track = (page, label) => {
    page.on('pageerror', (e) => errors.push(`pageerror ${label}: ${e.message}`));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(`console ${label}: ${m.text()}`); });
    page.on('request', (r) => {
      const u = r.url();
      if (!u.startsWith(BASE) && !u.startsWith('data:')) externalRequests.push(`${label}: ${u}`);
    });
  };

  // --- Screenshots ---
  for (const shot of shots) {
    const page = await browser.newPage({ viewport: shot.viewport, deviceScaleFactor: 1 });
    track(page, shot.file);
    await page.goto(`${BASE}/${shot.path}`, { waitUntil: 'load' });
    await page.waitForFunction(() => window.__shotReady === true, null, { timeout: 30000 });
    await page.waitForTimeout(300);
    const out = join(here, 'screenshots', shot.file);
    await page.screenshot({ path: out, type: 'jpeg', quality: 82 });
    const size = statSync(out).size;
    console.log('SHOT_OK', shot.file, `${size} bytes`, size <= 262144 ? 'UNDER_256K' : 'OVER_256K!');
    await page.close();
  }

  // --- Interaction tests on a desktop page ---
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  track(page, 'interact');
  await page.goto(`${BASE}/#/economy`, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__shotReady === true, null, { timeout: 30000 });
  const t = async (name, fn) => { try { console.log('TEST', name, JSON.stringify(await fn())); } catch (e) { errors.push(`test ${name}: ${e.message}`); } };

  await t('economy-title', () => page.evaluate(() => document.querySelector('h1').textContent));
  await t('economy-switch-to-gdp', () => page.evaluate(() => {
    document.querySelector('[data-action="eco-metric"][data-kind="gdp"]').click();
    return document.querySelector('h2').textContent;
  }));
  await t('economy-switch-to-percapita', () => page.evaluate(() => {
    document.querySelector('[data-action="eco-metric"][data-kind="gdpPerCapita"]').click();
    return document.querySelector('h2').textContent;
  }));
  await t('economy-chart-svgs', () => page.evaluate(() => document.querySelectorAll('svg.chart, svg.donut').length));

  await page.goto(`${BASE}/#/prices`, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__shotReady === true, null, { timeout: 30000 });
  await t('prices-switch-to-poverty', () => page.evaluate(() => {
    document.querySelector('[data-action="prices-tab"][data-kind="poverty"]').click();
    return document.querySelector('h2').textContent;
  }));

  await page.goto(`${BASE}/#/regions`, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__shotReady === true, null, { timeout: 30000 });
  await t('regions-rows-before', () => page.evaluate(() => document.querySelectorAll('tbody tr').length));
  await t('regions-search-jawa', () => page.evaluate(() => {
    const input = document.getElementById('region-search');
    input.value = 'Jawa';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    return document.querySelectorAll('tbody tr').length;
  }));
  await t('regions-sort-density', () => page.evaluate(() => {
    document.querySelector('[data-action="region-sort"][data-kind="density"]').click();
    return document.querySelector('tbody tr th').textContent;
  }));
  await t('regions-first-after-density-sort', () => page.evaluate(() => document.querySelector('tbody tr th').textContent));

  await page.goto(`${BASE}/#/`, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__shotReady === true, null, { timeout: 30000 });
  await t('overview-kpis', () => page.evaluate(() => document.querySelectorAll('.kpi').length));
  await t('overview-chart-switch', () => page.evaluate(() => {
    document.querySelector('[data-action="ov-chart"][data-kind="population"]').click();
    return document.querySelector('h2').textContent;
  }));
  await t('theme-toggle', () => page.evaluate(() => {
    document.getElementById('theme-toggle').click();
    return document.documentElement.getAttribute('data-theme');
  }));
  await t('all-nav-routes', () => page.evaluate(async () => {
    const routes = ['#/population', '#/economy', '#/employment', '#/prices', '#/regions', '#/sources'];
    const out = [];
    for (const r of routes) {
      location.hash = r;
      await new Promise((res) => setTimeout(res, 150));
      out.push(`${r}:${document.querySelector('h1') ? document.querySelector('h1').textContent : 'NO H1'}`);
    }
    return out;
  }));
  await t('csv-buttons-present', () => page.evaluate(() => document.querySelectorAll('[data-action="csv"]').length));
  await page.close();

  await browser.close();
  console.log('EXTERNAL_REQUESTS:', externalRequests.length === 0 ? 'NONE' : JSON.stringify(externalRequests, null, 2));
  console.log('JS_ERRORS:', errors.length === 0 ? 'NONE' : JSON.stringify(errors, null, 2));
  if (errors.length || externalRequests.length) process.exit(1);
  console.log('ALL_OK');
})().catch((e) => { console.error('DRIVER_FAIL', e.message); process.exit(1); });
