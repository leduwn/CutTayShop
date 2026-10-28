# 03 — PHÂN TÍCH CHI TIẾT ẢNH MẪU THAM CHIẾU (VISUAL REFERENCE ANALYSIS)

**Tài liệu tham chiếu:** `design/references/homepage-reference.png`  
**Dự án:** CutTayShop (Đổi từ thương hiệu gốc Shoply)  
**Phân loại:** Multi-category B2C E-commerce  
**Phương pháp:** Pixel-level Visual Audit & Deconstruction  

---

## 1. TỔNG QUAN PHONG CÁCH THỊ GIÁC (VISUAL LANGUAGE & AESTHETICS)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      MODERN PLAYFUL E-COMMERCE                          │
├───────────────────┬─────────────────────────┬───────────────────────────┤
│ Soft Pastel Tones │ Editorial Asymmetry     │ Clean Studio Photography  │
│ Friendly Rounding │ Hand-Drawn Doodles (SVG)│ High Contrast Typography  │
└───────────────────┴─────────────────────────┴───────────────────────────┘
```

Ảnh mẫu thể hiện ngôn ngữ thiết kế thương mại điện tử thế hệ mới, vượt trội hoàn toàn so với các template Bootstrap/AdminCRUD truyền thống:
1. **Tinh thần cốt lõi:** Trẻ trung, năng động (Playful), tinh tế (Premium), ấm áp và thân thiện.
2. **Cân bằng thị giác (Visual Balance):** Sử dụng các mảng màu pastel dịu nhẹ (Xanh mint `#BDEFA8`, Xanh lá non `#E5F8DC`, Cam đào `#FFE5DA`, Tím nhạt `#EEE7FF`) kết hợp với màu chữ mực đậm `#101418` tạo độ tương phản đạt chuẩn WCAG mà không gây chói mắt.
3. **Typography ấn tượng:** Tiêu đề kích thước cực lớn (Display Serif/Sans kết hợp), tạo điểm nhấn biên tập (Editorial Feel) tương tự các tạp chí phong cách sống hiện đại.
4. **Yếu tố thủ công (Hand-drawn Doodles):** Ngôi sao vẽ tay, mũi tên nguệch ngoạc, icon mặt cười `☺`, đám mây sticker giúp giao diện có "hồn", xóa tan cảm giác máy móc khô khan của các website bán hàng truyền thống.
5. **Bo góc mềm mại (Curvature):** Toàn bộ các nút bấm và thanh tìm kiếm đều sử dụng chuẩn **Pill** (`border-radius: 9999px`). Các khung thẻ (Cards) sử dụng bo góc lớn từ `16px` đến `24px`.

---

## 2. BẢNG MÃ MÀU TRÍCH XUẤT TỪ ẢNH MẪU (COLOR EXTRACTION)

| Vị trí / Vai trò | Tên màu | Hex Code | Độ tương phản với nền (WCAG) | Ứng dụng cụ thể trong thiết kế |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Ink** | Mực đen đậm | `#101418` | 18.2:1 (trên nền `#FFFFFF`) | Tiêu đề chính, văn bản chính, nút CTA chính, icon Header. |
| **Main Surface** | Trắng tinh khiết | `#FFFFFF` | 1:1 | Nền trang, nền các thẻ sản phẩm và ô input. |
| **Soft Surface** | Trắng ngà pastel | `#F8F9F7` | 1.05:1 | Nền tổng thể phần body, tạo cảm giác êm mắt. |
| **Mint Highlight** | Xanh Mint nhạt | `#BDEFA8` | 1.3:1 (nền chữ `#101418`: 14.1:1) | **Highlight capsule** quanh chữ "ở ngay đây" trên Hero. |
| **Soft Green** | Xanh bạc hà nhẹ | `#E5F8DC` | 1.15:1 | Nền banner công nghệ bên phải, icon danh mục Sức khỏe. |
| **Warm Peach** | Cam đào pastel | `#FFE5DA` | 1.2:1 | Nền banner thời trang bên phải, icon Thời trang. |
| **Soft Lavender** | Tím oải hương | `#EEE7FF` | 1.25:1 | Nền icon danh mục Sách & Văn phòng phẩm, Thể thao. |
| **Baby Blue** | Xanh biển nhạt | `#E0F2FE` | 1.2:1 | Nền icon danh mục Công nghệ, Hàng quốc tế. |
| **Sale Red** | Đỏ khuyến mãi | `#FF455B` | 3.36:1 trên trắng | Chỉ dùng surface/non-text hoặc text lớn; chữ thường dùng `#C81E3A`. |
| **Muted Text** | Xám ghi trung tính | `#6B7280` | 4.9:1 (trên nền `#FFFFFF`) | Mô tả phụ, đánh giá số sao, giá gạch ngang ban đầu. |
| **Border Line** | Xám viền nhẹ | `#E8ECEA` | 1.2:1 | Đường kẻ khung thẻ, viền thanh tìm kiếm và phân cách. |

---

## 3. PHÂN TÍCH TỪNG KHU VỰC GIAO DIỆN (SECTION-BY-SECTION AUDIT)

### 3.1. Header & Thanh Điều Hướng (Top Navigation)
- **Kích thước quan sát:** Header trong ảnh cao xấp xỉ `60–64px`; production dùng token `64px`. Sticky/blur là đề xuất tương tác cần kiểm bằng render, không suy ra trực tiếp từ ảnh tĩnh.
- **Thương hiệu:** Logo **CutTayShop** bên trái kèm biểu tượng ngôi sao màu cam lấp lánh (thay thế Shoply). Phông chữ logo đậm nét, thân thiện.
- **Menu chính:** `Trang chủ`, `Sản phẩm`, `Khuyến mãi`, `Blog`, `Liên hệ`.
  * Trạng thái mặc định: Màu xám đậm `#374151`, font-weight 500.
  * Trạng thái hover: Gạch chân mềm hoặc chuyển màu `#101418`.
- **Thanh tìm kiếm trung tâm (Search Pill):**
  * Dạng viên thuốc `rounded-full`, viền xám mềm `#E8ECEA`, nền `#FFFFFF`.
  * Icon kính lúp bên trái, placeholder: *"Bạn đang tìm gì hôm nay?"*.
  * Chiều rộng quan sát xấp xỉ `500–540px` trên canvas 1536px; production dùng `clamp(360px, 36vw, 540px)` rồi chuyển full-width ở mobile.
- **Khu vực thao tác bên phải (Right Actions):**
  1. Icon Trái tim (Yêu thích - Wishlist): `24x24px`, hover đổi màu đỏ nhạt.
  2. Icon Giỏ hàng (Shopping Cart): Kèm badge thông báo số lượng màu đỏ hồng (`3`), font số nhỏ `11px` đậm nền đỏ chữ trắng.
  3. Nút Đăng nhập: Dạng pill bo tròn hoàn toàn, nền đen `#101418`, chữ trắng `14px` đậm, padding `10px 24px`.

### 3.2. Khu vực Hero (The Signature Hero Section)
Đây là khu vực mang tính nhận diện mạnh nhất của thiết kế, áp dụng bố cục bất đối xứng hiện đại (12-column grid):
- **Cột bên trái (Chiếm 8 cột - ~66% chiều rộng):**
  * **Kicker Badge:** Dòng chữ nhỏ *"Sống chất mỗi ngày"* kèm icon tia sáng/mặt trời vẽ tay màu vàng cam.
  * **Headline chính:** Chữ đen siêu lớn (Desktop `52px`, Line-height `1.15`, Font-weight 800):
    > *"Sản phẩm bạn thích [ở ngay đây]"*
  * **Điểm nhấn Highlight Pill:** Cụm từ **"ở ngay đây"** được bọc trong một khối capsule bo tròn mềm mại màu xanh mint `#BDEFA8`, padding `4px 16px`, tạo hiệu ứng nhấn bút dạ quang tinh tế.
  * **Dòng cam kết phụ:** *"Hàng chính hãng • Giao nhanh toàn quốc • Đổi trả dễ dàng"* (Màu xám trung tính `#6B7280`, font-size `14px`).
  * **Nhóm nút kêu gọi hành động (CTA Group):**
    * Nút chính: *"Mua ngay →"* (Nền đen `#101418`, chữ trắng, bo góc `9999px`, kèm mũi tên điều hướng).
    * Nút phụ: *"Xem video"* (Icon play tròn có viền, bo góc `9999px`, nền trong suốt viền nhẹ).
  * **Hình ảnh sản phẩm Lifestyle:**
    * Bố cục tĩnh vật (Still-life composition): Tai nghe chụp tai không dây màu trắng ngà cao cấp, loa bluetooth mini bọc vải màu be thời trang, bình giữ nhiệt dáng trụ thanh lịch và chậu cây xanh nhỏ phía sau.
    * Ánh sáng: Studio soft light, bóng đổ tự nhiên êm dịu, không bị cắt ghép vụng về.
  * **Các Sticker & Doodles trang trí:**
    * Sticker ngôi sao màu xanh mint kèm đường chỉ mũi tên cong và lời nhắn viết tay đáng yêu: *"Những điều tốt đẹp hơn cho cuộc sống của bạn ♡"*.
    * Sticker dán trên sản phẩm: Nhãn hình viên thuốc màu be với thông điệp *"Good Products Brighter Days ☺"*.
    * Nét vẽ nguệch ngoạc vàng chanh ở góc dưới bên trái tạo chiều sâu nghệ thuật.
- **Cột bên phải (Chiếm 4 cột - ~34% chiều rộng):**
  Hai thẻ banner quảng cáo khuyến mãi xếp dọc:
  * **Banner 1 (Đồ công nghệ):**
    * Nền xanh bạc hà nhạt `#E5F8DC`, bo góc `24px`.
    * Chữ: *"Đồ công nghệ"*, *"Giảm đến"*, số **50%** cực đại màu đen đậm.
    * Nút bấm: *"Khám phá →"* dạng pill đen nhỏ.
    * Hình ảnh: Đồng hồ thông minh Smartwatch dây cao su đen thể thao, màn hình hiển thị giờ "10:09".
  * **Banner 2 (Thời trang):**
    * Nền cam đào nhạt `#FFE5DA`, bo góc `24px`.
    * Chữ: *"Thời trang"*, *"Mới nhất"*, số **2025** đậm nét.
    * Nút bấm: *"Xem ngay →"* dạng pill đen.
    * Chi tiết trang trí: Icon mặt cười `☺`.
    * Hình ảnh: Mũ lưỡi trai thời trang phong cách Hàn Quốc màu kem.

### 3.3. Dãy Danh Mục Ngành Hàng (Category Navigation Bar)
Nằm ngay bên dưới Hero, bố trí 10 danh mục dạng hàng ngang trên desktop:
1. **Công nghệ:** Icon điện thoại xanh dương trên nền tròn pastel `#E0F2FE`.
2. **Thời trang:** Icon áo thun cam trên nền tròn pastel `#FFE5DA`.
3. **Nhà cửa:** Icon ngôi nhà xanh lá trên nền tròn pastel `#E5F8DC`.
4. **Làm đẹp:** Icon thỏi son hồng trên nền tròn pastel `#FCE7F3`.
5. **Thể thao:** Icon tạ tay tím trên nền tròn pastel `#EDE9FE`.
6. **Phụ kiện:** Icon túi xách vàng pastel `#FEF3C7`.
7. **Sách & Văn phòng phẩm:** Icon quyển sách mở tím hồng `#F3E8FF`.
8. **Đồ chơi:** Icon tay cầm chơi game xanh mint `#D1FAE5`.
9. **Sức khỏe:** Icon chiếc lá xanh `#DCFCE7`.
10. **Hàng quốc tế:** Icon máy bay xanh da trời `#E0F2FE`.
*Quy chuẩn tương tác:* Mỗi danh mục có vùng hover phóng to nhẹ (`transform: translateY(-4px)`), nền icon đổi sắc thái tinh tế, nhãn chữ bên dưới màu đen đậm khi active.

### 3.4. Dải Cam Kết Dịch Vụ (Trust & Service Benefits)
Thanh thông tin nằm ngang bo góc `16px`, nền peach/off-white rất nhạt, chia 4 cột bằng khoảng cách và divider nhẹ:
- **Giao hàng nhanh:** Biểu tượng xe tải có vệt gió lướt, chữ *"Giao hàng nhanh - Toàn quốc"*.
- **Hàng chính hãng:** Biểu tượng khiên bảo vệ có dấu tích tròn, chữ *"Hàng chính hãng - Cam kết 100%"*.
- **Đổi trả dễ dàng:** Biểu tượng bàn tay nâng hộp hàng có mũi tên xoay tròn, chữ *"Đổi trả dễ dàng - Trong 7 ngày"*.
- **Hỗ trợ 24/7:** Biểu tượng tai nghe chăm sóc khách hàng, chữ *"Hỗ trợ 24/7 - Luôn sẵn sàng"*.

### 3.5. Khu Vực "Deal Hot Hôm Nay" (Flash Sale Section)
- **Tiêu đề & Đếm ngược:**
  * SVG ngọn lửa trang trí (`aria-hidden`) + Tiêu đề **Deal hot hôm nay**, dòng phụ: *"Số lượng có hạn - Đừng bỏ lỡ!"*.
  * **Bộ đếm thời gian (Countdown Timer):**
    Gồm 4 ô viên thuốc màu hồng nhạt, số màu đỏ đậm: `02 : 15 : 36 : 21` tương ứng với các nhãn bên dưới `Ngày`, `Giờ`, `Phút`, `Giây`.
  * Nút liên kết bên phải: *"Xem tất cả →"*.
- **Lưới Thẻ Sản Phẩm (Product Cards Grid - 5 thẻ chính):**
  1. *Tai nghe AirBuds Pro:* Badge `-40%`, ảnh tai nghe true wireless trắng, nút tim wishlist, Giá bán: `1.490.000₫`, Giá cũ gạch ngang: `2.490.000₫`, Đánh giá: ★ 4.8 (1.2k).
  2. *Đồng hồ thông minh X7:* Badge `-30%`, ảnh smartwatch mặt vuông dây đen, nút tim wishlist, Giá bán: `2.990.000₫`, Giá cũ: `4.290.000₫`, Đánh giá: ★ 4.9 (856).
  3. *Áo thun basic cotton:* Badge `-25%`, ảnh áo thun trắng gấp gọn, Giá bán: `149.000₫`, Giá cũ: `199.000₫`, Đánh giá: ★ 4.7 (642).
  4. *Giày sneaker unisex:* Badge `-35%`, ảnh sneaker da trắng tối giản, Giá bán: `890.000₫`, Giá cũ: `1.390.000₫`, Đánh giá: ★ 4.8 (1.1k).
  5. *Balo thời trang Hàn Quốc:* Badge `-30%`, ảnh balo du lịch màu be, Giá bán: `420.000₫`, Giá cũ: `600.000₫`, Đánh giá: ★ 4.7 (908).
- **Các Thẻ Tiện Ích Bên Phải Khối Deal:**
  * **Thẻ Thành viên CutTayShop+:** Nền vàng kem mềm mại, vương miện/ngôi sao trang trí, thông điệp: *"Tích điểm - Nhận ưu đãi - Đặc quyền riêng"*, nút bấm *"Tham gia ngay →"*.
  * **Khung Đăng ký Nhận tin (Newsletter):** Icon phong bì thư, thông điệp *"Nhận thông tin khuyến mãi - Đăng ký để không bỏ lỡ những ưu đãi mới nhất"*, ô nhập email kèm nút đen *"Đăng ký"*.

### 3.6. Trợ Lý Ảo Nổi (Floating CutTay AI Chat Widget)
Cửa sổ trò chuyện nổi thông minh ở góc dưới bên phải:
- **Header trong ảnh mẫu:** Avatar robot, tên trợ lý và chấm xanh *"Đang online"*. CutTayShop chỉ tái tạo shell; trạng thái production mặc định là preview/unavailable tới khi backend health check thật sẵn sàng.
- **Hộp thoại chào:**
  > *"Xin chào! 👋 Mình là CutTay AI, sẵn sàng tư vấn sản phẩm, hỗ trợ đơn hàng và giải đáp mọi thắc mắc cho bạn. Bạn cần mình hỗ trợ gì hôm nay?"*
- **Các Chip Gợi Ý Nhanh (Quick Action Chips):**
  * `Tư vấn sản phẩm phù hợp`
  * `Kiểm tra đơn hàng`
  * `Chương trình khuyến mãi`
  * `Hướng dẫn mua hàng`
- **Thanh nhập liệu (Input Bar):** Ô nhập *"Nhập tin nhắn của bạn..."* kèm nút gửi icon máy bay giấy.
- **Nút Launcher tròn:** Nổi góc phải dưới cùng, biểu tượng robot CutTay AI nhận diện cao.

---

## 4. CHIẾN LƯỢC TÁI LẬP BẰNG HTML, CSS HIỆN ĐẠI & RAZOR

Để tái tạo đúng ngôn ngữ thị giác của ảnh mẫu mà vẫn khả thi trên ASP.NET Core MVC (không tuyên bố pixel-perfect khi chưa có render/screenshot diff):

1. **Không dùng Bootstrap mặc định:** Bootstrap 5 mang phong cách hình học góc cạnh, màu xanh navy/xanh đậm công nghiệp, hoàn toàn đối lập với phong cách Soft Pastel & Friendly Curvature của CutTayShop.
2. **Kiến trúc CSS Variables:**
   Toàn bộ bảng màu, độ cong bo góc, đổ bóng và khoảng cách được định nghĩa trong `:root` giúp tái sử dụng xuyên suốt toàn bộ Razor Views và ViewComponents.
3. **Quản lý Doodles & Stickers:**
   * Sử dụng định dạng **SVG vector thuần** cho các ngôi sao, đường cong nguệch ngoạc và icon mặt cười để đảm bảo độ sắc nét trên mọi mật độ điểm ảnh (Retina, 4K), dung lượng siêu nhẹ (< 2KB mỗi hình).
   * Tuyệt đối không dùng emoji hệ điều hành (như 🚀, 🎨) làm icon điều hướng vì emoji hiển thị khác nhau trên Windows, iOS, Android và không áp dụng được CSS màu sắc.
4. **Hình ảnh sản phẩm:**
   Tất cả ảnh sản phẩm phải được xử lý trên nền trắng trong suốt (PNG hoặc WebP tách nền chuẩn) hoặc ảnh phong cách sống (Lifestyle) được chụp với ánh sáng tự nhiên ấm áp, đổ bóng mềm (Soft ambient occlusion).
5. **Định dạng hiển thị tiếng Việt & Tiền tệ:**
   * Tiền tệ luôn sử dụng ký hiệu `₫` đặt phía sau, số phân cách hàng nghìn bằng dấu chấm (Ví dụ: `1.490.000₫`).
   * Sử dụng phông chữ **Be Vietnam Pro** (Google Fonts) hỗ trợ hoàn hảo bảng mã Unicode tiếng Việt dựng sẵn.

---

*Bản phân tích này là cơ sở trực tiếp để triển khai mã nguồn prototype và hệ thống giao diện ASP.NET Core Razor trong các giai đoạn tiếp theo.*
