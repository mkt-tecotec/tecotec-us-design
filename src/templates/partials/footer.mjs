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
    <p class="colophon__links">${join(LINKS.map(([l, h]) => html`<a href="${h}">${l}</a>`))}</p>
    <p>Bản nháp demo, tháng 9 năm 2026. Ảnh minh họa tạm từ <a href="https://www.pexels.com/" rel="noopener">Pexels</a>, không phải ảnh tác phẩm. Chữ: Archivo và Public Sans. © 2026 Tecotec New York LLC.</p>
  </div>
</footer>`;
}
