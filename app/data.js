// ARUNIKA — Indonesia in Numbers. Every figure below is a real published statistic.
// Sources are listed per series and in full on the Sources page (#/sources):
// BPS (Statistics Indonesia), World Bank World Development Indicators, IMF WEO,
// CIA World Factbook (2024 estimates where marked). Years and definitions travel
// with each series; nothing here is invented or placeholder.

export const META = {
  country: 'Indonesia',
  siteName: 'ARUNIKA',
  tagline: 'Indonesia in Numbers',
  updated: '26 November 2026',
  currency: 'Indonesian rupiah (IDR)',
  capital: 'Jakarta — seat of government moving to Nusantara',
  landAreaKm2: 1904569,
  islands: '17,000+',
  provinces: 38,
};

// Population, millions — World Bank WDI (total population)
export const POPULATION = [
  { year: 2015, value: 258.2 }, { year: 2016, value: 261.1 },
  { year: 2017, value: 264.1 }, { year: 2018, value: 266.9 },
  { year: 2019, value: 269.6 }, { year: 2020, value: 274.9 },
  { year: 2021, value: 276.4 }, { year: 2022, value: 279.4 },
  { year: 2023, value: 281.2 }, { year: 2024, value: 283.5 },
  { year: 2025, value: 285.7 },
];

// Real GDP growth, % year on year — BPS (Statistics Indonesia)
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.7 }, { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
  { year: 2025, value: 5.11 },
];

// GDP, current US$ billion — World Bank WDI
export const GDP_NOMINAL = [
  { year: 2015, value: 860.9 }, { year: 2016, value: 931.9 },
  { year: 2017, value: 1015.6 }, { year: 2018, value: 1042.2 },
  { year: 2019, value: 1119.1 }, { year: 2020, value: 1059.6 },
  { year: 2021, value: 1218.9 }, { year: 2022, value: 1319.0 },
  { year: 2023, value: 1371.2 }, { year: 2024, value: 1396.3 },
  { year: 2025, value: 1445.6 },
];

// GDP per capita, current US$ — World Bank WDI
export const GDP_PER_CAPITA = [
  { year: 2015, value: 3334 }, { year: 2016, value: 3569 },
  { year: 2017, value: 3846 }, { year: 2018, value: 3904 },
  { year: 2019, value: 4151 }, { year: 2020, value: 3855 },
  { year: 2021, value: 4410 }, { year: 2022, value: 4721 },
  { year: 2023, value: 4876 }, { year: 2024, value: 4925 },
  { year: 2025, value: 5060 },
];

// Consumer price inflation, annual average % — BPS
export const INFLATION = [
  { year: 2015, value: 3.35 }, { year: 2016, value: 3.02 },
  { year: 2017, value: 3.61 }, { year: 2018, value: 3.13 },
  { year: 2019, value: 2.72 }, { year: 2020, value: 2.04 },
  { year: 2021, value: 1.6 }, { year: 2022, value: 4.21 },
  { year: 2023, value: 3.69 }, { year: 2024, value: 2.3 },
  { year: 2025, value: 1.91 },
];

// Open unemployment rate (TPT), % of labour force, August — BPS Sakernas
export const UNEMPLOYMENT = [
  { year: 2015, value: 6.18 }, { year: 2016, value: 5.61 },
  { year: 2017, value: 5.5 }, { year: 2018, value: 5.34 },
  { year: 2019, value: 5.28 }, { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 }, { year: 2024, value: 4.91 },
  { year: 2025, value: 4.85 },
];

// Poverty rate, % of population, March — BPS (national poverty line)
export const POVERTY = [
  { year: 2015, value: 11.22 }, { year: 2016, value: 10.86 },
  { year: 2017, value: 10.64 }, { year: 2018, value: 9.82 },
  { year: 2019, value: 9.41 }, { year: 2020, value: 9.78 },
  { year: 2021, value: 10.14 }, { year: 2022, value: 9.54 },
  { year: 2023, value: 9.36 }, { year: 2024, value: 9.03 },
  { year: 2025, value: 8.47 },
];

// Share of GDP by industry, 2024, % — BPS
export const SECTORS_2024 = [
  { name: 'Manufacturing', value: 18.7 },
  { name: 'Wholesale & retail trade', value: 13.1 },
  { name: 'Agriculture, forestry & fishing', value: 12.6 },
  { name: 'Construction', value: 10.1 },
  { name: 'Mining & quarrying', value: 9.2 },
  { name: 'Information & communication', value: 4.4 },
  { name: 'Financial & insurance services', value: 4.2 },
  { name: 'Transportation & storage', value: 4.0 },
  { name: 'All other industries', value: 23.7 },
];

// GDP by expenditure, 2024, % of GDP — CIA World Factbook (2024 est.)
export const EXPENDITURE_2024 = [
  { name: 'Household consumption', value: 55.4 },
  { name: 'Gross fixed capital formation', value: 29.1 },
  { name: 'Exports of goods & services', value: 22.2 },
  { name: 'Government consumption', value: 7.7 },
  { name: 'Change in inventories', value: 2.3 },
  { name: 'Imports of goods & services', value: -20.4 },
];

// Merchandise trade, US$ billion — BPS
export const TRADE = [
  { year: 2020, exports: 163.2, imports: 141.6 },
  { year: 2021, exports: 231.6, imports: 196.2 },
  { year: 2022, exports: 291.9, imports: 237.4 },
  { year: 2023, exports: 258.8, imports: 221.9 },
  { year: 2024, exports: 264.7, imports: 233.7 },
];

// Employment by sector, 2024, % of employment — CIA World Factbook (2024 est.)
export const EMPLOYMENT_SECTORS = [
  { name: 'Services', value: 50.2 },
  { name: 'Agriculture', value: 27.3 },
  { name: 'Industry', value: 22.5 },
];

// Population by age band, 2024, % of population — World Bank WDI
export const AGE_BANDS_2024 = [
  { name: 'Ages 0–14', value: 24.6 },
  { name: 'Ages 15–24', value: 16.9 },
  { name: 'Ages 25–54', value: 43.6 },
  { name: 'Ages 55–64', value: 7.6 },
  { name: 'Ages 65+', value: 7.3 },
];

// Ten largest provinces, 2024 mid-year estimate — BPS. Area in km² (BPS).
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 49.94, area: 37040 },
  { name: 'Jawa Timur', pop: 41.81, area: 47803 },
  { name: 'Jawa Tengah', pop: 38.28, area: 32801 },
  { name: 'Sumatera Utara', pop: 16.02, area: 72981 },
  { name: 'Banten', pop: 12.43, area: 9663 },
  { name: 'DKI Jakarta', pop: 10.68, area: 664 },
  { name: 'Sulawesi Selatan', pop: 9.36, area: 46717 },
  { name: 'Lampung', pop: 9.29, area: 34624 },
  { name: 'Sumatera Selatan', pop: 8.84, area: 91592 },
  { name: 'Riau', pop: 6.94, area: 87024 },
];

// Population by island group, 2020 Census, millions — BPS
export const ISLANDS_2020 = [
  { name: 'Java', value: 151.6 },
  { name: 'Sumatra', value: 58.6 },
  { name: 'Sulawesi', value: 19.9 },
  { name: 'Kalimantan', value: 16.6 },
  { name: 'Bali & Nusa Tenggara', value: 15.2 },
  { name: 'Papua', value: 5.4 },
  { name: 'Maluku', value: 3.1 },
];

// ASEAN neighbours, 2024 — World Bank WDI
export const ASEAN_2024 = [
  { country: 'Singapore', pop: 6.0, gdpPerCapita: 89705 },
  { country: 'Malaysia', pop: 34.1, gdpPerCapita: 11874 },
  { country: 'Thailand', pop: 71.7, gdpPerCapita: 7336 },
  { country: 'Indonesia', pop: 283.5, gdpPerCapita: 4925 },
  { country: 'Vietnam', pop: 101.0, gdpPerCapita: 4711 },
  { country: 'Philippines', pop: 114.9, gdpPerCapita: 3924 },
];

// Headline indicators for the overview page
export const HEADLINES = [
  { label: 'Population', value: '285.7 million', detail: '2025 · World Bank WDI · 4th largest in the world', good: null },
  { label: 'GDP', value: 'US$ 1.45 trillion', detail: '2025 · World Bank WDI · 16th largest economy', good: null },
  { label: 'GDP per capita', value: 'US$ 5,060', detail: '2025 · World Bank WDI · up from US$ 4,925 in 2024', good: 'up' },
  { label: 'Real GDP growth', value: '5.1%', detail: '2025 · BPS · 5.0% in 2024', good: 'up' },
  { label: 'Unemployment', value: '4.85%', detail: 'August 2025 · BPS Sakernas · 7.46 million people', good: 'down' },
  { label: 'Poverty rate', value: '8.47%', detail: 'March 2025 · BPS · lowest in two decades', good: 'down' },
  { label: 'Inflation (CPI)', value: '1.9%', detail: '2025 annual average · BPS · inside Bank Indonesia’s 1.5–3.5% target band', good: 'down' },
  { label: 'Life expectancy', value: '71.3 years', detail: '2024 · World Bank WDI', good: 'up' },
];

// Latest statistical releases (real BPS release calendar items, 2025)
export const RELEASES = [
  { date: '5 Nov 2025', title: 'Labour Force Situation, August 2025', body: 'Open unemployment 4.85%; 146.5 million employed; youth (15–24) unemployment 16.9%.' },
  { date: '25 Jul 2025', title: 'Poverty Profile, March 2025', body: 'Poverty 8.47% (23.85 million people); poverty line Rp 609,160 per person per month.' },
  { date: '5 Nov 2025', title: 'Economic Growth, Q3 2025', body: 'Economy grew 5.04% year on year in the third quarter of 2025.' },
  { date: '5 Feb 2025', title: 'Economic Growth, 2024', body: 'Economy grew 5.03% in 2024; fourth-quarter growth 5.02% year on year.' },
  { date: '15 Jan 2025', title: 'Exports & Imports, 2024', body: 'Full-year 2024 exports US$ 264.70 billion; imports US$ 233.70 billion; trade surplus US$ 31.00 billion.' },
  { date: '27 Jan 2021', title: 'Population Census 2020', body: 'Population 270.2 million; Java holds 56.1% of all Indonesians; 38 provinces.' },
];

export const SOURCES = [
  { name: 'BPS — Statistics Indonesia (Badan Pusat Statistik)', url: 'https://www.bps.go.id', note: 'Population projections, GDP growth, Sakernas labour force survey, poverty profile, CPI, trade. The national statistical office; all BPS figures are the official release.' },
  { name: 'World Bank — World Development Indicators', url: 'https://data.worldbank.org/country/indonesia', note: 'Population, GDP and GDP per capita in current US$, age structure, life expectancy, urban share. Licensed CC BY 4.0.' },
  { name: 'IMF — World Economic Outlook', url: 'https://www.imf.org/en/Publications/WEO', note: 'Cross-check for GDP and growth aggregates.' },
  { name: 'CIA World Factbook — Indonesia', url: 'https://www.cia.gov/the-world-factbook/countries/indonesia/', note: 'GDP by expenditure and employment by sector, 2024 estimates.' },
];

export function csvFor(kind) {
  const rows = { population: POPULATION, growth: GDP_GROWTH, gdp: GDP_NOMINAL, gdpPerCapita: GDP_PER_CAPITA, inflation: INFLATION, unemployment: UNEMPLOYMENT, poverty: POVERTY }[kind];
  if (!rows) return '';
  return 'year,value\n' + rows.map((r) => `${r.year},${r.value}`).join('\n') + '\n';
}
