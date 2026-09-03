import { html, raw, join } from '../../lib/html.mjs';

export const NAV = [
  { key: 'collection', label: 'Bộ sưu tập', href: 'collection.html' },
  { key: 'artists', label: 'Người sáng tác', href: 'artists.html' },
  { key: 'about', label: 'Giới thiệu', href: 'about.html' },
  { key: 'contact', label: 'Liên hệ', href: 'contact.html' }
];

function links(page) {
  return join(NAV.map((n) => {
    const active = page.nav === n.key;
    return html`<li><a${active ? raw(' class="is-active" aria-current="page"') : ''} href="${n.href}">${n.label}</a></li>`;
  }));
}

export function draftBanner(page) {
  const isHub = page.id === 'index';
  return html`<div class="draft" role="note">
  <div class="wrap">
    <span class="caps">Bản nháp</span>
    <span class="draft__text">${isHub ? 'Mục lục nội bộ của bản demo. Ảnh minh họa tạm; tên người và tác phẩm là dữ liệu mẫu hư cấu.' : 'Trang demo nội bộ, chưa phát hành. Ảnh minh họa tạm; tên người và tác phẩm là dữ liệu mẫu hư cấu.'}</span>
    <span class="draft__text draft__text--short">Ảnh và tên là mẫu tạm.</span>
    ${isHub ? '' : html`<span class="draft__url num"><span class="caps">URL</span> ${page.prod_url}</span>`}
    ${isHub ? '' : html`<a class="draft__link link" href="index.html">Về mục lục →</a>`}
  </div>
</div>`;
}

export function header(page) {
  return html`<div class="site-top">
${draftBanner(page)}
<header class="bar">
  <div class="wrap">
    <a class="brand" href="home.html">
      <img class="brand__logo" src="assets/img/mark-TECOTEC-Group.svg" alt="TECOTEC Group" width="44" height="44">
      <span class="brand__divider" aria-hidden="true"></span>
      <span class="brand__text">
        <span class="brand__wordmark">tecotec.us</span>
        <span class="brand__member">thành viên của TECOTEC Group</span>
      </span>
    </a>
    <nav class="bar__nav" aria-label="Điều hướng chính">
      <ul class="bar__links caps">${links(page)}</ul>
      <button class="bar__toggle caps" type="button" aria-expanded="false" aria-controls="menu-panel">Mục lục</button>
    </nav>
  </div>
  <div class="bar__panel" id="menu-panel">
    <ul>${links(page)}</ul>
  </div>
</header>
</div>`;
}
