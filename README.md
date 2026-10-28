# CutTayShop — Modern Premium E-Commerce Platform

Website thương mại điện tử B2C cao cấp xây dựng trên nền tảng **ASP.NET Core MVC** (.NET 10 LTS, C# 14), Razor `.cshtml`, CSS Custom Properties (Design System tokens), Semantic HTML5 và Vanilla JavaScript ES modules.

- **Repository:** https://github.com/leduwn/CutTayShop
- **Ngôn ngữ:** Tiếng Việt | **Đơn vị tiền tệ:** VND (₫)
- **Giai đoạn hiện tại:** **Complete Frontend Experience — Real Photography, Mobile-First UI & Full Website Coverage**
- **Chiến lược phát triển:** *FRONTEND COMPLETE — BACKEND INCREMENTAL*

---

## 1. ĐẶC ĐIỂM NỔI BẬT (KEY HIGHLIGHTS)

1. **100% Ảnh Chụp Sản Phẩm Thật (Real Product Photography):**
   - Thay thế hoàn toàn hình ảnh SVG mô phỏng bằng **50 hình ảnh WebP chụp thật** chất lượng studio cao cấp lưu trữ trực tiếp tại `wwwroot/images/`.
   - Giấy phép Unsplash Commercial License hợp pháp, đầy đủ Asset Manifest và mã băm SHA-256.
2. **Thiết Kế Mobile-First Chuyên Nghiệp:**
   - Thanh điều hướng đáy (Bottom Navigation Bar) cố định 5 tab tiện dụng.
   - Vùng chạm cảm ứng đạt chuẩn WCAG 2.2 AA $\ge 44\text{px} \times 44\text{px}$.
   - Khay vuốt ngang cảm ứng (Horizontal Swipeable Trays) mượt mà như ứng dụng native.
   - Xử lý khoảng đệm an toàn tự động `env(safe-area-inset-bottom)`.
3. **Phủ Sóng 100% Sitemap Website (97 Tuyến Đường Đã Kiểm Thử):**
   - **Storefront:** Trang chủ Editorial Motion, Catalog, Chi tiết sản phẩm PDP, Giỏ hàng tương tác, Thanh toán, Xác nhận đơn hàng, Tra cứu vận đơn.
   - **Customer Portal:** Bảng điều khiển tài khoản, hồ sơ cá nhân, sổ địa chỉ, lịch sử đơn hàng, hội viên CutTayShop+, kho voucher cá nhân.
   - **Admin Portal:** Dashboard thống kê, quản lý sản phẩm, đơn hàng, khách hàng, tồn kho, flash sale, voucher, banner CMS, báo cáo doanh thu, cài đặt hệ thống.
   - **Tạp chí & Chính sách:** Blog xu hướng, bài viết chi tiết, 11 trang chính sách bảo hành, đổi trả, giao hàng, bảo mật, showroom và tuyển dụng.
   - **Trang mã lỗi HTTP:** 404 Not Found, 403 Forbidden, 500 Server Error, Hết hạn phiên, Bảo trì 503.
4. **Minh Bạch Chế Độ Demo (Demo Transparency):**
   - Hiển thị rõ cảnh báo đơn hàng thử nghiệm, không phát sinh giao dịch thật.
   - Trợ lý CutTay AI có nhãn bản xem trước (Preview Mode).

---

## 2. KIẾN TRÚC DỰ ÁN (SOLUTION STRUCTURE)

```
CutTayShop.sln
├── CutTayShop.Core/               # Domain Models, Interfaces, Enums
│   ├── Models/                   # Product, Category, Variant, Order, Coupon, BlogPost, Filter
│   └── Interfaces/               # IDemoDataProvider
├── CutTayShop.Infrastructure/     # In-Memory Demo Data Provider
│   └── Services/                 # InMemoryDemoDataProvider (32 sản phẩm thật, 10 danh mục, 3 đơn hàng, 4 coupons)
├── CutTayShop.Web/                # ASP.NET Core MVC Storefront & Admin Web App
│   ├── Areas/Admin/              # Cổng quản trị vận hành Admin (15 Controllers, 18 Views)
│   ├── Controllers/              # 13 Controllers Storefront & 4 API Controllers
│   ├── ViewModels/               # ViewModels chuyên biệt cho từng trang
│   ├── Views/                    # Hơn 45 Razor Views cho Storefront & Account
│   └── wwwroot/                  # CSS Design System, JS interactions, 50 ảnh WebP
└── CutTayShop.Tests/              # 64 Automated Unit Tests (xUnit)
```

---

## 3. HƯỚNG DẪN KHỞI CHẠY (QUICK START)

### Yêu cầu môi trường:
- [.NET 10.0 SDK](https://dotnet.microsoft.com/) trở lên (`dotnet --version` >= 10.0.100).
- Node.js v20+ hoặc v24+ (dùng cho công cụ kiểm thử tự động).

### Cài đặt và khởi chạy:

```bash
# 1. Khôi phục gói phụ thuộc
dotnet restore

# 2. Biên dịch Solution
dotnet build

# 3. Chạy toàn bộ 64 Unit Tests
dotnet test

# 4. Khởi chạy ứng dụng Web
dotnet run --project "CutTayShop.Web/CutTayShop.Web.csproj" --urls "http://localhost:5139"
```

Sau khi chạy lệnh trên, truy cập trình duyệt tại:
- **Trang chủ Storefront:** [http://localhost:5139](http://localhost:5139)
- **Cổng Quản Trị Admin:** [http://localhost:5139/admin](http://localhost:5139/admin)
- **Trang Flash Sale:** [http://localhost:5139/flash-sale](http://localhost:5139/flash-sale)
- **Cổng Khách Hàng:** [http://localhost:5139/tai-khoan](http://localhost:5139/tai-khoan)

### Chạy kiểm thử hồi quy & chụp ảnh tự động (Crawler Regression):
Khi server đang chạy tại port 5139:
```bash
node crawl_and_verify.mjs
```
Script sẽ tự động kiểm tra 97 tuyến đường, xác minh 42 tài nguyên ảnh, kiểm thử 4 API và chụp 26 ảnh màn hình responsive tại `docs/reports/screenshots/full-ui/`.

---

## 4. TÀI LIỆU VÀ BÁO CÁO CHI TIẾT (DOCUMENTATION & AUDIT REPORTS)

- [Báo cáo triển khai toàn diện](docs/reports/FULL_UI_IMPLEMENTATION.md)
- [Kiểm toán tài nguyên ảnh thật](docs/reports/REAL_ASSETS_AUDIT.md)
- [Báo cáo kiểm thử giao diện di động](docs/reports/MOBILE_UI_QA.md)
- [Ma trận phủ sóng 97 tuyến đường](docs/reports/FULL_ROUTE_COVERAGE.md)
- [Báo cáo kiểm thử tương tác](docs/reports/INTERACTION_TEST_RESULTS.md)
- [Báo cáo kiểm thử thị giác toàn website](docs/reports/FULL_WEBSITE_VISUAL_QA.md)
- [Biên bản bàn giao giao diện](docs/reports/FULL_UI_FINAL_HANDOFF.md)
- [Danh mục tài nguyên ảnh thật (Asset Manifest)](docs/assets/REAL_IMAGE_ASSET_MANIFEST.md)
