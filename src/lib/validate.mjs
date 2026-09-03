// Kiểm dữ liệu trước khi build. Ném lỗi có danh sách để build dừng sớm.

const ARTWORK_KEYS = new Set([
  'slug', 'tw_inventory_no', 'title', 'medium', 'tw_creator', 'tw_date_created', 'tw_material',
  'tw_dim_h', 'tw_dim_w', 'tw_dim_d', 'tw_diameter', 'tw_glaze', 'tw_kiln', 'tw_condition', 'tw_provenance',
  'tw_clearance_status', 'tw_part_of_set', 'tw_set_position', 'tw_ownership_status', 'featured', 'images'
]);
const ARTIST_KEYS = new Set(['slug', 'name', 'birth_year', 'death_year', 'role', 'artist_status', 'tw_group']);
const MEDIUM_KEYS = new Set(['slug', 'name', 'object_class', 'phase', 'public', 'variant_only', 'image', 'description_short', 'description']);

const ARTIST_STATUS = new Set(['draft', 'review', 'approved']);
const OBJECT_CLASS = new Set(['painting', 'ceramic', 'decorative']);
const CLEARANCE = new Set(['pending', 'restricted']);
const OWNERSHIP = new Set(['collection', 'consigned', 'unstated']);
const FORBIDDEN = /giá bán|bảng giá|báo giá|giá tiền|giỏ hàng|thêm vào giỏ|mua ngay|đặt mua|mua hàng|đặt hàng|thanh toán|₫|\bVND\b|\bUSD\b|add[- ]to[- ]cart|\bcart\b|\bpricing\b|\bprice\b|checkout|buy now|purchase/i;
const APPRAISAL = /thẩm định|kiểm định|giám định|chứng thực|xác thực|authentic|apprais|certif/i;
const NAME_TELLS = /Nguyễn Văn A|Jane Doe|John Smith|Lorem ipsum/i;

export function validate({ pages, mediums, artists, artworks, images, slots }) {
  const errors = [];
  const push = (m) => errors.push(m);
  const seen = new Set();

  const slugsM = new Set(mediums.map((m) => m.slug));
  const slugsA = new Set(artists.map((a) => a.slug));

  for (const m of mediums) {
    for (const k of Object.keys(m)) if (!MEDIUM_KEYS.has(k)) push(`mediums.${m.slug}: key lạ ${k}`);
    if (!OBJECT_CLASS.has(m.object_class)) push(`mediums.${m.slug}: object_class không hợp lệ`);
    if (m.image && !slots[m.image]) push(`mediums.${m.slug}: slot ảnh ${m.image} không có trong image-slots.json`);
  }
  for (const a of artists) {
    for (const k of Object.keys(a)) if (!ARTIST_KEYS.has(k)) push(`artists.${a.slug}: key lạ ${k}`);
    if (!ARTIST_STATUS.has(a.artist_status)) push(`artists.${a.slug}: artist_status không hợp lệ`);
    if (NAME_TELLS.test(a.name)) push(`artists.${a.slug}: tên placeholder lộ liễu`);
  }
  for (const w of artworks) {
    if (seen.has(w.slug)) push(`artworks: slug trùng ${w.slug}`);
    seen.add(w.slug);
    for (const k of Object.keys(w)) if (!ARTWORK_KEYS.has(k)) push(`artworks.${w.slug}: key lạ ${k}`);
    for (const k of ARTWORK_KEYS) if (!(k in w)) push(`artworks.${w.slug}: thiếu key ${k}`);
    if (!slugsM.has(w.medium)) push(`artworks.${w.slug}: medium ${w.medium} không tồn tại`);
    if (w.tw_creator != null && !slugsA.has(w.tw_creator)) push(`artworks.${w.slug}: tw_creator ${w.tw_creator} không tồn tại`);
    if (!CLEARANCE.has(w.tw_clearance_status)) push(`artworks.${w.slug}: tw_clearance_status phải là pending hoặc restricted trong demo (hard rule: chưa có clearance)`);
    if (!OWNERSHIP.has(w.tw_ownership_status)) push(`artworks.${w.slug}: tw_ownership_status không hợp lệ`);
    if (!Array.isArray(w.images) || !w.images.length) push(`artworks.${w.slug}: thiếu images`);
    for (const im of w.images || []) if (!slots[im.slot]) push(`artworks.${w.slug}: slot ảnh ${im.slot} không có`);
    if (w.tw_part_of_set && !w.tw_set_position) push(`artworks.${w.slug}: thuộc bộ nhưng thiếu tw_set_position`);
    const text = JSON.stringify(w);
    if (FORBIDDEN.test(text)) push(`artworks.${w.slug}: có từ vựng bán hàng`);
    if (APPRAISAL.test(text)) push(`artworks.${w.slug}: có từ vựng thẩm định`);
  }
  for (const [slot, rec] of Object.entries(images)) {
    if (!/^https:\/\/images\.pexels\.com\//.test(rec.url_base)) push(`images.${slot}: ảnh không phải Pexels`);
  }
  for (const p of pages) {
    const text = JSON.stringify(p);
    if (FORBIDDEN.test(text)) push(`pages.${p.id}: có từ vựng bán hàng`);
    if (APPRAISAL.test(text) && !p.verify) push(`pages.${p.id}: có từ vựng thẩm định ngoài khối verify`);
    if (/\u2014/.test(text)) push(`pages.${p.id}: có em dash`);
  }
  for (const [name, arr] of [['mediums', mediums], ['artists', artists], ['artworks', artworks]]) {
    if (/\u2014/.test(JSON.stringify(arr))) push(`${name}: có em dash`);
  }
  if (errors.length) {
    throw new Error('Dữ liệu chưa hợp lệ:\n  ' + errors.join('\n  '));
  }
}
