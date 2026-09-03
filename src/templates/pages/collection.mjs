import { html, join } from '../../lib/html.mjs';
import { mediumRow, ask, head } from '../partials/blocks.mjs';

const GROUPS = [
  { key: 'painting', label: 'Tranh' },
  { key: 'ceramic', label: 'Gốm' },
  { key: 'decorative', label: 'Đồ trang trí' }
];

export function render({ page, data }) {
  const isCeramics = page.variant === 'ceramics';
  const mediums = data.mediums.filter((m) => isCeramics || !m.variant_only);

  const flat = html`<ul class="rows entry">${join(mediums.map((m) => mediumRow(m, data)))}</ul>`;
  const grouped = join(GROUPS.map((g) => {
    const list = mediums.filter((m) => m.object_class === g.key);
    if (!list.length) return '';
    return html`<section aria-labelledby="g-${g.key}">
      <h2 class="head--inline" id="g-${g.key}">${g.label}</h2>
      <ul class="rows">${join(list.map((m) => mediumRow(m, data)))}</ul>
    </section>`;
  }));

  return html`<div class="wrap">
  <header class="stack">
    <h1 class="title title--2xl">Bộ sưu tập theo loại hình</h1>
    <p class="dek">${isCeramics ? 'Ba nhóm: tranh, gốm và đồ trang trí. Giai đoạn đầu trưng bày sơn mài; các loại hình khác đang chuẩn bị.' : 'Ba loại hình tranh. Giai đoạn đầu trưng bày sơn mài; sơn dầu và lụa đang chuẩn bị.'}</p>
  </header>
  <div class="section">
    ${isCeramics ? html`<div class="entry stack">${grouped}</div>` : flat}
  </div>
  ${isCeramics ? ask({ question: 'Có nên hiện Gốm và Đồ trang trí như hai nhóm đang chuẩn bị ngay bây giờ, hay chỉ hiện Tranh cho tới khi có hiện vật?', back: 'collection.html', codes: page.asks }) : ''}
</div>`;
}
