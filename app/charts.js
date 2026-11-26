// Small dependency-free SVG chart builders for ARUNIKA. Every chart is drawn from
// the real series in data.js — no placeholder values, no external assets.

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (n, d = 1) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

function niceMax(max) {
  const p = 10 ** Math.floor(Math.log10(max));
  const n = max / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
}

// Vertical bar chart. series: [{year, value}], opts: {label, format, color, height}
export function barChart(series, opts = {}) {
  const W = 720, H = opts.height || 300, padL = 56, padB = 34, padT = 14, padR = 10;
  const vals = series.map((d) => d.value);
  const max = niceMax(Math.max(...vals) * 1.08);
  const min = Math.min(0, ...vals);
  const iw = W - padL - padR, ih = H - padT - padB;
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const bw = Math.min(44, (iw / series.length) * 0.62);
  const step = iw / series.length;
  const bars = series.map((d, i) => {
    const x = padL + i * step + (step - bw) / 2;
    const neg = d.value < 0;
    const yTop = neg ? y(0) : y(d.value);
    const h = Math.max(1, Math.abs(y(d.value) - y(0)));
    return `<rect x="${x.toFixed(1)}" y="${yTop.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${neg ? '#c0392b' : (opts.color || '#0e7c7b')}">
      <title>${d.year}: ${opts.format ? opts.format(d.value) : fmt(d.value)}</title></rect>
      <text x="${(x + bw / 2).toFixed(1)}" y="${(yTop - 5).toFixed(1)}" class="chart-val" text-anchor="middle">${opts.format ? opts.format(d.value) : fmt(d.value)}</text>
      <text x="${(x + bw / 2).toFixed(1)}" y="${H - 12}" class="chart-lab" text-anchor="middle">${d.year}</text>`;
  }).join('');
  const grid = [0, 0.5, 1].map((f) => {
    const v = min + (max - min) * f;
    return `<line x1="${padL}" y1="${y(v).toFixed(1)}" x2="${W - padR}" y2="${y(v).toFixed(1)}" class="grid"/>
      <text x="${padL - 8}" y="${(y(v) + 4).toFixed(1)}" class="chart-lab" text-anchor="end">${opts.format ? opts.format(v) : fmt(v)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.label || 'Bar chart')}" class="chart">${grid}<line x1="${padL}" y1="${y(0).toFixed(1)}" x2="${W - padR}" y2="${y(0).toFixed(1)}" class="axis"/>${bars}</svg>`;
}

// Line chart with dots and value labels. series: [{year, value}]
export function lineChart(series, opts = {}) {
  const W = 720, H = opts.height || 300, padL = 56, padB = 34, padT = 22, padR = 16;
  const vals = series.map((d) => d.value);
  let max = Math.max(...vals), min = Math.min(...vals);
  const span = max - min || 1;
  max += span * 0.15; min -= span * 0.15;
  const iw = W - padL - padR, ih = H - padT - padB;
  const x = (i) => padL + (i / (series.length - 1)) * iw;
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const pts = series.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  const dots = series.map((d, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="4.5" fill="${opts.color || '#0e7c7b'}" stroke="#fff" stroke-width="1.5">
      <title>${d.year}: ${opts.format ? opts.format(d.value) : fmt(d.value)}</title></circle>
      <text x="${x(i).toFixed(1)}" y="${(y(d.value) - 10).toFixed(1)}" class="chart-val" text-anchor="middle">${opts.format ? opts.format(d.value) : fmt(d.value)}</text>
      <text x="${x(i).toFixed(1)}" y="${H - 12}" class="chart-lab" text-anchor="middle">${d.year}</text>`).join('');
  const grid = [0, 0.5, 1].map((f) => {
    const v = min + (max - min) * f;
    return `<line x1="${padL}" y1="${y(v).toFixed(1)}" x2="${W - padR}" y2="${y(v).toFixed(1)}" class="grid"/>
      <text x="${padL - 8}" y="${(y(v) + 4).toFixed(1)}" class="chart-lab" text-anchor="end">${opts.format ? opts.format(v) : fmt(v)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.label || 'Line chart')}" class="chart">${grid}<polyline points="${pts}" fill="none" stroke="${opts.color || '#0e7c7b'}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// Donut chart with a centre label. parts: [{name, value}]
export function donut(parts, opts = {}) {
  const W = 340, H = 300, cx = 120, cy = 150, r = 105, ir = 62;
  const total = parts.reduce((s, p) => s + p.value, 0);
  const colors = opts.colors || ['#0e7c7b', '#e8a13d', '#2b4c7e', '#7fb069', '#c96f4a', '#8e6bbf', '#4aa3a2', '#b56576', '#94a3b8'];
  let a = -Math.PI / 2;
  const arcs = parts.map((p, i) => {
    const frac = p.value / total;
    const a2 = a + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x1 = cx + r * Math.cos(a), y1 = cy + r * Math.sin(a);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const xi1 = cx + ir * Math.cos(a2), yi1 = cy + ir * Math.sin(a2);
    const xi2 = cx + ir * Math.cos(a), yi2 = cy + ir * Math.sin(a);
    const d = `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${ir} ${ir} 0 ${large} 0 ${xi2.toFixed(1)} ${yi2.toFixed(1)} Z`;
    const mid = (a + a2) / 2;
    const lx = cx + ((r + ir) / 2) * Math.cos(mid), ly = cy + ((r + ir) / 2) * Math.sin(mid);
    const out = `<path d="${d}" fill="${colors[i % colors.length]}"><title>${esc(p.name)}: ${fmt(p.value)}%</title></path>`;
    a = a2;
    return frac >= 0.045 ? out + `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" class="donut-val" text-anchor="middle">${fmt(p.value, 0)}%</text>` : out;
  }).join('');
  const legend = parts.map((p, i) => `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span>${esc(p.name)} <b>${fmt(p.value)}%</b></li>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.label || 'Donut chart')}" class="donut">${arcs}
    <text x="${cx}" y="${cy - 6}" class="donut-centre" text-anchor="middle">${esc(opts.centre || '')}</text>
    <text x="${cx}" y="${cy + 16}" class="donut-sub" text-anchor="middle">${esc(opts.sub || '')}</text></svg>
    <ul class="legend">${legend}</ul></div>`;
}

// Horizontal bars. parts: [{name, value}], opts: {format, unit, color}
export function hbars(parts, opts = {}) {
  const max = Math.max(...parts.map((p) => p.value));
  const rows = parts.map((p) => {
    const pct = (p.value / max) * 100;
    return `<div class="hbar-row"><span class="hbar-name">${esc(p.name)}</span>
      <span class="hbar-track"><span class="hbar-fill" style="width:${pct.toFixed(1)}%;background:${opts.color || '#0e7c7b'}"></span></span>
      <span class="hbar-val">${opts.format ? opts.format(p.value) : fmt(p.value)}${opts.unit ? ` ${opts.unit}` : ''}</span></div>`;
  }).join('');
  return `<div class="hbars">${rows}</div>`;
}
