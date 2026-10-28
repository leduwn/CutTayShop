# BÁO CÁO TRIỂN KHAI SPRINT 1.1 REMEDIATION & SPRINT 2 SHOPPING UI
**Dự án:** CutTayShop — Premium E-commerce Frontend  
**Nền tảng:** ASP.NET Core 10.0 MVC (C# 14, .NET 10 LTS)  
**Nhánh Git:** `feat/ui-sprint2-catalog-product-detail`  
**Ngày hoàn thành:** 29/10/2026  
**Triết lý cốt lõi:** *"FRONTEND FIRST — BACKEND INCREMENTAL"*

---

## 1. TỔNG QUAN TRIỂN KHAI

Sprint 1.1 và Sprint 2 tập trung giải quyết triệt để các vấn đề còn tồn đọng của Sprint 1, đồng thời xây dựng toàn diện hệ thống giao diện mua sắm cốt lõi (Shopping Experience UI) đạt tiêu chuẩn thương mại điện tử cao cấp năm 2026:

1. **Khắc phục chất lượng Sprint 1.1 (Quality Remediation):**
   - Hoàn thiện điều hướng Header Desktop (`_Header.cshtml`) với 5 liên kết chuẩn: *Trang chủ*, *Sản phẩm*, *Khuyến mãi*, *Blog*, *Liên hệ*.
   - Khớp nối chuẩn xác Token Design System (`04_DESIGN_SYSTEM.md`): Container chuẩn `1360px`, typography kép `Be Vietnam Pro` (display & headings) + `Plus Jakarta Sans` (body), palette Soft Dark Slate cao cấp (`#0B0F17`, `#11161D`, `#161D27`).
   - Xóa bỏ huy hiệu tĩnh cứng `3` trên biểu tượng giỏ hàng. Xây dựng module quản lý giỏ hàng demo client-side (`cart-state.js`) lưu trữ đồng bộ qua `localStorage` (`cuttayshop_demo_cart`) với sự kiện tự động `cart:updated`.
   - Minh bạch hóa tính năng thử nghiệm CutTay AI: gắn nhãn *"Bản thử nghiệm / Demo Preview"*, ghi rõ *"Minh hoạ giao diện · Chưa kết nối API AI"*, bổ sung kênh liên hệ hỗ trợ thực tế và phím tắt `Escape` đóng widget.
   - Chuẩn hóa form nhận thông báo: hiển thị thông báo cảm ơn trung thực, không cấp mã voucher giả lập.
   - Loại trừ nguy cơ XSS ở thanh tìm kiếm và bộ lọc bằng DOM API an toàn (`createElement`, `textContent`, `encodeURIComponent`).
   - Biên tập lại toàn bộ nội dung quảng cáo: loại bỏ các tuyên bố chưa xác thực ("10.000+ đánh giá", "Giao hàng 2h", "Freeship trọn đời").

2. **Triển khai giao diện mua sắm Sprint 2 (Shopping UI Core):**
   - **Trang danh sách sản phẩm (PLP - `/san-pham`):**
     - Breadcrumbs Schema.org chuẩn SEO.
     - Header Banner sinh động với số lượng sản phẩm thực tế.
     - Bộ lọc bên trái Sticky (Desktop 280px) & Filter Drawer trượt mượt mà (Mobile): Lọc danh mục, khoảng giá (Min - Max), thương hiệu, đánh giá tối thiểu, trạng thái còn hàng và đang giảm giá.
     - Thanh công cụ sắp xếp: Số lượng kết quả, nút kích hoạt bộ lọc mobile, menu sắp xếp (Phổ biến nhất, Mới nhất, Giá tăng dần, Giá giảm dần, Đánh giá cao).
     - Lưới sản phẩm responsive: 4 cột (Desktop 1440px+), 3 cột (Laptop 1024px), 2 cột (Tablet 768px), 2 cột (Mobile 375px - 430px).
     - Phân trang đầy đủ (Pagination) duy trì toàn bộ query parameters trên URL.
     - Trạng thái trống (Empty State) thân thiện khi không tìm thấy kết quả, hỗ trợ nút xóa bộ lọc nhanh.
   - **Trang ngành hàng (Category Page - `/danh-muc/{slug}`):**
     - Tự động nạp thông tin danh mục, tiêu đề, mô tả và dải màu nền nhận diện.
     - Trả về mã lỗi chuẩn **HTTP 404 NotFound** khi truy cập slug không tồn tại.
   - **Trang chi tiết sản phẩm (PDP - `/san-pham/{slug}`):**
     - Breadcrumbs đầy đủ theo cây danh mục.
     - Bộ sưu tập ảnh tương tác (Gallery): Ảnh chính bo góc lớn, dải thumbnail bên dưới với trạng thái active rõ nét.
     - Khối thông tin mua hàng: Thẻ thương hiệu chính hãng, tên sản phẩm H1, thanh đánh giá kèm số lượng review thực tế, trạng thái tồn kho kèm chỉ báo xanh trực quan.
     - Khối giá niêm yết chuẩn Tabular Figures, giá gốc gạch ngang và huy hiệu tiết kiệm phần trăm.
     - Lựa chọn phiên bản (Variants): Chọn màu sắc / kích thước tương tác, tự động cập nhật giá theo phiên bản.
     - Bộ chọn số lượng (Quantity Stepper): Nút tăng / giảm và ô nhập số có kiểm soát min/max [1..99].
     - Nút CTA kép: *Thêm vào giỏ hàng* và *Mua ngay* tích hợp trực tiếp với `CutTayCart` và hiển thị thông báo Toast nổi.
     - Khối cam kết dịch vụ 4 điểm tin cậy (Giao hàng toàn quốc, Chính hãng 100%, Đổi trả 7 ngày, Đóng gói cẩn thận).
     - Hệ thống Tab thông tin: *Mô tả sản phẩm*, *Thông số kỹ thuật* (bảng Specs), *Đánh giá khách hàng* (danh sách nhận xét có huy hiệu Đã mua hàng).
     - Dải sản phẩm liên quan (Related Products) đồng danh mục.
     - Thanh mua hàng cố định chân trang trên Mobile (Mobile Sticky Bar) hiển thị giá và nút thêm vào giỏ tức thì.
     - Trả về mã lỗi chuẩn **HTTP 404 NotFound** khi truy cập sản phẩm không tồn tại.
   - **Trang kết quả tìm kiếm (Search Results - `/tim-kiem?q=...`):**
     - Thuật toán tìm kiếm tiếng Việt không dấu (Accent-Insensitive Vietnamese Search) sử dụng `NormalizationForm.FormD` loại bỏ dấu thanh chuẩn xác (e.g. tìm `ao` ra `Áo hoodie`, `mu` ra `Mũ lưỡi trai`).
     - Hiển thị từ khóa tìm kiếm đã được mã hóa an toàn, số lượng sản phẩm khớp và bộ lọc sidebar hỗ trợ tinh chỉnh kết quả.

---

## 2. KIẾN TRÚC MÃ NGUỒN & CẤU TRÚC FILE

```
CutTayShop/
├── CutTayShop.Core/
│   ├── Interfaces/
│   │   └── IDemoDataProvider.cs              # Hợp đồng dữ liệu mở rộng cho Catalog & PDP
│   └── Models/
│       ├── CatalogFilterParameters.cs        # Tham số lọc, sắp xếp và phân trang
│       ├── CatalogResult.cs                  # Kết quả truy vấn danh mục kèm metadata
│       ├── Product.cs                        # Entity sản phẩm mở rộng gallery, specs, variants
│       ├── ProductVariant.cs                 # Phiên bản sản phẩm (màu sắc, kích thước, SKU)
│       └── ProductReview.cs                  # Đánh giá khách hàng có xác thực mua hàng
├── CutTayShop.Infrastructure/
│   └── Services/
│       └── InMemoryDemoDataProvider.cs       # 32 sản phẩm demo phong phú, thuật toán tìm kiếm tiếng Việt
├── CutTayShop.Web/
│   ├── Controllers/
│   │   ├── HomeController.cs                 # Trang chủ và trang tĩnh
│   │   └── CatalogController.cs              # Bộ điều hướng /san-pham, /danh-muc, /san-pham/{slug}, /tim-kiem
│   ├── ViewModels/
│   │   ├── BreadcrumbItem.cs                 # Item điều hướng breadcrumbs Schema.org
│   │   ├── CatalogViewModel.cs               # ViewModel cho PLP, Category và Search
│   │   └── ProductDetailViewModel.cs         # ViewModel cho PDP
│   ├── Views/
│   │   ├── Catalog/
│   │   │   ├── Index.cshtml                  # View PLP & Search hợp nhất
│   │   │   └── Detail.cshtml                 # View chi tiết sản phẩm PDP
│   │   └── Shared/
│   │       ├── _Breadcrumb.cshtml            # Partial Breadcrumbs Schema.org
│   │       ├── _EmptyState.cshtml            # Partial trạng thái không có sản phẩm
│   │       ├── _FilterSidebar.cshtml         # Partial bộ lọc Desktop sticky
│   │       ├── _FilterDrawer.cshtml          # Partial bộ lọc Mobile bottom-sheet
│   │       ├── _SortToolbar.cshtml           # Partial thanh công cụ sắp xếp
│   │       ├── _Pagination.cshtml            # Partial phân trang số duy trì query URL
│   │       └── _RatingStars.cshtml           # Partial hiển thị sao đánh giá trực quan
│   └── wwwroot/
│       ├── css/
│       │   ├── design-system.css             # Tokens 1360px, palette soft dark, typography
│       │   ├── homepage.css                  # Styles trang chủ và desktop nav
│       │   └── catalog.css                   # Styles 2-column layout, PLP, PDP, Drawer, Sticky bar
│       ├── js/
│       │   ├── cart-state.js                 # Quản lý giỏ hàng localStorage client-side
│       │   ├── catalog.js                    # Tương tác Gallery, Variant, Stepper, Tabs, Filter Drawer
│       │   └── homepage.js                   # XSS-safe search autocomplete, AI widget dialog
│       └── images/products/                  # 21 file ảnh minh họa SVG chất lượng cao
└── CutTayShop.Tests/
    ├── CatalogControllerTests.cs             # 8 bài kiểm thử Controller & HTTP Status Codes
    └── DemoDataProviderFilteringTests.cs     # 14 bài kiểm thử lọc, sắp xếp, tìm kiếm tiếng Việt, XSS
```

---

## 3. THIẾT KẾ ĐIỀU HƯỚNG & ROUTING CHUẨN MỰC

| Tuyến đường (Route) | Action Phương thức | Mô tả & Xử lý | Mã HTTP trả về |
|---|---|---|---|
| `/san-pham` | `CatalogController.Index` | Danh mục toàn bộ sản phẩm, hỗ trợ đa bộ lọc, phân trang 12 sp/trang | `200 OK` |
| `/danh-muc/{slug}` | `CatalogController.Category` | Sản phẩm theo ngành hàng, banner theo màu sắc nhận diện | `200 OK` hoặc `404 NotFound` |
| `/san-pham/{slug}` | `CatalogController.Detail` | Chi tiết sản phẩm, gallery ảnh, variant, bảng specs, reviews | `200 OK` hoặc `404 NotFound` |
| `/tim-kiem?q=...` | `CatalogController.Search` | Tìm kiếm không dấu tiếng Việt, hiển thị kết quả hoặc Empty State | `200 OK` |

---

## 4. KẾT LUẬN & ĐÁNH GIÁ

Toàn bộ các yêu cầu của Sprint 1.1 Remediation và Sprint 2 Shopping UI đã được triển khai đầy đủ, biên dịch thành công 100% không cảnh báo (`0 Warning(s), 0 Error(s)`), và vượt qua toàn bộ 22 bài kiểm thử tự động xUnit. Giao diện thực tế trên trình duyệt đạt tính thẩm mỹ cao, chuyển đổi mượt mà giữa chế độ Sáng và Tối, hoạt động tương thích hoàn hảo từ màn hình di động nhỏ nhất (375px) đến màn hình máy tính để bàn (1920px).
