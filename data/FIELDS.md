# Bảng trường dữ liệu mẫu và ánh xạ sang WordPress

Dữ liệu mẫu trong `data/*.json` là bản nháp schema cho WP3 (WooCommerce chế độ catalogue + ACF Pro). Tên trường giữ đúng quy ước `tw_` ở master plan 2026-08-30 mục 3.9.4: trung tính, không gắn với tranh, không đổi sau khi có dữ liệu.

## `artworks.json` (post type `product`)

| Key JSON | Nhãn hiển thị | Object WP | ACF / cột CSV importer | Kiểu | Ghi chú |
|---|---|---|---|---|---|
| `slug` | | `product.post_name` | `Slug` | text | URL `/artworks/<slug>/` |
| `title` | Tên tác phẩm | `product.post_title` | `Name` | text | |
| `medium` | Loại hình | term `product_cat` | `Categories` | slug | một tác phẩm thuộc ít nhất một loại hình |
| `tw_creator` | Người sáng tác | term `product_brand` | `Brands` | slug hoặc `null` | `null` = khuyết danh, template không sinh link |
| `tw_inventory_no` | Số hiệu | ACF text | `Meta: tw_inventory_no` | text | đề xuất, cách đánh số như Thavibu; chờ M4 |
| `tw_date_created` | Năm | ACF text | `Meta: tw_date_created` | text | chuỗi để ghi "khoảng 1990", "không rõ" |
| `tw_material` | Chất liệu | ACF text | `Meta: tw_material` | text | |
| `tw_dim_h`, `tw_dim_w` | Kích thước | ACF number | `Meta: tw_dim_h`, `Meta: tw_dim_w` | cm | tranh; cũng quyết định `aspect-ratio` khung ảnh |
| `tw_dim_d`, `tw_diameter` | Kích thước | ACF number | `Meta: tw_dim_d`, `Meta: tw_diameter` | cm | gốm và đồ trang trí; tranh để `null` |
| `tw_glaze`, `tw_kiln` | Men, Lò | ACF text | `Meta: tw_glaze`, `Meta: tw_kiln` | text | gốm; tranh để `null` để cột CSV ổn định |
| `tw_condition` | Tình trạng vật lý | ACF text | `Meta: tw_condition` | text | demo để `null` |
| `tw_provenance` | Nguồn gốc | ACF textarea | `Meta: tw_provenance` | text | chờ M4 và M10, demo để `null` |
| `tw_clearance_status` | | ACF select | `Meta: tw_clearance_status` | `pending` / `cleared` / `restricted` | build fail nếu có `cleared` trong demo |
| `tw_part_of_set` | Bộ | ACF text | `Meta: tw_part_of_set` | text hoặc `null` | tên bộ; các tấm cùng tên là cùng bộ |
| `tw_set_position` | Thứ tự trong bộ | ACF number | `Meta: tw_set_position` | số | |
| `tw_ownership_status` | Tình trạng (sở hữu) | ACF select | `Meta: tw_ownership_status` | `collection` / `consigned` / `unstated` | đề xuất cho biến thể B4, chờ M4 |
| `featured` | | product meta | `Is featured?` | bool | chọn tác phẩm lên trang chủ |
| `images[]` | Ảnh | product gallery | `Images` | slot + caption | demo trỏ tới slot Pexels; production là ảnh thật sau clearance |

## `mediums.json` (taxonomy `product_cat`, base `/collection/`)

| Key JSON | Nhãn | ACF term field | Ghi chú |
|---|---|---|---|
| `slug`, `name` | Loại hình | | phẳng, không phân tầng |
| `object_class` | Nhóm loại hình | `object_class` | `painting` / `ceramic` / `decorative`; điều khiển schema, field group, template |
| `phase`, `public` | | (không import) | chỉ dùng cho demo và menu: chưa `public` thì không link |
| `variant_only` | | (không import) | chỉ hiện ở biến thể B1 |
| `description_short`, `description` | Mô tả | `description` | |

## `artists.json` (taxonomy `product_brand`, base `/artists/`)

| Key JSON | Nhãn | ACF term field | Ghi chú |
|---|---|---|---|
| `slug`, `name` | Người sáng tác | | tên trong demo là hư cấu |
| `birth_year`, `death_year` | Năm | `tw_birth_year`, `tw_death_year` | `null` = còn sống hoặc không rõ |
| `role` | Vai trò | `tw_role` | Họa sĩ, Nghệ nhân, Lò gốm, Xưởng |
| `artist_status` | | `artist_status` | `draft` / `review` / `approved`; chỉ `approved` mới có trang và link |
| `tw_group` | Nhóm | `tw_group` | chỉ để hiển thị ở biến thể B2, chờ M1; `null` thì nhóm theo thập niên sinh |

## Gotcha khi nhập vào WordPress

- Product CSV Importer không nhập term meta: `object_class`, `artist_status`, `tw_group`, `tw_birth_year` phải tạo bằng `wp term meta add` hoặc script sau import.
- ACF cần thêm dòng field-key (`Meta: _tw_material` = `field_xxx`) để giá trị hiện trong giao diện ACF, hoặc chạy script gán field key sau import.
- `tw_date_created` là text, không phải date, để giữ được "khoảng 1990".
- Bộ nhiều món dùng `tw_part_of_set` (text) chứ không dùng grouped product của WooCommerce, vì grouped product là khái niệm bán hàng.
