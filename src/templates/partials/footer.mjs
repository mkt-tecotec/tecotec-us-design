import { html, join } from '../../lib/html.mjs';

const LINKS = [
  ['Bộ sưu tập', 'collection.html'],
  ['Người sáng tác', 'artists.html'],
  ['Ghi chép', 'art-notes.html'],
  ['Giới thiệu', 'about.html'],
  ['Liên hệ', 'contact.html'],
  ['Quyền riêng tư', 'privacy-policy.html'],
  ['Điều khoản', 'terms-of-use.html'],
  ['Tiếp cận', 'accessibility.html'],
  ['Bản quyền ảnh', 'copyright-image-rights.html']
];

export function footer() {
  return html`<footer class="colophon">
  <div class="wrap">
    <p><span class="brand__wordmark">tecotec.us</span> là website trưng bày tranh Việt Nam của Tecotec New York LLC, thành viên của TECOTEC Group. Trưng bày để xem, không bán.</p>
    <p class="colophon__links">${join(LINKS.map(([l, h], i) => html`<span class="colophon__item"><a href="${h}">${l}</a>${i < LINKS.length - 1 ? html`<span aria-hidden="true"> · </span>` : ''}</span>`), ' ')}</p>
    <p>Bản demo, tháng 9 năm 2026. Tên người sáng tác, tên tác phẩm, năm và số đo là dữ liệu mẫu. © 2026 Tecotec New York LLC.</p>
  </div>
</footer>`;
}
