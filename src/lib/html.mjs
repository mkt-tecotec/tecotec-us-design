// Tiện ích HTML: tagged template tự escape, raw() cho chuỗi đã an toàn, helper ảnh Pexels.

export class Raw {
  constructor(s) { this.s = String(s); }
  toString() { return this.s; }
}
export const raw = (s) => new Raw(s);

export function esc(v) {
  return String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function render(v) {
  if (v == null || v === false) return '';
  if (v instanceof Raw) return v.s;
  if (Array.isArray(v)) return v.map(render).join('');
  return esc(v);
}

export function html(strings, ...vals) {
  let out = '';
  strings.forEach((str, i) => {
    out += str;
    if (i < vals.length) out += render(vals[i]);
  });
  return new Raw(out);
}

export const join = (arr, sep = '') => raw(arr.map(render).join(sep));

const WIDTHS = [640, 960, 1280, 1920];

// Ảnh placeholder Pexels. Mọi ảnh đều mang data-placeholder và alt bắt đầu bằng "Ảnh minh họa".
export function img(images, slots, slot, opts = {}) {
  const rec = images[slot];
  const meta = slots[slot];
  if (!rec || !meta) throw new Error(`Thiếu ảnh cho slot ${slot} (chạy scripts/pexels-fetch.mjs)`);
  const w = opts.w || 1280;
  const src = `${rec.url_base}?auto=compress&cs=tinysrgb&w=${w}`;
  const srcset = WIDTHS.map((x) => `${rec.url_base}?auto=compress&cs=tinysrgb&w=${x} ${x}w`).join(', ');
  const sizes = opts.sizes || '(max-width: 60rem) 100vw, 50vw';
  const alt = opts.alt || meta.alt_vi;
  const priority = opts.priority ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"';
  const cls = opts.className ? ` class="${esc(opts.className)}"` : '';
  return raw(
    `<img src="${esc(src)}" srcset="${esc(srcset)}" sizes="${esc(sizes)}" width="${rec.width}" height="${rec.height}" alt="${esc(alt)}"${priority}${cls} data-placeholder="pexels" data-slot="${esc(slot)}">`
  );
}

// Kích thước: "80 × 120 cm", "bộ 4 tấm, mỗi tấm 40 × 80 cm", gốm: "cao 30 cm, đường kính 18 cm".
export function dims(a, setCount) {
  const nb = ' ';
  let s;
  if (a.tw_diameter) {
    s = `cao${nb}${a.tw_dim_h}${nb}cm, đường kính${nb}${a.tw_diameter}${nb}cm`;
  } else {
    s = `${a.tw_dim_h}${nb}×${nb}${a.tw_dim_w}`;
    if (a.tw_dim_d) s += `${nb}×${nb}${a.tw_dim_d}`;
    s += `${nb}cm`;
  }
  if (setCount && setCount > 1) return `bộ ${setCount} tấm, mỗi tấm ${s}`;
  return s;
}

export const years = (p) => {
  if (p.birth_year == null) return 'không rõ';
  return p.death_year ? `${p.birth_year}–${p.death_year}` : `sinh ${p.birth_year}`;
};

export const plural = (n, word) => `${n} ${word}`;
