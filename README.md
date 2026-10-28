# CutTayShop — Modern Premium E-Commerce Platform

Website thương mại điện tử B2C cao cấp xây dựng trên nền tảng **ASP.NET Core MVC** (.NET 10 LTS, C# 14), Razor `.cshtml`, CSS Custom Properties (Design System tokens), Semantic HTML5 và Vanilla JavaScript ES modules.

- **Repository:** https://github.com/leduwn/CutTayShop
- **Ngôn ngữ:** Tiếng Việt | **Đơn vị tiền tệ:** VND (₫)
- **Giai đoạn hiện tại:** **Sprint 2 — Product Catalog, Categories & Product Detail (UI-First)**
- **Chiến lược phát triển:** *FRONTEND FIRST — BACKEND INCREMENTAL*

---

## 1. KIẾN TRÚC GIẢI PHÁP (SOLUTION STRUCTURE)

```
CutTayShop.sln
├── CutTayShop.Core/               # Domain Models, Interfaces, Enums
│   ├── Models/                   # Product, Category, Variant, Review, Filter
│   └── Interfaces/               # IDemoDataProvider
├── CutTayShop.Infrastructure/     # In-Memory Demo Data Services
│   └── Services/                 # InMemoryDemoDataProvider (30+ sản phẩm phong phú)
├── CutTayShop.Web/                # ASP.NET Core MVC Storefront Web App
│   ├── Controllers/              # HomeController, CatalogController
│   ├── ViewModels/               # HomeViewModel, CatalogViewModel, DetailViewModel
│   ├── Views/                    # Razor .cshtml templates & Partial views
│   └── wwwroot/                  # CSS Design System, JS modules, Vector SVG assets
└── CutTayShop.Tests/              # Automated Unit & Integration Tests (xUnit)
```

---

## 2. YÊU CẦU HỆ THỐNG & KHỞI CHẠY (QUICK START)

### Yêu cầu tiên quyết:
- [.NET 10.0 SDK](https://dotnet.microsoft.com/) trở lên (`dotnet --version` >= 10.0.100).
- Trình duyệt hiện đại hỗ trợ CSS Custom Properties và ES modules (Chrome, Edge, Firefox, Safari).

### Cài đặt và chạy ứng dụng trên Localhost:

```bash
# 1. Clone repository
git clone https://github.com/leduwn/CutTayShop.git
cd CutTayShop

# 2. Khôi phục các gói phụ thuộc
dotnet restore

# 3. Biên dịch toàn bộ Solution
dotnet build --configuration Release

# 4. Chạy kiểm thử tự động
dotnet test

# 5. Khởi chạy Storefront Web App
dotnet run --project "CutTayShop.Web/CutTayShop.Web.csproj" --launch-profile "http"
```

Sau khi chạy lệnh trên, mở trình duyệt truy cập: **`http://localhost:5139`**

---

## 3. DANH SÁCH CÁC ROUTE KHẢ DỤNG (AVAILABLE ROUTES)

| Tuyến đường (Route) | Controller / Action | Mô tả chức năng |
| :--- | :--- | :--- |
| `/` | `HomeController.Index` | **Trang chủ**: Hero 8/4, 10 danh mục tròn pastel, Flash Sale đếm ngược thời gian thực, Sản phẩm nổi bật, Hàng mới về, Banner hội viên, Newsletter và Trợ lý CutTay AI. |
| `/san-pham` | `CatalogController.Index` | **Tất cả sản phẩm (PLP)**: Bộ lọc đa chiều (danh mục, khoảng giá, thương hiệu, đánh giá, khuyến mãi), thanh công cụ sắp xếp, phân trang và lưới sản phẩm responsive. |
| `/danh-muc/{slug}` | `CatalogController.Category` | **Trang theo ngành hàng**: Banner ngành hàng, bộ lọc và danh sách sản phẩm thuộc danh mục. Tự động trả về HTTP 404 nếu slug không tồn tại. |
| `/san-pham/{slug}` | `CatalogController.Detail` | **Chi tiết sản phẩm (PDP)**: Thư viện ảnh thumbnail zoom, bộ chọn biến thể (màu sắc, kích cỡ, dung lượng), bộ đếm số lượng, cam kết dịch vụ, bảng thông số kỹ thuật, đánh giá khách hàng và sản phẩm liên quan. Trả về 404 nếu không tìm thấy. |
| `/tim-kiem?q=...` | `CatalogController.Search` | **Tìm kiếm sản phẩm**: Tìm kiếm tiếng Việt thông minh (hỗ trợ có dấu và không dấu), hiển thị số lượng kết quả, bộ lọc và trạng thái rỗng thân thiện. |
| `/Home/SearchSuggestions?q=...` | `HomeController.SearchSuggestions` | **API gợi ý tìm kiếm (Autocomplete)**: Trả về JSON 5 sản phẩm khớp từ khóa trong thời gian thực. |

---

## 4. TÍNH NĂNG GIAO DIỆN & TƯƠNG TÁC (UI/UX HIGHLIGHTS)

- **Design System v1 Chuẩn Mực**:
  - Bảng mã token ngữ nghĩa đồng nhất: Mint `#BDEFA8`, Pastel Mint `#E5F8DC`, Peach `#FFE5DA`, Sale `#FF455B`, Ink `#101418`.
  - Phông chữ tiêu chuẩn kết hợp giữa **Be Vietnam Pro** và **Plus Jakarta Sans**, phông số cân xứng (tabular numerals) cho giá tiền VND và bộ đếm ngược.
  - Khung chứa chuẩn (Canonical Container): `max-width: 1360px`.
- **Giao diện Sáng & Tối (Light & Dark Theme)**:
  - Chuyển đổi tức thì không giật màn hình (FOUC-free).
  - Tự động nhận diện thiết lập hệ thống (`prefers-color-scheme`) và lưu lựa chọn người dùng vào `localStorage`.
- **Bảo Mật & Phòng Chống XSS (Search XSS Prevention)**:
  - Thanh tìm kiếm gợi ý sử dụng 100% DOM APIs an toàn (`createElement`, `textContent`, `setAttribute`), triệt tiêu hoàn toàn rủi ro tiêm mã độc vào HTML.
- **Giỏ Hàng Demo Thời Gian Thực (Client-Side Demo Cart)**:
  - Quản lý trạng thái giỏ hàng qua module `CutTayCart` lưu trữ cục bộ tại `localStorage` (`cuttayshop_demo_cart`).
  - Đồng bộ số lượng tự động lên badge icon giỏ hàng trên Header và Bottom Navigation Bar khi thêm/sửa/xoá.
- **Trợ Lý CutTay AI (Demo Preview)**:
  - Nút con nhộng nổi mở drawer hội thoại tương tác, chip câu hỏi gợi ý nhanh, thông tin minh bạch bản thử nghiệm giao diện kèm hotline hỗ trợ.
- **Responsive Tuyệt Đối (No Horizontal Scroll)**:
  - Đã kiểm thử tự động trên 7 breakpoint: 375px, 430px, 768px, 1024px, 1440px, 1536px, 1920px.
  - Thanh điều hướng di động (Mobile Bottom Nav 5 tab) tự động hiển thị trên thiết bị cầm tay.
- **Chuẩn Tiếp Cận WCAG 2.2 AA**:
  - Tỷ lệ tương phản văn bản đạt tối thiểu từ 5.4:1 đến 17.5:1. Tuyệt đối không dùng chữ xám mờ trên nền sáng.

---

## 5. GIỚI HẠN HIỆN TẠI (CURRENT LIMITATIONS)

1. **Dữ liệu giả lập (Demo Data)**: Ứng dụng đang vận hành hoàn toàn trên `InMemoryDemoDataProvider` với hơn 30 sản phẩm phong phú; chưa kết nối cơ sở dữ liệu vật lý (SQL Server / PostgreSQL).
2. **Giỏ hàng & Đơn hàng**: Trạng thái giỏ hàng được quản lý cục bộ phía trình duyệt (`localStorage`); chưa lưu trữ phiên người dùng trên máy chủ.
3. **Thanh toán**: Không xử lý thẻ tín dụng hoặc thanh toán thật; các phương thức thanh toán hiển thị dưới dạng lựa chọn giao diện mẫu.
4. **Chatbot AI**: Widget CutTay AI hiện tại là bản xem trước giao diện người dùng (UI Preview) với phản hồi mô phỏng, chưa tích hợp mô hình ngôn ngữ lớn (LLM backend).

---

## 6. LỘ TRÌNH PHÁT TRIỂN (SPRINT ROADMAP)

- [x] **Phase 0**: Khảo sát yêu cầu, thiết kế kiến trúc kỹ thuật & đặc tả UI/UX (`docs/design/`).
- [x] **Sprint 1**: Nền tảng ASP.NET Core MVC, Design System, tái tạo Homepage theo ảnh mẫu chuẩn xác.
- [x] **Sprint 1.1**: Chuẩn hóa Design System, vá lỗ hổng DOM XSS, bổ sung Desktop Menu, đồng bộ Demo Cart State, tinh chỉnh bản quyền & copy minh bạch.
- [x] **Sprint 2**: Triển khai toàn diện giao diện Mua sắm: Danh sách sản phẩm (`/san-pham`), Trang danh mục (`/danh-muc/{slug}`), Chi tiết sản phẩm (`/san-pham/{slug}`), Tìm kiếm (`/tim-kiem`), bộ lọc đa chiều & phân trang.
- [ ] **Sprint 3**: Giỏ hàng chi tiết (`/gio-hang`), Mini-Cart Drawer, Luồng đặt hàng 1 trang (`/thanh-toan`), Trang theo dõi đơn hàng (`/tai-khoan/don-hang/{code}`).
- [ ] **Sprint 4**: Cổng thông tin tài khoản khách hàng (`/tai-khoan`), Sổ địa chỉ, Trung tâm tích điểm CutTayShop+.
- [ ] **Sprint 5**: Incremental Backend: Entity Framework Core 10, ASP.NET Core Identity, Cổng thanh toán VietQR / Sandbox.
