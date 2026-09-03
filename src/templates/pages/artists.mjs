import { html, join } from '../../lib/html.mjs';
import { artistRow, anonymousRow, ask } from '../partials/blocks.mjs';

export function render({ page, data }) {
  const isGrouped = page.variant === 'grouped';
  const list = data.listedArtists;

  if (!isGrouped) {
    return html`<div class="wrap">
  <header class="stack">
    <h1 class="title title--2xl">Người sáng tác</h1>
    <p class="dek">Danh sách người có tác phẩm trong bộ sưu tập, xếp theo tên. Người đang chờ duyệt hiện mờ, có nhãn, chưa có trang riêng; người ở trạng thái nháp không hiện.</p>
  </header>
  <div class="section">
    <ul class="rows entry">
      ${join(list.map((a) => artistRow(a, data)))}
      ${anonymousRow(data)}
    </ul>
  </div>
</div>`;
  }

  const groups = new Map();
  for (const a of list) {
    const key = a.tw_group || (a.birth_year ? `Sinh thập niên ${Math.floor(a.birth_year / 10) * 10}` : 'Không rõ năm sinh');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(a);
  }
  for (const list of groups.values()) list.sort((x, y) => (x.birth_year || 9999) - (y.birth_year || 9999) || x.name.localeCompare(y.name, 'vi'));
  const keys = [...groups.keys()].sort();

  return html`<div class="wrap">
  <header class="stack">
    <h1 class="title title--2xl">Người sáng tác</h1>
    <p class="dek">Danh sách chia nhóm theo thập niên sinh. Tên nhóm lấy từ dữ liệu, không đặt tên nhóm nếu chưa có quyết định.</p>
  </header>
  <div class="section entry stack">
    ${join(keys.map((k, i) => html`<section aria-labelledby="g-${i}">
      <h2 class="head--inline" id="g-${i}">${k}</h2>
      <ul class="rows">${join(groups.get(k).map((a) => artistRow(a, data)))}</ul>
    </section>`))}
    <section aria-labelledby="g-anon">
      <h2 class="head--inline" id="g-anon">Chưa xác định tác giả</h2>
      <ul class="rows">${anonymousRow(data)}</ul>
    </section>
  </div>
  ${ask({ question: 'Danh sách người sáng tác nên phẳng theo tên, hay chia nhóm như bản này? Nếu chia nhóm thì theo tiêu chí nào và ai định nghĩa?', back: 'artists.html', codes: page.asks })}
</div>`;
}
