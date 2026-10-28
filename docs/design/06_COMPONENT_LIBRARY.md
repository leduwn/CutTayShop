# CutTay Component Library v1

> **Phiên bản:** 1.0.0  
> **Ngôn ngữ:** Tiếng Việt & HTML/CSS/ARIA Specs  
> **Hệ thống gốc:** CutTay Design System v1

Tài liệu này quy chuẩn toàn bộ thành phần giao diện (UI Components) tái sử dụng cho nền tảng thương mại điện tử **CutTayShop**, đảm bảo tính đồng bộ, thẩm mỹ hiện đại playful và khả năng tiếp cận WCAG 2.2 AA.

---

## 1. Hệ Thống Nút Bấm (Button Components)

### 1.1. Pill Primary Button
Nút hành động chính (Primary CTA) như *"Mua ngay"*, *"Thanh toán"*, *"Đăng nhập"*.

```
+------------------------------------------+
|  Mua ngay                           ->   |  (Radius: 9999px)
+------------------------------------------+
```

- **Visual Specs:**
  - Shape: Bo tròn tuyệt đối (`border-radius: 9999px`).
  - Kích thước:
    - **Large (Hero CTA):** Height `52px`, Padding `0 32px`, Font size `16px`, Font weight `600`, Icon `20px`.
    - **Medium (Standard CTA):** Height `44px`, Padding `0 24px`, Font size `15px`, Font weight `600`, Icon `18px`.
    - **Small (Card action):** Height `36px`, Padding `0 16px`, Font size `13px`, Font weight `600`, Icon `16px`.
  - Icon: Nằm phía bên phải nhãn chữ, cách nhãn `8px`.
- **CSS Tokens & Colors:**
  - Background: `var(--color-text-primary)` (`#101418` Light / `#F8F9FA` Dark)
  - Text Color: `#FFFFFF` (Light) / `#101418` (Dark)
  - Shadow: `0 4px 12px rgba(16, 20, 24, 0.12)`
- **States Matrix:**
  - *Default:* Nền `#101418`, chữ trắng.
  - *Hover:* Nền `#2D3748`, `transform: translateY(-2px)`, shadow tăng lên `var(--shadow-2)`.
  - *Active:* `transform: scale(0.97)`, nền `#000000`.
  - *Focus-visible:* Outline `2px solid var(--color-focus-ring)`, outline-offset `2px`.
  - *Disabled:* Nền `#E5E7EB`, chữ `#9CA3AF`, cursor `not-allowed`, không shadow.
  - *Loading:* Chữ ẩn hoặc mờ `opacity: 0.7`, spinner quay giữa tâm.
- **Accessibility:**
  - Hành động dùng `<button type="button|submit">`; điều hướng dùng `<a href="...">` và giữ semantics link. Không gắn `role="button"` lên link chỉ để đổi kiểu dáng.
  - Nút native dùng thuộc tính `disabled`; thêm `aria-busy="true"` khi loading.
  - Button hỗ trợ `Enter`/`Space`; link hỗ trợ `Enter` theo hành vi native.

---

### 1.2. Pill Outline Button
Nút thứ cấp bổ trợ như *"Xem video"*, *"Xem chi tiết"*, *"Tiếp tục mua sắm"*.

- **Visual Specs:**
  - Border: `1.5px solid var(--color-text-primary)`.
  - Background: Trong suốt (`transparent`).
  - Text Color: `var(--color-text-primary)`.
- **States Matrix:**
  - *Default:* Border `#101418`, chữ `#101418`.
  - *Hover:* Nền `#F3F4F6`, border `#101418`.
  - *Active:* Nền `#E5E7EB`, `transform: scale(0.98)`.
  - *Focus-visible:* Ring `2px solid var(--color-focus-ring)`, offset `2px`.
  - *Disabled:* Border `#D1D5DB`, chữ `#9CA3AF`.

---

### 1.3. Ghost Button
Nút điều hướng mềm không viền (Nav link dạng nút, hủy thao tác).

- **Visual Specs:**
  - Background: `transparent`, không border.
  - Text Color: `var(--color-text-secondary)`.
  - Padding: `8px 16px`, Radius `9999px`.
- **States Matrix:**
  - *Default:* Chữ xám đậm, nền trong suốt.
  - *Hover:* Nền `rgba(16, 20, 24, 0.05)`, chữ `var(--color-text-primary)`.
  - *Active:* Nền `rgba(16, 20, 24, 0.09)`.

---

### 1.4. Icon Button (Nút Icon Tròn)
Dùng cho Wishlist Heart trên card, Nút đóng Modal, Nút chia sẻ, Nút tìm kiếm icon.

- **Visual Specs:**
  - Shape: Hình tròn hoàn hảo (`aspect-ratio: 1/1; border-radius: 50%`).
  - Kích thước thị giác: `36px x 36px` trên Card hoặc `44px x 44px` ở Header/Nav; hit area của bản 36px phải mở rộng thành tối thiểu `44px x 44px` và không chồng target kế cận.
  - Background: `rgba(255, 255, 255, 0.9)` (Light) / `rgba(23, 28, 35, 0.9)` (Dark, `var(--color-surface)` mờ) với `backdrop-filter: blur(8px)`.
  - Border: `1px solid var(--color-border-subtle)`.
  - Shadow: `0 2px 8px rgba(16, 20, 24, 0.08)` (Light) / `0 2px 8px rgba(0, 0, 0, 0.35)` (Dark).
- **Biến thể Wishlist Heart:**
  - *Chưa thích (Default):* Stroke icon tim màu `var(--color-text-secondary)` (`#4B5563` Light / `#CBD5E1` Dark), fill trong suốt.
  - *Đã thích (Active):* Stroke và fill màu `#FF455B`, hiệu ứng nảy tim (`motion-bounce`).
- **Accessibility:** Bắt buộc có thuộc tính `aria-label` mô tả rõ ràng (ví dụ: `aria-label="Thêm vào danh sách yêu thích"`).

---

### 1.5. Loading Button
Nút kích hoạt tác vụ bất đồng bộ (Submit form, Đặt hàng).

- **Cấu trúc:**
  - Giữ nguyên chiều rộng nút (không bị giật width khi chuyển trạng thái).
  - Thay icon/text bằng SVG Spinner xoay mượt `animation: spin 0.8s linear infinite`.
  - Kích thước spinner: `18px`, stroke `2px`, màu đồng bộ với text.

---

## 2. Nhóm Điều Khiển Nhập Liệu (Form Controls)

### 2.1. Input Pill (Trường Nhập Liệu Dạng Con Nhộng)
Dùng cho ô nhập email nhận bản tin, mã voucher, tìm kiếm đơn giản.

- **Visual Specs:**
  - Height: `46px`, Radius `9999px`.
  - Padding: `0 20px 0 20px` (nếu không có icon) hoặc `0 20px 0 44px` (nếu có icon trái).
  - Background: `var(--color-surface)` (`#FFFFFF`).
  - Border: `1.5px solid var(--color-border-subtle)` (`#E8ECEA`).
  - Font: `15px`, weight `400`.
- **States Matrix:**
  - *Default:* Border `var(--color-border-subtle)` (`#E8ECEA` Light / `#2D3748` Dark), placeholder `var(--color-text-muted)` (`#6B7280` Light / `#94A3B8` Dark, không dùng `#9CA3AF`). Luôn có label hiển thị đi kèm để đảm bảo a11y.
  - *Hover:* Border `var(--color-control-border, #64748B)`.
  - *Focus-visible:* Border `var(--color-text-primary)`, ring `3px rgba(189, 239, 168, 0.5)` (ánh Mint).
  - *Invalid/Error:* Border `var(--color-sale)` (`#FF455B`), ring `3px rgba(255, 69, 91, 0.25)`.
  - *Disabled:* Background `var(--color-surface-subtle)`, border `var(--color-border-subtle)`, cursor `not-allowed`.

---

### 2.2. Thanh Tìm Kiếm Đa Năng Kèm Autocomplete Dropdown (Search Bar)

```
+-----------------------------------------------------------+
| [O]  Bạn đang tìm gì hôm nay?                       [X]   |
+-----------------------------------------------------------+
| [Autocomplete Dropdown]                                   |
|   Lịch sử tìm kiếm: [Tai nghe x] [Đồng hồ x]             |
|   Xu hướng:  #AirBuds  #Sneaker  #AoThun                  |
|   Gợi ý sản phẩm:                                         |
|   [Img] Tai nghe AirBuds Pro ------------ 1.490.000d      |
+-----------------------------------------------------------+
```

- **Visual Specs:**
  - Search Input: Height `48px`, Width linh hoạt (`360px - 540px` desktop, `100%` mobile), Radius `9999px`.
  - Icon trái: Kính lúp `20px` màu `var(--color-text-secondary)` (`#4B5563` Light / `#CBD5E1` Dark).
  - Dropdown: Nằm ngay dưới input (cách `8px`), Radius `20px`, Shadow `var(--shadow-3)`, Background `var(--color-surface-elevated)` (`#FFFFFF` Light / `#232B36` Dark), Border `1px solid var(--color-border-subtle)` (`#E8ECEA` Light / `#2D3748` Dark).
- **Cấu trúc nội dung Dropdown:**
  1. *Tìm kiếm gần đây:* Các tag pill nhỏ kèm nút xóa `x`.
  2. *Gợi ý phổ biến (Trending chips):* Tag pastel màu Soft Green / Peach.
  3. *Gợi ý sản phẩm tức thì:* Danh sách tối đa 4 dòng sản phẩm (Ảnh thumbnail `40x40px`, tên sản phẩm đậm nét, giá bán nổi bật).
- **Accessibility:**
  - Input: `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded="true/false"`, `aria-controls="search-results-list"`.
  - Di chuyển danh sách gợi ý bằng phím mũi tên `ArrowDown` / `ArrowUp`, chọn bằng `Enter`, đóng bằng `Escape`.

---

### 2.3. Bộ Đếm Số Lượng (+ / - Quantity Counter)
Đặt tại Card chi tiết sản phẩm và danh sách giỏ hàng.

```
+-------------------------+
|  [-]   |   1   |   [+]  |  (Radius: 9999px hoặc 12px)
+-------------------------+
```

- **Visual Specs:**
  - Chiều cao: `38px`, Chiều rộng: `110px`.
  - Background: `var(--color-surface-subtle)` (`#F8F9F7` Light / `#1E252E` Dark), Border `1px solid var(--color-border-subtle)` (`#E8ECEA` Light / `#2D3748` Dark), Radius `9999px`.
  - Nút bấm `[-]` và `[+]`: Glyph/container nhìn thấy `32px`, hit area tối thiểu `44px x 44px`, Radius `50%`, color `var(--color-text-primary)`, hover nền `var(--color-surface)` (`#FFFFFF` Light / `#171C23` Dark) có shadow nhẹ.
  - Ô số ở giữa: Width `36px`, Text align `center`, Color `var(--color-text-primary)`, Font weight `700`, font `tabular-nums`.
- **Ràng buộc tương tác:**
  - Giảm xuống `1`: Nút `[-]` chuyển trạng thái disabled mờ nhẹ hoặc chuyển icon thùng rác xóa sản phẩm (khi ở giỏ hàng).
  - Tối đa: Khóa `[+]` khi đạt số lượng tồn kho tối đa kèm thông báo inline.

---

### 2.4. Checkbox & Radio Button

- **Checkbox:**
  - Kích thước: `20px x 20px`, Radius `6px` (hơi bo góc playful).
  - Border: `2px solid #64748B`.
  - Checked State: Nền `#101418`, icon Checkmark màu trắng hoặc nền `#BDEFA8` với icon checkmark màu đen.
- **Radio Button:**
  - Kích thước: `20px x 20px`, Radius `50%`.
  - Border: `2px solid #64748B`.
  - Checked State: Border `6px solid #101418`, tâm trắng `8px`.

---

## 3. Thẻ Sản Phẩm (Product Cards)

### 3.1. Thẻ Sản Phẩm Tiêu Chuẩn (Standard Product Card)
Card chính hiển thị trong danh mục sản phẩm và khối gợi ý.

```
+------------------------------------------+
| [-40%]                             [(♥)] |
|                                          |
|                [ PRODUCT ]               |
|                 [ IMAGE ]                |
|                                          |
|------------------------------------------|
| Tai nghe AirBuds Pro                     |
| 1.490.000₫   2.490.000₫                  |
| ★ 4.8 (1.2k)                             |
+------------------------------------------+
```

- **Visual Specs:**
  - Khung thẻ: Background `var(--color-surface)` (`#FFFFFF` Light / `#171C23` Dark), Radius `20px`, Border `1px solid var(--color-border-subtle)` (`#E8ECEA` Light / `#2D3748` Dark), Shadow `var(--shadow-1)`.
  - Padding tổng thể: `14px`.
  - Khung ảnh: Tỉ lệ `1:1` (hình vuông), Radius `14px`, nền `var(--color-surface-subtle)` (`#F6F7F5` Light / `#1E252E` Dark) để tôn dáng sản phẩm chụp trên nền trong suốt.
  - Badge giảm giá (Góc trên trái): Pill `-40%`, Nền `var(--color-sale)` (`#FF455B` Light / `#FF5C70` Dark), Chữ Ink `#101418`, Font `12px bold` (5.51:1).
  - Nút yêu thích (Góc trên phải): Icon button tròn `36px`, nền `var(--color-surface-elevated)` kèm `backdrop-blur: blur(8px)`.
  - Tên sản phẩm: Font `15px`, Weight `600`, Line-clamp `2` (tối đa 2 dòng, chiều cao cố định `42px` tránh xô lệch hàng), Màu `var(--color-text-primary)`.
  - Dòng giá:
    - Giá khuyến mãi: `1.490.000₫`, Font size `17px`, Weight `700`, Màu `var(--color-sale-text)` (`#C81E3A` Light / `#FF8795` Dark).
    - Giá gốc gạch ngang: `2.490.000₫`, Font size `13px`, Weight `400`, Màu `var(--color-text-muted)` (`#6B7280` Light / `#94A3B8` Dark, đạt 4.6:1 trên Light và 5.2:1 trên Dark; cấm dùng `#9CA3AF` do chỉ đạt 2.5:1 vi phạm WCAG AA), `text-decoration: line-through`.
  - Đánh giá: Icon ngôi sao vàng `#F59E0B`, số điểm `4.8` (Weight `600`), số lượt mua/đánh giá `(1.2k)` màu `var(--color-text-secondary)` (`#4B5563` Light / `#CBD5E1` Dark).
- **Hover Micro-interaction:**
  - Card nâng lên: `translateY(-4px)` kèm bóng pastel ánh mint (`var(--shadow-2)`).
  - Ảnh phóng to: `scale(1.05)` mượt mà trong `300ms`.

---

### 3.2. Thẻ Deal Hot Kèm Bộ Đếm Ngược (Deal / Sale Card)
Xuất hiện trong section "Deal hot hôm nay".

- **Cấu trúc bổ sung:**
  - Header khối có ngọn lửa đỏ cam + Đồng hồ đếm ngược gồm 4 ô pill chữ nhật bo tròn `8px`: `02 Ngày : 15 Giờ : 36 Phút : 21 Giây` trên nền xám ấm hoặc đỏ nhạt.
  - Thanh tiến độ bán hàng (Stock Sold Progress Bar):
    - Chiều cao `6px`, Radius `9999px`, Nền `#F3F4F6`.
    - Thanh lấp đầy: Nền gradient cam-đỏ (`#FF7A00` -> `#FF455B`).
    - Nhãn phụ: *"Đã bán 86/100 sản phẩm"* hoặc *"Chỉ còn 14 suất"*.

---

### 3.3. Thẻ Sản Phẩm Dạng Dòng Ngang (Compact Card)
Sử dụng trong Drawer giỏ hàng, Popover danh sách yêu thích, Đơn hàng gần đây.

- **Visual Specs:**
  - Layout: `flex-row`, Chiều cao cố định hoặc co giãn theo nội dung.
  - Ảnh thumbnail: `72px x 72px`, Radius `12px`.
  - Thông tin bên phải: Tên sản phẩm (1 dòng), Phân loại hàng (Màu sắc/Size), Đơn giá, Bộ đếm số lượng mini, Nút xóa icon thùng rác nhỏ.

---

### 3.4. Thẻ Quản Trị Hàng Hóa Dạng Dòng (Admin Row Card)
Dùng cho Dashboard Admin quản lý sản phẩm.

- **Visual Specs:**
  - Layout: Bảng dòng `grid 12 cột`, Radius `12px`, Border `1px solid #E8ECEA`.
  - Cột 1: Checkbox chọn nhiều + Ảnh thumbnail `48x48px`.
  - Cột 2: Tên sản phẩm + Mã SKU (`font-mono`).
  - Cột 3: Phân loại danh mục (Tag pastel).
  - Cột 4: Giá bán & Giá vốn.
  - Cột 5: Tồn kho kèm Badge trạng thái (Xanh: Còn hàng > 10; Vàng: Sắp hết < 5; Đỏ: Hết hàng = 0).
  - Cột 6: Công tắc bật/tắt hiển thị (Toggle Switch Pill).
  - Cột 7: Menu thao tác nhanh (`Sửa`, `Nhân bản`, `Xóa`).

---

## 4. Danh Mục & Huy Hiệu (Category Badges & Pills)

### 4.1. Khối Danh Mục Tròn Màu Pastel (Category Circular Pill)
Khối danh mục nổi bật ngay dưới Hero Banner trang chủ.

```
    /---------\
   |   (Icon)  |   <- Hình tròn 64px, Nền Pastel (Mint/Peach/Lavender...)
    \---------/
     Công nghệ     <- Chữ 13px đậm vừa, text-center
```

- **Quy chuẩn bảng màu danh mục:**
  - *Công nghệ:* Icon smartphone, Nền Sky Blue `#E0F2FE`, Icon `#0284C7`.
  - *Thời trang:* Icon áo phông, Nền Peach Warm `#FFE5DA`, Icon `#EA580C`.
  - *Nhà cửa:* Icon ngôi nhà, Nền Mint Soft `#E5F8DC`, Icon `#16A34A`.
  - *Làm đẹp:* Icon thỏi son, Nền Soft Pink `#FFE4E6`, Icon `#E11D48`.
  - *Thể thao:* Icon tạ tay, Nền Lavender `#EEE7FF`, Icon `#7C3AED`.
  - *Phụ kiện:* Icon túi xách, Nền Amber `#FEF3C7`, Icon `#D97706`.
  - *Sách & VP:* Icon cuốn sách, Nền Pastel Purple `#F3E8FF`, Icon `#9333EA`.
  - *Đồ chơi:* Icon tay cầm game, Nền Mint Accent `#BDEFA8`, Icon `#15803D`.
  - *Sức khỏe:* Icon chiếc lá, Nền Emerald `#D1FAE5`, Icon `#059669`.
  - *Hàng quốc tế:* Icon máy bay, Nền Sky Light `#E0F2FE`, Icon `#2563EB`.
- **Tương tác:**
  - Hover: Hình tròn icon nảy lên `translateY(-3px)`, nền sáng nhẹ, chữ chuyển màu `#101418` kèm gạch chân mềm.

---

## 5. Thành Phần Điều Hướng (Navigation Elements)

### 5.1. Thanh Điều Hướng Chính (Navbar) & Header Cố Định (Sticky Header)

```
+---------------------------------------------------------------------------------------------+
| Shoply / CutTay   Trang chủ  Sản phẩm  Khuyến mãi  Blog  Liên hệ   [    Tìm kiếm...   ]   (♥) [Bag: 3] [Đăng nhập] |
+---------------------------------------------------------------------------------------------+
```

- **Cấu trúc Desktop & Mobile:**
  - Chiều cao: Desktop `76px` (`--header-height-desktop`), co về `64px` (`--header-height-desktop-sticky`) khi cuộn; Mobile Top Bar cao cố định `56px` (`--header-height-mobile`).
  - Background: Khi cuộn, sử dụng nền kính mờ: Light mode `rgba(255, 255, 255, 0.88)` / Dark mode `rgba(23, 28, 35, 0.88)` (`var(--color-surface)` kèm alpha) với `backdrop-filter: blur(16px)` và border đáy mảnh `1px solid var(--color-border-subtle)`.
  - Logo: Chữ bo tròn phong cách mầm cây/nụ cười, kèm tag phụ thương hiệu.
  - Menu Links: Font `15px`, Weight `500`, màu `var(--color-text-secondary)` (`#4B5563` Light / `#CBD5E1` Dark), hover đổi `var(--color-text-primary)` kèm gạch chân pill hiệu ứng trượt.
  - Nhóm tiện ích bên phải:
    - Kính lúp / Thanh tìm kiếm pill.
    - Icon Trái tim yêu thích kèm badge chấm đỏ nếu có item mới.
    - Icon Giỏ hàng kèm badge số đỏ tròn nổi (`3`) có hiệu ứng nảy khi thêm hàng.
    - Nút CTA Đăng nhập dạng Pill Primary đen.

---

### 5.2. Thanh Điều Hướng Đáy Điện Thoại (Mobile Bottom Navigation Bar)
Cố định tại chân màn hình mobile, tối ưu vùng với của ngón cái.

- **Visual Specs:**
  - Chiều cao: `60px` (`--bottom-nav-height`) + Safe Area Inset Bottom (`var(--sab)` dành cho iPhone có thanh Home bar).
  - Background: `var(--color-surface)` (`#FFFFFF` Light / `#171C23` Dark), Border trên `1px solid var(--color-border-subtle)` (`#E8ECEA` Light / `#2D3748` Dark).
  - 5 Tab chức năng:
    1. *Trang chủ* (Icon Home)
    2. *Danh mục* (Icon Grid)
    3. *Deal hot* (Icon Flame, có badge đỏ)
    4. *Giỏ hàng* (Icon Bag, badge số lượng; truy cập nhanh theo yêu cầu mobile)
    5. *Tài khoản* (Icon User)
  - Tab đang chọn: Icon phóng to nhẹ `1.1`, màu `var(--color-text-primary)`, có chấm tròn mint `4px` dưới icon.

---

### 5.3. Điều Hướng Phân Trang (Pagination)

- **Cấu trúc:**
  - Nút Trước (Prev) và Sau (Next) dạng Pill mềm.
  - Các ô số trang: Kích thước `40px x 40px`, Radius `50%` hoặc `12px`.
  - Trang đang chọn (Active): Nền đen `#101418`, chữ trắng.
  - Trang khác: Nền trong suốt, hover nền xám nhạt `#F3F4F6`.

---

## 6. Phản Hồi & Lớp Phủ (Feedback & Overlays)

### 6.1. Hộp Thoại Thông Báo Nổi (Toast Notification)

```
+-------------------------------------------------------+
| (V)  Đã thêm "Tai nghe AirBuds Pro" vào giỏ hàng! [X] |
| ============================================= (Bar)   |
+-------------------------------------------------------+
```

- **Visual Specs:**
  - Vị trí: Góc trên bên phải (Desktop) hoặc Top Center (Mobile, cách mép trên 16px).
  - Radius: `16px`, Padding `16px 20px`, Shadow `var(--shadow-3)`.
  - 3 Loại chính:
    - *Success:* Icon tick xanh lá cây `#10B981`, viền trái xanh hoặc nền pastel mint.
    - *Error:* Icon cảnh báo đỏ `#FF455B`, thông báo lỗi tồn kho hoặc thanh toán.
    - *Info:* Icon bóng đèn / nụ cười, tin tức khuyến mãi mới.
  - Toast success/info có thể tự đóng sau tối thiểu 6 giây, tạm dừng khi hover/focus và luôn có nút đóng. Error quan trọng không tự đóng; nội dung dài dùng vùng thông báo inline thay cho toast.
  - Success/info dùng `role="status"`/`aria-live="polite"`; lỗi chặn thao tác dùng `role="alert"` có kiểm soát.

---

### 6.2. Hộp Thoại Nổi (Modal Dialog) & Khung Xác Nhận (Confirm Dialog)

- **Visual Specs:**
  - Lớp nền mờ (Backdrop): `background: rgba(16, 20, 24, 0.55); backdrop-filter: blur(6px);`.
  - Khung nội dung: Radius `24px`, Max-width `520px` (xác nhận) hoặc `800px` (xem nhanh sản phẩm), Padding `32px`.
  - Nút đóng: Nút tròn `36px` ở góc trên phải.
- **Quy chuẩn trợ năng:**
  - `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`.
  - Bắt buộc kích hoạt tính năng **Trap Focus**: Phím Tab chỉ luân chuyển bên trong Modal, không lọt ra nội dung phía sau.
  - Nhấn phím `Escape` hoặc click Backdrop lập tức đóng modal.

---

### 6.3. Giỏ Hàng Trượt (Cart Drawer)

```
+---------------------------------------------+
| Giỏ hàng của bạn (3)                    [X] |
+---------------------------------------------+
| [Item 1] AirBuds Pro           1.490.000₫   |
|          Số lượng: [-] 1 [+]     Xóa [Thùng]|
|---------------------------------------------|
| [Item 2] Giày Sneaker            890.000₫   |
|          Số lượng: [-] 1 [+]     Xóa [Thùng]|
+---------------------------------------------+
| Tạm tính:                      2.380.000₫   |
| Giảm giá voucher:               -100.000₫   |
| Tổng cộng:                     2.280.000₫   |
| [      Tiến hành đặt hàng (->)            ] |
+---------------------------------------------+
```

- **Visual Specs:**
  - Trượt từ cạnh phải màn hình sang trái trong `350ms` (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Chiều rộng: `440px` (Desktop) hoặc `100vw` (Mobile).
  - Chia 3 khu vực: Header cố định, Danh sách sản phẩm cuộn độc lập (`overflow-y: auto`), Footer cố định chứa tổng tiền và nút Thanh toán Pill lớn.

---

### 6.4. Hiệu Ứng Khung Chờ (Skeleton Loader)
Thay thế spinner cổ điển bằng các mảng khối sáng tối nhấp nháy mô phỏng vị trí ảnh, tên và giá sản phẩm.

- **CSS Shimmer Animation:**
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton-box {
  background: linear-gradient(90deg, #F0F2F0 25%, #FAFBFA 50%, #F0F2F0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite ease-in-out;
  border-radius: 12px;
}
```

---

## 7. Thành Phần Đặc Thù Thương Mại Điện Tử (E-commerce Specific)

### 7.1. Cụm Đánh Giá Sao (Rating Stars)
- Hiển thị gồm 5 ngôi sao SVG (`16px x 16px`), màu vàng hổ phách `#F59E0B`.
- Hỗ trợ hiển thị sao lẻ (nửa sao / fractional star) qua SVG clip-path.
- Con số trung bình (ví dụ: `4.9`) in đậm chữ số, kèm số lượng đánh giá thực tế trong ngoặc đơn `(856)`.

---

### 7.2. Nhãn Trạng Thái Tồn Kho (Stock Status Badge)
- **Còn hàng (In Stock):** Nền `var(--color-accent-mint-bg)` (`#E5F8DC` Light / `#1A2F1B` Dark), chữ `#166534` (Light) / `#86EFAC` (Dark), kèm chấm tròn xanh lá cây `#22C55E` phát sáng nhẹ (pulse).
- **Sắp hết hàng (Low Stock):** Nền `#FEF3C7` (Light) / `#3D261E` (Dark), chữ `var(--color-warning)` (`#92400E` Light / `#FCD34D` Dark), kèm chấm vàng cam cảnh báo.
- **Tạm hết hàng (Out of Stock):** Nền `var(--color-surface-subtle)` (`#F3F4F6` Light / `#1E252E` Dark), chữ `var(--color-text-secondary)` (`#4B5563` Light / `#CBD5E1` Dark; tránh dùng `#6B7280` trên nền xám vì rơi xuống 4.40:1 không đạt 4.5:1), nút mua chuyển thành *"Nhận thông báo khi có hàng"*.

---

### 7.3. Thẻ Mã Giảm Giá (Coupon Tag / Voucher Pill)
- **Hình thức:** Khối chữ nhật bo góc `8px` có 2 vết khuyết tròn hình bán nguyệt ở 2 cạnh bên tạo cảm giác vé xem phim / coupon giấy thực tế.
- Viền nét đứt mảnh `1.5px dashed var(--color-accent-mint)`.
- Nút bấm nhanh *"Sao chép"* hoặc *"Áp dụng"* thu gọn dạng micro-pill.

---

### 7.4. Hộp Thoại Trợ Lý Ảo CutTay AI (CutTay AI Chat Widget)
Điểm nhấn công nghệ độc quyền xuất hiện ở góc dưới bên phải giao diện (như trong ảnh tham chiếu).

```
+-------------------------------------------+
| [Avatar] CutTay AI                 [-] [X]|
|          Bản xem trước giao diện          |
+-------------------------------------------+
| CutTay AI:                                |
| Xin chào! 👋                               |
| Mình là CutTay AI, sẵn sàng tư vấn sản    |
| phẩm và giải đáp mọi thắc mắc cho bạn.    |
| Bạn cần mình hỗ trợ gì hôm nay?           |
|                                           |
| Gợi ý câu hỏi:                            |
| ( Tư vấn sản phẩm phù hợp )               |
| ( Kiểm tra đơn hàng )                     |
| ( Chương trình khuyến mãi )               |
| ( Hướng dẫn mua hàng )                    |
+-------------------------------------------+
| [ Nhập tin nhắn của bạn...          ] [>] |
+-------------------------------------------+
```

- **Visual Specs:**
  - Nút kích hoạt nổi (Floating Mascot Button): Đường kính `56px`, Nền màu Mint `var(--color-accent-mint)` (`#BDEFA8` Light / `#79D35E` Dark) viền đen mềm hoặc Avatar linh vật mặt cười dí dỏm, Shadow `var(--shadow-5)`.
  - Cửa sổ chat (Docked Window): Chiều rộng `380px`, Chiều cao `540px`, Radius `24px`, Border `1px solid var(--color-border-subtle)` (`#E8ECEA` Light / `#2D3748` Dark), Nền `var(--color-surface-elevated)` (`#FFFFFF` Light / `#232B36` Dark), Shadow `var(--shadow-4)`.
  - Header mặc định ghi *"Bản xem trước — chưa kết nối AI"*. Chỉ hiển thị *"Đang online"* khi health check backend thật xác nhận sẵn sàng.
  - Bong bóng tin nhắn AI: Nền `var(--color-surface-subtle)` (`#F3F4F6` Light / `#1E252E` Dark), màu chữ `var(--color-text-primary)`, bo góc `18px`, góc dưới trái bo ít hơn (`4px`) tạo đuôi thoại.
  - Các nút gợi ý nhanh (Quick Chips): Khung pill bo tròn `9999px`, viền `1px solid var(--color-border-subtle)`, nền `var(--color-surface)` (`#FFFFFF` Light / `#171C23` Dark), màu chữ `var(--color-text-secondary)`, hover chuyển sang nền `var(--color-accent-mint-bg)` (`#E5F8DC` Light / `#1A2F1B` Dark) và chữ `var(--color-text-primary)`.
  - Ô nhập liệu chân trang: Input pill kèm nút gửi mũi tên tròn màu đen `#101418` (Light) / `#F8F9FA` (Dark).
- **Trợ năng:**
  - Cửa sổ có nhãn `aria-label="Trợ lý ảo CutTay AI tư vấn mua sắm"`.
  - Khu vực hiển thị tin nhắn mới có `aria-live="polite"` để phần mềm đọc màn hình thông báo khi bot phản hồi.
  - Mobile hiển thị bottom sheet/full-width, không che phần tử đang focus; launcher và nút đóng đều có hit area 44px.

### 7.5. Hợp đồng tích hợp CutTay AI (UI-only ở Phase 0)

- **Trạng thái UI:** `preview`, `connecting`, `ready`, `sending`, `error`, `unavailable`, `closed`.
- **Request dự kiến:** `POST /api/v1/ai/chat` với `{ conversationId?, message, pageContext?: { route, productSlug? } }`; không gửi cookie, địa chỉ hoặc dữ liệu đơn hàng vào prompt nếu chưa có xác nhận và authorization.
- **Response dự kiến:** `{ conversationId, messageId, answer, suggestions[], correlationId }`; lỗi chuẩn `{ code, message, correlationId }`.
- **Fallback:** khi backend chưa cấu hình hoặc lỗi, input bị vô hiệu hóa và hiển thị link tới FAQ/Liên hệ; không sinh câu trả lời giả.
- **Privacy:** thông báo rõ nội dung có thể được xử lý bởi dịch vụ AI trước lần gửi đầu tiên; không dùng hội thoại làm dữ liệu huấn luyện nếu chưa có chính sách/consent.

---

## 8. Thành Phần Còn Lại Bắt Buộc

Mọi component dưới đây dùng token ở `04_DESIGN_SYSTEM.md`, có `default/hover/focus/disabled/loading/error/empty` khi phù hợp, và không dùng màu làm tín hiệu duy nhất.

### 8.1. Select/Dropdown & Filter Sidebar
- Select native được ưu tiên cho form đơn giản; custom listbox chỉ dùng khi cần search, phải hỗ trợ Arrow keys, Home/End, Enter, Escape và type-ahead.
- Filter sidebar desktop rộng `280px`; mobile thành dialog bottom sheet có tiêu đề, nút “Áp dụng”, “Xóa lọc”, focus trap và thông báo số kết quả. Price range luôn có hai ô number có label làm phương án bàn phím thay cho kéo slider.

### 8.2. Promo Banner, Trust Benefit & Membership Card
- Promo banner có ratio `16:7`, CTA là link thật, ảnh có `alt` theo nội dung hoặc `alt=""` nếu chỉ trang trí.
- Trust benefit dùng SVG + heading + mô tả; icon `aria-hidden` khi text đã đủ nghĩa.
- Membership card có trạng thái guest/member/tier-loading/error; không hứa quyền lợi chưa có rule backend.

### 8.3. Breadcrumb, Tabs & Accordion
- Breadcrumb dùng `<nav aria-label="Breadcrumb"><ol>…</ol></nav>`, trang hiện tại có `aria-current="page"`.
- Tabs chỉ dùng khi nội dung cùng ngữ cảnh; hỗ trợ Arrow Left/Right và `aria-controls`. Nếu tab thay URL hoặc cần SEO, dùng link thay vì ARIA tab.
- Accordion dùng button trong heading, `aria-expanded`, `aria-controls`; nội dung vẫn đọc được khi CSS/JS lỗi.

### 8.4. Checkout Field Group & Error Summary
- Nhóm địa chỉ, vận chuyển, thanh toán dùng `fieldset/legend`; label luôn hiển thị, không dùng placeholder thay label.
- Lỗi inline nối với field bằng `aria-describedby`; submit thất bại focus error summary ở đầu form và từng lỗi link về field.
- CTA đặt hàng giữ nguyên chiều rộng khi loading, có idempotency token và không xác nhận thành công trước response server.

### 8.5. Admin Table, Admin Form & Status Badge
- Table có caption, header `<th scope>`, sort button thông báo `aria-sort`, pagination server-side; mobile ưu tiên horizontal scroll cục bộ hoặc card row, không ẩn cột quan trọng im lặng.
- Form Admin chia section rõ, sticky action bar không che focus, hiển thị unsaved-change warning và server validation.
- Status badge gồm text + icon/shape; mapping trạng thái đơn/tồn kho dùng semantic token và có legend. Không cho phép đổi trạng thái trái state machine.

### 8.6. Empty, Error, No-result & Tooltip
- Empty state có nguyên nhân, hành động phục hồi và không biến mất navigation chính. No-result giữ lại từ khóa/filter để người dùng chỉnh.
- Error state có correlation ID khi cần hỗ trợ; retry chỉ xuất hiện với thao tác idempotent.
- Tooltip chỉ bổ trợ, không chứa thông tin thiết yếu; mở bằng hover và focus, đóng bằng Escape, không che phần tử trigger.
