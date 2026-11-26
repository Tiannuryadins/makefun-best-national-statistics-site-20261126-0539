[![best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/tiannuryadins/makefun-best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/tiannuryadins/makefun-best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# ARUNIKA — Indonesia in Numbers

Entry for [best-national-statistics-site-20261126-0539](https://make.fun/bounty/best-national-statistics-site-20261126-0539): an original, working national statistics site for **Indonesia** that runs fully offline in a desktop or phone browser from its own static files — no network request, no build step.

## What it is

One open atlas of the world's fourth-largest country: 285.7 million people, a US$ 1.45 trillion economy, 38 provinces. Seven sections, every one reached by a link in the header:

- **Overview** — 8 headline indicators, GDP-growth / population chart switcher, Indonesia at a glance, ASEAN comparison, latest releases
- **Population** — 2015–2025 trend chart with year-range and bar/line toggles, age-band breakdown, population by island
- **Economy** — growth / GDP / GDP-per-capita chart switcher, industry donut (2024), merchandise trade table 2020–2024, GDP by expenditure
- **Employment** — unemployment trend 2015–2025, employment-by-sector donut, formal vs informal, youth unemployment
- **Prices & living standards** — inflation / poverty tab switcher, the BPS poverty line (Rp 609,160/month, March 2025)
- **Regions** — sortable, searchable table of the ten largest provinces with population, share, density and area
- **Sources & method** — every source named, and how to read the figures

Every control does what it says: chart switchers re-draw the chart, the province table sorts and filters live, CSV download buttons download the real series, and the light/dark theme toggle works and is remembered.

## Every figure is real

All figures are published statistics, each labelled with its year and source on the page where it appears:

- **BPS — Statistics Indonesia**: real GDP growth, Sakernas labour-force survey (unemployment 4.85%, Aug 2025), poverty profile (8.47%, Mar 2025), CPI, trade, provinces, 2020 Census
- **World Bank — World Development Indicators**: population (285.7m, 2025), GDP (US$ 1.45tn), GDP per capita (US$ 5,060), age structure, life expectancy
- **IMF — World Economic Outlook**: cross-check for GDP and growth aggregates
- **CIA World Factbook**: GDP by expenditure and employment by sector, 2024 estimates

Nothing is invented, estimated by this site, or fetched from the network. The only derived figures are province densities (population ÷ area, labelled as computed).

## Run it

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

Open http://localhost:8080 in desktop Chrome or on a phone. Or open `app/index.html` directly — it works from the file system too.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts` (the kit's copy, unchanged).

## License

MIT — see [LICENSE](LICENSE).
