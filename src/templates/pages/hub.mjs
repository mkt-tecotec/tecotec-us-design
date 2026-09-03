import { html, join } from '../../lib/html.mjs';
import { head } from '../partials/blocks.mjs';

const GROUPS = [
  { label: 'Trang chính', test: (p) => p.id.startsWith('home') },
  { label: 'Bộ sưu tập', test: (p) => p.id.startsWith('collection') },
  { label: 'Người sáng tác', test: (p) => p.id.startsWith('artists') },
  { label: 'Tác phẩm', test: (p) => p.id.startsWith('artworks') },
  { label: 'Trang phụ', test: () => true }
];

const BADGE = {
  full: ['chip chip--gilt caps', 'Đầy đủ'],
  variant: ['chip caps', 'Biến thể B'],
  stub: ['chip chip--dashed caps', 'Khung']
};

function depthOf(p, byId) {
  let d = 0; let cur = p;
  while (cur && cur.parent) { d += 1; cur = byId[cur.parent]; }
  return d;
}

function row(p, data) {
  const [cls, text] = BADGE[p.status];
  const depth = depthOf(p, data.pageById);
  return html`<a class="tree__row" href="${p.file}" data-depth="${depth}" data-page="${p.id}">
    <span><span class="tree__name">${p.code} · ${p.title}</span><br><span class="tree__file num">${p.file}</span></span>
    <span class="tree__url num">${p.prod_url}</span>
    <span class="tree__badge ${cls}">${text}</span>
    ${p.diff || p.asks.length ? html`<span class="tree__diff">${p.diff ? html`Khác bản A ở: ${p.diff} ` : ''}${p.asks.length ? html`Hỏi blocker ${p.asks.join(', ')}.` : ''}</span>` : ''}
  </a>`;
}

export function render({ data, generated }) {
  const pages = data.pages;
  const used = new Set();
  const groups = GROUPS.map((g) => {
    const list = pages.filter((p) => !used.has(p.id) && g.test(p));
    list.forEach((p) => used.add(p.id));
    return { label: g.label, list };
  }).filter((g) => g.list.length);

  const c = data.counts;
  const photographers = [...new Map(Object.values(data.images).map((r) => [r.photographer_url, r])).values()]
    .sort((a, b) => a.photographer.localeCompare(b.photographer));

  return html`<div class="wrap">
  <header class="stack">
    <h1 class="title title--2xl">Mục lục bản demo tecotec.us</h1>
    <p class="dek">Trang nội bộ để duyệt giao diện, không dành cho khách truy cập. ${c.pages} trang trong sitemap: ${c.pages_full} trang đầy đủ, ${c.pages_variant} biến thể B để hỏi Chủ tịch, ${c.pages_stub} trang khung chờ nội dung. Cột giữa là địa chỉ dự kiến khi phát hành.</p>
  </header>

  <div class="section entry stack">
    ${join(groups.map((g) => html`<section aria-labelledby="g-${g.label.replace(/\W+/g, '-')}">
      ${head(g.label)}
      <div class="tree">${join(g.list.map((p) => row(p, data)))}</div>
    </section>`))}
  </div>

  <section class="section" aria-labelledby="h-gen">
    ${head('Trang sinh từ dữ liệu')}
    <p class="prose">Mỗi tác phẩm và mỗi người sáng tác đã duyệt có trang riêng, sinh từ cùng template với trang mẫu ở trên. Bấm bất kỳ thẻ nào trên site đều tới được.</p>
    <div class="tree stack">
      ${join(generated.map((g) => html`<a class="tree__row" href="${g.file}" data-depth="1"><span><span class="tree__name">${g.title}</span><br><span class="tree__file num">${g.file}</span></span><span class="tree__url num">${g.prod_url}</span><span class="tree__badge chip chip--muted caps">Sinh tự động</span></a>`))}
    </div>
  </section>

  <section class="section" aria-labelledby="h-stats">
    ${head('Dữ liệu mẫu')}
    <div class="stats">
      <div><p class="stats__n">${c.artworks}</p><p class="stats__l">tác phẩm, trong đó ${c.anonymous} khuyết danh và ${c.sets} bộ nhiều tấm</p></div>
      <div><p class="stats__n">${c.artists_approved}</p><p class="stats__l">người sáng tác đã duyệt trên ${c.artists_total} trong dữ liệu</p></div>
      <div><p class="stats__n">${c.mediums_public}</p><p class="stats__l">loại hình đang trưng bày trên ${data.mediums.length} loại hình có chỗ</p></div>
      <div><p class="stats__n">${c.images}</p><p class="stats__l">ảnh minh họa tạm từ Pexels</p></div>
    </div>
    <p class="muted stack">Tên người sáng tác và tên tác phẩm trong dữ liệu mẫu là hư cấu. Số đếm tính lúc build từ các file trong thư mục data.</p>
  </section>

  <section class="section" aria-labelledby="h-credits">
    ${head('Ảnh minh họa')}
    <p class="prose">Toàn bộ ảnh là ảnh stock từ Pexels, dùng tạm cho bản demo. Nhiếp ảnh gia:</p>
    <ul class="credits stack">
      ${join(photographers.map((r) => html`<li><a href="${r.photographer_url}" rel="noopener">${r.photographer}</a></li>`))}
    </ul>
  </section>
</div>`;
}
