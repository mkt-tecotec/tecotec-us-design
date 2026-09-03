// Tính tương phản WCAG từ token OKLCH trong assets/css/tokens.css. Exit 1 nếu cặp nào dưới ngưỡng.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'assets/css/tokens.css'), 'utf8');

const tokens = {};
for (const m of css.matchAll(/--(color-[a-z0-9-]+):\s*oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)/g)) {
  tokens[m[1]] = { L: Number(m[2]) / 100, C: Number(m[3]), h: Number(m[4]) };
}
tokens['color-accent-ink'] = tokens['color-paper'];
tokens['color-focus-on-deep'] = tokens['color-paper'];

function linear(L, C, h) {
  const a = C * Math.cos((h * Math.PI) / 180);
  const b = C * Math.sin((h * Math.PI) / 180);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const clip = (x) => Math.min(1, Math.max(0, x));
  return [clip(r), clip(g), clip(bb)];
}
const lum = (t) => { const [r, g, b] = linear(t.L, t.C, t.h); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const la = lum(tokens[a]), lb = lum(tokens[b]); const [hi, lo] = la > lb ? [la, lb] : [lb, la]; return (hi + 0.05) / (lo + 0.05); };
const hex = (t) => '#' + linear(t.L, t.C, t.h).map((x) => Math.round((x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055) * 255).toString(16).padStart(2, '0')).join('');

const PAIRS = [
  ['color-ink', 'color-paper', 4.5, 'chữ thân trên giấy'],
  ['color-ink', 'color-paper-2', 4.5, 'chữ thân trên mat'],
  ['color-ink', 'color-paper-3', 4.5, 'chữ thân trên khối chờ duyệt, banner'],
  ['color-ink-2', 'color-paper', 4.5, 'chữ phụ trên giấy'],
  ['color-ink-2', 'color-paper-3', 4.5, 'chữ phụ trên khối chờ duyệt'],
  ['color-muted', 'color-paper', 4.5, 'caption trên giấy'],
  ['color-muted', 'color-paper-2', 4.5, 'caption trên mat'],
  ['color-muted', 'color-paper-3', 4.5, 'caption trên khối chờ duyệt'],
  ['color-accent', 'color-paper', 4.5, 'số hiệu son trên giấy'],
  ['color-accent', 'color-paper-2', 4.5, 'số hiệu son trên mat'],
  ['color-paper', 'color-surface-deep', 4.5, 'chữ giấy trên footer nâu'],
  ['color-focus', 'color-paper', 3, 'vòng focus trên giấy'],
  ['color-focus', 'color-paper-3', 3, 'vòng focus trên khối chờ duyệt'],
  ['color-focus-on-deep', 'color-surface-deep', 3, 'vòng focus trên footer'],
  ['color-rule', 'color-paper', 1, 'hairline (chỉ báo cáo)'],
  ['color-accent-2', 'color-paper', 1, 'kẻ mạ (không phải chữ, chỉ báo cáo)']
];

let fail = 0;
console.log('Token → hex:');
for (const [k, t] of Object.entries(tokens)) console.log(`  --${k}: ${hex(t)}`);
console.log('\nTương phản WCAG:');
for (const [fg, bg, min, note] of PAIRS) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) fail += 1;
  console.log(`  ${ok ? 'OK  ' : 'FAIL'} ${r.toFixed(2).padStart(6)} ≥ ${min}  ${fg} / ${bg}  (${note})`);
}
if (fail) { console.error(`\n${fail} cặp dưới ngưỡng.`); process.exit(1); }
console.log('\nMọi cặp chữ đạt ngưỡng.');
