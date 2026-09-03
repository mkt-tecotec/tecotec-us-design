# tecotec-us-design

Demo giao diện tĩnh của website tecotec.us (Tecotec New York LLC, thành viên của TECOTEC Group). Bản nháp nội bộ để Chủ tịch duyệt bảng màu, kiểu chữ và bốn câu hỏi chặn đường M1, M3, M4, M5. Không phải website chính thức, sẽ bỏ khi dựng thật.

Xem trực tiếp: https://mkt-tecotec.github.io/tecotec-us-design/ (mục lục ở `index.html`).

## Quy tắc cứng

- Ảnh chỉ là ảnh minh họa tạm từ Pexels, không có ảnh tác phẩm thật. Mọi ảnh đều ghi rõ điều đó.
- Không câu chữ về thẩm định hay kiểm định. Chỗ nào liên quan là khối chờ duyệt có nhãn `[verify]`.
- Không giá, không giỏ hàng, không nút mua. Trưng bày để xem, không bán.
- Nội dung chỉ tiếng Việt. Không em dash.
- Tên người sáng tác và tên tác phẩm trong dữ liệu mẫu là hư cấu.
- Mọi trang có meta `noindex, nofollow, noarchive, nosnippet, noimageindex`. `robots.txt` ở gốc chặn toàn bộ, nhưng trên project Pages nó nằm dưới đường dẫn con nên crawler không đọc; meta robots mới là kiểm soát thật.

## Cấu trúc

```
index.html                 mục lục demo, cây trang, địa chỉ dự kiến, trạng thái
*.html                     trang phẳng sinh từ build, commit để GitHub Pages phục vụ
header/ footer/            mảnh header và footer, sinh từ cùng partial (đối chiếu với tumiki-design)
assets/css/tokens.css      nguồn duy nhất của màu, chữ, khoảng cách
assets/css/style.css       toàn bộ style, chỉ dùng var(--*)
assets/js/main.js          banner nháp thu lên khi cuộn, nút Mục lục trên màn hình hẹp
assets/img/                logo TECOTEC Group (vendor) và mark tách riêng
data/                      dữ liệu mẫu theo tên trường WooCommerce/ACF, xem data/FIELDS.md
src/                       thư viện và template
scripts/                   build, check, contrast, pexels-fetch
PRODUCT.md DESIGN.md       context cho impeccable và hallmark
verify/                    báo cáo kiểm chứng
```

## Chạy

```bash
node scripts/build.mjs          # sinh HTML từ data/ và src/
node scripts/check.mjs          # cổng kiểm tra A đến H, exit 1 nếu lỗi
node scripts/contrast.mjs       # tương phản WCAG từ token
python3 -m http.server 8080     # xem tại http://127.0.0.1:8080/
```

Không sửa HTML ở gốc bằng tay: build sẽ ghi đè. Sửa `data/*.json` hoặc `src/` rồi build lại.

## Ảnh

Ảnh minh họa lấy qua Pexels API, kết quả lưu ở `data/images.json` để build không cần khóa. Khi cần thêm slot, sửa `data/image-slots.json` rồi chạy:

```bash
PEXELS_API_KEY=... node scripts/pexels-fetch.mjs
```

Khóa chỉ đọc từ biến môi trường, không ghi vào repo.

## Brain

Nguồn trạng thái chính thức của dự án là Outline KDB: https://doc.tecotec.top/doc/tecotecus-tecotec-new-york-llc-vaoqYhsBJf. Kế hoạch của bản demo: "2026-09-03 - Demo HTML tĩnh trên GitHub Pages (tecotec-us-design)" trong Implementation Plans. Task và hạn ở TECOTEC Hub, không ở đây.
