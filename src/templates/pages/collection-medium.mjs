import { html, join } from '../../lib/html.mjs';
import { worksGrid, head } from '../partials/blocks.mjs';

export function render({ page, data }) {
  const m = data.mediumBySlug[page.sample];
  const works = data.worksByMedium[m.slug] || [];
  return html`<div class="wrap">
  <header class="entry">
    <h1 class="title title--3xl">${m.name}</h1>
    <p class="count caps">${works.length} tác phẩm</p>
    <div class="prose stack">
      ${join(m.description.map((p) => html`<p>${p}</p>`))}
    </div>
  </header>
  <section class="section" aria-label="Tác phẩm ${m.name}">
    ${worksGrid(works, data, 4, 2)}
  </section>
</div>`;
}
