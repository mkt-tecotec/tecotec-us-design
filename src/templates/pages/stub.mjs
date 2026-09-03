import { html, join } from '../../lib/html.mjs';
import { pending, headInline } from '../partials/blocks.mjs';

export function render({ page }) {
  return html`<div class="wrap">
  <header class="stack">
    <h1 class="title title--2xl">${page.title}</h1>
    <p class="dek">${page.dek || ''}</p>
  </header>
  <div class="prose section entry">
    ${join((page.blocks || []).map((b, i) => html`<section aria-labelledby="b-${i}">
      <h2 class="head--inline" id="b-${i}">${b.head}</h2>
      ${pending({ tag: b.head, body: b.body, blocker: b.blocker, verify: !!page.verify })}
    </section>`))}
    ${page.asks && page.asks.length ? html`<p class="muted stack">Câu hỏi chặn trang này: ${page.asks.join(', ')}. Xem "01 - Định hướng dự án" trong KDB.</p>` : ''}
  </div>
</div>`;
}
