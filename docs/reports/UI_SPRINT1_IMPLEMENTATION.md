# CUTTAYSHOP — BÁO CÁO TRIỂN KHAI SPRINT 1 (UI-FIRST HOMEPAGE FOUNDATION)

> **Dự án**: CutTayShop — Premium Vietnamese E-commerce Platform  
> **Giai đoạn**: UI Sprint 1 — Nền tảng ASP.NET Core MVC & Tái tạo Homepage  
> **Nguyên tắc chỉ đạo**: *FRONTEND FIRST — BACKEND INCREMENTAL*  
> **Nhánh phát triển**: `feat/ui-first-homepage-foundation`  
> **Ngày hoàn thành**: 28/10/2026  
> **Trạng thái**: Hoàn thành 100% mục tiêu Sprint 1  

---

## 1. TỔNG QUAN KIẾN TRÚC & CÔNG NGHỆ

Hệ thống được thiết kế theo mô hình 3 lớp sạch (Clean 3-Tier Architecture) trên nền tảng .NET 10 LTS và C# 14:

```
CutTayShop.sln
├── CutTayShop.Core/                 # Domain Entities, Interfaces, ViewModels
│   ├── Models/
│   │   ├── Product.cs              # Định nghĩa sản phẩm, giá, % giảm, rating, kho
│   │   ├── Category.cs             # 10 danh mục ngành hàng, SVG icon, màu pastel
│   │   ├── TrustBenefit.cs         # 4 cam kết dịch vụ (Giao nhanh, chính hãng...)
│   │   ├── PromoBanner.cs          # 2 banner quảng cáo bên phải Hero (8/4 grid)
│   │   └── DealCountdown.cs        # Đồng hồ đếm ngược Flash Sale
│   └── Interfaces/
│       └── IDemoDataProvider.cs    # Hợp đồng cung cấp demo data có cấu trúc
├── CutTayShop.Infrastructure/       # Dịch vụ cung ứng dữ liệu In-Memory
│   └── Services/
│       └── InMemoryDemoDataProvider.cs  # Nạp dữ liệu giả lập phong phú, thuần Việt
└── CutTayShop.Web/                  # ASP.NET Core MVC Web Application
    ├── Controllers/
    │   └── HomeController.cs       # Điều hướng Index, API SearchSuggestions
    ├── ViewModels/
    │   └── HomeViewModel.cs        # Đóng gói dữ liệu hiển thị toàn diện cho Homepage
    ├── Views/
    │   ├── Shared/
    │   │   ├── _Layout.cshtml      # Khung chuẩn SEO, Plus Jakarta Sans, Themes
    │   │   ├── _Header.cshtml      # Sticky pill search, Theme toggle, Giỏ hàng
    │   │   ├── _Footer.cshtml      # Footer 4 cột chuẩn e-commerce hiện đại
    │   │   ├── _ProductCard.cshtml # Component thẻ sản phẩm dùng chung
    │   │   ├── _BottomNav.cshtml   # Thanh điều hướng di động 56px-60px
    │   │   └── _CutTayAiWidget.cshtml # Cửa sổ trợ lý ảo AI nổi
    │   └── Home/
    │       └── Index.cshtml        # Tái tạo Homepage độ trung thực thị giác cao
    └── wwwroot/
        ├── css/
        │   ├── design-system.css   # Bảng mã token, WCAG AA, hiệu ứng bóng mờ
        │   └── homepage.css        # Bố cục Hero 8/4, vòng tròn danh mục, deals
        ├── js/
        │   ├── theme-toggle.js     # Đổi giao diện Sáng/Tối, lưu LocalStorage
        │   └── homepage.js         # Countdown timer, Search live, AI Chat toggle
        └── images/                 # Hệ thống đồ hoạ minh hoạ SVG độc quyền
```

---

## 2. CÁC THÀNH PHẦN GIAO DIỆN ĐÃ XÂY DỰNG

### 2.1. Header & Điều Hướng Toàn Cục
- **Sticky Header**: Chiều cao canonical Desktop `76px` (thu gọn còn `64px` khi cuộn trang), Mobile `56px`. Nền kính mờ `backdrop-filter: blur(16px)` thích ứng cả Light & Dark mode.
- **Pill Search Bar**: Thanh tìm kiếm dạng con nhộng với gợi ý tức thì qua API `/Home/SearchSuggestions?q=...`.
- **Hệ thống điều khiển người dùng**:
  - Nút chuyển theme Sáng / Tối (Sun/Moon icon) không giật hình (FOUC prevention).
  - Nút Yêu thích (Wishlist) và Giỏ hàng với số lượng thông báo nổi `badge-count`.
  - Nút Tài khoản cá nhân.

### 2.2. Hero Section Bố Cục 8/4 Grid
- **Khối chính 8 Cột**:
  - Tag pill nổi bật: `✨ Xu hướng mua sắm 2026`.
  - Tiêu đề lớn Display: `Khám phá thế giới mua sắm phong cách` với capsule nền xanh mint bọc chữ "mua sắm". Responsive chuẩn xác 38px/44px trên Mobile.
  - Mô tả phụ và cụm nút kêu gọi hành động: `Mua sắm ngay →` (chính), `Xem ưu đãi hôm nay` (phụ).
  - Điểm đánh giá tin cậy: `⭐ 4.9/5 (10.000+ đánh giá)`.
  - Đồ hoạ minh hoạ phong cách sống (Lifestyle Illustration SVG) với nhân vật thời trang mang túi mua sắm pastel, tai nghe studio và các huy hiệu nổi (`⚡ Giảm đến 50%`, `100% Chính hãng`).
- **Khối phụ 4 Cột (2 Banner Dọc xếp chồng)**:
  - Thẻ 1: `Đồ công nghệ` | `Giảm đến 50%` | Nền xanh bạc hà nhạt `#E5F8DC`.
  - Thẻ 2: `Thời trang` | `Mới nhất 2026` | Nền đào ấm `#FFE5DA`.
  - Độ tương phản chữ đạt chuẩn WCAG AA trên cả hai nền sáng/tối.

### 2.3. Dãy 10 Vòng Tròn Danh Mục Pastel
- 10 danh mục: *Công nghệ, Thời trang, Nhà cửa, Làm đẹp, Thể thao, Phụ kiện, Sách & VP, Đồ chơi, Sức khỏe, Hàng quốc tế*.
- Biểu tượng vector SVG độc quyền, màu nền pastel nhẹ nhàng, kích thước chuẩn 72px (Desktop) / 58px (Mobile).
- Trên Mobile hỗ trợ cuộn ngang mượt mà (scroll-snap) ẩn thanh cuộn thô cứng.

### 2.4. Dãy 4 Cam Kết Tin Cậy (Trust Benefits)
- *Giao hàng nhanh* (Toàn quốc 2-3 ngày, nội thành 2H).
- *Hàng chính hãng* (Cam kết 100% xuất xứ rõ ràng).
- *Đổi trả dễ dàng* (Miễn phí đổi trả trong 7 ngày).
- *Hỗ trợ 24/7* (Đội ngũ chuyên nghiệp tận tâm).

### 2.5. Flash Sale / Deal Hot Hôm Nay
- Đồng hồ đếm ngược thời gian thực (`Hours : Minutes : Seconds`) cập nhật mỗi 1000ms.
- Lưới 5 sản phẩm giảm giá sâu kèm thanh trạng thái tiến độ bán hàng (`Đã bán X/Y`).
- Nút thêm vào giỏ hàng tròn với phản hồi Toast thông báo thân thiện.

### 2.6. Sản Phẩm Nổi Bật & Hàng Mới Về
- Lưới sản phẩm bố trí 5 cột (Desktop) và 2 cột (Mobile).
- Thẻ sản phẩm tái sử dụng qua partial view `_ProductCard.cshtml` với đầy đủ thông tin: nhãn badge, ảnh minh hoạ, tên, danh mục, sao đánh giá, giá bán và giá gốc gạch ngang.

### 2.7. Banner Hội Viên CutTayShop+
- Thiết kế tông màu Emerald Dark sang trọng, tương phản cao.
- Nêu bật 3 đặc quyền: Freeship trọn đời, Hoàn 5% CutTay Xu, Hỗ trợ 24/7 ưu tiên.

### 2.8. Newsletter & Footer Đa Cột
- Khung đăng ký nhận voucher 50.000₫ hình con nhộng.
- Footer 4 cột: Thông tin thương hiệu, Về CutTayShop, Hỗ trợ khách hàng, Liên hệ & App mobile.
- Dòng bản quyền và chính sách bảo mật cuối trang.

### 2.9. Thanh Điều Hướng Di Động (Mobile Bottom Nav)
- Hiển thị tự động trên màn hình `<= 768px`, chiều cao chuẩn `60px` cộng phần đệm an toàn `env(safe-area-inset-bottom)`.
- 5 mục tương tác: *Trang chủ, Danh mục, Ưu đãi, Giỏ hàng, Tôi*.

### 2.10. Trợ Lý AI Nổi (CutTay AI Widget)
- Nút kích hoạt con nhộng nổi ở góc phải dưới: `Hỏi CutTay AI ✨`.
- Bảng hội thoại mở rộng hỗ trợ câu hỏi gợi ý nhanh (chip recommendations) và trả lời thông minh về sản phẩm, chính sách giao hàng.

---

## 3. KẾT QUẢ TRIỂN KHAI & TIÊU CHÍ ĐẠT ĐƯỢC

1. **Khả năng vận hành**: Ứng dụng chạy mượt mà trên môi trường localhost (`http://localhost:5139`), trả về HTTP Status Code 200, tài nguyên tĩnh nạp tức thì.
2. **Độ tương phản (WCAG 2.2 AA)**: Tuyệt đối không sử dụng màu xám yếu `#9CA3AF` trên nền sáng. Mọi văn bản đạt tỷ lệ tương phản tối thiểu `>= 4.5:1` (nội dung thường) và `>= 3:1` (tiêu đề/icon).
3. **Responsive**: Đã kiểm thử và chụp ảnh thực tế trên toàn bộ 7 breakpoint: 375px, 430px, 768px, 1024px, 1440px, 1536px, 1920px. Không phát sinh thanh cuộn ngang ngoài ý muốn (no horizontal scroll).
4. **Hệ thống dữ liệu**: `IDemoDataProvider` cung cấp đầy đủ thông tin tiếng Việt tự nhiên, phù hợp với hành vi mua sắm của người dùng trong nước.
