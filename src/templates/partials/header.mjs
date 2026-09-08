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

export function header(page) {
  return html`<div class="site-top">
<header class="bar">
  <div class="wrap">
    <a class="brand" href="home.html">
      <img class="brand__logo" src="./assets/img/mark-TECOTEC-Group.svg" alt="TECOTEC Group" width="44" height="44">
      <span class="brand__divider" aria-hidden="true"></span>
      <span class="brand__text">
        <span class="brand__wordmark">tecotec.us</span>
        <span class="brand__member">thành viên của TECOTEC Group</span>
      </span>
    </a>
    <nav class="bar__nav" aria-label="Điều hướng chính">
      <ul class="bar__links caps">${links(page)}</ul>
      <button class="bar__toggle caps" type="button" aria-expanded="false" aria-controls="menu-panel">Mục lục</button>
      <div class="bar__panel" id="menu-panel">
        <ul>${links(page)}</ul>
      </div>
    </nav>
  </div>
</header>
</div>`;
}
