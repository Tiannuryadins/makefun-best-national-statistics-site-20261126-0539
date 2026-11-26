// HTML for each ARUNIKA page, built from the real series in data.js.
// Every value is escaped before it goes into the page.

import { barChart, lineChart, donut, hbars } from './charts.js';
import {
  META, HEADLINES, POPULATION, GDP_GROWTH, GDP_NOMINAL, GDP_PER_CAPITA,
  INFLATION, UNEMPLOYMENT, POVERTY, SECTORS_2024, EXPENDITURE_2024, TRADE,
  EMPLOYMENT_SECTORS, AGE_BANDS_2024, PROVINCES, ISLANDS_2020, ASEAN_2024,
  RELEASES, SOURCES,
} from './data.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt1 = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fmt0 = (n) => Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 });

function sourceNote(text) {
  return `<p class="src">Source: ${esc(text)}</p>`;
}

function kpiCards() {
  return `<div class="kpis">${HEADLINES.map((h) => `<article class="kpi">
    <span class="kpi-label">${esc(h.label)}</span>
    <span class="kpi-value">${esc(h.value)}</span>
    <span class="kpi-detail">${esc(h.detail)}</span>
  </article>`).join('')}</div>`;
}

function glanceTable() {
  const rows = [
    ['Country', 'Indonesia — Republic of Indonesia'],
    ['Capital', 'Jakarta (seat of government moving to Nusantara)'],
    ['Land area', '1,904,569 km² — the world’s largest archipelagic state'],
    ['Islands', '17,000+ islands across three time zones'],
    ['Provinces', '38 provinces, 514 regencies and cities'],
    ['Official language', 'Indonesian (Bahasa Indonesia)'],
    ['Currency', 'Indonesian rupiah (IDR)'],
    ['Population density', '149 people per km² (2024)'],
    ['Urban share', '59.4% of the population lives in urban areas (2025)'],
    ['Median age', '30.5 years (2024)'],
    ['Fertility rate', '2.1 children per woman (2023)'],
    ['Independence', '17 August 1945'],
  ];
  return `<table class="data-table"><caption>Indonesia at a glance</caption><tbody>${rows.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>`;
}

function aseanTable() {
  const sorted = [...ASEAN_2024].sort((a, b) => b.gdpPerCapita - a.gdpPerCapita);
  return `<table class="data-table"><caption>Indonesia among its ASEAN neighbours — 2024</caption>
    <thead><tr><th scope="col">Country</th><th scope="col">Population (million)</th><th scope="col">GDP per capita (US$)</th></tr></thead>
    <tbody>${sorted.map((r) => `<tr${r.country === 'Indonesia' ? ' class="hl"' : ''}><th scope="row">${esc(r.country)}</th><td>${fmt1(r.pop)}</td><td>${fmt0(r.gdpPerCapita)}</td></tr>`).join('')}</tbody></table>
    ${sourceNote('World Bank, World Development Indicators, 2024.')}`;
}

export function overview(state) {
  const chartKind = state.ovChart || 'growth';
  const chart = chartKind === 'growth'
    ? lineChart(GDP_GROWTH, { label: 'Real GDP growth 2015–2025', format: (v) => `${fmt1(v)}%`, color: '#0e7c7b' })
    : barChart(POPULATION, { label: 'Population 2015–2025', format: (v) => `${fmt1(v)}m`, color: '#2b4c7e' });
  return `<section class="hero">
    <p class="eyebrow">BPS · World Bank · IMF — updated ${esc(META.updated)}</p>
    <h1>Indonesia in numbers.</h1>
    <p class="lede">One open atlas of the world’s fourth-largest country: 285.7 million people, a US$ 1.45 trillion economy, 38 provinces — every figure traced to its official source.</p>
    <p class="hero-links"><a class="btn" href="#/population">Explore the population</a> <a class="btn ghost" href="#/economy">See the economy</a></p>
  </section>
  ${kpiCards()}
  <div class="grid-2">
    <section class="card"><h2>Growth, year by year</h2>
      <div class="seg" role="group" aria-label="Choose chart">
        <button type="button" data-action="ov-chart" data-kind="growth" class="${chartKind === 'growth' ? 'on' : ''}">GDP growth</button>
        <button type="button" data-action="ov-chart" data-kind="population" class="${chartKind === 'population' ? 'on' : ''}">Population</button>
      </div>
      ${chart}
      ${sourceNote(chartKind === 'growth' ? 'Real GDP growth, % year on year — BPS (Statistics Indonesia), 2015–2025.' : 'Total population, millions — World Bank WDI, 2015–2025.')}
      <p><a href="#/economy">Full economy section &rarr;</a></p>
    </section>
    <section class="card"><h2>Indonesia at a glance</h2>${glanceTable()}</section>
  </div>
  <div class="grid-2">
    <section class="card"><h2>How Indonesia compares</h2>${aseanTable()}</section>
    <section class="card"><h2>Latest releases</h2>
      <ul class="releases">${RELEASES.map((r) => `<li><span class="rel-date">${esc(r.date)}</span><b>${esc(r.title)}</b><span>${esc(r.body)}</span></li>`).join('')}</ul>
      <p><a href="#/sources">All data sources &rarr;</a></p>
    </section>
  </div>`;
}

export function populationPage(state) {
  const range = state.popRange || 'all';
  const type = state.popType || 'bar';
  const series = range === 'recent' ? POPULATION.slice(-6) : POPULATION;
  const chart = type === 'bar'
    ? barChart(series, { label: 'Population by year', format: (v) => `${fmt1(v)}m`, color: '#2b4c7e' })
    : lineChart(series, { label: 'Population by year', format: (v) => `${fmt1(v)}m`, color: '#2b4c7e' });
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Population</h1>
  <p class="lede">285.7 million people in 2025 — the world’s 4th-largest population, growing 0.8% a year, and still young: a median age of 30.5.</p>
  <div class="grid-2">
    <section class="card"><h2>Population, ${range === 'recent' ? '2020–2025' : '2015–2025'}</h2>
      <div class="seg" role="group" aria-label="Year range">
        <button type="button" data-action="pop-range" data-kind="all" class="${range === 'all' ? 'on' : ''}">2015–2025</button>
        <button type="button" data-action="pop-range" data-kind="recent" class="${range === 'recent' ? 'on' : ''}">2020–2025</button>
      </div>
      <div class="seg" role="group" aria-label="Chart type">
        <button type="button" data-action="pop-type" data-kind="bar" class="${type === 'bar' ? 'on' : ''}">Bars</button>
        <button type="button" data-action="pop-type" data-kind="line" class="${type === 'line' ? 'on' : ''}">Line</button>
      </div>
      ${chart}
      ${sourceNote('Total population, millions — World Bank, World Development Indicators.')}
      <p><button type="button" class="btn small" data-action="csv" data-kind="population">Download this series (CSV)</button></p>
    </section>
    <section class="card"><h2>Who Indonesians are</h2>
      ${hbars(AGE_BANDS_2024, { format: (v) => `${fmt1(v)}%`, color: '#0e7c7b' })}
      ${sourceNote('Share of population by age band, 2024 — World Bank WDI. Ages 0–14 are 24.6% of the country; 68.1% are of working age (15–64); 7.3% are 65 or older.')}
      <dl class="facts">
        <div><dt>Median age</dt><dd>30.5 years (2024)</dd></div>
        <div><dt>Fertility rate</dt><dd>2.1 children per woman (2023)</dd></div>
        <div><dt>Life expectancy</dt><dd>71.3 years (2024)</dd></div>
        <div><dt>Urban population</dt><dd>59.4% (2025)</dd></div>
        <div><dt>Density</dt><dd>149 people per km²</dd></div>
      </dl>
    </section>
  </div>
  <section class="card"><h2>Where Indonesians live — by island</h2>
    ${hbars(ISLANDS_2020, { format: (v) => `${fmt1(v)}m`, color: '#e8a13d' })}
    ${sourceNote('Population by island group, 2020 Census, millions — BPS. Java alone holds 151.6 million people, 56.1% of the country, on 6.7% of its land.')}
  </section>
  <p><a href="#/regions">See all provinces &rarr;</a></p>`;
}

export function economyPage(state) {
  const metric = state.ecoMetric || 'growth';
  const series = metric === 'growth' ? GDP_GROWTH : metric === 'gdp' ? GDP_NOMINAL : GDP_PER_CAPITA;
  const fmt = metric === 'growth' ? (v) => `${fmt1(v)}%` : metric === 'gdp' ? (v) => `$${fmt0(v)}bn` : (v) => `$${fmt0(v)}`;
  const label = metric === 'growth' ? 'Real GDP growth, %' : metric === 'gdp' ? 'GDP, current US$ billion' : 'GDP per capita, current US$';
  const src = metric === 'growth' ? 'BPS (Statistics Indonesia)' : 'World Bank WDI';
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Economy</h1>
  <p class="lede">A US$ 1.45 trillion economy in 2025 — the 16th largest in the world and the largest in Southeast Asia — growing 5.1% after a decade that never dipped below 4.9% outside the pandemic year.</p>
  <div class="grid-2">
    <section class="card"><h2>${esc(label)}, 2015–2025</h2>
      <div class="seg" role="group" aria-label="Choose indicator">
        <button type="button" data-action="eco-metric" data-kind="growth" class="${metric === 'growth' ? 'on' : ''}">Growth %</button>
        <button type="button" data-action="eco-metric" data-kind="gdp" class="${metric === 'gdp' ? 'on' : ''}">GDP $bn</button>
        <button type="button" data-action="eco-metric" data-kind="gdpPerCapita" class="${metric === 'gdpPerCapita' ? 'on' : ''}">GDP per capita $</button>
      </div>
      ${lineChart(series, { label: `${label} 2015–2025`, format: fmt, color: '#0e7c7b' })}
      ${sourceNote(`${label} — ${src}, 2015–2025. The 2020 bar is the pandemic contraction (−2.07%); every other year in the decade grew.`)}
      <p><button type="button" class="btn small" data-action="csv" data-kind="${metric === 'growth' ? 'growth' : metric === 'gdp' ? 'gdp' : 'gdpPerCapita'}">Download this series (CSV)</button></p>
    </section>
    <section class="card"><h2>What the economy makes — 2024</h2>
      ${donut(SECTORS_2024, { label: 'Share of GDP by industry, 2024', centre: '100%', sub: 'of GDP, 2024' })}
      ${sourceNote('Share of GDP by industry, 2024 — BPS. Manufacturing (18.7%) is the largest single industry; services together are 43.8% of GDP, industry 39.3%, agriculture 12.6%.')}
    </section>
  </div>
  <div class="grid-2">
    <section class="card"><h2>Trade with the world</h2>
      ${barChart(TRADE.map((t) => ({ year: t.year, value: t.exports })), { label: 'Exports of goods 2020–2024', format: (v) => `$${fmt0(v)}bn`, color: '#0e7c7b' })}
      ${sourceNote('Exports of goods, US$ billion — BPS. 2024 exports US$ 264.7bn against imports of US$ 233.7bn: a US$ 31.0bn surplus. Main exports: coal, palm oil, nickel and manufactured goods; largest partner: China.')}
      <table class="data-table"><caption>Merchandise trade, US$ billion</caption>
        <thead><tr><th scope="col">Year</th><th scope="col">Exports</th><th scope="col">Imports</th><th scope="col">Balance</th></tr></thead>
        <tbody>${TRADE.map((t) => `<tr><th scope="row">${t.year}</th><td>${fmt1(t.exports)}</td><td>${fmt1(t.imports)}</td><td>${fmt1(t.exports - t.imports)}</td></tr>`).join('')}</tbody></table>
    </section>
    <section class="card"><h2>Where the rupiah goes</h2>
      ${hbars(EXPENDITURE_2024.filter((e) => e.value > 0), { format: (v) => `${fmt1(v)}%`, color: '#2b4c7e' })}
      ${sourceNote('GDP by expenditure, 2024, % of GDP — CIA World Factbook (2024 est.). Household consumption is 55.4% of GDP; imports enter as −20.4% because GDP counts only what is produced at home.')}
      <dl class="facts">
        <div><dt>GDP (PPP)</dt><dd>US$ 5.05 trillion (2025)</dd></div>
        <div><dt>GDP per capita (PPP)</dt><dd>US$ 17,660 (2025)</dd></div>
        <div><dt>Foreign direct investment</dt><dd>US$ 24.3 billion (2024)</dd></div>
        <div><dt>Exports share of GDP</dt><dd>22.8% (2025)</dd></div>
      </dl>
    </section>
  </div>`;
}

export function employmentPage() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Employment</h1>
  <p class="lede">154.0 million people in the labour force in August 2025; 146.5 million of them working. Unemployment is 4.85% — the lowest since the pandemic — but 57.8% of jobs are informal and youth unemployment is 16.9%.</p>
  <div class="grid-2">
    <section class="card"><h2>Unemployment, 2015–2025</h2>
      ${lineChart(UNEMPLOYMENT, { label: 'Open unemployment rate 2015–2025', format: (v) => `${fmt1(v)}%`, color: '#c96f4a' })}
      ${sourceNote('Open unemployment rate (TPT), % of labour force, August — BPS Sakernas. The 2020 spike (7.07%) is the pandemic; the rate has fallen every year since.')}
      <p><button type="button" class="btn small" data-action="csv" data-kind="unemployment">Download this series (CSV)</button></p>
    </section>
    <section class="card"><h2>Who works where — 2024</h2>
      ${donut(EMPLOYMENT_SECTORS, { label: 'Employment by sector, 2024', centre: '146.5m', sub: 'employed, Aug 2025' })}
      ${sourceNote('Employment by sector, % — CIA World Factbook (2024 est.). Services employ half the workforce; agriculture still employs 27.3% while producing 12.6% of GDP.')}
      <dl class="facts">
        <div><dt>Formal workers</dt><dd>42.2% of employment</dd></div>
        <div><dt>Informal workers</dt><dd>57.8% of employment</dd></div>
        <div><dt>Underemployed</dt><dd>7.91% — 11.6 million people working under 35 hours a week and wanting more</dd></div>
        <div><dt>Part-time workers</dt><dd>24.77% of the employed</dd></div>
        <div><dt>Youth (15–24) unemployment</dt><dd>16.9% (August 2025)</dd></div>
      </dl>
    </section>
  </div>`;
}

export function pricesPage(state) {
  const tab = state.pricesTab || 'inflation';
  const chart = tab === 'inflation'
    ? lineChart(INFLATION, { label: 'Consumer price inflation 2015–2025', format: (v) => `${fmt1(v)}%`, color: '#e8a13d' })
    : lineChart(POVERTY, { label: 'Poverty rate 2015–2025', format: (v) => `${fmt1(v)}%`, color: '#0e7c7b' });
  const note = tab === 'inflation'
    ? 'Consumer price inflation, annual average % — BPS. The 2022 spike (4.21%) followed the fuel-subsidy cut; 2025 inflation of 1.91% sits inside Bank Indonesia’s 1.5–3.5% target band.'
    : 'Poverty rate, % of population, March — BPS, national poverty line. March 2025: 8.47% (23.85 million people), the lowest in two decades; the line was Rp 609,160 per person per month.';
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Prices &amp; living standards</h1>
  <p class="lede">Inflation back inside target at 1.9% — and poverty at its lowest in twenty years. Two sides of the same question: what does money buy, and who is left short?</p>
  <section class="card"><h2>${tab === 'inflation' ? 'Inflation (CPI)' : 'Poverty rate'}, 2015–2025</h2>
    <div class="seg" role="group" aria-label="Choose indicator">
      <button type="button" data-action="prices-tab" data-kind="inflation" class="${tab === 'inflation' ? 'on' : ''}">Inflation</button>
      <button type="button" data-action="prices-tab" data-kind="poverty" class="${tab === 'poverty' ? 'on' : ''}">Poverty</button>
    </div>
    ${chart}
    ${sourceNote(note)}
    <p><button type="button" class="btn small" data-action="csv" data-kind="${tab === 'inflation' ? 'inflation' : 'poverty'}">Download this series (CSV)</button></p>
  </section>
  <div class="grid-2">
    <section class="card"><h2>The poverty line, March 2025</h2>
      <dl class="facts big">
        <div><dt>Poverty line</dt><dd>Rp 609,160 per person per month</dd></div>
        <div><dt>Per day</dt><dd>about Rp 20,305</dd></div>
        <div><dt>People below it</dt><dd>23.85 million (8.47%)</dd></div>
        <div><dt>September 2025</dt><dd>8.25% (23.36 million)</dd></div>
      </dl>
      <p>BPS draws the line from the cost of a minimum food basket plus a minimum of everything else. By the World Bank’s line for upper-middle-income countries, 64.1% of Indonesians live below it — the same country, a different yardstick.</p>
      ${sourceNote('BPS poverty profile, March and September 2025.')}
    </section>
    <section class="card"><h2>Inflation in context</h2>
      <dl class="facts">
        <div><dt>Bank Indonesia target</dt><dd>1.5–3.5% (2025)</dd></div>
        <div><dt>2025 average</dt><dd>1.91%</dd></div>
        <div><dt>Highest since 2015</dt><dd>5.51% (December 2022, year on year)</dd></div>
        <div><dt>Lowest since 2015</dt><dd>1.57% (December 2024, year on year)</dd></div>
        <div><dt>2024 average</dt><dd>2.30%</dd></div>
      </dl>
      <p>Food prices drive the index for most households: food, beverages and tobacco are the largest single group in the CPI basket, which is why a rice harvest matters more to inflation than an exchange rate.</p>
    </section>
  </div>`;
}

export function regionsPage(state) {
  const q = (state.regionQuery || '').toLowerCase();
  const sortKey = state.regionSort || 'pop';
  const rows = [...PROVINCES]
    .filter((p) => !q || p.name.toLowerCase().includes(q))
    .sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name);
      if (sortKey === 'density') return (b.pop * 1e6) / b.area - (a.pop * 1e6) / a.area;
      if (sortKey === 'area') return b.area - a.area;
      return b.pop - a.pop;
    });
  const totalPop = PROVINCES.reduce((s, p) => s + p.pop, 0);
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Regions</h1>
  <p class="lede">Ten provinces hold ${fmt1(totalPop)} million people — 62% of the country. Java’s three big provinces alone hold 130 million. Search the table, or sort it by clicking a column heading.</p>
  <section class="card"><h2>Ten largest provinces, 2024</h2>
    <p class="controls"><label>Search provinces <input type="search" id="region-search" placeholder="e.g. Jawa" value="${esc(state.regionQuery || '')}" aria-label="Search provinces"></label></p>
    <div class="table-scroll"><table class="data-table sortable"><caption>Population, mid-year estimate 2024 — BPS</caption>
      <thead><tr>
        <th scope="col"><button type="button" data-action="region-sort" data-kind="name">Province ${sortKey === 'name' ? '▾' : ''}</button></th>
        <th scope="col"><button type="button" data-action="region-sort" data-kind="pop">Population (million) ${sortKey === 'pop' ? '▾' : ''}</button></th>
        <th scope="col">Share of Indonesia</th>
        <th scope="col"><button type="button" data-action="region-sort" data-kind="density">Density (per km²) ${sortKey === 'density' ? '▾' : ''}</button></th>
        <th scope="col"><button type="button" data-action="region-sort" data-kind="area">Area (km²) ${sortKey === 'area' ? '▾' : ''}</button></th>
      </tr></thead>
      <tbody>${rows.length ? rows.map((p) => `<tr><th scope="row">${esc(p.name)}</th><td>${fmt1(p.pop)}</td><td>${fmt1((p.pop / 285.7) * 100)}%</td><td>${fmt0((p.pop * 1e6) / p.area)}</td><td>${fmt0(p.area)}</td></tr>`).join('') : '<tr><td colspan="5">No province matches that search.</td></tr>'}</tbody></table></div>
    ${sourceNote('Population, millions, and area, km² — BPS, mid-year estimate 2024. Density is computed from those two columns. DKI Jakarta packs 10.68 million people into 664 km²; South Sumatra spreads 8.84 million across 91,592 km².')}
  </section>
  <section class="card"><h2>Population by island, 2020 Census</h2>
    ${hbars(ISLANDS_2020, { format: (v) => `${fmt1(v)}m`, color: '#e8a13d' })}
    ${sourceNote('Millions of people by island group — BPS, 2020 Census (total 270.2 million).')}
  </section>`;
}

export function sourcesPage() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Data sources &amp; method</h1>
  <p class="lede">Every number on this site comes from a published official source. Nothing is estimated by this site, and nothing is fetched from the network — all figures are baked into the site’s own files.</p>
  <section class="card"><h2>Sources</h2>
    <ul class="sources">${SOURCES.map((s) => `<li><b>${esc(s.name)}</b><br><span>${esc(s.note)}</span><br><span class="src-url">${esc(s.url)}</span></li>`).join('')}</ul>
  </section>
  <section class="card"><h2>How to read the figures</h2>
    <ul class="method">
      <li><b>Years travel with the figure.</b> Each chart and table names its year and its source; figures from different years are never mixed into one total.</li>
      <li><b>BPS is the authority for Indonesia.</b> Growth, unemployment, poverty and the CPI are BPS releases; the World Bank WDI is used for internationally comparable series (population, GDP in US$).</li>
      <li><b>Unemployment is the August Sakernas figure</b> (open unemployment rate, TPT) unless dated otherwise.</li>
      <li><b>Poverty is the March BPS figure</b> on the national poverty line, unless dated otherwise.</li>
      <li><b>Density is computed</b> from BPS population and area — the only derived figures on the site — and labelled as computed.</li>
      <li><b>Figures are rounded for display</b> (one decimal); the underlying values are the published ones.</li>
    </ul>
  </section>
  <section class="card"><h2>About this site</h2>
    <p>ARUNIKA is an original, independent statistics atlas built for the make.fun “best national statistics site” competition. It is not affiliated with BPS, the World Bank, the IMF or the Government of Indonesia, and it copies no other site’s brand, text or images. All design, text and charts are original; all data is cited.</p>
    <p>Contact the maker through the competition page. Last updated ${esc(META.updated)}.</p>
  </section>`;
}

export function missingPage() {
  return `<h1>Page not found</h1>
  <p>There is no statistics page at this address. <a href="#/">Back to the overview</a>.</p>`;
}
