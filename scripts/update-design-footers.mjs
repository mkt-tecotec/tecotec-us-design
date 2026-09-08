import fs from 'node:fs';
import path from 'node:path';

const newFooter = `<footer class="colophon">
  <div class="colophon__inner wrap">
    <div class="colophon__brand">
      <a href="home.html" class="colophon__logo-link">
        <img class="colophon__logo" src="assets/img/mark-TECOTEC-Group.svg" alt="TECOTEC Group" width="60" height="60">
      </a>
      <h2 class="colophon__brand-name">TECOTEC NEW YORK LLC</h2>
      <div class="colophon__brand-sub caps">THÀNH VIÊN CỦA TECOTEC GROUP</div>
    </div>

    <div class="colophon__main-grid">
      <div class="colophon__sec">
        <h3 class="colophon__sec-title caps">PHÒNG TRƯNG BÀY</h3>
        <div class="colophon__sub-grid">
          <div class="colophon__col">
            <h4 class="colophon__loc-name">Hà Nội</h4>
            <p class="colophon__text">Đang cập nhật thông tin</p>
          </div>
          <div class="colophon__col">
            <h4 class="colophon__loc-name">New York</h4>
            <p class="colophon__text">Đang cập nhật thông tin</p>
          </div>
        </div>
      </div>

      <div class="colophon__sec colophon__sec--contact">
        <h3 class="colophon__sec-title caps">LIÊN HỆ</h3>
        <div class="colophon__contact-body">
          <p class="colophon__text">Đang cập nhật thông tin</p>
          <div class="colophon__socials">
            <a href="#" class="colophon__social-icon" aria-label="Facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" class="colophon__social-icon" aria-label="Instagram">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" class="colophon__social-icon" aria-label="WhatsApp">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
            <a href="#" class="colophon__social-icon" aria-label="Zalo">
              <span class="colophon__zalo-text">Zalo</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="colophon__nav-bar">
      <nav class="colophon__links caps" aria-label="Điều hướng chân trang">
        <a href="collection.html">Bộ sưu tập</a>
        <a href="artists.html">Người sáng tác</a>
        <a href="art-notes.html">Ghi chép</a>
        <a href="about.html">Giới thiệu</a>
        <a href="contact.html">Liên hệ</a>
        <a href="privacy-policy.html">Quyền riêng tư</a>
        <a href="terms-of-use.html">Điều khoản</a>
        <a href="accessibility.html">Tiếp cận</a>
        <a href="copyright-image-rights.html">Bản quyền ảnh</a>
      </nav>
    </div>

    <div class="colophon__bottom caps">
      <span class="colophon__copy">© 2026 TECOTEC NEW YORK LLC</span>
      <span class="colophon__rights">BẢN QUYỀN ĐƯỢC BẢO LƯU</span>
    </div>
  </div>
</footer>`;

const designDir = path.resolve('design');
const files = fs.readdirSync(designDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;
for (const file of files) {
  const filePath = path.join(designDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('<footer class="colophon">')) {
    content = content.replace(/<footer class="colophon">[\s\S]*?<\/footer>/, newFooter);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  }
}
console.log(`Đã cập nhật footer mới cho ${updatedCount} file trong thư mục design/.`);
