// Điền data/images.json từ Pexels API theo data/image-slots.json.
// Chạy: PEXELS_API_KEY=... node scripts/pexels-fetch.mjs [--refresh slot1,slot2]
// Không bao giờ ghi khóa vào file. Chỉ điền slot còn thiếu, trừ khi --refresh.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const key = process.env.PEXELS_API_KEY;
if (!key) {
  console.error('Thiếu PEXELS_API_KEY trong môi trường. Ví dụ: PEXELS_API_KEY=... node scripts/pexels-fetch.mjs');
  process.exit(1);
}

const slotsPath = join(root, 'data', 'image-slots.json');
const imagesPath = join(root, 'data', 'images.json');
const slots = JSON.parse(readFileSync(slotsPath, 'utf8'));
const images = existsSync(imagesPath) ? JSON.parse(readFileSync(imagesPath, 'utf8')) : {};

const refreshArg = process.argv.indexOf('--refresh');
const refresh = new Set(refreshArg > -1 ? (process.argv[refreshArg + 1] || '').split(',').filter(Boolean) : []);

const strip = (s) => (s || '').replace(/\u2014/g, ',').trim();

async function search(query, orientation, page = 1) {
  const url = new URL('https://api.pexels.com/v1/search');
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', '8');
  url.searchParams.set('page', String(page));
  if (orientation) url.searchParams.set('orientation', orientation);
  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) throw new Error(`Pexels ${res.status} cho "${query}"`);
  const remaining = res.headers.get('x-ratelimit-remaining');
  const data = await res.json();
  return { photos: data.photos || [], remaining };
}

let remaining = null;
for (const [slot, meta] of Object.entries(slots)) {
  if (images[slot] && !refresh.has(slot)) continue;
  const pick = Number.isInteger(meta.pick) ? meta.pick : 0;
  const { photos, remaining: r } = await search(meta.query, meta.orientation);
  remaining = r;
  const p = photos[pick] || photos[0];
  if (!p) { console.error(`Không có kết quả cho slot ${slot} ("${meta.query}")`); continue; }
  const base = p.src.original.split('?')[0];
  images[slot] = {
    pexels_id: p.id,
    url_base: base,
    width: p.width,
    height: p.height,
    avg_color: p.avg_color,
    alt_en: strip(p.alt),
    photographer: strip(p.photographer),
    photographer_url: p.photographer_url,
    pexels_url: p.url,
    query: meta.query,
    picked_at: new Date().toISOString().slice(0, 10)
  };
  console.log(`${slot}: id=${p.id} ${p.width}x${p.height} ${p.photographer} | ${strip(p.alt).slice(0, 60)}`);
}

writeFileSync(imagesPath, JSON.stringify(images, null, 2) + '\n');
console.log(`Đã ghi ${Object.keys(images).length} slot vào data/images.json${remaining ? ` (Pexels còn ${remaining} request)` : ''}`);
