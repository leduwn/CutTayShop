# CutTay Design System v1

> **Phiên bản:** 1.0.0  
> **Phong cách chủ đạo:** Modern Playful E-commerce, Soft Pastel, Clean & Premium  
> **Ngôn ngữ thiết kế:** Thân thiện, ấm áp, hiện đại, tối ưu văn hóa mua sắm Việt Nam kết hợp tiêu chuẩn quốc tế.

---

## 1. Triết lý Thiết kế (Design Philosophy)

Hệ thống thiết kế **CutTay Design System v1** được xây dựng nhằm định hình trải nghiệm mua sắm trực tuyến cân bằng giữa tính năng thương mại điện tử tốc độ cao và cảm xúc tươi vui, gần gũi.

```
       [ Modern Playful ]
     /        |         \
[ Warm & ] [ Clean & ] [ Accessible & ]
[Friendly] [ Premium ] [ High-Velocity]
```

### 4 Giá trị Cốt lõi:
1. **Modern Playful (Vui tươi Hiện đại):**
   - Sử dụng các hình khối bo tròn đặc trưng (Pill shape `9999px`, bo góc card `20px - 24px`).
   - Bảng màu pastel nhẹ nhàng (Mint, Soft Peach, Lavender, Sky Blue) tạo cảm giác thư giãn, giải tỏa áp lực khi mua sắm.
   - Họa tiết doodle mộc mạc (ngôi sao, nét vẽ gợn sóng, mũi tên phác thảo) làm điểm nhấn cảm xúc cho hero banner và badge ưu đãi.

2. **Warm & Friendly (Ấm áp & Gần gũi):**
   - Nền canvas trắng ngà mềm `#F8F9F7` thay cho màu trắng tinh lạnh lẽo, giảm mỏi mắt khi lướt sản phẩm lâu.
   - Giọng văn microcopy thân mật, ân cần (ví dụ: *"Sản phẩm bạn thích ở ngay đây"*, *"Chào bạn, CutTay AI có thể giúp gì?"*).

3. **Clean & Premium (Gọn gàng & Cao cấp):**
   - Phân cấp thị giác rõ ràng, cấu trúc thẻ sản phẩm chuẩn chỉ, viền mảnh mềm `#E8ECEA`.
   - Tránh nhồi nhét banner giật gân; khoảng thở (white-space) rộng rãi giúp sản phẩm tỏa sáng.
   - Typography trau chuốt, số tiền định dạng chuẩn mực Việt Nam Đồng với phông số cân xứng (tabular numbers).

4. **Accessible & High-Velocity (Dễ tiếp cận & Vận hành mượt mà):**
   - Tuân thủ nghiêm ngặt **WCAG 2.2 Level AA** về độ tương phản và điều hướng bàn phím.
   - Thiết kế ưu tiên Mobile-First, thao tác ngón cái một tay mượt mà với bottom bar và drawer.

---

## 2. Hệ Thống Token Màu Sắc (Color Tokens)

### 2.1. Primitive Color Palette (Màu gốc)

| Token Name | Hex Code | HSL | Vai trò / Ngữ cảnh ứng dụng |
|:---|:---|:---|:---|
| `primitive-ink-900` | `#101418` | `210°, 20%, 8%` | Màu chữ chính, CTA Button chính, viền đậm |
| `primitive-ink-700` | `#2D3748` | `215°, 23%, 23%` | Tiêu đề phụ, icon chính |
| `primitive-surface-white` | `#FFFFFF` | `0°, 0%, 100%` | Mặt phẳng card, input box, popover |
| `primitive-bg-soft` | `#F8F9F7` | `90°, 10%, 97%` | Nền canvas trang chủ, nền khung xem nhanh |
| `primitive-mint-accent` | `#BDEFA8` | `98°, 70%, 80%` | Điểm nhấn thương hiệu chính, pill highlight text |
| `primitive-mint-soft` | `#E5F8DC` | `102°, 65%, 92%` | Nền thẻ ưu đãi công nghệ, badge voucher |
| `primitive-peach-warm` | `#FFE5DA` | `17°, 100%, 93%` | Nền thẻ thời trang, notification badge ấm |
| `primitive-lavender` | `#EEE7FF` | `257°, 100%, 95%` | Nền danh mục làm đẹp / sách, card dịch vụ |
| `primitive-sky-blue` | `#E0F2FE` | `204°, 94%, 94%` | Nền danh mục quốc tế, tag miễn phí vận chuyển |
| `primitive-sale-red` | `#FF455B` | `353°, 100%, 61%` | Badge giảm giá (-40%), giá khuyến mãi, đồng hồ deal |
| `primitive-sale-red-bg` | `#FFEAEF` | `348°, 100%, 96%` | Nền badge giảm giá mềm |
| `primitive-muted-gray` | `#6B7280` | `220°, 9%, 46%` | Chữ phụ, giá gạch ngang, placeholder |
| `primitive-border` | `#E8ECEA` | `150°, 6%, 92%` | Đường viền card, đường phân chia divider |
| `primitive-star-yellow` | `#F59E0B` | `38°, 92%, 50%` | Ngôi sao đánh giá sản phẩm (Rating Star) |
| `primitive-success-green` | `#10B981` | `160°, 84%, 39%` | Trạng thái còn hàng (In Stock), thanh toán thành công |

---

### 2.2. Bảng Đối Chiếu Chế Độ Sáng & Tối (Light & Dark Mode Cross-Reference)

Chế độ Dark Mode của CutTay Shop áp dụng nguyên tắc **Soft Dark (Dark Slate)** thay vì đen tuyền `#000000` để giữ trọn vẹn nét mềm mại và hạn chế lóa mắt.

| Semantic Token | Light Mode (Default) | Dark Mode (`[data-theme="dark"]`) | Ghi chú & Tương phản WCAG |
|:---|:---|:---|:---|
| `--color-canvas` | `#F8F9F7` (Soft Off-White) | `#0E1217` (Deep Dark Slate) | Nền tổng thể toàn trang |
| `--color-surface` | `#FFFFFF` (Pure White) | `#171C23` (Elevated Charcoal) | Nền card sản phẩm, modal, input |
| `--color-surface-subtle` | `#F3F4F6` (Gray 100) | `#1E252E` (Layer 2 Surface) | Hover state, khung ảnh sản phẩm |
| `--color-surface-elevated`| `#FFFFFF` (Shadow L3) | `#232B36` (Layer 3 Surface) | Dropdown menu, popover, drawer |
| `--color-text-primary` | `#101418` (Primary Ink) | `#F8F9FA` (High Contrast White) | Contrast 14.8:1 (Light) / 15.2:1 (Dark) |
| `--color-text-secondary` | `#4B5563` (Charcoal Gray) | `#CBD5E1` (Cool Slate) | Contrast 6.8:1 (Light) / 9.1:1 (Dark) |
| `--color-text-muted` | `#6B7280` (Muted Gray) | `#94A3B8` (Muted Slate) | Contrast 4.6:1 (Light) / 5.2:1 (Dark) |
| `--color-border-subtle` | `#E8ECEA` (Border Base) | `#2D3748` (Slate Border) | Viền phân cách card và form |
| `--color-border-strong` | `#64748B` (Control Border) | `#94A3B8` (Active Border) | Viền input/control cần nhận biết |
| `--color-accent-mint` | `#BDEFA8` (Vibrant Mint) | `#79D35E` (High-Luminance Mint) | Tự điều chỉnh sắc độ trên nền tối |
| `--color-accent-mint-bg` | `#E5F8DC` (Pastel Mint) | `#1A2F1B` (Deep Green Tint) | Nền badge trong Dark Mode |
| `--color-accent-peach` | `#FFE5DA` (Pastel Peach) | `#3D261E` (Warm Bronze Tint) | Nền tag danh mục Warm |
| `--color-accent-lavender` | `#EEE7FF` (Pastel Purple) | `#2C243D` (Deep Purple Tint) | Nền tag danh mục Beauty |
| `--color-accent-sky` | `#E0F2FE` (Pastel Blue) | `#182C3D` (Deep Cyan Tint) | Nền tag danh mục Tech/Global |
| `--color-sale` | `#FF455B` (Sale Surface) | `#FF5C70` (Bright Coral Surface) | Nền badge/non-text; dùng chữ Ink trên Light |
| `--color-sale-text` | `#C81E3A` | `#FF8795` | Giá/nhãn chữ; kiểm contrast theo surface thực tế |
| `--color-sale-bg` | `#FFEAEF` (Pastel Coral) | `#3A1920` (Subtle Crimson) | Nền badge deal hot |
| `--color-focus-ring` | `#15803D` (Solid Ring) | `#86EFAC` (Bright Glow Ring) | Viền focus bàn phím 2px kèm outline offset |

---

### 2.3. Khai báo CSS Custom Properties (ánh xạ utility chỉ để tham khảo)

```css
:root {
  --color-canvas: #F8F9F7;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #F3F4F6;
  --color-surface-elevated: #FFFFFF;
  --color-text-primary: #101418;
  --color-text-secondary: #4B5563;
  --color-text-muted: #6B7280;
  --color-border-subtle: #E8ECEA;
  --color-border-strong: #64748B;
  --color-control-border: #64748B;
  --color-accent-mint: #BDEFA8;
  --color-accent-mint-bg: #E5F8DC;
  --color-accent-peach: #FFE5DA;
  --color-accent-lavender: #EEE7FF;
  --color-accent-sky: #E0F2FE;
  --color-sale: #FF455B;
  --color-sale-text: #C81E3A;
  --color-sale-bg: #FFEAEF;
  --color-focus-ring: #15803D;
  --header-height-desktop: 76px;
  --header-height-desktop-sticky: 64px;
  --header-height-mobile: 56px;
  --bottom-nav-height: 60px;
}

:root[data-theme="dark"],
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-canvas: #0E1217;
    --color-surface: #171C23;
    --color-surface-subtle: #1E252E;
    --color-surface-elevated: #232B36;
    --color-text-primary: #F8F9FA;
    --color-text-secondary: #CBD5E1;
    --color-text-muted: #94A3B8;
    --color-border-subtle: #2D3748;
    --color-border-strong: #94A3B8;
    --color-control-border: #94A3B8;
    --color-accent-mint: #79D35E;
    --color-accent-mint-bg: #1A2F1B;
    --color-accent-peach: #3D261E;
    --color-accent-lavender: #2C243D;
    --color-accent-sky: #182C3D;
    --color-sale: #FF5C70;
    --color-sale-text: #FF8795;
    --color-sale-bg: #3A1920;
    --color-focus-ring: #86EFAC;
  }
}
```

---

## 3. Hệ Thống Typography (Typography Tokens)

### 3.1. Phông Chữ Tiêu Chuẩn
- **Display & Heading Font:** `Be Vietnam Pro` (Google Fonts)  
  *Lý do:* Thiết kế tối ưu chuyên biệt cho hệ ký tự tiếng Việt với dấu thanh mở rộng, không bị cắt dấu hoặc lệch trục ngang (vertical metric cân bằng hoàn hảo).
- **Body & UI Font:** `Inter` kết hợp `Be Vietnam Pro`  
  *Fallback:* `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`.
- **Tabular / Monospace Font (Số tiền & Bộ đếm giờ):** `JetBrains Mono` hoặc `Inter` với tính năng `font-variant-numeric: tabular-nums lining-nums`.  
  *Lý do:* Giữ các chữ số có chiều rộng đồng nhất, ngăn chặn việc giật layout khi số đếm ngược thay đổi theo từng giây.

---

### 3.2. Bảng Thang Đo Typography (Type Scale)

| Token | Cỡ chữ (Desktop / Mobile) | Line Height | Font Weight | Letter Spacing | Ngữ cảnh sử dụng |
|:---|:---|:---|:---|:---|:---|
| `font-display-hero` | `56px` / `38px` | `1.15` (64px) | `800` (ExtraBold) | `-0.03em` | Headline chính trang chủ (Hero section) |
| `font-h1` | `40px` / `30px` | `1.2` (48px) | `700` (Bold) | `-0.025em` | Tên danh mục lớn, trang chi tiết sản phẩm |
| `font-h2` | `30px` / `24px` | `1.25` (38px) | `700` (Bold) | `-0.02em` | Tiêu đề khối section ("Deal hot hôm nay") |
| `font-h3` | `24px` / `20px` | `1.3` (32px) | `600` (SemiBold) | `-0.015em` | Tiêu đề card lớn, tiêu đề giỏ hàng |
| `font-h4` | `20px` / `18px` | `1.35` (28px) | `600` (SemiBold) | `-0.01em` | Tên sản phẩm trên card chuẩn |
| `font-h5` | `17px` / `16px` | `1.4` (24px) | `600` (SemiBold) | `0` | Nhóm danh mục phụ, label filter |
| `font-h6` | `15px` / `14px` | `1.4` (22px) | `600` (SemiBold) | `0` | Tiêu đề nhỏ trong bảng thông số kỹ thuật |
| `font-body-large` | `17px` / `16px` | `1.55` (26px) | `400` / `500` | `0` | Mô tả ngắn hero, đoạn giới thiệu chính |
| `font-body-base` | `15px` / `14px` | `1.5` (22px) | `400` / `500` | `0` | Văn bản chính, mô tả sản phẩm, bình luận |
| `font-body-small` | `13px` / `12px` | `1.45` (18px) | `400` / `500` | `+0.01em` | Thông tin cam kết, nhãn phụ, ngày giờ |
| `font-caption` | `11px` / `11px` | `1.35` (15px) | `600` (SemiBold) | `+0.02em` | Tag trạng thái, nhãn badge nhỏ, footer note |
| `font-tabular-price` | `22px` / `18px` | `1.2` (26px) | `700` (Bold) | `-0.01em` | Số tiền bán VND (`1.490.000₫`) |
| `font-tabular-timer` | `18px` / `16px` | `1` (18px) | `700` (Bold) | `0` | Khối đếm ngược `02 : 15 : 36 : 21` |

---

## 4. Hệ Thống Khoảng Cách & Bố Cục (Spacing & Layout Tokens)

### 4.1. Thang Đo Khoảng Cách (4px / 8px Base Scale)

Mọi padding, margin và gap đều dựa trên bội số của 4px và 8px:

```
[4px]  [8px]  [12px] [16px] [20px] [24px] [32px] [40px] [48px] [64px] [80px]
  1      2       3      4      5      6      8     10     12     16     20
```

| Token | Giá trị | Tailwind Class | Trường hợp sử dụng điển hình |
|:---|:---|:---|:---|
| `space-0.5` | `2px` | `p-0.5`, `gap-0.5` | Viền focus offset, micro gap giữa icon và badge dot |
| `space-1` | `4px` | `p-1`, `gap-1` | Khoảng cách icon star đến số rating |
| `space-2` | `8px` | `p-2`, `gap-2` | Padding nút icon, gap giữa các coupon tag |
| `space-3` | `12px` | `p-3`, `gap-3` | Padding trong của input pill, gap của price row |
| `space-4` | `16px` | `p-4`, `gap-4` | Padding chuẩn của Product Card body, gutter mobile |
| `space-5` | `20px` | `p-5`, `gap-5` | Padding của Deal Card nổi bật |
| `space-6` | `24px` | `p-6`, `gap-6` | Padding Modal Dialog, gap giữa các cột grid desktop |
| `space-8` | `32px` | `p-8`, `gap-8` | Khoảng cách giữa các khối tính năng |
| `space-10` | `40px` | `py-10` | Margin trên dưới của banner quảng cáo |
| `space-12` | `48px` | `py-12` | Khoảng cách giữa các Section chính trên desktop |
| `space-16` | `64px` | `py-16` | Khoảng thở cho Hero section |
| `space-20` | `80px` | `py-20` | Khoảng thở footer và separator lớn |

---

### 4.2. Khung Chứa & Hệ Lưới (Containers & 12-Column Grid)

- **Storefront canonical container:** `1360px`; mọi trang public dùng cùng max-width để Header/Hero/PLP/PDP thẳng trục.
- **Admin canonical container:** `1600px`; bảng rộng được overflow cục bộ khi cần.
- **Breakpoints Matrix:**

| Mã Breakpoint | Chiều rộng Viewport | Số cột Grid | Lề trang (Margin) | Gutter (Khoảng cách cột) |
|:---|:---|:---|:---|:---|
| `mobile-s` | `375px` | 4 cột | `16px` | `12px` |
| `mobile-m` | `430px` (iPhone 15 Pro Max) | 4 cột | `16px` | `12px` |
| `tablet` | `768px` (iPad Mini) | 8 cột | `24px` | `16px` |
| `laptop-sm` | `1024px` (iPad Pro / Desktop nhỏ) | 12 cột | `32px` | `20px` |
| `desktop` | `1280px` (Standard Monitor) | 12 cột | `32px` | `24px` |
| `desktop-lg`| `1440px` (MacBook Pro 16") | 12 cột | Auto (`max 1360px`) | `24px` |
| `ultrawide` | `1920px` (Full HD / Màn rộng) | 12 cột | Auto (`max 1360px`) | `24px` |

---

## 5. Bo Góc & Hệ Đổ Bóng (Radius & Elevation Tokens)

### 5.1. Token Bo Góc (Border Radius)

```
[ Inner 8px ] ---> [ Card 16-24px ] ---> [ Pill 9999px ]
(Tag / Button)     (Product / Banner)     (CTA / Search / Filter)
```

| Token | Giá trị | Tailwind Class | Ứng dụng |
|:---|:---|:---|:---|
| `radius-xs` | `4px` | `rounded-xs` | Tooltip nhỏ, checkbox indicator |
| `radius-sm` | `8px` | `rounded-lg` | Bộ đếm số lượng (+/-), thumbnail ảnh nhỏ |
| `radius-md` | `12px` | `rounded-xl` | Icon container hình vuông mềm, dropdown menu item |
| `radius-lg` | `16px` | `rounded-2xl` | Product Card chuẩn, Deal Card nhỏ, Toast notification |
| `radius-xl` | `24px` | `rounded-3xl` | Hero Feature Card, Banner lớn, Modal Dialog |
| `radius-full` | `9999px` | `rounded-full` | Nút CTA hình con nhộng (Pill Button), Search Bar, Avatar, Discount Badge |

---

### 5.2. Hệ Đổ Bóng Pastel Phân Lớp (Layered Pastel Shadows)

Để tạo hiệu ứng chiều sâu cao cấp và mềm mại như bản vẽ tham chiếu, hệ thống sử dụng kỹ thuật **Double Layer Shadow** (kết hợp bóng màu trung tính và bóng mờ ánh pastel):

```css
/* Elevation 0: Flat có viền tối giản */
--shadow-0: none;

/* Elevation 1: Thẻ sản phẩm trạng thái tĩnh */
--shadow-1: 0 2px 6px -1px rgba(16, 20, 24, 0.04), 
            0 8px 16px -2px rgba(16, 20, 24, 0.03);

/* Elevation 2: Thẻ sản phẩm khi Hover (nâng cao, ánh pastel nhẹ) */
--shadow-2: 0 10px 25px -4px rgba(16, 20, 24, 0.06), 
            0 6px 12px -2px rgba(189, 239, 168, 0.35); /* Ánh Mint mềm */

/* Elevation 3: Dropdown autocomplete, Popover chọn voucher */
--shadow-3: 0 14px 34px -6px rgba(16, 20, 24, 0.09), 
            0 4px 10px -1px rgba(16, 20, 24, 0.04);

/* Elevation 4: Modal Popup, Mini Cart Drawer trượt từ phải sang */
--shadow-4: 0 24px 50px -10px rgba(16, 20, 24, 0.16), 
            0 12px 24px -4px rgba(16, 20, 24, 0.08);

/* Elevation 5: Widget CutTay AI Chatbot nổi góc màn hình */
--shadow-5: 0 20px 40px -8px rgba(16, 20, 24, 0.14),
            0 8px 20px 0px rgba(189, 239, 168, 0.45); /* Ánh xanh CutTay AI */
```

---

## 6. Chuyển Động & Hiệu Ứng Tương Tác (Motion Tokens)

### 6.1. Thời Gian & Đường Cong Chuyển Động (Duration & Easing)

| Token | Giá trị | Đường cong Cubic-Bezier | Ứng dụng |
|:---|:---|:---|:---|
| `motion-fast` | `150ms` | `cubic-bezier(0.4, 0, 0.2, 1)` | Đổi màu text hover, tooltip xuất hiện, icon xoay |
| `motion-base` | `250ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` (Spring Ease) | Scale nút khi bấm, card nâng lên khi hover |
| `motion-gentle` | `400ms` | `cubic-bezier(0.16, 1, 0.3, 1)` (Smooth Decel) | Modal bung mở, drawer trượt, accordion xổ xuống |
| `motion-bounce` | `450ms` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Trái tim Wishlist đập nhẹ, thêm giỏ hàng thành công |

---

### 6.2. Micro-interactions Chi Tiết

1. **Button Tap Effect:**
   - Active: `transform: scale(0.97);` trong `100ms`.
2. **Product Card Hover:**
   - Hover: `transform: translateY(-4px); box-shadow: var(--shadow-2);` trong `250ms`.
   - Ảnh sản phẩm bên trong: `transform: scale(1.04); transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1);`.
3. **Wishlist Heart Toggle:**
   - Khi click active: Scale lên `1.28` kết hợp xoay `-8deg`, sau đó nảy về `1.0` với màu đỏ `#FF455B`.
4. **Hỗ trợ `prefers-reduced-motion`:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 7. Quy Tắc Ứng Dụng Đồ Họa Cảm Xúc (Doodles & Accents)

Để hiện thực hóa phong cách **Playful & Friendly** như ảnh tham chiếu thiết kế:
- **Pill Highlight:** Nhãn chữ nổi bật như *"ở ngay đây"* hoặc *"Giảm 50%"* được lồng trong một khối pill nền xanh mint `#BDEFA8` hoặc cam đào `#FFE5DA` với bo góc `9999px`, padding `2px 14px`.
- **Doodle Elements:** Sử dụng SVG vector mảnh (stroke width `2px`, màu Primary Ink `#101418` hoặc Mint `#BDEFA8`):
  - Dấu sao 4 cánh mềm mại bên cạnh tiêu đề.
  - Mũi tên uốn cong chỉ từ slogan sang nút CTA.
  - Vệt gợn sóng trang trí (squiggly underline) dưới từ khóa khuyến mãi.
- **Quy tắc kiểm soát thị giác:** Không lạm dụng quá 2 chi tiết doodle trên một màn hình viewport để duy trì tính cao cấp, tránh cảm giác lộn xộn.

---

## 8. Token Bổ Sung & Nguồn Sự Thật Responsive

### 8.1. Breakpoint, container và content measure

| Token | Giá trị | Quy tắc |
| :--- | :--- | :--- |
| `--bp-sm` | `375px` | Điện thoại nhỏ; thiết kế mặc định vẫn mobile-first |
| `--bp-md` | `768px` | Tablet portrait |
| `--bp-lg` | `1024px` | Tablet landscape / laptop nhỏ |
| `--bp-xl` | `1440px` | Desktop chuẩn |
| `--bp-2xl` | `1920px` | Desktop rộng; không kéo giãn nội dung vô hạn |
| `--container-max` | `1360px` | Nguồn sự thật cho storefront; viewport 1440px có gutter 40px mỗi bên |
| `--admin-container-max` | `1600px` | Bảng quản trị cần mật độ cao hơn |
| `--measure-prose` | `72ch` | Blog, chính sách, FAQ |

Gutter: `16px` tại 375–767, `24px` tại 768–1023, `32px` tại 1024–1439, `40px` từ 1440 trở lên. Homepage tablet dùng **một cột cho hero chính**, hai promo card thành hàng hai cột; không dùng biến thể “hero hai cột cân bằng”.

### 8.2. Z-index, icon, control và media

| Nhóm | Token → Giá trị |
| :--- | :--- |
| Z-index | `base:0`, `raised:10`, `sticky:100`, `dropdown:300`, `drawer:500`, `modal:700`, `toast:800`, `skip-link:900` |
| Header & Nav | `--header-height-desktop: 76px` (sticky `64px`), `--header-height-mobile: 56px`, `--bottom-nav-height: 60px`; `scroll-padding-top` và `scroll-padding-bottom` tham chiếu trực tiếp |
| Icon | `xs:16px`, `sm:20px`, `md:24px`, `lg:32px`, `xl:40px`; cùng một surface dùng outline SVG stroke `1.75–2px` |
| Control height | `sm:36px`, `md:44px`, `lg:52px`; vùng bấm mobile tối thiểu `44×44px` dù glyph nhỏ hơn |
| Product image | card `1:1`, gallery `4:5`, compact row `1:1` |
| Banner image | hero lifestyle `16:10`, promo `16:7`, editorial collection `3:2`, blog thumbnail `16:9` |

Icon cấu trúc dùng một họ SVG nhất quán (ưu tiên Phosphor hoặc Lucide khi triển khai), không dùng emoji. Doodle là SVG trang trí `aria-hidden="true"`. Font viết tay chỉ dùng cho sticker/kicker ngắn; dùng asset SVG hoặc font đã xác minh đủ glyph, không dùng cho nội dung chức năng.

### 8.3. Semantic colors đã kiểm tra

| Vai trò | Token | Giá trị | Dùng cho |
| :--- | :--- | :--- | :--- |
| Text muted | `--color-text-muted` | `#6B7280` (Light) / `#94A3B8` (Dark) | Giá gạch ngang, caption (4.6:1 trên trắng; cấm dùng `#9CA3AF` do chỉ đạt 2.5:1) |
| Text secondary | `--color-text-secondary` | `#4B5563` (Light) / `#CBD5E1` (Dark) | Text phụ, nhãn trên surface-subtle (6.8:1 trên trắng, 6.3:1 trên xám `#F3F4F6`) |
| Sale surface | `--color-sale` | `#FF455B` | Nền badge với chữ `#101418` (5.51:1), icon/đồ họa lớn |
| Sale text | `--color-sale-text` | `#C81E3A` | Giá/nhãn chữ trên nền trắng (5.67:1) |
| Focus ring | `--color-focus-ring` | `#15803D` | Focus trên nền trắng (5.02:1) |
| Control boundary | `--color-control-border` | `#64748B` | Viền input/control cần nhận biết (4.76:1) |
| Error | `--color-error` | `#B42318` | Text lỗi + icon, không chỉ dùng màu |
| Warning | `--color-warning` | `#92400E` | Text cảnh báo trên nền sáng |
| Info | `--color-info` | `#075985` | Text trạng thái thông tin |

Các ratio trên được tính bằng công thức relative luminance WCAG; phải kiểm lại bằng công cụ tự động trên UI render thật ở M1/M2.
