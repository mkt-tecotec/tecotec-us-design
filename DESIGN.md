---
name: tecotec.us
description: Hệ thống thiết kế cho website trưng bày tranh Việt Nam của Tecotec New York LLC. Giọng nhãn bảo tàng và vựng tập, giấy ivory, son và vàng quỳ trên nền cánh gián.
colors:
  paper: "#F7F3EC"
  paper-2: "#EEE9E1"
  paper-3: "#E3DDD4"
  ink: "#1A1512"
  ink-2: "#5A3A29"
  muted: "#655850"
  neutral: "#827871"
  rule: "#BBB7B0"
  rule-2: "#D1CDC7"
  accent: "#8B1E1E"
  accent-2: "#B8912F"
  surface-deep: "#5A3A29"
  focus: "#BE2323"
typography:
  display:
    fontFamily: Archivo
    fontStretch: 125%
    fontWeight: 700
    letterSpacing: -0.01em
    lineHeight: 1.05
  label:
    fontFamily: Archivo
    fontStretch: 62%
    fontWeight: 500
    letterSpacing: 0.08em
    textTransform: uppercase
  body:
    fontFamily: Public Sans
    fontWeight: 400
    lineHeight: 1.55
    fontSize: 1rem
  meta:
    fontFamily: Public Sans
    fontWeight: 400
    fontSize: 0.8rem
rounded:
  none: "0"
spacing:
  3xs: "0.125rem"
  2xs: "0.25rem"
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  2xl: "4rem"
  3xl: "6rem"
  4xl: "9rem"
components:
  link: "Chữ, mũi tên là chữ, gạch dưới 1px, hover 2px. Không nút."
  chip-status: "Chữ nhật, viền 1px mực, chỉ để đọc trạng thái."
  label-block: "Nhãn tác phẩm dạng dl: Số hiệu, Tên, Người sáng tác, Năm, Chất liệu, Kích thước."
  plate: "Ảnh giữ đúng tỷ lệ, nằm trên mat paper-2 có 16px lề. Không viền, không bóng."
  pending-block: "Khối chờ duyệt: paper-3, viền dashed, nhãn, một câu nói ở đây sẽ có gì và câu hỏi nào chặn."
---

# Design System: tecotec.us

Nguồn giá trị chính thức là `assets/css/tokens.css` (OKLCH). Hex trong frontmatter chỉ để đối chiếu. File này là luật cho mọi trang: trang khác nhau về hình dạng, không khác nhau về giọng. Hallmark chạy ở chế độ `design.md`-managed: mọi trang dùng chung hệ thống, lệch hệ thống là lỗi.

## 1. Visual Theme and Atmosphere

Ngôi sao dẫn đường: **vựng tập trên tường bảo tàng**. Dial: creativity 5, density 4, variance 5, motion 2.

Câu cảnh (ép theme sáng): Chủ tịch ngồi ở bàn làm việc lúc ba giờ chiều, mở demo trên màn hình 27 inch cạnh một cuốn vựng tập in trên giấy ivory, rồi xem lại trên điện thoại trong xe; ông duyệt bằng mắt, so với cuốn vựng tập chứ không so với một website. Tranh sơn mài vốn tối và bóng nên nền tối sẽ nuốt tranh.

Đặc điểm: giấy ivory nhuộm ấm; tiêu đề grotesk rộng (Archivo Expanded); số hiệu và nhãn bằng Archivo Condensed; một đường kẻ mạ vàng quỳ mở khối chính của mỗi trang; ảnh giữ đúng tỷ lệ trên mat; kẻ hai trọng lượng (1px bạc, 2px mực); footer colophon trên nâu cánh gián; không thẻ, không bóng, không bo góc, không italic ở tiêu đề.

Hai phản xạ bị từ chối: "nghệ thuật = nền kem + serif thanh" và "nếu không kem-serif thì Swiss đen trắng + mono + hairline" hoặc "gallery tối spotlight". Cảm giác Việt Nam đến từ tên màu, từ vựng chất liệu và cách ghi nhãn, không đến từ việc sơn trang bằng đỏ và vàng.

Hai "signature move" của taste-design bị bỏ cho dự án này vì trái sự tĩnh của một archive: ảnh chèn giữa chữ trong tiêu đề, và spring physics cùng micro-loop vĩnh viễn.

## 2. Color Palette and Roles

- **Giấy ivory** (#F7F3EC, `--color-paper`): nền trang, khóa từ KDB 02.
- **Mat** (#EEE9E1, `--color-paper-2`): nền sau ảnh, nền hover của hàng.
- **Giấy 3** (#E3DDD4, `--color-paper-3`): khối chờ duyệt, banner nháp.
- **Mực** (#1A1512, `--color-ink`): chữ, kẻ 2px, underline active.
- **Nâu cánh gián** (#5A3A29, `--color-ink-2` và `--color-surface-deep`): chữ phụ; nền footer.
- **Xám ấm** (#655850, `--color-muted`): caption, metadata. Không dùng `--color-neutral` (#827871) cho chữ thân.
- **Bạc quỳ** (#BBB7B0, `--color-rule`): hairline.
- **Đỏ son** (#8B1E1E, `--color-accent`): số hiệu tác phẩm, nhãn panel câu hỏi, focus ring (biến thể #BE2323).
- **Vàng quỳ** (#B8912F, `--color-accent-2`): chỉ đường kẻ mạ 2px.

Ba luật đặt tên:

- **Luật Son**: accent chiếm dưới 5% bất kỳ viewport nào; chỉ ở số hiệu, nhãn câu hỏi, focus. Không tô khối, không tô nút, không vào header.
- **Luật Vàng Quỳ**: vàng quỳ là một đường kẻ 2px, mỗi trang đúng một lần, mở khối chính. Không bao giờ là chữ (2.66:1 trên ivory).
- **Luật Cánh Gián**: mặt tối duy nhất là footer. Chữ trên đó là giấy ivory. Không đặt accent hay focus đỏ lên nền nâu (1.1:1); focus trên nâu dùng màu giấy.

Cam TECOTEC #f89521 không phải token: chỉ tồn tại trong SVG logo.

## 3. Typography Rules

- **Display**: Archivo, `font-stretch: 125%`, 700, tracking -0.01em, line-height 1.05. Dùng cho h1, tên tác phẩm, tên người sáng tác, wordmark.
- **Label**: Archivo, `font-stretch: 62%`, 500, viết hoa, tracking 0.08em, tabular-nums. Dùng cho số hiệu, nhãn trạng thái, đầu mục nhỏ, dòng đếm.
- **Body**: Public Sans 400, line-height 1.55, đo dòng 60ch. Nhấn trong đoạn bằng 600 hoặc italic của Public Sans.
- **Thang cỡ** 1.25: 0.64 / 0.8 / 1 / 1.25 / 1.5625 / 1.953 / 2.441 / 3.052 / 3.815rem; display `clamp(2.75rem, 5vw + 1rem, 5.25rem)`. Tối đa 5 cỡ một trang.
- **Luật Roman**: không italic ở tiêu đề, không bao giờ. Archivo không nạp italic.
- **Luật Hai Họ Chữ**: chỉ Archivo và Public Sans. Không mono, không họ thứ ba.
- Google Fonts: `family=Archivo:wdth,wght@62..125,100..900&family=Public+Sans:ital,wght@0,300..800;1,300..800&display=swap`; cả hai có subset tiếng Việt.

## 4. Elevation and Depth

Phẳng. Không bóng. Chiều sâu đến từ trọng lượng kẻ (1px bạc quỳ, 2px mực, 2px vàng quỳ) và bậc giấy (paper, paper-2, paper-3).

**Luật Mat**: ảnh nằm trên `--color-paper-2` với 16px lề (`.plate__box`), giữ đúng tỷ lệ theo `tw_dim_w / tw_dim_h`, `object-fit: contain`. Không viền, không bóng, không bo góc, không crop vuông. Đáy lưới so le là đúng.

## 5. Component Stylings

- **Link (C3)**: chữ + mũi tên là chữ (→), gạch dưới 1px, hover 2px, active màu nâu, focus ring 2px hiện tức thì. Không nút trên site (không có gì để gửi).
- **Chip trạng thái (C1)**: chữ nhật, viền 1px mực; `--dashed` cho giữ chỗ; `--muted` cho nhãn phụ. Chỉ để đọc. Không dùng vàng quỳ cho chip (Luật Vàng Quỳ).
- **Nhãn tác phẩm** (`dl.spec`): hai cột 9rem / 1fr, kẻ hairline giữa các hàng; key màu xám ấm; số hiệu Condensed tabular màu son. Trên trang tác phẩm nhãn là khối chính (kẻ mạ) và sticky dưới bar.
- **Plate / thẻ tác phẩm** (`.work`): plate + nhãn: số hiệu, tên (Expanded 700), người sáng tác (600, nâu), dòng "năm · chất liệu · h × w cm". Hover: mat paper-2 sang paper-3. Không zoom, không bóng.
- **Hàng danh mục** (`.row`): tên Expanded, năm Condensed tabular, vai trò xám, số tác phẩm, mũi tên. Hover nền paper-2. Hàng giữ chỗ không link, `aria-disabled`.
- **Khối chờ duyệt** (`.pending`): paper-3, viền dashed, nhãn viết hoa, một câu nói ở đây sẽ có gì, một dòng câu hỏi chặn. Không lorem. Có `data-verify` khi liên quan pháp lý.
- **Panel câu hỏi** (`.ask`): kẻ 2px mực, nhãn "CÂU HỎI CHO CHỦ TỊCH" màu son, câu hỏi, link "Xem bản A →". Nằm ngay dưới khối được thêm.
- **Nav N12**: banner nháp (paper-3, chữ mực, không nút đóng, thu lên khi cuộn xuống) + bar 72px sticky: logo TECOTEC, kẻ dọc, wordmark "tecotec.us" và dòng "thành viên của TECOTEC Group"; bốn link Condensed viết hoa; active gạch dưới 2px mực; dưới 60rem là nút "Mục lục" 44px có `aria-expanded`.
- **Footer Ft4**: colophon ba đoạn trên nâu cánh gián, chữ giấy, không cột, không icon, không logo.
- Trạng thái: mọi phần tử tương tác có default, hover, focus-visible, active; phần tử vô hiệu dùng `aria-disabled` và màu xám.

## 6. Layout Principles

- Container 80rem, gutter `clamp(1rem, 4vw, 3rem)`, đo dòng 60ch.
- Mỗi loại trang một macrostructure: Split Studio (trang chủ, dạng trang đôi vựng tập 5/7), Index-First (bộ sưu tập, người sáng tác, hub), Catalogue (trang loại hình, trang người sáng tác), Photographic (trang tác phẩm), Long Document (trang khung).
- Đầu mục S2 treo, không eyebrow, không hai cột tag-trái tiêu-đề-phải. Đầu trang người sáng tác xếp dọc một cột.
- Grid có ảnh luôn `minmax(0, 1fr)`; `overflow-x: clip` trên html và body; mọi img có width và height.
- Dưới 60rem mọi spread xếp dọc, chữ trước ảnh; dưới 40rem lưới hai cột, dưới 25rem một cột.

## 7. Motion and Interaction

Hai primitive, không hơn: (1) banner nháp thu lên bằng transform 320ms khi cuộn xuống, hiện lại khi cuộn lên, luôn hiện khi ở đầu trang; (2) đổi nền mat hoặc hàng và độ dày gạch dưới khi hover, 220ms ease-out, chỉ với con trỏ. Không scroll-reveal, không zoom ảnh, không counter, không bounce. Focus ring hiện tức thì. `prefers-reduced-motion`: banner đứng yên, transition 0ms.

## 8. Do's and Don'ts

Do: đếm số từ dữ liệu; nói rõ chỗ chưa duyệt và câu hỏi nào chặn; ghi "Ảnh minh họa" ở mọi chỗ có ảnh; viết tiếng Việt có dấu, động từ hơn tính từ.

Don't: em dash; chú thích tiếng Anh; lorem; số liệu, địa chỉ, ngày tháng bịa; tuyên bố thẩm định; ảnh tác phẩm thật; serif; italic ở tiêu đề; Inter, Roboto, Be Vietnam Pro; họ chữ thứ ba; mono; #000 và #fff; xám không sắc; gradient; glass; bóng; glow; accent trên 5%; accent trên nền nâu; vàng quỳ làm chữ; cam TECOTEC làm token; hero căn giữa hay cao 100vh; eyebrow; tag-trái tiêu-đề-phải; đánh số section; lưới ba thẻ tính năng đều nhau có icon (lưới tác phẩm trên mat không thuộc cấm này, xem Luật Mat); icon tile; card lồng card; viền side-stripe; bo góc; pill; hover zoom; `transition: all`; bounce hay spring; scroll reveal; loop vĩnh viễn; ảnh chèn trong tiêu đề; cursor effect; modal; thư viện icon; emoji; link hai dòng; `1fr` trần trên grid ảnh; `100vw`; `overflow-x: hidden`; nav N1a; footer Ft3; masthead báo; social row; form nhận tin; giá; giỏ hàng.
