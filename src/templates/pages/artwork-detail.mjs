import { html, join, img } from '../../lib/html.mjs';
import { plate, label, worksGrid, pending, ask, head, artworkHref, artistHref } from '../partials/blocks.mjs';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export function render({ page, data, work }) {
  const w = work;
  const set = data.setOf(w);
  const creator = data.creatorOf(w);
  const ownership = page.variant === 'ownership';
  const ar = `${w.tw_dim_w} / ${w.tw_dim_h}`;
  const details = w.images.slice(1);

  const mainPlate = set
    ? html`<div class="pieces" role="group" aria-label="${w.tw_part_of_set}">
        ${join(set.map((piece, i) => html`<div class="plate">
          <a href="${artworkHref(piece)}" aria-label="${piece.title}"><div class="plate__box" style="--ar: ${piece.tw_dim_w} / ${piece.tw_dim_h}">${plateImg(data, piece, i === 0)}</div></a>
          <p class="pieces__no num">${ROMAN[i] || i + 1}${piece.slug === w.slug ? ' · tấm này' : ''}</p>
        </div>`))}
      </div>
      <p class="plate__cap">Ảnh minh họa tạm (Pexels), không phải ảnh tác phẩm. Bộ ${set.length} tấm, đang xem tấm ${w.tw_set_position}.</p>
      <span class="chip chip--muted caps plate__tag">Ảnh minh họa</span>`
    : plate({ data, slot: w.images[0].slot, ar, priority: true, sizes: '(max-width: 60rem) 100vw, 66vw' });

  const related = creator
    ? (data.worksByArtist[creator.slug] || []).filter((x) => x.slug !== w.slug).slice(0, 3)
    : data.anonymousWorks.filter((x) => x.slug !== w.slug).slice(0, 3);

  return html`<div class="wrap">

  <section class="spread spread--wide-text" aria-label="Tác phẩm ${w.title}">
    <div class="spread__text">
      ${mainPlate}
    </div>
    <div class="spread__side">
      <div class="tombstone">
        ${label(w, data, { ownership })}
        <p class="label__note">Ảnh minh họa, không phải tác phẩm thật. Số đo lấy từ dữ liệu mẫu.</p>
        ${ownership ? ask({ question: 'Có nêu tình trạng sở hữu trên trang tác phẩm không? Ba lựa chọn: thuộc bộ sưu tập, ký gửi, hoặc không nêu.', back: 'artworks-detail.html', codes: page.asks }) : ''}
      </div>
    </div>
  </section>

  ${details.length ? html`<section class="section" aria-labelledby="h-details">
    ${head('Chi tiết')}
    <div class="strip">
      ${join(details.map((d) => plate({ data, slot: d.slot, ar: '4 / 3', caption: d.caption, sizes: '(max-width: 60rem) 50vw, 25vw', tag: false })))}
    </div>
    <p class="muted stack">Ảnh chi tiết là minh họa tạm. Khi có ảnh thật, mỗi tác phẩm cần ảnh chuẩn màu và ảnh ánh sáng xiên.</p>
  </section>` : ''}

  <section class="section" aria-labelledby="h-note">
    ${head('Ghi chú')}
    ${pending({ tag: 'Chú giải tác phẩm', body: 'Chú giải 80 đến 150 từ về đề tài, kỹ thuật và bối cảnh sáng tác. Không tự viết trong bản demo.', blocker: 'Chờ người có chuyên môn mỹ thuật (M7).' })}
  </section>

  ${related.length ? html`<section class="section" aria-labelledby="h-related">
    ${head(creator ? 'Cùng người sáng tác' : 'Cùng chưa xác định tác giả')}
    ${worksGrid(related, data, 3)}
    <p class="stack"><a class="link" href="${artistHref(creator)}">${creator ? `Tất cả tác phẩm của ${creator.name} →` : 'Tất cả tác phẩm khuyết danh →'}</a></p>
  </section>` : ''}

  <p class="stack"><a class="link" href="collection-${w.medium}.html">Về trang ${data.mediumBySlug[w.medium].name} →</a></p>
</div>`;
}

function plateImg(data, piece, priority) {
  return img(data.images, data.slots, piece.images[0].slot, { priority, sizes: '(max-width: 40rem) 50vw, (max-width: 60rem) 25vw, 16vw' });
}
