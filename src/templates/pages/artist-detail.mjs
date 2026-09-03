import { html, years } from '../../lib/html.mjs';
import { worksGrid, pending, head } from '../partials/blocks.mjs';

export function render({ page, data, artist }) {
  if (page.variant === 'anonymous' || !artist) {
    const works = data.anonymousWorks;
    return html`<div class="wrap">
  <header class="entry">
    <h1 class="title title--s">Khuyết danh</h1>
    <p class="count caps">Tác giả chưa xác định</p>
    <p class="count caps">${works.length} tác phẩm trong bộ sưu tập</p>
  </header>
  <section class="section" aria-labelledby="h-bio">
    ${head('Tiểu sử', 2, 'h-bio')}
    ${pending({ tag: 'Tiểu sử', body: 'Không có tiểu sử. Các tác phẩm dưới đây chưa xác định được tác giả; khi có thông tin nguồn gốc, tác phẩm sẽ được chuyển sang trang người sáng tác tương ứng.', blocker: 'Chờ nguồn gốc (M4, M10).' })}
  </section>
  <section class="section" aria-labelledby="h-works">
    ${head('Tác phẩm', 2, 'h-works')}
    ${worksGrid(works, data, Math.min(3, Math.max(2, works.length)))}
  </section>
</div>`;
  }

  const works = data.worksByArtist[artist.slug] || [];
  return html`<div class="wrap">
  <header class="entry">
    <h1 class="title title--s">${artist.name}</h1>
    <p class="count num">${years(artist)} · ${artist.role}</p>
    <p class="count caps">${works.length} tác phẩm trong bộ sưu tập</p>
  </header>
  <section class="section" aria-labelledby="h-bio">
    ${head('Tiểu sử', 2, 'h-bio')}
    ${pending({ tag: 'Tiểu sử', body: 'Tiểu sử 100 đến 200 từ: nơi học, giai đoạn sáng tác, chất liệu quen dùng. Không tự viết trong bản demo.', blocker: 'Chờ người có chuyên môn mỹ thuật (M7).' })}
  </section>
  <section class="section" aria-labelledby="h-works">
    ${head('Tác phẩm', 2, 'h-works')}
    ${works.length ? worksGrid(works, data, Math.min(3, Math.max(2, works.length))) : html`<p class="muted">Chưa có tác phẩm nào được nhập.</p>`}
  </section>
</div>`;
}
