import { html, join, years } from '../../lib/html.mjs';
import { plate, worksGrid, pending, ask, head, artistHref } from '../partials/blocks.mjs';

export function render({ page, data }) {
  const featured = data.worksSorted.filter((w) => w.featured).slice(0, 4);
  const lacquer = data.mediumBySlug['lacquer-paintings'];
  const nLacquer = (data.worksByMedium['lacquer-paintings'] || []).length;
  const artists = data.approvedArtists;
  const isAdvisory = page.variant === 'advisory';

  return html`<div class="wrap">

  <section class="spread spread--hero" aria-labelledby="h-hero">
    <div class="spread__text entry">
      <h1 class="title" id="h-hero">Bộ sưu tập tranh Việt Nam</h1>
      <p class="lede">Trưng bày để xem, không bán. Giai đoạn đầu giới thiệu sơn mài.</p>
      <p class="stack"><a class="link" href="collection-lacquer-paintings.html">Xem tranh sơn mài →</a></p>
    </div>
    <div class="spread__side">
      ${plate({ data, slot: 'hero-home', ar: '4 / 5', priority: true, sizes: '(max-width: 60rem) 100vw, 58vw' })}
    </div>
  </section>

  <section class="spread" aria-labelledby="h-mediums">
    <div class="spread__text">
      ${head('Ba loại hình', 2, 'h-mediums')}
      <p class="prose">Bộ sưu tập xếp theo loại hình, rồi người sáng tác, rồi tác phẩm. Sơn dầu và lụa đã có chỗ trong cấu trúc, chưa có tác phẩm trưng bày.</p>
    </div>
    <div class="spread__side">
      <dl class="spec">
        ${join(data.mediums.filter((m) => !m.variant_only).map((m) => {
          const n = (data.worksByMedium[m.slug] || []).length;
          return html`<div><dt><span class="row__name">${m.name}</span></dt><dd>${m.public ? html`<a class="link" href="collection-${m.slug}.html">${n} tác phẩm, đang trưng bày →</a>` : html`<span class="muted">đang chuẩn bị</span>`}</dd></div>`;
        }))}
      </dl>
    </div>
  </section>

  <section class="spread spread--flip" aria-labelledby="h-featured">
    <div class="spread__text">
      ${head('Tác phẩm được chọn', 2, 'h-featured')}
      <p class="prose">Bốn trong ${nLacquer} tác phẩm ${lacquer.name.toLowerCase()} hiện có. Mỗi trang tác phẩm ghi số hiệu, người sáng tác, năm, chất liệu và kích thước.</p>
      <p class="stack"><a class="link" href="collection-lacquer-paintings.html">Toàn bộ sơn mài →</a></p>
    </div>
    <div class="spread__side">
      ${worksGrid(featured, data, 2)}
    </div>
  </section>

  <section class="spread" aria-labelledby="h-artists">
    <div class="spread__text">
      ${head('Người sáng tác', 2, 'h-artists')}
      <p class="prose">Mỗi người sáng tác có trang riêng: tên, năm sinh và năm mất, vai trò, các tác phẩm trong bộ sưu tập. Người chưa được duyệt không xuất hiện.</p>
      <p class="stack"><a class="link" href="artists.html">Danh sách người sáng tác →</a></p>
    </div>
    <div class="spread__side">
      <ul class="rows">
        ${join(artists.map((a) => html`<li class="row"><a class="row__inner row__inner--compact" href="${artistHref(a)}"><span class="row__name">${a.name}</span><span class="row__years num">${years(a)}</span><span class="row__count">${(data.worksByArtist[a.slug] || []).length} tác phẩm</span><span class="row__arrow" aria-hidden="true">→</span></a></li>`))}
      </ul>
    </div>
  </section>

  <section class="spread" aria-labelledby="h-about">
    <div class="spread__text">
      ${head('Về Tecotec New York LLC', 2, 'h-about')}
      <div class="prose">
        <p>Tecotec New York LLC là pháp nhân tại Mỹ, thành viên của TECOTEC Group. Website này giới thiệu bộ sưu tập tranh Việt Nam của pháp nhân, bắt đầu từ sơn mài.</p>
        <p>Phần định vị và lý do sưu tập đang chờ Chủ tịch duyệt, xem trang Giới thiệu.</p>
      </div>
      <p class="stack"><a class="link" href="about.html">Giới thiệu →</a></p>
    </div>
    <div class="spread__side">
      ${plate({ data, slot: 'home-gallery', ar: '4 / 3', sizes: '(max-width: 60rem) 100vw, 58vw' })}
    </div>
  </section>

  ${isAdvisory ? html`<section class="section" aria-labelledby="h-advisory">
    <div class="prose">
      ${head('Dịch vụ cố vấn', 2, 'h-advisory')}
      ${pending({ tag: 'Dịch vụ cố vấn', body: 'Chỗ này dành cho phần giới thiệu mảng tư vấn của pháp nhân, nếu Chủ tịch quyết định đưa lên trang chủ. Bản demo cố ý để trống, không viết câu chữ nào về năng lực chuyên môn.', blocker: 'Chờ Chủ tịch (M3) và luật sư (M11).', verify: true })}
      ${ask({ question: 'Trang chủ có nên nhắc tới dịch vụ cố vấn ngay từ giai đoạn 1, hay chờ luật sư xác nhận M10 đến M13 rồi mới đưa lên?', back: 'home.html', codes: page.asks })}
    </div>
  </section>` : ''}

</div>`;
}
