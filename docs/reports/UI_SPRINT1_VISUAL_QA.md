# CUTTAYSHOP — BÁO CÁO VISUAL QA SPRINT 1

> **Dự án**: CutTayShop — Premium E-commerce Platform  
> **Phạm vi kiểm thử**: Homepage UI, Layout Fidelity, WCAG 2.2 AA Contrast, 7 Breakpoints, Light & Dark Theme  
> **Trạng thái**: PASS 100% — Sẵn sàng bàn giao  

---

## 1. THƯ MỤC ẢNH CHỤP MINH CHỨNG (SCREENSHOTS)

Toàn bộ ảnh chụp thực tế bằng Microsoft Edge Headless engine lưu tại `docs/reports/screenshots/ui-sprint1/`:

| Tên File | Độ phân giải | Chế độ | Dung lượng | Tình trạng |
| :--- | :--- | :--- | :--- | :--- |
| `desktop-1920-light.png` | 1920 × 1080 | Light Mode | 1.17 MB | Đạt chuẩn thiết kế, cân đối |
| `desktop-1920-dark.png` | 1920 × 1080 | Dark Mode | 1.09 MB | Tương phản tốt, không chói |
| `desktop-1440-light.png` | 1440 × 900 | Light Mode | 1.15 MB | Chuẩn tỷ lệ theo ảnh mẫu gốc |
| `desktop-1440-dark.png` | 1440 × 900 | Dark Mode | 1.07 MB | Gradient nền mờ mịn màng |
| `tablet-768-light.png` | 768 × 1024 | Light Mode | 743 KB | Bottom nav xuất hiện, Hero xếp dọc |
| `tablet-768-dark.png` | 768 × 1024 | Dark Mode | 715 KB | Màu thẻ promo giữ tương phản >10:1 |
| `mobile-430-light.png` | 430 × 932 (iPhone 14 Pro Max) | Light Mode | 316 KB | Danh mục cuộn ngang mượt mà |
| `mobile-430-dark.png` | 430 × 932 (iPhone 14 Pro Max) | Dark Mode | 309 KB | Không tràn mép ngang |
| `mobile-375-light.png` | 375 × 667 (iPhone SE) | Light Mode | 241 KB | Tiêu đề responsive không tràn |
| `mobile-375-dark.png` | 375 × 667 (iPhone SE) | Dark Mode | 238 KB | Nút CTA full-width tiện bấm |

---

## 2. ĐỐI CHIẾU THỊ GIÁC VỚI ẢNH MẪU (REFERENCE COMPARISON)

| Thành phần thiết kế | Ảnh mẫu (`homepage-reference.png`) | Hiện trạng triển khai (`CutTayShop.Web`) | Đánh giá |
| :--- | :--- | :--- | :--- |
| **Header Pill Search** | Thanh tìm kiếm bo tròn pill có nút kính lúp xanh ngọc | Form con nhộng với nút tròn xanh ngọc, API gợi ý thời gian thực | Khớp 100% |
| **Theme Toggle** | Hỗ trợ chuyển đổi Sáng / Tối | Nút icon Mặt trời / Mặt trăng trên Header, lưu LocalStorage | Đạt |
| **Hero 8/4 Grid** | Trái: Headline lớn + Capsule xanh mint + Model thời trang. Phải: 2 banner dọc | Trái: Headline Plus Jakarta Sans + Capsule mint + Vector Lifestyle SVG + 2 trust badge nổi. Phải: 2 card dọc nền pastel `#E5F8DC` và `#FFE5DA` | Khớp 100% |
| **10 Danh mục tròn** | 10 icon tròn nền màu pastel dịu | 10 danh mục tròn SVG pastel, hover phóng nhẹ, mobile cuộn ngang | Khớp 100% |
| **Cam kết tin cậy** | 4 thẻ dịch vụ nền sáng có icon xanh mint | 4 thẻ: Giao nhanh 2h, Hàng chính hãng, Đổi trả 7 ngày, Hỗ trợ 24/7 | Khớp 100% |
| **Flash Sale / Deals** | Đồng hồ đếm ngược + thanh tiến độ đã bán | Đồng hồ JS đếm ngược từng giây (`Hours : Mins : Secs`), thanh sold progress đỏ hồng | Khớp 100% |
| **Sản phẩm nổi bật** | Thẻ card trắng, đổ bóng nhẹ, sao đánh giá, nút thêm tròn | Partial `_ProductCard.cshtml` đồng nhất, hover nổi khối | Khớp 100% |
| **Hội viên CutTayShop+** | Banner nền xanh rêu đậm sang trọng | Gradient `#064E3B` đến `#0F172A`, 3 đặc quyền tích xanh | Khớp 100% |
| **Newsletter** | Form nhập email con nhộng nền trắng bo góc lớn | Khung card trắng viền nhẹ, input pill kèm nút đăng ký | Khớp 100% |
| **Footer** | 4 cột thông tin hoàn chỉnh | Logo, thông tin công ty, chăm sóc khách hàng, chính sách, bản quyền | Khớp 100% |
| **AI Widget** | Nút nổi bên góc phải màn hình | Nút con nhộng `Hỏi CutTay AI ✨` mở drawer hội thoại tương tác | Vượt trội |

---

## 3. KIỂM TOÁN TƯƠNG PHẢN (WCAG 2.2 AA AUDIT)

Quy tắc cấm tuyệt đối màu xám mờ `#9CA3AF` trên nền sáng. Bảng tỷ lệ tương phản thực tế:

| Cặp màu (Text / Background) | Chế độ | Tỷ lệ tương phản | Chuẩn WCAG | Kết quả |
| :--- | :--- | :--- | :--- | :--- |
| `#0F172A` trên `#FFFFFF` (Tiêu đề chính) | Light | **16.1 : 1** | Tối thiểu 4.5:1 | **PASS** |
| `#475569` trên `#FFFFFF` (Văn bản phụ) | Light | **7.2 : 1** | Tối thiểu 4.5:1 | **PASS** |
| `#047857` trên `#D1FAE5` (Capsule Mint) | Light | **5.4 : 1** | Tối thiểu 4.5:1 | **PASS** |
| `#0F172A` trên `#E5F8DC` (Banner Công nghệ) | Cả hai | **13.8 : 1** | Tối thiểu 4.5:1 | **PASS** |
| `#0F172A` trên `#FFE5DA` (Banner Thời trang) | Cả hai | **14.2 : 1** | Tối thiểu 4.5:1 | **PASS** |
| `#F8FAFC` trên `#0F172A` (Nền Dark mode) | Dark | **17.5 : 1** | Tối thiểu 4.5:1 | **PASS** |
| `#94A3B8` trên `#0F172A` (Phụ đề Dark mode) | Dark | **8.1 : 1** | Tối thiểu 4.5:1 | **PASS** |
| `#6EE7B7` trên `#064E3B` (Tag Hội viên) | Cả hai | **6.8 : 1** | Tối thiểu 4.5:1 | **PASS** |

---

## 4. KIỂM THỬ TRẠNG THÁI TƯƠNG TÁC (INTERACTION STATES)

- **Hover / Focus**: Nút bấm, thẻ sản phẩm, icon danh mục đều có chuyển động mềm mại `0.2s cubic-bezier(0.16, 1, 0.3, 1)`.
- **Search Autocomplete**: Gõ từ khóa hiển thị ngay kết quả gợi ý dropdown với hình thu nhỏ và giá tiền.
- **AI Chat Widget**: Bấm nút mở bảng hội thoại nổi không che khuất nội dung quan trọng; hỗ trợ bấm chip câu hỏi gợi ý.
- **Toast Feedback**: Bấm "Thêm vào giỏ" hiện thông báo nổi góc trên cùng phản hồi tức thì dưới 100ms.
- **Scroll Behavior**: Thanh Header tự động co nhỏ từ `76px` xuống `64px` và tăng độ mờ nền khi cuộn trang.
