# Quy Chuẩn Responsive & Trợ Năng (Responsive & Accessibility Standards)

> **Dự án:** CutTayShop - ASP  
> **Tài liệu:** `docs/design/07_RESPONSIVE_AND_ACCESSIBILITY.md`  
> **Tiêu chuẩn áp dụng:** WCAG 2.2 Level AA, Mobile-First Web Responsive, Touch & Safe Area Guidelines

---

## 1. Ma Trận Bố Cục Thích Ứng (Responsive Layout Matrix)

CutTayShop được xây dựng dựa trên nguyên lý **Mobile-First**, đảm bảo mọi trang từ Trang chủ, Danh mục, Chi tiết sản phẩm đến Giỏ hàng và Thanh toán đều thích ứng trơn tru từ màn hình nhỏ nhất đến màn hình siêu rộng.

```
[ Mobile 375px ] ---> [ Tablet 768px ] ---> [ Laptop 1024px ] ---> [ Desktop 1440px ]
 (1-2 Cột Card)        (3 Cột Card)          (4 Cột Card)            (5 Cột Card)
 (Bottom Nav Bar)     (Sidebar rút gọn)     (Header chuẩn)          (Container Max 1360)
```

### 1.1. Bảng Ma Trận Phân Phối Layout Theo Breakpoints

| Thành phần UI | Mobile S/M (375px - 430px) | Tablet (768px - 1023px) | Laptop nhỏ (1024px - 1279px) | Desktop Chuẩn (1440px+) |
|:---|:---|:---|:---|:---|
| **Số cột Lưới (Grid)** | 4 Cột, margin `16px`, gutter `12px` | 8 Cột, margin `24px`, gutter `16px` | 12 Cột, margin `32px`, gutter `20px` | 12 Cột, canh giữa `max-width:1360px`, gutter `24px` |
| **Thẻ Sản Phẩm (Grid Cards)** | 2 Cột (tối ưu lướt ngón tay cái) | 3 Cột | 4 Cột | 5 Cột (hoặc 4 cột kèm banner bên) |
| **Thanh Điều Hướng** | Top Bar mobile cao `56px` (`--header-height-mobile`) + Bottom Bar đáy màn hình `60px` (`--bottom-nav-height`) | Top Bar thu gọn + Menu Hamburger | Full Navbar + Search pill `380px` | Full Navbar + Search pill `520px` + Trợ lý AI mở rộng |
| **Hero Section** | Xếp chồng 1 cột dọc (Headline `38px` theo token mobile, ảnh dưới) | Hero chính 1 cột; hai promo card thành hàng 2 cột bên dưới | 2 Cột bất đối xứng (Hero chính 8/12, promo 4/12) | Grid 12 cột hoàn chỉnh như ảnh mẫu tham chiếu |
| **Danh Mục (Category Pills)** | Thanh vuốt ngang (`overflow-x: auto` ẩn scrollbar) | Grid 5 cột x 2 hàng | Grid 10 cột trên 1 hàng ngang | 10 Khối tròn pastel phân bổ đều |
| **Drawer Giỏ Hàng** | Chiếm `100vw` toàn màn hình | Chiếm `420px` cạnh phải | Chiếm `460px` cạnh phải | Chiếm `480px` cạnh phải |
| **Bộ Lọc Danh Mục (Filter)** | Nút bấm mở Drawer trượt từ dưới lên (Bottom Sheet) | Sidebar bên trái có thể thu gọn | Sidebar trái cố định `260px` | Sidebar trái rộng rãi `280px` |
| **Khối Giá & Nút Mua (Product Page)**| Cố định đáy màn hình (Sticky Bottom Buy Bar) | Khung mua hàng nằm cạnh ảnh sản phẩm | Khung mua hàng nổi cố định khi cuộn | Khung thông tin mua hàng cao cấp |

---

## 2. Quy Tắc Triệt Tiêu Cuộn Ngang & An Toàn Vùng Cảm Ứng (Safe Areas)

### 2.1. Quy Tắc Tuyệt Đối: Không Bao Giờ Xuất Hiện Thanh Cuộn Ngang (Zero Horizontal Scroll)
Thanh cuộn ngang ngoài ý muốn trên thiết bị di động phá vỡ hoàn toàn tính thẩm mỹ và gây ức chế người dùng.

- **Khai báo Meta Viewport chuẩn:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
```

- **CSS Reset Bắt buộc:**
```css
html { box-sizing: border-box; }
body { margin: 0; }

*, *::before, *::after {
  box-sizing: inherit;
}

/* Đảm bảo hình ảnh và video không bao giờ tràn khung cha */
img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  max-width: 100%;
  height: auto;
}
```

- **Kỹ thuật chống vỡ layout bảng và chữ dài:**
  - Tiêu đề sản phẩm dài: Sử dụng `-webkit-line-clamp: 2; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical;`.
  - Mã đơn hàng / SKU: Sử dụng `word-break: break-all;` hoặc `text-overflow: ellipsis;`.
  - Bảng thông số kỹ thuật trên di động: Bọc trong container có class `.overflow-x-auto` cục bộ, không ảnh hưởng toàn trang.

---

### 2.2. Xử Lý Vùng An Toàn Màn Hình Khuyết (Safe Area Insets)
Hỗ trợ hoàn hảo các dòng iPhone có Notch / Dynamic Island và thanh Home Indicator:

```css
:root {
  --sat: env(safe-area-inset-top, 0px);
  --sar: env(safe-area-inset-right, 0px);
  --sab: env(safe-area-inset-bottom, 0px);
  --sal: env(safe-area-inset-left, 0px);
}

/* Áp dụng cho Mobile Bottom Navigation Bar */
.cut-tay-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(var(--bottom-nav-height, 60px) + var(--sab));
  padding-bottom: var(--sab);
  z-index: 50;
}

/* Áp dụng khoảng đệm đỉnh và đáy trang tránh bị che bởi Top Bar cố định và Bottom Bar:
   Đỉnh: 56px Top Bar + safe-area-top.
   Đáy: 60px Bottom Bar + safe-area-bottom + 16px khoảng thở an toàn. */
.main-content-mobile-wrapper {
  padding-top: calc(var(--header-height-mobile, 56px) + var(--sat));
  padding-bottom: calc(var(--bottom-nav-height, 60px) + var(--sab) + 16px);
}
```

---

### 2.3. Vùng Chạm Mục Tiêu Tối Thiểu (Minimum Touch Target Size)
- Mục tiêu UX của CutTayShop là **`44px x 44px`**, cao hơn ngưỡng tối thiểu 24 CSS px (hoặc ngoại lệ spacing) của WCAG 2.2 SC 2.5.8:
  - Mọi nút bấm, icon button (Wishlist heart, nút xóa, nút đóng modal, nút số lượng `+/-`) có vùng bấm tối thiểu **`44px x 44px`** trên thiết bị cảm ứng di động.
  - Trường hợp icon nhỏ hơn (ví dụ icon `20px`), sử dụng padding hoặc pseudo-element `::after` mở rộng vùng nhận cảm ứng (hit area) ra `44px`.

---

## 3. Kiểm Định Độ Tương Phản Màu Sắc (WCAG 2.2 AA Contrast Audit)

Theo WCAG 2.2 Level AA:
- **Văn bản thường (Normal text, < 18pt hoặc < 14pt bold):** Tỉ lệ tương phản tối thiểu **`4.5:1`**.
- **Văn bản lớn (Large text, >= 18pt hoặc >= 14pt bold):** Tỉ lệ tương phản tối thiểu **`3.0:1`**.
- **Thành phần giao diện & Đồ họa (UI Components & Graphical Objects):** Tỉ lệ tối thiểu **`3.0:1`**.

### Bảng Kiểm Tra Thực Tế Của CutTay Design System:

| Cặp Màu Kiểm Định | Màu Chữ / Đối tượng | Nền (Background) | Tỉ Lệ Tương Phản (Ratio) | Đánh Giá WCAG 2.2 AA |
|:---|:---|:---|:---|:---|
| **Chữ Chính trên Nền Trang** | Ink `#101418` | Soft BG `#F8F9F7` | **`14.8:1`** | Đạt xuất sắc (Vượt chuẩn AAA) |
| **Chữ Chính trên Card Trắng** | Ink `#101418` | Surface `#FFFFFF` | **`15.9:1`** | Đạt xuất sắc (Vượt chuẩn AAA) |
| **Chữ Phụ (Secondary)** | Charcoal `#4B5563` | Surface `#FFFFFF` | **`6.8:1`** | Đạt chuẩn AA cho mọi cỡ chữ |
| **Chữ Phụ trên Nền Xám (Surface Subtle)** | Charcoal `#4B5563` | Subtle `#F3F4F6` | **`6.3:1`** | Bắt buộc dùng secondary; không dùng `#6B7280` (chỉ 4.40:1) |
| **Chữ Muted (Thông tin ngày/giờ)**| Gray `#6B7280` | Surface `#FFFFFF` | **`4.6:1`** | Đạt chuẩn AA cho văn bản thường |
| **Giá Gốc Gạch Ngang** | Muted Gray `#6B7280` (`--color-text-muted`) | Surface `#FFFFFF` | **`4.6:1`** | Đạt chuẩn AA; cấm dùng `#9CA3AF` do chỉ đạt 2.5:1 |
| **Nút CTA Primary** | Chữ Trắng `#FFFFFF` | Nút Ink `#101418` | **`15.9:1`** | Đạt xuất sắc |
| **Giá Bán Khuyến Mãi** | Sale Text `#C81E3A` | Surface `#FFFFFF` | **`5.67:1`** | Đạt AA cho chữ thường |
| **Sale Red gốc (không dùng làm chữ thường)** | Sale Surface `#FF455B` | Surface `#FFFFFF` | **`3.36:1`** | Chỉ dùng text lớn/non-text; badge dùng chữ Ink |
| **Pill Highlight "ở ngay đây"** | Ink `#101418` | Mint Accent `#BDEFA8` | **`11.2:1`** | Đạt xuất sắc |
| **Chữ Đen trên Thẻ Cam Đào** | Ink `#101418` | Peach Warm `#FFE5DA` | **`13.5:1`** | Đạt xuất sắc |
| **Viền Khung Nhập Liệu (Input)**| Control Border `#64748B` | Surface `#FFFFFF` | **`4.76:1`** | Đạt chuẩn UI Component (>= 3:1) |
| **Focus Ring Xanh Lá** | Focus `#15803D` | Surface `#FFFFFF` | **`5.02:1`** | Đạt tương phản trạng thái; vẫn kiểm trên từng nền thực tế |
| **Dark Mode: Chữ Chính** | White `#F8F9FA` | Dark Slate `#0E1217` | **`15.2:1`** | Đạt xuất sắc AAA |
| **Dark Mode: Giá Khuyến Mãi** | Bright Coral `#FF5C70`| Surface Dark `#171C23`| **`4.82:1`** | Đạt chuẩn AA |
| **Dark Mode: Giá Gốc Gạch Ngang** | Slate `#94A3B8` (`--color-text-muted`) | Surface Dark `#171C23` | **`5.2:1`** | Đạt chuẩn AA trên Dark Mode |
| **Dark Mode: Phân Lớp Surface** | Elevated `#232B36` / `#171C23` | Canvas Dark `#0E1217` | **`>= 3:1`** | Tách lớp rõ ràng cho card, modal, dropdown |

---

## 4. Điều Hướng Bàn Phím & Quản Lý Điểm Nhìn (Keyboard & Focus Management)

Hệ thống cho phép người dùng khuyết tật vận động hoặc người dùng chuyên nghiệp thao tác mua hàng hoàn toàn không cần chuột:

### 4.1. Liên Kết Bỏ Qua (Skip Links)
Nằm ở đầu trang HTML, ẩn theo mặc định và chỉ xuất hiện khi nhấn phím `Tab` đầu tiên:

```html
<a href="#main-content" class="skip-link">Chuyển đến nội dung chính</a>
<a href="#cart-summary" class="skip-link">Chuyển nhanh đến giỏ hàng</a>
```

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  background: #101418;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 9999px;
  font-weight: 600;
  z-index: 9999;
  transition: top 0.2s ease;
}
.skip-link:focus {
  top: 16px;
  outline: 3px solid var(--color-focus-ring);
}
```

---

### 4.2. Vòng Nổi Bật Tiêu Điểm Bàn Phím (Focus Visible Ring)
- Không bao giờ ẩn `outline` mà không có cơ chế thay thế.
- Chỉ hiển thị khi người dùng tương tác bằng bàn phím (`:focus-visible`), không gây khó chịu cho người bấm chuột.

```css
*:focus-visible {
  outline: 2px solid var(--color-focus-ring) !important;
  outline-offset: 2px !important;
  border-radius: inherit;
}
```

---

### 4.3. Bẫy Tiêu Điểm Trong Hộp Thoại (Focus Trap Logic)
Khi mở Modal xem nhanh sản phẩm, Giỏ hàng trượt (Cart Drawer) hoặc Menu di động:
1. Lưu lại phần tử kích hoạt trước đó (trigger element).
2. Tự động chuyển tiêu điểm vào phần tử tương tác đầu tiên (ví dụ: nút đóng modal hoặc ô nhập số lượng).
3. Khi bấm phím `Tab` ở phần tử cuối cùng, vòng lặp đưa tiêu điểm trở lại phần tử đầu tiên.
4. Bấm `Shift + Tab` ở phần tử đầu tiên đưa về phần tử cuối cùng.
5. Khi đóng modal bằng phím `Escape`, tiêu điểm được hoàn trả chính xác về trigger element ban đầu.

---

## 5. Tối Ưu Hóa Trình Đọc Màn Hình (Screen Reader Optimization)

### 5.1. Vùng Thông Báo Sống Động (ARIA Live Regions)
Trang thương mại điện tử có nhiều dữ liệu cập nhật ngầm không tải lại trang. Các thông báo này cần được thông báo tức thì cho người khiếm thị:

- **Bộ đếm giỏ hàng:**
```html
<div class="cart-badge-container" aria-live="polite" aria-atomic="true">
  <span class="sr-only">Số lượng sản phẩm trong giỏ hàng:</span>
  <span class="cart-count">3</span>
</div>
```

- **Bộ đếm ngược Deal Hot:**
```html
<div role="timer" aria-live="off" aria-label="Thời gian còn lại của deal khuyến mãi">
  <!-- aria-live để off tránh screen reader đọc liên tục từng giây làm tràn âm thanh -->
  <span class="sr-only">Deal kết thúc sau 2 ngày 15 giờ 36 phút</span>
  <span aria-hidden="true">02 : 15 : 36 : 21</span>
</div>
```

- **Thông báo Toast thêm sản phẩm thành công:**
```html
<div role="status" aria-live="polite" aria-atomic="true">
  Đã thêm "Tai nghe AirBuds Pro" vào giỏ hàng thành công.
</div>
```

---

### 5.2. Văn Bản Thay Thế Mô Tả Sản Phẩm (Descriptive Alt Text)
Tránh đặt alt text hời hợt như `alt="ảnh sản phẩm"` hoặc bỏ trống.

- **Quy chuẩn mẫu:**
  - *Tốt:* `alt="Tai nghe chụp tai chống ồn không dây màu trắng bạc, phiên bản AirBuds Pro chính hãng"`
  - *Tốt:* `alt="Đồng hồ thông minh mặt vuông hiển thị 10:09, dây đeo silicone màu xanh rêu"`
  - *Ảnh icon hoặc chi tiết trang trí thuần túy (Doodle, sao, sóng):* Sử dụng `aria-hidden="true"` hoặc `alt=""`.

---

### 5.3. Trạng Thái Mở Rộng & Điều Khiển (State Attributes)
- **Menu Dropdown / Accordion:**
  - `aria-haspopup="true"`
  - `aria-expanded="false"` (khi đóng) và `aria-expanded="true"` (khi mở)
  - `aria-controls="menu-category-dropdown"`
- **Đánh giá sao:**
```html
<div role="img" aria-label="Được đánh giá 4.8 trên 5 sao từ 1200 khách hàng">
  <span aria-hidden="true">★ 4.8 (1.2k)</span>
</div>
```

---

## 6. Danh Mục Kiểm Tra Trợ Năng Tự Động & Thủ Công (Accessibility Checklist)

| Mục Kiểm Tra | Phương Pháp Kiểm Tra | Tiêu Chuẩn Đạt |
|:---|:---|:---|
| Không lỗi tự động Lighthouse / Axe-core | Chạy Lighthouse Accessibility Audit | Điểm số >= 98/100 |
| Điều hướng không cần chuột | Dùng phím `Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc` | Thao tác 100% quy trình mua hàng |
| Đọc màn hình Windows & Mac | Trải nghiệm với NVDA (Windows) và VoiceOver (macOS/iOS) | Mọi nút bấm, giá tiền, biến thể đều được xướng âm rõ ràng |
| Zoom chữ 200% | Phóng to văn bản trình duyệt lên 200% | Không vỡ khối chữ, không tràn ngang màn hình |
| Chế độ tương phản cao của OS | Bật Windows High Contrast Mode | Giao diện tự động hiển thị viền rõ ràng quanh các khối tương tác |

### 6.1. Ma trận viewport và chế độ bắt buộc

Kiểm tra ở `375`, `430`, `768`, `1024`, `1440`, `1920` CSS px; thêm mobile landscape, zoom 200%, reflow ở chiều rộng tương đương 320 CSS px, `prefers-reduced-motion`, Windows forced colors và bàn phím-only. Tại 1920px nội dung storefront dừng ở `1360px`; khoảng trắng hai bên tăng thay vì kéo giãn card.

### 6.2. Form, lỗi và focus không bị che

- Mỗi input có `<label>` hiển thị; hint/error nối bằng `aria-describedby`, `aria-invalid="true"` khi lỗi.
- Submit thất bại giữ lỗi inline và đưa focus tới error summary `role="alert" tabindex="-1"`; mỗi mục summary liên kết đến field lỗi.
- Sticky header, bottom navigation và CutTay AI không được che hoàn toàn phần tử đang focus; dùng `scroll-padding-top`, `scroll-padding-bottom` và tự thu gọn widget khi cần.
- Không chặn paste/password manager ở đăng nhập; không dựa vào bài kiểm tra ghi nhớ/cognitive-only challenge.
- Carousel/video tự chạy (nếu có) phải có pause/stop; reduced-motion tắt chuyển động không thiết yếu.

### 6.3. Overflow

Không dùng `overflow-x: hidden` toàn trang để che lỗi. Chỉ component có chủ đích như category rail dùng `overflow-x:auto`; mọi overflow ngoài ý muốn phải được tìm và sửa tại nguồn (width, transform, media hoặc long text).
