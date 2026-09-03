// Cổng kiểm tra tĩnh A đến H theo kế hoạch 2026-09-03. Exit 1 nếu có FAIL. WARN chỉ in ra.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { execSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fails = [];
const warns = [];
const fail = (g, m) => fails.push(`[${g}] ${m}`);
const warn = (g, m) => warns.push(`[${g}] ${m}`);

const pages = JSON.parse(readFileSync(join(root, 'data/pages.json'), 'utf8'));
const artworks = JSON.parse(readFileSync(join(root, 'data/artworks.json'), 'utf8'));
const artists = JSON.parse(readFileSync(join(root, 'data/artists.json'), 'utf8'));
const images = JSON.parse(readFileSync(join(root, 'data/images.json'), 'utf8'));

const htmlFiles = readdirSync(root).filter((f) => f.endsWith('.html'));
const read = (f) => readFileSync(join(root, f), 'utf8');

// Tập file mong đợi
const expected = new Set(['index.html', ...pages.map((p) => p.file)]);
for (const w of artworks) expected.add(`artworks-${w.slug}.html`);
for (const a of artists.filter((a) => a.artist_status === 'approved')) expected.add(`artists-${a.slug}.html`);
expected.add('artists-khuyet-danh.html');
for (const f of expected) if (!htmlFiles.includes(f)) fail('E', `thiếu file ${f}`);
for (const f of htmlFiles) if (!expected.has(f)) fail('E', `file HTML lạ ở gốc: ${f}`);

const ROBOTS = '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">';
const FORBIDDEN = /giá bán|bảng giá|báo giá|giá tiền|giỏ hàng|thêm vào giỏ|mua ngay|đặt mua|mua hàng|đặt hàng|thanh toán|₫|\bVND\b|\bUSD\b|\$\d|add[- ]to[- ]cart|\bcart\b|\bpricing\b|\bprice\b|checkout|buy now|purchase|shop now/i;
const APPRAISAL = /thẩm định|kiểm định|giám định|chứng thực|xác thực|tranh thật|bảo đảm thật|authentic|apprais|certif|guarantee/i;
const ENGLISH_UI = />\s*(Home|About|Contact|Gallery|Read more|Learn more|Explore|Discover|Menu|Back)\s*</;
const NAME_TELLS = /Nguyễn Văn A|Jane Doe|John Smith|Lorem ipsum/i;
const ALLOWED_HOSTS = new Set(['https://images.pexels.com', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'https://www.pexels.com']);
const BANNED_FONTS = /Playfair|Cormorant|\bInter\b|Fraunces|\bLora\b|Crimson|DM Sans|Space Grotesk|Instrument|Roboto|Be Vietnam/;

const stubFiles = new Set(pages.filter((p) => p.status === 'stub').map((p) => p.file));

for (const f of htmlFiles) {
  const s = read(f);
  const body = s.replace(/<div class="pending[^"]*" data-verify>[\s\S]*?<\/div>/g, '');
  if (!s.includes('<html lang="vi">')) fail('A', `${f}: thiếu lang="vi"`);
  if (!s.includes(ROBOTS)) fail('B', `${f}: thiếu meta robots đúng chuỗi`);
  if (/rel="canonical"|property="og:/.test(s)) fail('B', `${f}: có canonical hoặc og`);
  if (FORBIDDEN.test(s)) fail('A', `${f}: từ vựng bán hàng: ${s.match(FORBIDDEN)[0]}`);
  if (APPRAISAL.test(body)) fail('A', `${f}: từ vựng thẩm định ngoài khối data-verify: ${body.match(APPRAISAL)[0]}`);
  if (/\u2014/.test(s)) fail('A', `${f}: có em dash`);
  if (ENGLISH_UI.test(s)) fail('A', `${f}: từ UI tiếng Anh ${s.match(ENGLISH_UI)[1]}`);
  if (NAME_TELLS.test(s)) fail('D', `${f}: tên placeholder lộ liễu`);
  if (stubFiles.has(f) && !s.includes('NỘI DUNG CHỜ DUYỆT')) fail('A', `${f}: stub thiếu nhãn NỘI DUNG CHỜ DUYỆT`);
  if ((s.match(/<h1\b/g) || []).length !== 1) fail('F', `${f}: số h1 khác 1`);
  if ((s.match(/<main\b/g) || []).length !== 1) fail('F', `${f}: số main khác 1`);
  if (/href="\/|src="\/(?!\/)/.test(s)) fail('E', `${f}: đường dẫn tuyệt đối (Pages chạy dưới subpath)`);
  if (/index\.html|\.html/.test(f) && !s.includes('href="index.html"') && f !== 'index.html') fail('E', `${f}: không có link về mục lục`);

  // ảnh
  for (const m of s.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    const src = (tag.match(/\ssrc="([^"]+)"/) || [])[1] || '';
    const alt = (tag.match(/\salt="([^"]*)"/) || [])[1];
    if (src.startsWith('http')) {
      if (!src.startsWith('https://images.pexels.com/')) fail('C', `${f}: ảnh ngoài không phải Pexels: ${src.slice(0, 60)}`);
      if (!tag.includes('data-placeholder="pexels"')) fail('A', `${f}: ảnh Pexels thiếu data-placeholder`);
      if (!alt || !alt.startsWith('Ảnh minh họa')) fail('A', `${f}: alt ảnh không bắt đầu bằng "Ảnh minh họa": ${alt}`);
      if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) fail('F', `${f}: ảnh thiếu width/height`);
    } else if (!src.startsWith('assets/img/')) {
      fail('C', `${f}: ảnh cục bộ ngoài assets/img: ${src}`);
    }
  }
  // host ngoài
  for (const m of s.matchAll(/(?:src|href)="(https?:\/\/[^/"]+)/g)) {
    if (!ALLOWED_HOSTS.has(m[1])) fail('C', `${f}: host ngoài không được phép ${m[1]}`);
  }
  // link nội bộ
  for (const m of s.matchAll(/(?:href|src)="([^"#:?]+)(#[^"]*)?"/g)) {
    const target = m[1];
    if (!target || target.startsWith('http') || target.startsWith('mailto')) continue;
    const p = resolve(root, target);
    if (!existsSync(p)) fail('E', `${f}: link hỏng ${target}`);
    else if (m[2] && target.endsWith('.html')) {
      const t = read(target);
      const id = m[2].slice(1);
      if (id && !new RegExp(`id="${id}"`).test(t)) fail('E', `${f}: anchor ${m[2]} không có trong ${target}`);
    }
  }
}

// Người sáng tác chưa duyệt không có trang và không có link
for (const a of artists.filter((a) => a.artist_status !== 'approved')) {
  const f = `artists-${a.slug}.html`;
  if (htmlFiles.includes(f)) fail('D', `${f}: người sáng tác ${a.artist_status} không được có trang`);
  for (const h of htmlFiles) if (read(h).includes(`href="${f}"`)) fail('D', `${h}: link tới người sáng tác chưa duyệt ${a.slug}`);
}
// Khuyết danh không link tới trang họa sĩ
for (const w of artworks.filter((w) => w.tw_creator == null)) {
  const s = read(`artworks-${w.slug}.html`);
  if (!s.includes('Khuyết danh')) fail('D', `artworks-${w.slug}.html: thiếu "Khuyết danh"`);
}

// CSS
const css = read('assets/css/style.css');
const tokensCss = read('assets/css/tokens.css');
if (/#[0-9a-fA-F]{3,8}\b|oklch\(|rgb\(|hsl\(/.test(css.replace(/\/\*[\s\S]*?\*\//g, ''))) fail('G', 'style.css có màu thô ngoài tokens.css');
if (/(padding|margin|gap)[^;{]*:\s*[^;]*\d+px/.test(css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/min-height: 44px|min-width: 44px|min-height: 48px|min-height: 64px|width: 96px|height: 44px|height: 40px|height: 36px|width: 44px/g, ''))) warn('G', 'style.css có padding/margin/gap bằng px ngoài thang token');
if (/transition:\s*all|border-left:\s*[2-9]px|background-clip:\s*text|cubic-bezier\(0\.34,\s*1\.56/.test(css)) fail('G', 'style.css có mẫu cấm (transition all, side-stripe, gradient text, overshoot)');
if (!/overflow-x:\s*clip/.test(css)) fail('F', 'thiếu overflow-x: clip');
if (!/:focus-visible\s*\{\s*outline:\s*2px solid var\(--color-focus\)/.test(css)) fail('F', 'thiếu :focus-visible outline 2px');
if (/transition[^;]*outline/.test(css)) fail('F', 'focus ring có transition');
if (!/prefers-reduced-motion:\s*reduce/.test(css)) fail('F', 'thiếu prefers-reduced-motion');
if (!/^\/\* Hallmark ·/.test(css)) fail('G', 'thiếu stamp Hallmark đầu style.css');
if (BANNED_FONTS.test(css) || BANNED_FONTS.test(tokensCss)) fail('C', 'CSS nhắc tới font cấm');
function stripMinmax(v) {
  let out = ''; let i = 0;
  while (i < v.length) {
    if (v.startsWith('minmax(', i)) {
      let depth = 0; let j = i;
      for (; j < v.length; j++) { if (v[j] === '(') depth++; else if (v[j] === ')') { depth--; if (depth === 0) break; } }
      i = j + 1; continue;
    }
    out += v[i]; i++;
  }
  return out;
}
for (const m of css.matchAll(/grid-template-columns:\s*([^;]+);/g)) {
  if (/(^|[\s,(])1fr\b/.test(stripMinmax(m[1]))) fail('F', `grid track 1fr trần: ${m[1].trim()}`);
}
if (/font-style:\s*italic/.test(css) && /h[1-6][^{]*\{[^}]*font-style:\s*italic/.test(css)) fail('G', 'heading italic');

// robots.txt
if (read('robots.txt').trim() !== 'User-agent: *\nDisallow: /') fail('B', 'robots.txt sai nội dung');
if (existsSync(join(root, 'sitemap.xml'))) fail('B', 'có sitemap.xml');

// Không raster cục bộ
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); if (f === '.git' || f === 'node_modules' || f === 'verify') return []; return statSync(p).isDirectory() ? walk(p) : [p]; });
const raster = walk(root).filter((p) => /\.(jpe?g|png|webp|avif|gif|tiff?)$/i.test(p));
if (raster.length) fail('A', `có file ảnh raster cục bộ: ${raster.join(', ')}`);

// Em dash ở nguồn
for (const p of walk(root).filter((p) => /\.(md|json|mjs|css|js|txt)$/.test(p) && !p.includes('/verify/'))) {
  if (/\u2014/.test(readFileSync(p, 'utf8'))) fail('A', `em dash trong ${p.replace(root + '/', '')}`);
}

// Bí mật
for (const p of walk(root).filter((p) => !/\.(svg)$/.test(p))) {
  const s = readFileSync(p, 'utf8');
  if (/Authorization:\s*["'][A-Za-z0-9]{30,}|PEXELS_API_KEY\s*=\s*["']/.test(s)) fail('H', `khóa API trong ${p.replace(root + '/', '')}`);
}
try {
  const log = execSync('git log -p --all', { cwd: root, encoding: 'utf8', maxBuffer: 1 << 26 });
  if (/[A-Za-z0-9]{56}/.test(log.replace(/^[+-]?index [0-9a-f]+\.\.[0-9a-f]+/gm, '').replace(/[0-9a-f]{40,}/g, ''))) fail('H', 'chuỗi giống khóa API trong lịch sử git');
} catch { /* chưa có commit */ }

// Ảnh phải là Pexels, có credit
for (const [slot, r] of Object.entries(images)) {
  if (!r.url_base.startsWith('https://images.pexels.com/')) fail('C', `images.${slot} không phải Pexels`);
  if (!r.photographer || !r.pexels_url) fail('C', `images.${slot} thiếu credit`);
}

// Kết quả
for (const w of warns) console.warn('WARN ' + w);
if (fails.length) {
  for (const f of fails) console.error('FAIL ' + f);
  console.error(`\n${fails.length} lỗi.`);
  process.exit(1);
}
console.log(`OK: ${htmlFiles.length} trang qua cổng A đến H (${warns.length} cảnh báo).`);
