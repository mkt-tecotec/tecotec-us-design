# 🎨 Sổ Tay Kỹ Năng Thiết Kế Frontend, UX & Art Direction (Antigravity Skills Guide)

> Tài liệu hướng dẫn tra cứu nhanh và cách kết hợp **17 Custom Skills** chuyên sâu về Thiết kế Giao diện, Trải nghiệm Người dùng (UX), Art Direction và Quản lý Ngữ cảnh Dự án trong Antigravity.

---

## 🧭 1. Bảng Tra Cứu Nhanh Theo Nhu Cầu (Cheat Sheet)

Khi bạn muốn thực hiện một tác vụ cụ thể, hãy gọi tên skill tương ứng theo bảng dưới đây:

| Nhu cầu thiết kế / Tác vụ cụ thể | Skill nên gọi | Câu lệnh mẫu (Prompt Trigger) |
| :--- | :--- | :--- |
| **Bắt đầu một dự án mới** (thiết lập "bộ não" chống rớt ngữ cảnh) | `project-init` | *"Chạy skill project-init để khởi tạo dự án này"* hoặc *"init project"* |
| **Thiết kế bộ nhận diện thương hiệu**, Moodboard, Logo system, Brand board | `brandkit` | *"Dùng skill brandkit để tạo brand board và logo system cho Tecotec"* |
| **Sinh ảnh concept từng section cho Landing Page** (chất lượng cao, tỷ lệ chuẩn) | `imagegen-frontend-web` | *"Dùng imagegen-frontend-web sinh concept ảnh cho 5 sections của landing page này"* |
| **Sinh ảnh concept giao diện Mobile App** (trong mockup điện thoại cao cấp) | `imagegen-frontend-mobile` | *"Dùng imagegen-frontend-mobile sinh concept 3 màn hình app iOS dạng mockup"* |
| **Chuyển ảnh concept/thiết kế thành mã nguồn** HTML/CSS chuẩn xác | `image-to-code` | *"Dùng image-to-code để phân tích ảnh thiết kế này và code lại HTML/CSS"* |
| **Tạo file `DESIGN.md` chuẩn** cho hệ thống Google Stitch | `stitch-design-taste` | *"Dùng stitch-design-taste tạo file DESIGN.md chuẩn cho dự án này"* |
| **Thiết kế Web phong cách Cao cấp / Luxury / Agency quốc tế** | `high-end-visual-design` | *"Áp dụng high-end-visual-design để thiết kế lại trang Home cho sang trọng"* |
| **Thiết kế Frontend hiện đại, chống khuôn mẫu AI rẻ tiền (Anti-slop)** | `design-taste-frontend` | *"Dùng design-taste-frontend thiết kế landing page không bị cảm giác template"* |
| **Thiết kế phong cách Tối giản / Editorial / Bento grid** | `minimalist-ui` | *"Thiết kế trang này theo chuẩn minimalist-ui, monochrome bento grid"* |
| **Thiết kế phong cách Cơ khí / Quân sự / Terminal kỹ thuật số** | `industrial-brutalist-ui`| *"Áp dụng industrial-brutalist-ui cho dashboard dữ liệu kỹ thuật"* |
| **Animation GSAP ScrollTrigger đỉnh cao**, bố cục bất đối xứng nghệ thuật | `gpt-taste` | *"Dùng gpt-taste triển khai GSAP ScrollTrigger và typographic layout cho trang này"* |
| **Audit, tinh chỉnh chi tiết** Typography, Spacing, Contrast, Motion | `impeccable` | *"Dùng impeccable để audit và polish lại toàn bộ padding, font chữ và màu sắc trang này"* |
| **Nâng cấp một trang web hiện có** lên chuẩn hiện đại không làm hỏng tính năng | `redesign-existing-projects` | *"Dùng redesign-existing-projects để audit và nâng cấp giao diện file index.html"* |
| **Yêu cầu AI viết code đầy đủ 100%**, cấm cắt xén, cấm placeholder `// TODO` | `full-output-enforcement` | *"Dùng full-output-enforcement code hoàn chỉnh toàn bộ file CSS này"* |
| **Đóng phiên làm việc**, lưu checkpoint tiến độ vào KDB/Outline/Obsidian | `project-checkpoint` | *"Chạy skill project-checkpoint đóng phiên làm việc hôm nay"* |
| **Tìm kiếm thêm skill** cho tác vụ đặc thù | `find-skills` | *"Dùng find-skills tìm xem có skill nào hỗ trợ tạo canvas 3D không"* |

---

## 🔄 2. Quy Trình Thiết Kế Chuẩn (End-to-End Design Pipeline)

Khi làm một sản phẩm từ đầu đến cuối, bạn nên kết hợp các skill theo 6 giai đoạn sau:

```
[1. Khởi Tạo]          project-init
      ↓
[2. Brand & Token]     brandkit  →  stitch-design-taste
      ↓
[3. Tạo Concept Ảnh]   imagegen-frontend-web  /  imagegen-frontend-mobile
      ↓
[4. Chọn Phong Cách]   high-end-visual-design  /  minimalist-ui  /  industrial-brutalist-ui  /  gpt-taste
      ↓
[5. Code & Nâng Cấp]   image-to-code  +  full-output-enforcement  →  impeccable  /  redesign-existing-projects
      ↓
[6. Đóng Phiên]        project-checkpoint
```

---

## 📚 3. Chi Tiết Từng Kỹ Năng & Hướng Dẫn Kích Hoạt

### 1. `project-init` (Khởi tạo bộ não dự án)
*   **Mục đích**: Chống "rớt não" (mất ngữ cảnh khi chuyển phiên chat). Skill sẽ phát hiện các backend lưu trữ tri thức (KDB trên Outline tại `doc.tecotec.top`, Obsidian Vault, hoặc ngay trong repo), thiết lập cấu trúc tài liệu, phỏng vấn các nguyên tắc bất di bất dịch (hard rules) và tạo file khởi động.
*   **Khi nào dùng**: Chạy **đầu tiên** khi bắt đầu một dự án mới hoặc mở folder mới.
*   **Prompt mẫu**:
    ```text
    Khởi tạo dự án này với skill project-init nhé.
    ```

---

### 2. `brandkit` (Thiết kế hệ thống nhận diện thương hiệu)
*   **Mục đích**: Art direction chuyên sâu cho việc tạo bộ quy chuẩn thương hiệu: bảng Brand-guidelines, Logo system, bảng màu, typography tokens, phong cách đồ họa (Minimalist, Dark-tech, Luxury, Editorial...).
*   **Khi nào dùng**: Khi cần xây dựng bộ quy chuẩn thương hiệu, moodboard hoặc định hướng nhận diện trực quan trước khi vẽ giao diện.
*   **Prompt mẫu**:
    ```text
    Dùng skill brandkit để lên bảng brand guidelines và logo system cho thương hiệu mỹ thuật sơn mài Tecotec Art.
    ```

---

### 3. `stitch-design-taste` (Semantic Design System cho Google Stitch)
*   **Mục đích**: Sinh file `DESIGN.md` chuẩn ngữ nghĩa, cung cấp các quy tắc về typography (không wrap dòng vụn vặt), màu sắc cân chỉnh, layout bất đối xứng, micro-motion để AI sinh giao diện Stitch chuẩn đẹp.
*   **Khi nào dùng**: Khi bắt đầu xây dựng design system cho dự án hoặc chuẩn bị prompt cho Google Stitch.
*   **Prompt mẫu**:
    ```text
    Dùng stitch-design-taste để sinh file DESIGN.md cho dự án tecotec-us-design.
    ```

---

### 4. `imagegen-frontend-web` (Art Direction sinh concept Web)
*   **Mục đích**: Sinh ảnh tham khảo giao diện web cho từng section. **Quy tắc vàng:** Mỗi section một ảnh ngang riêng biệt (trang có 8 sections = 8 ảnh), không bao giờ gộp nhiều section vào một tấm ảnh nén nhỏ.
*   **Khi nào dùng**: Khi cần vẽ visual concept mẫu trước khi bắt tay vào code HTML/CSS.
*   **Prompt mẫu**:
    ```text
    Dùng imagegen-frontend-web sinh 4 ảnh concept riêng biệt cho: Hero, Featured Artworks, Artist Profile, và Footer.
    ```

---

### 5. `imagegen-frontend-mobile` (Art Direction sinh concept Mobile App)
*   **Mục đích**: Sinh ảnh concept ứng dụng mobile đặt trong mockup điện thoại cao cấp (subtle iPhone frame), tối ưu phân cấp thị giác, custom icon, bố cục màn hình cảm ứng.
*   **Khi nào dùng**: Khi thiết kế giao diện cho app iOS/Android hoặc màn hình responsive di động.
*   **Prompt mẫu**:
    ```text
    Dùng imagegen-frontend-mobile để sinh ảnh mockup 2 màn hình: Feed khám phá tác phẩm và Màn hình chi tiết tranh sơn mài.
    ```

---

### 6. `image-to-code` (Chuyển đổi hình ảnh sang code)
*   **Mục đích**: Phân tích sâu hình ảnh thiết kế (grid, font size, spacing, màu sắc) và chuyển đổi thành code HTML/CSS hoặc Component với độ chính xác cao nhất. Tránh lỗi "cards-in-cards" và giữ Hero thoáng đãng.
*   **Khi nào dùng**: Khi bạn đã có ảnh concept (từ Figma hoặc từ AI sinh ra) và muốn dựng thành code web chạy được.
*   **Prompt mẫu**:
    ```text
    Dùng skill image-to-code để phân tích ảnh screenshot này và code lại toàn bộ section Hero bằng HTML và Vanilla CSS.
    ```

---

### 7. `high-end-visual-design` (Chuẩn thiết kế cao cấp - Agency Grade)
*   **Mục đích**: Đưa các quy chuẩn thẩm mỹ của agency hàng đầu thế giới vào code: tỷ lệ font chữ, hệ thống macro-spacing rộng rãi, shadow nhiều lớp tinh tế, cấu trúc card sang trọng. Triệt tiêu các thói quen thiết kế AI "rẻ tiền" (màu chói, viền đậm, bóng đổ thô).
*   **Khi nào dùng**: Khi muốn trang web trông đắt giá, chuyên nghiệp như các hãng xa xỉ hoặc SaaS hàng đầu thế giới.
*   **Prompt mẫu**:
    ```text
    Áp dụng high-end-visual-design để trau chuốt lại file CSS của trang chủ, đảm bảo cảm giác sang trọng và tinh tế.
    ```

---

### 8. `design-taste-frontend` & `design-taste-frontend-v1` (Frontend Chống AI Slop)
*   **Mục đích**: Kỹ năng chuyên biệt để tạo ra các giao diện frontend độc đáo, không rập khuôn mẫu template generic. Phân tích ngữ cảnh dự án để đưa ra hướng thiết kế riêng biệt.
*   **Khi nào dùng**: Thiết kế Landing page, Portfolio, trang giới thiệu sản phẩm nghệ thuật/công nghệ.
*   **Prompt mẫu**:
    ```text
    Dùng design-taste-frontend để lên bố cục và style cho trang nghệ sĩ Đặng Văn Sửu.
    ```

---

### 9. `minimalist-ui` (Phong cách Tối giản & Editorial)
*   **Mục đích**: Thiết kế giao diện phong cách tạp chí/editorial cao cấp: tông màu ấm đơn sắc (warm monochrome), độ tương phản chữ rõ nét, layout dạng bento grid phẳng, màu pastel dịu mắt, không dùng gradient lòe loẹt.
*   **Khi nào dùng**: Trang blog nghệ thuật, gallery tranh ảnh, tài liệu kỹ thuật, portfolio tối giản.
*   **Prompt mẫu**:
    ```text
    Dùng minimalist-ui thiết kế lại trang chi tiết tác phẩm: flat bento grid, tông màu giấy ngà và đen than.
    ```

---

### 10. `industrial-brutalist-ui` (Phong cách Cơ khí & Blueprints)
*   **Mục đích**: Kết hợp phong cách in ấn Thụy Sĩ (Swiss Typographic) với thẩm mỹ màn hình quân sự/công nghiệp retro: lưới khung thép cứng cáp, tương phản cỡ chữ cực đại, typography kỹ thuật số, hiệu ứng analog scanline.
*   **Khi nào dùng**: Dashboard phân tích dữ liệu kỹ thuật, tài liệu mật, sản phẩm developer tools hoặc trang phong cách underground/cyber.
*   **Prompt mẫu**:
    ```text
    Dùng industrial-brutalist-ui thiết kế trang thông số kỹ thuật và chứng chỉ kiểm định tác phẩm.
    ```

---

### 11. `gpt-taste` (Kỹ sư Motion GSAP & ScrollTrigger)
*   **Mục đích**: Bậc thầy về chuyển động GSAP: Pinning (ghim màn hình), Card stacking (xếp chồng thẻ), Scrubbing theo cuộn chuột, bố cục chữ bất đối xứng và ngắt dòng rộng (banned 6-line wraps).
*   **Khi nào dùng**: Khi làm trang landing page cần hiệu ứng cuộn điện ảnh (cinematic scroll experience).
*   **Prompt mẫu**:
    ```text
    Dùng skill gpt-taste viết hiệu ứng cuộn GSAP ScrollTrigger cho bộ tranh Tứ Bình.
    ```

---

### 12. `impeccable` (Bộ dao mổ đa năng cho UI/UX)
*   **Mục đích**: Bộ công cụ toàn diện nhất để mổ xẻ, audit, chỉnh sửa, tinh chỉnh mọi yếu tố giao diện:
    *   *Audit:* Đánh giá visual hierarchy, cognitive load, accessibility.
    *   *Typography:* Cân lại scale chữ, line-height, kerning.
    *   *Color:* Tối ưu bảng màu, contrast ratio WCAG.
    *   *Delight:* Thêm micro-interactions, hover effects tinh tế.
    *   *Live tuning:* Điều chỉnh trực tiếp trên giao diện trình duyệt.
*   **Khi nào dùng**: Bất cứ khi nào bạn cảm thấy giao diện "chưa đã", cần đánh giá và làm nó hoàn hảo hơn.
*   **Prompt mẫu**:
    ```text
    Dùng impeccable audit trang collection-lacquer-paintings.html và đề xuất các điểm cần trau chuốt về spacing và contrast.
    ```

---

### 13. `redesign-existing-projects` (Nâng cấp giao diện cũ)
*   **Mục đích**: Quy trình nâng cấp các trang web/ứng dụng đang chạy: audit điểm nghẽn của bản hiện tại, thay thế các pattern cũ kỹ bằng chuẩn hiện đại mà **không làm gãy tính năng** hoặc cấu trúc logic backend.
*   **Khi nào dùng**: Khi được giao một trang web cũ cần "lột xác" giao diện.
*   **Prompt mẫu**:
    ```text
    Dùng redesign-existing-projects để nâng cấp giao diện trang home-variant-advisory.html.
    ```

---

### 14. `full-output-enforcement` (Ép xuất code 100% đầy đủ)
*   **Mục đích**: Chặn đứng tật xấu viết tắt của LLM (`// rest of code remains the same...`, `/* implement here */`). Ép buộc xuất mã nguồn hoàn chỉnh từng dòng.
*   **Khi nào dùng**: Khi yêu cầu refactor file CSS lớn, viết component hoàn chỉnh hoặc tạo file quan trọng cần copy chạy ngay.
*   **Prompt mẫu**:
    ```text
    Áp dụng full-output-enforcement: viết lại toàn bộ file CSS style hoàn chỉnh không lược bỏ bất kỳ class nào.
    ```

---

### 15. `project-checkpoint` (Đóng phiên & Ghi nhận tiến độ)
*   **Mục đích**: Buộc AI thực hiện vòng lặp ghi nhận tiến độ vào "bộ não" dự án (Outline KDB, Obsidian Vault hoặc Repo): ghi lại những gì đã thay đổi, các quyết định quan trọng, gotchas và việc cần làm tiếp theo cho phiên sau.
*   **Khi nào dùng**: Khi kết thúc một buổi làm việc, trước khi commit/push git hoặc khi chuẩn bị nghỉ.
*   **Prompt mẫu**:
    ```text
    Xong việc rồi, chạy project-checkpoint đóng phiên làm việc hôm nay nhé.
    ```

---

### 16. `find-skills` (Trợ lý tìm kiếm kỹ năng)
*   **Mục đích**: Quét và gợi ý các kỹ năng phù hợp khi bạn gặp một bài toán chưa biết nên dùng công cụ nào.
*   **Khi nào dùng**: Khi bạn thắc mắc *"Antigravity có kỹ năng nào để làm việc X không?"*
*   **Prompt mẫu**:
    ```text
    Dùng find-skills gợi ý cho tôi các skill phù hợp nhất để tối ưu tốc độ tải trang Core Web Vitals.
    ```

---

## 💡 Mẹo kết hợp các Skill để đạt chất lượng cao nhất

1. **Khi bắt đầu thiết kế 1 trang Landing Page mới:**
   > *"Dùng `stitch-design-taste` định hình DESIGN.md, sau đó dùng `imagegen-frontend-web` tạo concept cho 4 section chính. Tiếp theo áp dụng `high-end-visual-design` và `full-output-enforcement` để code ra file HTML/CSS hoàn chỉnh."*

2. **Khi trang web đã chạy nhưng nhìn còn thô cứng:**
   > *"Dùng `impeccable` audit lại typography và spacing, kết hợp `gpt-taste` để thêm micro-animations và hiệu ứng hover mượt mà."*

3. **Khi chuẩn bị nghỉ hoặc đổi máy:**
   > *"Chạy `project-checkpoint` để lưu lại toàn bộ tiến trình vào KDB."*
