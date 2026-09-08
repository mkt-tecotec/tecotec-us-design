import { html, raw, join, img, dims, years } from '../../lib/html.mjs';

export const artworkHref = (w) => `artworks-${w.slug}.html`;
export const artistHref = (a) => (a ? `artists-${a.slug}.html` : 'artists-khuyet-danh.html');

// Khối chờ duyệt. Không lorem: nói ở đây sẽ có gì và câu hỏi nào đang chặn.
export function pending({ tag, body, blocker, verify = false, wide = false }) {
  return html`<div class="pending${wide ? ' pending--wide' : ''}"${verify ? raw(' data-verify') : ''}>
  <p class="pending__tag caps">${tag} · NỘI DUNG CHỜ DUYỆT</p>
  <p class="pending__body">${body}</p>
  ${blocker ? html`<p class="pending__blocker">${blocker}</p>` : ''}
  ${verify ? html`<p class="verify">[verify] Chờ luật sư xác nhận nhóm câu hỏi B (M10 đến M13) trước khi đăng bất kỳ câu chữ nào ở đây.</p>` : ''}
</div>`;
}

// Panel câu hỏi cho Chủ tịch, đặt ngay dưới khối được thêm ở bản B.
export function ask({ question, back, codes }) {
  return html`<aside class="ask" aria-label="Câu hỏi cho Chủ tịch">
  <p class="ask__tag caps">Câu hỏi cho Chủ tịch${codes && codes.length ? html` · ${codes.join(', ')}` : ''}</p>
  <p class="ask__q">${question}</p>
  <a class="link" href="${back}">Xem bản A →</a>
</aside>`;
}

export const head = (text, level = 2, id = null) => raw(`<h${level} class="head"${id ? ` id="${id}"` : ''}>${html`${text}`}</h${level}>`);
export const headInline = (text) => html`<h2 class="head--inline">${text}</h2>`;

// Ảnh trên mat, giữ đúng tỷ lệ. ar = "w / h".
export function plate({ data, slot, ar, alt, caption, priority = false, sizes }) {
  const style = ar ? raw(` style="--ar: ${ar}"`) : '';
  return html`<figure class="plate">
  <div class="plate__box"${style}>${img(data.images, data.slots, slot, { alt, priority, sizes })}</div>
</figure>`;
}

export function creatorLine(w, data) {
  const c = data.creatorOf(w);
  if (!c) return html`<span>Khuyết danh</span>`;
  if (c.artist_status === 'approved') return html`<a href="${artistHref(c)}">${c.name}</a>`;
  return html`<span>${c.name}</span> <span class="chip chip--muted caps">Đang chờ duyệt</span>`;
}

export function workMeta(w, data) {
  const set = data.setOf(w);
  return `${w.tw_date_created} · ${w.tw_material} · ${dims(w)}`;
}

// Thẻ tác phẩm: plate + nhãn.
export function workCard(w, data, level = 3) {
  const set = data.setOf(w);
  const ar = `${w.tw_dim_w} / ${w.tw_dim_h}`;
  const main = w.images[0].slot;
  const h = `h${level}`;
  return html`<article class="work">
  <a class="work__plate" href="${artworkHref(w)}" aria-label="${w.title}, xem trang tác phẩm">
    <div class="plate__box" style="--ar: ${ar}">${img(data.images, data.slots, main, { sizes: '(max-width: 25rem) 100vw, (max-width: 40rem) 50vw, (max-width: 60rem) 33vw, 25vw' })}</div>
  </a>
  <div class="work__label">
    <p class="work__no num">${w.tw_inventory_no}</p>
    ${raw(`<${h} class="work__title">`)}<a href="${artworkHref(w)}">${w.title}</a>${raw(`</${h}>`)}
    <p class="work__creator">${creatorLine(w, data)}</p>
    <p class="work__meta">${workMeta(w, data)}</p>
    ${set ? html`<p class="work__set"><span class="chip chip--muted caps">Bộ ${set.length} tấm</span></p>` : ''}
  </div>
</article>`;
}

export function worksGrid(list, data, cols = 4, level = 3) {
  const cls = cols === 3 ? 'works works--3' : cols === 2 ? 'works works--2' : 'works';
  return html`<div class="${cls}">${join(list.map((w) => workCard(w, data, level)))}</div>`;
}

// Nhãn tác phẩm (tombstone) dạng dl.
export function label(w, data, { ownership = false, isEntry = true } = {}) {
  const set = data.setOf(w);
  const own = { collection: 'Thuộc bộ sưu tập', consigned: 'Ký gửi', unstated: null }[w.tw_ownership_status];
  return html`<dl class="spec${isEntry ? ' entry' : ''}">
  <div><dt class="caps">Số hiệu</dt><dd class="num">${w.tw_inventory_no}</dd></div>
  <div><dt class="caps">Tên tác phẩm</dt><dd><h1 class="label__title">${w.title}</h1></dd></div>
  <div><dt class="caps">Người sáng tác</dt><dd>${creatorLine(w, data)}</dd></div>
  <div><dt class="caps">Năm</dt><dd>${w.tw_date_created}</dd></div>
  <div><dt class="caps">Chất liệu</dt><dd>${w.tw_material}</dd></div>
  <div><dt class="caps">Kích thước</dt><dd>${dims(w, set ? set.length : 0)}</dd></div>
  ${set ? html`<div><dt class="caps">Bộ</dt><dd>${w.tw_part_of_set}, tấm ${w.tw_set_position} trên ${set.length}</dd></div>` : ''}
  ${ownership ? html`<div><dt class="caps">Tình trạng</dt><dd>${own || 'Không nêu'} <span class="chip chip--dashed caps">chờ M4</span></dd></div>` : ''}
</dl>`;
}

export function artistRow(a, data, { link = true } = {}) {
  const n = (data.worksByArtist[a.slug] || []).length;
  const approved = a.artist_status === 'approved';
  const inner = html`<span class="row__name">${a.name}${approved ? '' : html` <span class="chip chip--muted caps">Đang chờ duyệt</span>`}</span>
    <span class="row__years num">${years(a)}</span>
    <span class="row__role">${a.role}</span>
    <span class="row__count">${n} tác phẩm</span>
    <span class="row__arrow" aria-hidden="true">${approved && link ? '→' : ''}</span>`;
  if (approved && link) return html`<li class="row"><a class="row__inner" href="${artistHref(a)}">${inner}</a></li>`;
  return html`<li class="row row--reserved"><div class="row__inner" aria-disabled="true">${inner}</div></li>`;
}

export function anonymousRow(data) {
  const n = data.anonymousWorks.length;
  if (!n) return '';
  return html`<li class="row"><a class="row__inner" href="artists-khuyet-danh.html">
    <span class="row__name">Khuyết danh</span>
    <span class="row__years num">không rõ</span>
    <span class="row__role">Tác giả chưa xác định</span>
    <span class="row__count">${n} tác phẩm</span>
    <span class="row__arrow" aria-hidden="true">→</span>
  </a></li>`;
}

export function mediumRow(m, data) {
  const n = (data.worksByMedium[m.slug] || []).length;
  const status = m.public
    ? html`<span class="row__status caps">${n} tác phẩm</span>`
    : (m.phase == null
      ? html`<span class="row__status chip chip--dashed caps">Giữ chỗ, chờ M5</span>`
      : html`<span class="row__status chip chip--dashed caps">Đang chuẩn bị</span>`);
  const thumb = m.public
    ? html`<div class="row__thumb plate"><div class="plate__box" style="--ar: 4 / 5">${img(data.images, data.slots, m.image, { w: 640, sizes: '96px' })}</div></div>`
    : html`<div class="row__thumb row__thumb--empty" aria-hidden="true"></div>`;
  const inner = html`<span class="row__name">${m.name}</span>
    <span class="row__desc">${m.description_short}</span>
    ${status}
    ${thumb}
    <span class="row__arrow" aria-hidden="true">${m.public ? '→' : ''}</span>`;
  if (m.public) return html`<li class="row"><a class="row__inner row__inner--medium" href="collection-${m.slug}.html">${inner}</a></li>`;
  return html`<li class="row row--reserved"><div class="row__inner row__inner--medium" aria-disabled="true">${inner}</div></li>`;
}
