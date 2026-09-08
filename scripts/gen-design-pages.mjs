// Tạo hàng loạt các trang chi tiết tác phẩm / người sáng tác còn thiếu trong design/.
// Script dùng một lần, không phải một phần của hệ thống build chính (root level).
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("design");

const head = (title, desc) => `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Inter:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">`;

const headerNav = (current) => {
  const tabs = [
    ["home.html", "01 · TỔNG QUAN"],
    ["collection.html", "02 · BỘ SƯU TẬP"],
    ["son-mai.html", "03 · SƠN MÀI"],
    ["artists.html", "04 · NGƯỜI SÁNG TÁC"],
    ["art-notes.html", "05 · GHI CHÉP"],
    ["about.html", "06 · GIỚI THIỆU"],
  ];
  const links = tabs
    .map(([href, label]) => `    <a href="${href}"${href === current ? ' aria-current="page"' : ""}>${label}</a>`)
    .join("\n");
  return `<div class="site-top">
<header class="bar">
  <div class="wrap">
    <a class="brand" href="home.html">
      <img class="brand__logo" src="assets/img/mark-TECOTEC-Group.svg" alt="TECOTEC Group" width="44" height="44">
      <span class="brand__divider" aria-hidden="true"></span>
      <span class="brand__text"><span class="brand__wordmark">tecotec.us</span><span class="brand__member">thành viên của TECOTEC Group</span></span>
    </a>
    <nav class="bar__nav" aria-label="Điều hướng chính">
      <ul class="bar__links caps"><li><a href="collection.html">Bộ sưu tập</a></li><li><a href="artists.html">Người sáng tác</a></li><li><a href="about.html">Giới thiệu</a></li><li><a href="contact.html">Liên hệ</a></li></ul>
      <button class="bar__toggle caps" type="button" aria-expanded="false" aria-controls="menu-panel">Mục lục</button>
      <div class="bar__panel" id="menu-panel"><ul><li><a href="collection.html">Bộ sưu tập</a></li><li><a href="artists.html">Người sáng tác</a></li><li><a href="about.html">Giới thiệu</a></li><li><a href="contact.html">Liên hệ</a></li></ul></div>
    </nav>
  </div>
</header>
</div>

<nav class="dossier-tabs" aria-label="Danh mục hồ sơ">
  <div class="wrap">
${links}
  </div>
</nav>`;
};

const footer = `<footer class="colophon">
  <div class="colophon__inner wrap">
    <div class="colophon__brand">
      <a href="home.html" class="colophon__logo-link">
        <img class="colophon__logo" src="assets/img/mark-TECOTEC-Group.svg" alt="TECOTEC Group" width="80" height="80">
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
</footer>

<script src="assets/js/menu.js"></script>
</body>
</html>
`;

const img = (pexelsId, w) =>
  `https://images.pexels.com/photos/${pexelsId}/pexels-photo-${pexelsId}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// ---------- Dữ liệu ảnh (từ data/images.json) ----------
const IMG = {
  "work-02": 35245080,
  "work-03": 9756576,
  "work-04": 37082336,
  "work-05": 18678966,
  "work-06": 29359590,
  "work-07": 14875930,
  "work-08": 27543569,
  "work-09": 38004013,
  "work-10": 34669353,
  "work-11": 20868515,
  "work-12": 36810327,
  "detail-raking": 9348502,
  "detail-gold": 2248589,
  "detail-eggshell": 29703512,
  "detail-pearl": 8802637,
  "detail-back": 131685,
};

// ---------- Trang chi tiết tác phẩm ----------
function artworkPage({ code, title, slug, artistSlug, artistName, year, material, size, ownership, images, verifyNote }) {
  const [main, ...rest] = images;
  const strip = rest
    .map((k) => `          <img src="${img(IMG[k], 400)}" alt="" data-placeholder="pexels-${IMG[k]}" loading="lazy">`)
    .join("\n");
  const creatorField = artistSlug
    ? `<div class="field"><dt>Người sáng tác</dt><dd><a class="link-arrow" href="nguoi-sang-tac-${artistSlug}.html">${artistName}</a></dd></div>`
    : `<div class="field"><dt>Người sáng tác</dt><dd>Chưa xác định</dd></div>`;

  return `${head(`${title} · ${code} · tecotec.us`, `Hồ sơ tác phẩm ${title}, số hiệu ${code}${artistName ? `, ${artistName}` : ""}, ${year}, ${material}.`)}
<style>
.detail-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-3); margin-top: var(--space-6); }
.detail-strip img { aspect-ratio: 1; object-fit: cover; border: 1px solid var(--manila-edge); }
@media (max-width: 600px) { .detail-strip { grid-template-columns: repeat(2, 1fr); } }
</style>
</head>
<body>
${headerNav("collection.html")}

<main>
  <section class="section" style="padding-bottom: var(--space-4);">
    <div class="wrap">
      <a class="link-arrow" href="collection.html">← Về bộ sưu tập</a>
    </div>
  </section>

  <section class="section" style="padding-top: 0;">
    <div class="wrap" style="display:grid; grid-template-columns: 1.1fr 1fr; gap: var(--space-8); align-items: start;">
      <figure class="plate" style="padding: var(--space-2);">
        <img src="${img(IMG[main] || IMG[images[0]], 1200)}" alt="" data-placeholder="pexels-${IMG[main] || IMG[images[0]]}" style="aspect-ratio: 4/3; object-fit: cover;">
        <div class="detail-strip">
${strip}
        </div>
      </figure>

      <div class="plate plate--tab" data-tab="HỒ SƠ TÁC PHẨM">
        <span class="stamp-no mono">${code}</span>
        <h1 style="margin-top: var(--space-4); font-size: var(--step2);">${title}</h1>
        <dl style="margin-top: var(--space-6);">
          ${creatorField}
          <div class="field"><dt>Năm</dt><dd>${year}</dd></div>
          <div class="field"><dt>Chất liệu</dt><dd>${material}</dd></div>
          <div class="field"><dt>Kích thước</dt><dd>${size}</dd></div>
          <div class="field"><dt>Tình trạng sở hữu</dt><dd>${ownership}</dd></div>
          <div class="field"><dt>Xác minh</dt><dd>${verifyNote}</dd></div>
        </dl>
        <p style="margin-top: var(--space-6); color: var(--ink-soft); font-size: var(--step-1);">Trưng bày để xem, không bán. Tên tác giả, tên tác phẩm, năm và số đo là dữ liệu mẫu cho bản demo.</p>
      </div>
    </div>
  </section>
</main>

${footer}`;
}

// ---------- Trang chi tiết người sáng tác ----------
function artistPage({ name, slug, years, statusLabel, statusRed, works, bio }) {
  const relatedGrid = works.length
    ? `
        <div class="mt-8">
          <h2 style="font-size: var(--step2);">Tác phẩm liên quan</h2>
          <div class="grid-index" style="grid-template-columns: repeat(2, 1fr); margin-top: var(--space-5);">
${works
  .map(
    (w) => `            <a class="card-work" href="tac-pham-${w.slug}.html">
              <div class="card-work__frame"><img src="${img(IMG[w.image] || w.image, 800)}" alt="" data-placeholder="pexels-${IMG[w.image] || w.image}" loading="lazy"></div>
              <div class="card-work__body"><span class="card-work__no mono">${w.code}</span><h3 class="card-work__title">${w.title}</h3><p class="card-work__meta">${w.year} · ${w.size}</p></div>
            </a>`
  )
  .join("\n")}
          </div>
        </div>`
    : "";

  const countLabel = works.length
    ? `${works.length} tác phẩm trong bộ sưu tập`
    : "Chưa có tác phẩm trong bộ sưu tập";

  return `${head(`${name} · tecotec.us`, `Hồ sơ người sáng tác ${name}, ${years}, tác giả sơn mài.`)}
</head>
<body>
${headerNav("artists.html")}

<main>
  <section class="section" style="padding-bottom: var(--space-4);">
    <div class="wrap">
      <a class="link-arrow" href="artists.html">← Về danh sách người sáng tác</a>
    </div>
  </section>

  <section class="section" style="padding-top: 0;">
    <div class="wrap" style="display:grid; grid-template-columns: 1fr 1.4fr; gap: var(--space-8);">
      <div>
        <div class="plate plate--tab" data-tab="HỒ SƠ NGƯỜI SÁNG TÁC">
          <span class="stamp-no mono${statusRed ? " stamp-no--red" : ""}">${years}</span>
          <h1 style="margin-top: var(--space-4);">${name}</h1>
          <dl style="margin-top: var(--space-6);">
            <div class="field"><dt>Vai trò</dt><dd>Họa sĩ</dd></div>
            <div class="field"><dt>Chất liệu chính</dt><dd>Sơn mài</dd></div>
            <div class="field"><dt>Tình trạng hồ sơ</dt><dd>${statusLabel}</dd></div>
            <div class="field"><dt>Số tác phẩm</dt><dd>${countLabel}</dd></div>
          </dl>
        </div>
      </div>
      <div class="flow">
${bio}
${relatedGrid}
      </div>
    </div>
  </section>
</main>

${footer}`;
}

// ================= DỮ LIỆU =================

const artworks = [
  {
    code: "SM-002", title: "Vườn chuối sau mưa", slug: "vuon-chuoi-sau-mua",
    artistSlug: "le-thi-mai-hanh", artistName: "Lê Thị Mai Hạnh",
    year: "khoảng 1990", material: "Sơn mài trên vóc", size: "90 × 60cm",
    ownership: "Thuộc bộ sưu tập", verifyNote: "[verify] đang chờ xác minh chi tiết",
    images: ["work-02", "detail-raking", "detail-pearl"],
  },
  {
    code: "SM-003", title: "Chợ phiên vùng cao", slug: "cho-phien-vung-cao",
    artistSlug: "pham-quang-dinh", artistName: "Phạm Quang Đĩnh",
    year: "1998", material: "Sơn mài trên vóc", size: "100 × 150cm",
    ownership: "Ký gửi trưng bày", verifyNote: "[verify] đang chờ xác minh chi tiết",
    images: ["work-03", "detail-raking", "detail-gold"],
  },
  {
    code: "SM-004", title: "Tứ bình: Xuân", slug: "tu-binh-xuan",
    artistSlug: "dang-van-suu", artistName: "Đặng Văn Sửu",
    year: "1979", material: "Sơn mài trên vóc", size: "80 × 40cm",
    ownership: "Thuộc bộ sưu tập", verifyNote: "Một phần của bộ tứ bình Xuân Hạ Thu Đông, vị trí 1/4",
    images: ["work-04", "detail-raking", "detail-pearl"],
  },
  {
    code: "SM-005", title: "Tứ bình: Hạ", slug: "tu-binh-ha",
    artistSlug: "dang-van-suu", artistName: "Đặng Văn Sửu",
    year: "1979", material: "Sơn mài trên vóc", size: "80 × 40cm",
    ownership: "Thuộc bộ sưu tập", verifyNote: "Một phần của bộ tứ bình Xuân Hạ Thu Đông, vị trí 2/4",
    images: ["work-05", "detail-raking"],
  },
  {
    code: "SM-006", title: "Tứ bình: Thu", slug: "tu-binh-thu",
    artistSlug: "dang-van-suu", artistName: "Đặng Văn Sửu",
    year: "1979", material: "Sơn mài trên vóc", size: "80 × 40cm",
    ownership: "Thuộc bộ sưu tập", verifyNote: "Một phần của bộ tứ bình Xuân Hạ Thu Đông, vị trí 3/4",
    images: ["work-06", "detail-gold"],
  },
  {
    code: "SM-007", title: "Tứ bình: Đông", slug: "tu-binh-dong",
    artistSlug: "dang-van-suu", artistName: "Đặng Văn Sửu",
    year: "1979", material: "Sơn mài trên vóc", size: "80 × 40cm",
    ownership: "Thuộc bộ sưu tập", verifyNote: "Một phần của bộ tứ bình Xuân Hạ Thu Đông, vị trí 4/4",
    images: ["work-07", "detail-eggshell"],
  },
  {
    code: "SM-008", title: "Thiếu nữ và hoa sen", slug: "thieu-nu-va-hoa-sen",
    artistSlug: "ngo-bich-thao", artistName: "Ngô Bích Thảo",
    year: "2004", material: "Sơn mài trên vóc", size: "120 × 80cm",
    ownership: "Thuộc bộ sưu tập", verifyNote: "[verify] đang chờ xác minh chi tiết",
    images: ["work-08", "detail-raking", "detail-pearl", "detail-gold"],
  },
  {
    code: "SM-009", title: "Phố cổ mùa đông", slug: "pho-co-mua-dong",
    artistSlug: null, artistName: null,
    year: "không rõ năm sáng tác", material: "Sơn mài trên vóc", size: "60 × 80cm",
    ownership: "[verify] đang rà soát nguồn gốc", verifyNote: "[verify] chưa xác định người sáng tác",
    images: ["work-09", "detail-raking"],
  },
  {
    code: "SM-010", title: "Đình làng", slug: "dinh-lang",
    artistSlug: null, artistName: null,
    year: "khoảng 1970", material: "Sơn mài trên vóc", size: "45 × 65cm",
    ownership: "[verify] đang rà soát nguồn gốc", verifyNote: "[verify] chưa xác định người sáng tác",
    images: ["work-10", "detail-back"],
  },
  {
    code: "SM-011", title: "Ao bèo", slug: "ao-beo",
    artistSlug: "hoang-kim-loan", artistName: "Hoàng Kim Loan",
    year: "2011", material: "Sơn mài trên vóc", size: "70 × 70cm",
    ownership: "Thuộc bộ sưu tập", verifyNote: "[verify] hồ sơ người sáng tác đang rà soát",
    images: ["work-11", "detail-raking"],
  },
  {
    code: "SM-012", title: "Ruộng bậc thang", slug: "ruong-bac-thang",
    artistSlug: "vu-minh-tue", artistName: "Vũ Minh Tuệ",
    year: "2016", material: "Sơn mài trên vóc", size: "90 × 180cm",
    ownership: "Thuộc bộ sưu tập", verifyNote: "[verify] đang chờ xác minh chi tiết",
    images: ["work-12", "detail-gold", "detail-raking"],
  },
];

const artists = [
  {
    name: "Lê Thị Mai Hạnh", slug: "le-thi-mai-hanh", years: "1931 – 2010",
    statusLabel: "Đã duyệt", statusRed: false,
    bio: `        <p>Lê Thị Mai Hạnh là tác giả sơn mài có tác phẩm trong bộ sưu tập. Thông tin tiểu sử đầy đủ đang được bổ sung; hồ sơ hiện chỉ ghi nhận năm sinh, năm mất và chất liệu sáng tác chính.</p>
        <p>Tác phẩm hiện có trong bộ sưu tập là <a class="link-arrow" href="tac-pham-vuon-chuoi-sau-mua.html">Vườn chuối sau mưa</a> (SM-002), thực hiện khoảng năm 1990.</p>`,
    works: [{ slug: "vuon-chuoi-sau-mua", code: "SM-002", title: "Vườn chuối sau mưa", year: "khoảng 1990", size: "90 × 60cm", image: "work-02" }],
  },
  {
    name: "Phạm Quang Đĩnh", slug: "pham-quang-dinh", years: "1946 – nay",
    statusLabel: "Đã duyệt", statusRed: false,
    bio: `        <p>Phạm Quang Đĩnh là tác giả sơn mài có tác phẩm trong bộ sưu tập. Thông tin tiểu sử đầy đủ đang được bổ sung; hồ sơ hiện chỉ ghi nhận năm sinh và chất liệu sáng tác chính.</p>
        <p>Tác phẩm hiện có trong bộ sưu tập là <a class="link-arrow" href="tac-pham-cho-phien-vung-cao.html">Chợ phiên vùng cao</a> (SM-003), thực hiện năm 1998, hiện đang ký gửi trưng bày.</p>`,
    works: [{ slug: "cho-phien-vung-cao", code: "SM-003", title: "Chợ phiên vùng cao", year: "1998", size: "100 × 150cm", image: "work-03" }],
  },
  {
    name: "Ngô Bích Thảo", slug: "ngo-bich-thao", years: "1958 – nay",
    statusLabel: "Đã duyệt", statusRed: false,
    bio: `        <p>Ngô Bích Thảo là tác giả sơn mài có tác phẩm trong bộ sưu tập. Thông tin tiểu sử đầy đủ đang được bổ sung; hồ sơ hiện chỉ ghi nhận năm sinh và chất liệu sáng tác chính.</p>
        <p>Tác phẩm hiện có trong bộ sưu tập là <a class="link-arrow" href="tac-pham-thieu-nu-va-hoa-sen.html">Thiếu nữ và hoa sen</a> (SM-008), thực hiện năm 2004.</p>`,
    works: [{ slug: "thieu-nu-va-hoa-sen", code: "SM-008", title: "Thiếu nữ và hoa sen", year: "2004", size: "120 × 80cm", image: "work-08" }],
  },
  {
    name: "Đặng Văn Sửu", slug: "dang-van-suu", years: "1937 – 2004",
    statusLabel: "Đã duyệt", statusRed: false,
    bio: `        <p>Đặng Văn Sửu là tác giả sơn mài có bốn tác phẩm trong bộ sưu tập, cùng thuộc một bộ tứ bình. Thông tin tiểu sử đầy đủ đang được bổ sung; hồ sơ hiện chỉ ghi nhận năm sinh, năm mất và chất liệu sáng tác chính.</p>
        <p>Bốn tác phẩm hiện có trong bộ sưu tập thuộc bộ <em>Tứ bình Xuân Hạ Thu Đông</em>, thực hiện năm 1979: <a class="link-arrow" href="tac-pham-tu-binh-xuan.html">Tứ bình: Xuân</a> (SM-004), <a class="link-arrow" href="tac-pham-tu-binh-ha.html">Tứ bình: Hạ</a> (SM-005), <a class="link-arrow" href="tac-pham-tu-binh-thu.html">Tứ bình: Thu</a> (SM-006) và <a class="link-arrow" href="tac-pham-tu-binh-dong.html">Tứ bình: Đông</a> (SM-007).</p>`,
    works: [
      { slug: "tu-binh-xuan", code: "SM-004", title: "Tứ bình: Xuân", year: "1979", size: "80 × 40cm", image: "work-04" },
      { slug: "tu-binh-ha", code: "SM-005", title: "Tứ bình: Hạ", year: "1979", size: "80 × 40cm", image: "work-05" },
      { slug: "tu-binh-thu", code: "SM-006", title: "Tứ bình: Thu", year: "1979", size: "80 × 40cm", image: "work-06" },
      { slug: "tu-binh-dong", code: "SM-007", title: "Tứ bình: Đông", year: "1979", size: "80 × 40cm", image: "work-07" },
    ],
  },
  {
    name: "Vũ Minh Tuệ", slug: "vu-minh-tue", years: "1969 – nay",
    statusLabel: "Đã duyệt", statusRed: false,
    bio: `        <p>Vũ Minh Tuệ là tác giả sơn mài có tác phẩm trong bộ sưu tập. Thông tin tiểu sử đầy đủ đang được bổ sung; hồ sơ hiện chỉ ghi nhận năm sinh và chất liệu sáng tác chính.</p>
        <p>Tác phẩm hiện có trong bộ sưu tập là <a class="link-arrow" href="tac-pham-ruong-bac-thang.html">Ruộng bậc thang</a> (SM-012), thực hiện năm 2016.</p>`,
    works: [{ slug: "ruong-bac-thang", code: "SM-012", title: "Ruộng bậc thang", year: "2016", size: "90 × 180cm", image: "work-12" }],
  },
  {
    name: "Hoàng Kim Loan", slug: "hoang-kim-loan", years: "1952 – nay",
    statusLabel: "Đang rà soát", statusRed: true,
    bio: `        <p>Hoàng Kim Loan là tác giả sơn mài có tác phẩm trong bộ sưu tập. Hồ sơ hiện đang trong quá trình rà soát, một số thông tin tiểu sử chưa được xác minh đầy đủ.</p>
        <p>Tác phẩm hiện có trong bộ sưu tập là <a class="link-arrow" href="tac-pham-ao-beo.html">Ao bèo</a> (SM-011), thực hiện năm 2011.</p>
        <p>[verify] Hồ sơ này đang chờ xác minh thêm, nội dung có thể thay đổi.</p>`,
    works: [{ slug: "ao-beo", code: "SM-011", title: "Ao bèo", year: "2011", size: "70 × 70cm", image: "work-11" }],
  },
  {
    name: "Nguyễn Thế Bảo", slug: "nguyen-the-bao", years: "1975 – nay",
    statusLabel: "Bản nháp", statusRed: true,
    bio: `        <p>Nguyễn Thế Bảo là tác giả sơn mài mới được ghi nhận vào phòng lưu trữ. Hồ sơ hiện ở dạng bản nháp, chưa có tác phẩm nào được gắn vào bộ sưu tập và thông tin tiểu sử chưa được xác minh.</p>
        <p>[verify] Hồ sơ này đang chờ xác minh thêm, nội dung có thể thay đổi.</p>`,
    works: [],
  },
];

// ================= GHI FILE =================

let count = 0;
for (const a of artworks) {
  const html = artworkPage(a);
  fs.writeFileSync(path.join(OUT, `tac-pham-${a.slug}.html`), html, "utf8");
  count++;
}
for (const a of artists) {
  const html = artistPage(a);
  fs.writeFileSync(path.join(OUT, `nguoi-sang-tac-${a.slug}.html`), html, "utf8");
  count++;
}
console.log(`Đã ghi ${count} trang.`);
