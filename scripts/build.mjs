// Sinh toàn bộ HTML phẳng ở gốc repo từ data/*.json và src/templates.
import { writeFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadData } from '../src/lib/load.mjs';
import { layout } from '../src/templates/layout.mjs';
import { header } from '../src/templates/partials/header.mjs';
import { footer } from '../src/templates/partials/footer.mjs';
import * as home from '../src/templates/pages/home.mjs';
import * as collection from '../src/templates/pages/collection.mjs';
import * as collectionMedium from '../src/templates/pages/collection-medium.mjs';
import * as artists from '../src/templates/pages/artists.mjs';
import * as artistDetail from '../src/templates/pages/artist-detail.mjs';
import * as artworkDetail from '../src/templates/pages/artwork-detail.mjs';
import * as stub from '../src/templates/pages/stub.mjs';
import * as hub from '../src/templates/pages/hub.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = loadData(root);
if (!Object.keys(data.images).length) {
  console.error('Chưa có data/images.json. Chạy: PEXELS_API_KEY=... node scripts/pexels-fetch.mjs');
  process.exit(1);
}

const TEMPLATES = { home, collection, 'collection-medium': collectionMedium, artists, 'artist-detail': artistDetail, 'artwork-detail': artworkDetail, stub };
const written = [];

function emit(file, htmlText) {
  writeFileSync(join(root, file), htmlText);
  written.push(file);
}

function renderPage(page, extra = {}) {
  const t = TEMPLATES[page.template];
  if (!t) throw new Error(`Không có template ${page.template} cho ${page.id}`);
  const body = t.render({ page, data, ...extra });
  return layout({ page, title: extra.title || page.title, body });
}

// 1. Trang trong manifest
for (const page of data.pages) {
  const extra = {};
  if (page.template === 'artist-detail' && page.sample) extra.artist = data.artistBySlug[page.sample];
  if (page.template === 'artwork-detail') {
    extra.work = data.workBySlug[page.sample];
    extra.title = extra.work.title;
  }
  emit(page.file, renderPage(page, extra));
}

// 2. Trang sinh từ dữ liệu: mỗi tác phẩm, mỗi người sáng tác đã duyệt, trang khuyết danh
const generated = [];
for (const w of data.worksSorted) {
  const page = { id: `artworks-${w.slug}`, file: `artworks-${w.slug}.html`, title: w.title, prod_url: `/artworks/${w.slug}/`, template: 'artwork-detail', variant: null, asks: [], nav: 'collection', status: 'full', code: 'A5' };
  emit(page.file, renderPage(page, { work: w, title: w.title }));
  generated.push({ file: page.file, title: `${w.tw_inventory_no} · ${w.title}`, prod_url: page.prod_url });
}
for (const a of data.approvedArtists) {
  const page = { id: `artists-${a.slug}`, file: `artists-${a.slug}.html`, title: a.name, prod_url: `/artists/${a.slug}/`, template: 'artist-detail', variant: null, asks: [], nav: 'artists', status: 'full', code: 'A4' };
  emit(page.file, renderPage(page, { artist: a }));
  generated.push({ file: page.file, title: a.name, prod_url: page.prod_url });
}
{
  const page = { id: 'artists-khuyet-danh', file: 'artists-khuyet-danh.html', title: 'Khuyết danh', prod_url: '/artists/khuyet-danh/', template: 'artist-detail', variant: 'anonymous', asks: [], nav: 'artists', status: 'full', code: 'A4' };
  emit(page.file, renderPage(page, { artist: null }));
  generated.push({ file: page.file, title: 'Khuyết danh', prod_url: page.prod_url });
}

// 3. Hub
{
  const page = { id: 'index', file: 'index.html', title: 'Mục lục bản demo', prod_url: '', template: 'hub', variant: null, asks: [], nav: null, status: 'full' };
  const body = hub.render({ page, data, generated });
  emit('index.html', layout({ page, title: page.title, body }));
}

// 4. Mảnh header/footer để đối chiếu với cách làm của tumiki-design
emit('header/header.html', String(header({ id: 'fragment', prod_url: '/', nav: null })) + '\n');
emit('footer/footer.html', String(footer()) + '\n');

// 5. Cảnh báo file HTML lạ ở gốc
const expected = new Set(written.filter((f) => f.endsWith('.html') && !f.includes('/')));
const stray = readdirSync(root).filter((f) => f.endsWith('.html') && !expected.has(f));
if (stray.length) console.warn('Cảnh báo: HTML ở gốc không do build sinh ra:', stray.join(', '));

console.log(`Đã sinh ${written.length} file:`);
for (const f of written) console.log('  ' + f);
