# 05 — THIẾT KẾ CHI TIẾT TỪNG TRANG (PAGE-BY-PAGE BLUEPRINTS)

**Dự án:** CutTayShop — Nền tảng Thương mại Điện tử B2C Hiện đại  
**Quy chuẩn thiết kế:** 16 tiêu chí chuẩn công nghiệp cho từng trang trọng yếu.  
**Framework:** ASP.NET Core MVC (Razor `.cshtml`).  

---

## MỤC LỤC CÁC TRANG TRỌNG YẾU

1. [Trang 1: Trang Chủ (Homepage) — `/`](#1-trang-chủ-homepage)
2. [Trang 2: Danh Mục & Danh Sách Sản Phẩm (PLP) — `/san-pham` / `/danh-muc/{slug}`](#2-danh-mục--danh-sách-sản-phẩm-plp)
3. [Trang 3: Chi Tiết Sản Phẩm (PDP) — `/san-pham/{slug}`](#3-chi-tiết-sản-phẩm-pdp)
4. [Trang 4: Giỏ Hàng & Cart Drawer (Cart) — `/gio-hang`](#4-giỏ-hàng-chi-tiết--mini-cart-drawer)
5. [Trang 5: Thanh Toán (Checkout) — `/thanh-toan`](#5-thanh-toán-một-trang-checkout)
6. [Trang 6: Trung Tâm Tài Khoản Khách Hàng (Customer Account) — `/tai-khoan`](#6-trung-tâm-tài-khoản-khách-hàng)
7. [Trang 7: Chi Tiết & Theo Dõi Đơn Hàng (Order Detail & Tracking) — `/tai-khoan/don-hang/{code}`](#7-chi-tiết--theo-dõi-đơn-hàng)
8. [Trang 8: Bảng Điều Khiển Quản Trị (Admin Dashboard) — `/admin`](#8-bảng-điều-khiển-quản-trị-admin-dashboard)
9. [Trang 9: Quản Lý & Biên Tập Sản Phẩm (Admin Product Form) — `/admin/san-pham/them-moi`](#9-quản-lý--biên-tập-sản-phẩm-admin-form)

---

## 1. TRANG CHỦ (HOMEPAGE)

### 1.1. Mục tiêu
Tạo ấn tượng thị giác đầu tiên sinh động, hiện đại theo đúng phong cách ảnh mẫu tham chiếu; điều hướng khách hàng nhanh chóng vào các ngành hàng thế mạnh; kích thích chuyển đổi tức thì thông qua khu vực Flash Sale "Deal hot hôm nay" và hỗ trợ trực tuyến qua CutTay AI.

### 1.2. Đối tượng sử dụng
Toàn bộ khách hàng truy cập (Khách vãng lai chưa có tài khoản, Khách hàng trung thành quay lại mua sắm, Người dùng di động).

### 1.3. Route đề xuất
- **URL:** `/`
- **Controller/Action:** `HomeController.Index()`
- **HTTP Method:** `GET`
- **View:** `Views/Home/Index.cshtml` kết hợp Shared Layout `_Layout.cshtml`.

### 1.4. Cấu trúc Layout Header / Body / Footer
- **Header:** Sticky Header kính mờ (Backdrop blur `12px`), Logo CutTayShop, Menu chính 5 mục, Search pill bar, Wishlist heart, Cart badge đếm số lượng, Nút Đăng nhập dạng pill đen.
- **Body:** Container max-width `1360px` có đệm lề an toàn 24px (desktop) / 16px (mobile).
- **Footer:** Chân trang đa cột đầy đủ: Về CutTayShop, Hỗ trợ khách hàng, Chính sách, Kết nối mạng xã hội, Đăng ký nhận tin, Bản quyền.

### 1.5. Các Section từ trên xuống dưới
1. **Hero Section (Bố cục bất đối xứng 12 cột):**
   * *Cột trái (8/12):* Kicker *"Sống chất mỗi ngày"*, Headline khổng lồ *"Sản phẩm bạn thích [ở ngay đây]"* với capsule xanh mint `#BDEFA8`, cam kết 3 tiêu chí, CTA đôi (Pill đen *"Mua ngay →"* và Pill viền *"Xem video"*), cụm ảnh tĩnh vật lifestyle cao cấp (tai nghe, loa mini, bình giữ nhiệt), stickers & doodles vẽ tay (ngôi sao xanh, note tình cảm, yellow squiggles).
   * *Cột phải (4/12):* Hai banner khuyến mãi xếp chồng: Banner Công nghệ giảm 50% (nền `#E5F8DC`, smartwatch) và Banner Thời trang 2025 (nền `#FFE5DA`, mũ cap).
2. **Category Navigation Bar:** Dãy 10 khối tròn pastel đại diện cho 10 ngành hàng kèm nhãn chữ phía dưới.
3. **Trust & Benefits Strip:** Khối 4 thẻ cam kết (Giao hàng nhanh, Hàng chính hãng 100%, Đổi trả 7 ngày, Hỗ trợ 24/7).
4. **Deal Hot Hôm Nay (Flash Sale Row):**
   * Tiêu đề kèm icon ngọn lửa SVG (`aria-hidden`) và đồng hồ đếm ngược `Ngày : Giờ : Phút : Giây`.
   * Lưới 5 thẻ sản phẩm giảm sâu (-25% đến -40%).
   * Cột phụ bên phải: Thẻ thành viên CutTayShop+ và Form đăng ký Newsletter.
5. **Sản phẩm nổi bật:** Tab ngành hàng + lưới sản phẩm có merch rule rõ.
6. **Sản phẩm mới:** Hàng/card rail theo `PublishedAt`, có xem tất cả.
7. **Gợi ý dành cho bạn:** Guest dùng best-seller theo ngữ cảnh; personalization thật chỉ khi có consent/data, không gắn nhãn giả.
8. **Danh mục bán chạy:** 4–6 category card theo dữ liệu kỳ gần nhất.
9. **Bộ sưu tập theo xu hướng:** Banner đôi lifestyle Gen Z & Desk Setup.
10. **Flash Sale mở rộng:** Lịch phiên và CTA sang `/flash-sale`, không trùng nội dung Deal Hot hiện tại.
11. **Membership CutTayShop+ + Newsletter:** Lợi ích có điều kiện và form email consent.
12. **Blog & Cẩm nang mua sắm:** 3 bài mới; ẩn section khi Blog chưa vào Phase 2.
13. **Floating CutTay AI:** UI preview/fallback ở góc dưới phải; không giả backend.

### 1.6. Component sử dụng
`HeaderNav`, `SearchPill`, `HeroMain`, `PromoBannerCard`, `CategoryPill`, `TrustBadge`, `FlashSaleCountdown`, `ProductCard`, `MembershipCard`, `NewsletterBox`, `CutTayAiWidget`, `FooterMain`.

### 1.7. Nội dung & Dữ liệu hiển thị
Dữ liệu động từ ViewModel `HomeViewModel`: Danh sách Banner active, 10 Danh mục, Danh sách Flash Sale items kèm thời gian kết thúc, Danh sách Featured items, Tin tức blog mới.

### 1.8. Hành động người dùng (User Actions)
- Gõ từ khóa tìm kiếm trên Search bar (gợi ý tức thì).
- Nhấp chọn danh mục để vào Catalog.
- Nhấp nút "Mua ngay" hoặc "Khám phá" để cuộn/chuyển trang.
- Bấm icon Trái tim để thêm vào Wishlist (cập nhật AJAX).
- Bấm vào thẻ sản phẩm để mở PDP.
- Mở UI CutTay AI; khi backend chưa cấu hình, widget hiển thị preview/unavailable và dẫn tới FAQ/Liên hệ, không tạo hội thoại giả.

### 1.9. Navigation Destinations
`/san-pham`, `/danh-muc/{slug}`, `/san-pham/{slug}`, `/flash-sale`, `/gio-hang`, `/dang-nhap`, `/blog`.

### 1.10. Desktop Layout (1440px)
Khung chứa cố định `1360px`, lề tự động `mx-auto`. Hero chia 8/4 cột. Dãy danh mục hiển thị đủ 10 item trên 1 hàng ngang `flex justify-between`. Thẻ Deal Hot dàn 5 cột.

### 1.11. Tablet Layout (768px - 1024px)
Hero xếp dọc: Khối chính chiếm 100%, 2 banner khuyến mãi chuyển thành lưới 2 cột ngang ngay bên dưới. Dãy danh mục hỗ trợ cuộn ngang mượt mà (`overflow-x-auto snap-x`). Thẻ Deal Hot chia 3 cột.

### 1.12. Mobile Layout (375px - 430px)
Headline Hero co kích thước về `38px` (theo token `font-display-hero` mobile; line-height `44px`), highlight pill co giãn theo chữ. Top Bar mobile cố định cao `56px` (`--header-height-mobile`). 2 Banner khuyến mãi xếp chồng 1 cột. Dãy danh mục cuộn ngang với icon `56x56px`. Lưới sản phẩm Deal Hot hiển thị dạng 2 cột trực quan. Xuất hiện Bottom Navigation Bar 5 tab cố định dưới cùng (`60px` + safe area).

### 1.13. Empty / Loading / Error States
- **Loading:** Skeleton shimmer cho các thẻ Flash Sale và Banner.
- **Empty Flash Sale:** Nếu không có chiến dịch nào đang chạy, tự động ẩn section hoặc thay bằng banner "Đón chờ phiên Flash Sale lúc 12:00".

### 1.14. SEO Considerations
- Canonical URL: `https://cuttayshop.vn/`
- Meta Title: `CutTayShop — Mua Sắm Hàng Chính Hãng, Trải Nghiệm Phong Cách 2026`
- Meta Description: `Khám phá các sản phẩm công nghệ, thời trang, đời sống chính hãng tại CutTayShop. Giao hàng toàn quốc, đổi trả 7 ngày, trợ lý CutTay AI tư vấn 24/7.`
- OpenGraph tags + Schema.org `Organization` và `WebSite` với SearchAction.

### 1.15. Accessibility Requirements
- Bỏ qua nội dung đầu trang (Skip to main content link).
- Màu chữ đen `#101418` trên nền pastel đạt tỉ lệ tương phản `>14:1` (vượt xa chuẩn WCAG 4.5:1).
- Mọi nút bấm icon có thuộc tính `aria-label` tường minh ("Yêu thích sản phẩm", "Giỏ hàng có 3 món").

### 1.16. Acceptance Criteria
Giữ đúng hierarchy, palette, hero 8/4 và card language của ảnh mẫu; không overflow tại 6 viewport; countdown chuyển sang expired state; sai khác được đánh giá bằng screenshot review ở M2.

---

## 2. DANH MỤC & DANH SÁCH SẢN PHẨM (PLP)

### 2.1. Mục tiêu
Cung cấp công cụ lọc đa chiều và sắp xếp trực quan giúp khách hàng tìm kiếm sản phẩm theo tiêu chí (mức giá, màu sắc, thương hiệu, đánh giá) một cách nhanh nhất.

### 2.2. Đối tượng sử dụng
Người mua sắm đang có nhu cầu khảo giá, tìm kiếm sản phẩm theo phân khúc cụ thể.

### 2.3. Route đề xuất
- **Tất cả sản phẩm:** `/san-pham`
- **Theo danh mục:** `/danh-muc/{slug}`
- **Controller/Action:** `CatalogController.Index(FilterParameters filter)` hoặc `CatalogController.Category(string slug, FilterParameters filter)`

### 2.4. Cấu trúc Layout
- Header chuẩn + Breadcrumb định vị (`Trang chủ > Thời trang > Áo thun`).
- Bố cục 2 cột (Desktop): Sidebar bộ lọc bên trái (chiếm 25%), Lưới sản phẩm bên phải (chiếm 75%).
- Mobile: Nút nổi "Bộ lọc (Filters)" mở Drawer trượt từ dưới lên (Bottom Sheet).

### 2.5. Các Section từ trên xuống dưới
1. **Banner Header Danh Mục:** Nền màu pastel đại diện ngành hàng, tiêu đề danh mục to đậm, mô tả ngắn và ảnh minh họa tối giản.
2. **Thanh Công Cụ (Toolbar):** Số lượng kết quả tìm thấy ("Hiển thị 128 sản phẩm"), Dropdown sắp xếp (Mới nhất, Bán chạy, Giá tăng dần, Giá giảm dần, Đánh giá cao), Nút đổi kiểu hiển thị (Grid 4 cột / Grid 2 cột).
3. **Sidebar Bộ Lọc (Facets):**
   * Bộ lọc Khoảng giá (Slider hoặc nhập 2 đầu Min - Max VND).
   * Bộ lọc Thương hiệu (Checklist có số lượng sản phẩm tương ứng).
   * Bộ lọc Đánh giá sao (Từ 4 sao trở lên, 5 sao).
   * Bộ lọc Tình trạng hàng (Còn hàng, Đang giảm giá).
   * Nút "Xóa tất cả bộ lọc".
4. **Lưới Sản Phẩm (Product Grid):** Lưới thẻ sản phẩm chuẩn responsive, hiển thị nhãn giảm giá, rating sao, giá bán và nút thêm nhanh vào giỏ.
5. **Thanh Phân Trang (Pagination):** Các nút số trang dạng pill tròn, nút Trước/Sau, hiển thị trang hiện tại nổi bật nền đen chữ trắng.

### 2.6. Component sử dụng
`Breadcrumb`, `CategoryBanner`, `FilterSidebar`, `PriceRangeSlider`, `ProductCard`, `SortDropdown`, `PaginationBar`, `FilterDrawerMobile`.

### 2.7. Dữ liệu hiển thị
`ProductListViewModel`: Danh sách PagedList<ProductCardDto>, Danh sách Facets (Brands, Categories, PriceRanges), Thông tin Category hiện tại, Metadata phân trang.

### 2.8. User Actions
Chọn checkbox lọc, kéo thanh giá, đổi tiêu chí sắp xếp (AJAX reload danh sách không tải lại trang), bấm tim yêu thích, bấm "Thêm vào giỏ".

### 2.9. Navigation Destinations
Trang PDP `/san-pham/{slug}`, Giỏ hàng `/gio-hang`.

### 2.10. Layout Desktop / Tablet / Mobile
- Desktop: Sidebar `280px` cố định, Product grid `3-4 cột`.
- Tablet: Sidebar thu gọn thành thanh lọc ngang hoặc Drawer, grid `3 cột`.
- Mobile: Grid `2 cột` cân đối, khoảng cách `12px`, hình ảnh sắc nét.

### 2.11. Empty & Error States
Khi không có sản phẩm khớp bộ lọc: Hiển thị hình minh họa hộp rỗng dễ thương, thông báo *"Rất tiếc, không tìm thấy sản phẩm phù hợp"* kèm nút bấm *"Xóa bộ lọc để xem tất cả"*.

### 2.12. SEO & A11y
- Dynamic Title: `{Tên danh mục} Chính Hãng, Giá Tốt Nhất 2026 | CutTayShop`.
- Hỗ trợ thẻ `rel="prev"` và `rel="next"` trong phân trang cho Bot tìm kiếm.

### 2.13. Loading / Empty / Error
Skeleton giữ đúng ratio card; no-result giữ filter/query và có nút xóa; lỗi tải lại chỉ retry request idempotent, không xóa lựa chọn người dùng.

### 2.14. SEO
Category có canonical riêng; search/filter sâu mặc định `noindex,follow`; metadata và phân trang server-rendered.

### 2.15. Accessibility
Sidebar/drawer có heading, focus trap và restore focus; slider giá luôn có input số thay thế; số kết quả cập nhật qua `aria-live="polite"`.

### 2.16. Acceptance Criteria
Filter/sort/page phản ánh vào URL; Back/Forward khôi phục state; không overflow tại 6 viewport; keyboard hoàn thành lọc/sort; no-result có đường phục hồi.

---

## 3. CHI TIẾT SẢN PHẨM (PDP)

### 3.1. Mục tiêu
Cung cấp đầy đủ thông tin chi tiết, biến thể, hình ảnh đa góc độ và uy tín đánh giá để thúc đẩy quyết định thêm vào giỏ và mua ngay lập tức.

### 3.2. Route đề xuất
- **URL:** `/san-pham/{slug}` (Ví dụ: `/san-pham/tai-nghe-airbuds-pro-chong-on`)
- **Controller/Action:** `CatalogController.Detail(string slug)`

### 3.3. Cấu trúc Layout
- Cột trái (50%): Thư viện ảnh sản phẩm (Gallery ảnh lớn + Dãy thumbnail con bên dưới/bên hông, hỗ trợ phóng to zoom).
- Cột phải (50%): Thông tin mua hàng (Tên sản phẩm, Thương hiệu, Đánh giá sao, Khung giá bán + % giảm, Bộ chọn biến thể Màu/Size, Bộ đếm số lượng, Nút CTA "Thêm vào giỏ" & "Mua ngay", Hộp cam kết dịch vụ).
- Khối dưới: Hệ thống Tab chi tiết (Mô tả sản phẩm, Thông số kỹ thuật, Chính sách bảo hành, Đánh giá của khách hàng kèm ảnh thật).
- Khối chân trang: Danh sách sản phẩm liên quan (You may also like).

### 3.4. Điểm nhấn Tương tác
- Khi chọn Màu sắc hoặc Size, giá tiền và trạng thái kho (Còn hàng / Tạm hết) cập nhật ngay lập tức.
- Thao tác "Thêm vào giỏ" kích hoạt hiệu ứng icon bay vào giỏ hàng và mở Mini Cart Drawer bên phải màn hình.

---

## 4. GIỎ HÀNG CHI TIẾT & MINI CART DRAWER

### 4.1. Mục tiêu
Quản lý các sản phẩm khách đã chọn, tính toán chính xác tổng tiền, áp dụng voucher giảm giá tạm tính và đưa khách hàng sang bước thanh toán với rào cản tối thiểu.

### 4.2. Hai hình thức hiển thị
1. **Mini Cart Drawer (Trượt từ phải):** Mở khi click icon giỏ hàng trên Header hoặc khi vừa bấm "Thêm vào giỏ". Dành cho xem nhanh và checkout tắt.
2. **Trang Giỏ Hàng Chi Tiết (`/gio-hang`):** Dành cho xem toàn bộ, điều chỉnh số lượng lớn, nhập ghi chú đơn hàng.

### 4.3. Các thành phần chính
- Bảng danh sách sản phẩm: Ảnh thu nhỏ, Tên sản phẩm, Biến thể đã chọn, Đơn giá, Bộ đếm số lượng (+/-) có validation không cho vượt quá tồn kho, Thành tiền, Nút xóa (Icon thùng rác).
- Ô nhập mã giảm giá (Coupon Code): Nút "Áp dụng", hiển thị ngay số tiền được giảm màu xanh mint/đỏ hồng.
- Bảng tóm tắt thanh toán: Tạm tính, Giảm giá voucher, Phí vận chuyển ước tính, **Tổng thanh toán cuối cùng (In đậm cỡ lớn)**.
- Nút CTA chuyển sang thanh toán: Nút pill đen lớn *"Tiến hành thanh toán →"*.

---

## 5. THANH TOÁN MỘT TRANG (CHECKOUT)

### 5.1. Mục tiêu
Tối ưu hóa tỷ lệ chuyển đổi (Conversion Rate), loại bỏ các bước điền form rườm rà, ngăn chặn gián đoạn mua hàng.

### 5.2. Route đề xuất
- **URL:** `/thanh-toan`
- **Controller/Action:** `CheckoutController.Index()` (GET), `CheckoutController.ProcessOrder(CheckoutViewModel model)` (POST).

### 5.3. Bố cục 2 cột (One-Page Accordion/Grid)
- **Cột trái (60%):**
  1. *Thông tin giao hàng:* Họ và tên, Số điện thoại (xác thực đầu số VN), Email, Địa chỉ nhà, Tỉnh/Thành phố, Quận/Huyện, Phường/Xã (Dropdown chọn 3 cấp độ đồng bộ dữ liệu địa giới hành chính Việt Nam).
  2. *Phương thức vận chuyển:* Giao Tiêu Chuẩn (2-3 ngày, 25.000₫), Giao Hỏa Tốc (2-4 giờ nội thành, 50.000₫).
  3. *Phương thức thanh toán:*
     * COD (Thanh toán tiền mặt khi nhận hàng).
     * VietQR là thiết kế Phase 2 qua adapter thật; không hiển thị như phương thức khả dụng ở MVP.
     * Thẻ / MoMo / VNPAY là Future; Phase 0 chỉ định vị trí UI và trạng thái “chưa hỗ trợ”.
- **Cột phải (40% - Sticky Card):**
  Khung tóm tắt đơn hàng cố định: Danh sách sản phẩm rút gọn, Dòng tiền snapshot, Nút xác nhận đặt hàng lớn *"Xác nhận đặt hàng"*.
- **Cơ chế kỹ thuật then chốt:** Khóa giá sản phẩm (Price Snapshot) và tạm giữ tồn kho (Reservation 15 phút) ngay khi submit.

---

## 6. TRUNG TÂM TÀI KHOẢN KHÁCH HÀNG

### 6.1. Mục tiêu
Khu vực tự quản lý dành cho khách hàng: cập nhật hồ sơ, quản lý danh sách địa chỉ nhận hàng, theo dõi lịch sử đơn hàng và quyền lợi thành viên CutTayShop+.

### 6.2. Route & Phân mục
- `/tai-khoan` (Tổng quan Dashboard)
- `/tai-khoan/ho-so` (Thông tin cá nhân, Đổi mật khẩu)
- `/tai-khoan/dia-chi` (Sổ địa chỉ nhiều người nhận)
- `/tai-khoan/don-hang` (Danh sách đơn đã mua phân loại theo tab: Chờ thanh toán, Đang xử lý, Đang giao, Đã giao, Đã hủy)
- `/tai-khoan/cuttayshop-plus` (Điểm tích lũy, Hạng thẻ, Quà tặng đổi điểm).

---

## 7. CHI TIẾT & THEO DÕI ĐƠN HÀNG

### 7.1. Mục tiêu
Minh bạch hóa tiến trình vận chuyển của gói hàng từ lúc đặt đến lúc nhân viên shipper bấm chuông giao tận tay.

### 7.2. Điểm nhấn giao diện
- **Dải tiến trình đơn hàng (Order Progress Stepper):**
  Gồm 5 nấc có icon và mốc thời gian cụ thể:
  1. *Đã đặt hàng* → 2. *Đã xác nhận* → 3. *Đang đóng gói* → 4. *Đang vận chuyển* → 5. *Giao thành công*.
- **Thông tin kiện hàng:** Đơn vị vận chuyển, Mã vận đơn (Tracking Code) có nút copy nhanh.
- **Thao tác đơn hàng:** Nút "Hủy đơn hàng" (chỉ khả dụng khi đơn còn ở bước 1-2), Nút "Mua lại đơn này", Nút "Đánh giá sản phẩm" (sau khi giao thành công).

---

## 8. BẢNG ĐIỀU KHIỂN QUẢN TRỊ (ADMIN DASHBOARD)

### 8.1. Mục tiêu
Cung cấp cái nhìn toàn cảnh về tình hình kinh doanh, doanh thu, đơn hàng cần xử lý gấp và cảnh báo kho cho chủ cửa hàng và nhân sự vận hành.

### 8.2. Route
- **URL:** `/admin`
- **Quyền:** Admin Area authenticated; dashboard/widget kiểm policy capability theo dữ liệu.
- **Layout:** `Areas/Admin/Views/Shared/_AdminLayout.cshtml` (Sidebar quản trị bên trái màu đen `#101418`, Header công cụ trên cùng, Vùng nội dung sáng màu).

### 8.3. Các khối widget chính
- **4 Thẻ số liệu KPI chính (Stat Cards):**
  1. Doanh thu hôm nay (VND) kèm % tăng trưởng so với hôm qua.
  2. Đơn hàng mới cần duyệt (Số lượng đơn trạng thái Pending).
  3. Khách hàng mới trong tháng.
  4. Cảnh báo sản phẩm sắp hết hàng (< 5 món).
- **Biểu đồ doanh thu 30 ngày (Sales Chart):** Biểu đồ đường mượt mà, phân loại doanh thu COD và Chuyển khoản.
- **Bảng 10 đơn hàng mới nhất (Recent Orders Table):** Mã đơn, Khách hàng, Tổng tiền, Trạng thái đơn, Nút xử lý nhanh.

---

## 9. QUẢN LÝ & BIÊN TẬP SẢN PHẨM (ADMIN FORM)

### 9.1. Mục tiêu
Biên soạn thông tin sản phẩm mới hoặc cập nhật sản phẩm cũ một cách trực quan, quản lý hình ảnh và biến thể phức tạp mà không xảy ra sai sót dữ liệu.

### 9.2. Route
- **URL:** `/admin/san-pham/them-moi` hoặc `/admin/san-pham/chinh-sua/{id}`
- **Controller:** `Areas.Admin.Controllers.ProductController`

### 9.3. Bố cục Form nhập liệu khoa học
- **Cột trái (Chính):**
  * Tên sản phẩm & Tự động sinh Slug tiếng Việt chuẩn SEO.
  * Trình soạn thảo mô tả chi tiết (Rich Text / Markdown Editor).
  * Khu vực tải ảnh (Drag & Drop Image Uploader) hỗ trợ sắp xếp thứ tự ảnh bìa.
  * Bảng biến thể (Matrix Variants Generator): Tự động sinh các dòng biến thể từ Thuộc tính (ví dụ kết hợp 3 Màu sắc x 4 Size = 12 biến thể) với ô nhập giá bán và tồn kho riêng cho từng biến thể.
- **Cột phải (Phụ):**
  * Danh mục sản phẩm (Chọn cây danh mục đa cấp).
  * Thương hiệu (Brand selection).
  * Trạng thái xuất bản (Bản nháp / Đang bán / Ẩn).
  * Cài đặt SEO (Meta Title, Meta Description, URL Preview trên Google).
  * Nút "Lưu sản phẩm" dạng nổi cố định.

---

## 10. PHIẾU 16 TRƯỜNG CHO CÁC TRANG TRỌNG YẾU

Các phiếu dưới đây bổ sung và ưu tiên khi mục 3–9 chỉ là tóm tắt. Storefront dùng header/footer chung; Admin dùng `_AdminLayout.cshtml` và không có footer marketing.

### 10.1. Product Detail (`/san-pham/{slug}`)

| # | Trường | Đặc tả |
|---:|:---|:---|
| 1 | Mục tiêu | Chọn đúng variant và mua với giá/kho minh bạch. |
| 2 | Đối tượng | Guest và Customer có ý định mua cao. |
| 3 | Route | `CatalogController.Detail`; slug cũ 301, không thấy 404. |
| 4 | Header/body/footer | Storefront; gallery + buy box; tabs/review/related; footer chuẩn. |
| 5 | Sections | Breadcrumb, gallery, title/rating/price, variant, quantity, CTA, benefits, description/spec, reviews, related. |
| 6 | Components | Gallery, PriceBlock, VariantPicker, Quantity, StockBadge, Tabs/Accordion, Review, ProductCard. |
| 7 | Data | `ProductDetailViewModel`, images, variants, effective quote/expiry, inventory, reviews, Product JSON-LD. |
| 8 | Actions | Chọn variant/quantity, wishlist, add cart, buy now, share, mở review. |
| 9 | Destinations | Cart/checkout, category/brand, review form, related PDP. |
| 10 | Desktop | Gallery 7/12, buy box 5/12 sticky trong container 1360. |
| 11 | Tablet | 6/6 hoặc stacked ở 768; tabs thành accordion khi thiếu chỗ. |
| 12 | Mobile | Gallery full-width; CTA sticky không che focus/bottom nav; variant wrap. |
| 13 | States | Skeleton, invalid variant, out-of-stock, promotion expired, review empty, related partial error. |
| 14 | SEO | Canonical slug; Offer/AggregateRating chỉ khi có dữ liệu thật; alt theo variant. |
| 15 | Accessibility | Gallery buttons named; variant radio group; price update polite; sticky CTA không che focus. |
| 16 | Acceptance | Không add khi thiếu/hết variant; server revalidate giá/kho; keyboard hoàn tất lựa chọn. |

### 10.2. Cart (`/gio-hang` + Drawer)

| # | Trường | Đặc tả |
|---:|:---|:---|
| 1 | Mục tiêu | Sửa giỏ và hiểu tổng tạm tính trước checkout. |
| 2 | Đối tượng | Guest/Customer đã có item. |
| 3 | Route | `GET /gio-hang`; mutation POST `/api/v1/cart/*` có antiforgery header. |
| 4 | Header/body/footer | Header badge; item list + summary; footer; drawer là modal layer. |
| 5 | Sections | Title, cart rows, coupon, freeship progress, summary, recommendations. |
| 6 | Components | CartRow, Quantity, Coupon, PriceSummary, Alert, Drawer, ProductCard. |
| 7 | Data | Cart id opaque, item quote, stock cap, coupon result, shipping estimate. |
| 8 | Actions | Update/remove/select, apply/remove coupon, continue shopping, checkout. |
| 9 | Destinations | PDP, PLP, checkout, login merge. |
| 10 | Desktop | List 8/12 + sticky summary 4/12; drawer 440px. |
| 11 | Tablet | List 7/12 + summary 5/12 hoặc summary dưới ở 768. |
| 12 | Mobile | Rows stacked; drawer 100vw; CTA sticky có safe-area. |
| 13 | States | Empty, stale price, out-of-stock, quantity conflict, coupon invalid, network rollback. |
| 14 | SEO | `noindex,nofollow`, no shared cache. |
| 15 | Accessibility | Drawer trap/restore focus; quantity named; update polite; error inline. |
| 16 | Acceptance | Tổng do server tính; merge idempotent; không vượt tồn; refresh giữ state. |

### 10.3. Checkout (`/thanh-toan`)

| # | Trường | Đặc tả |
|---:|:---|:---|
| 1 | Mục tiêu | Hoàn tất COD an toàn, ít bước, không double order. |
| 2 | Đối tượng | Guest/Customer có cart hợp lệ. |
| 3 | Route | GET/POST `CheckoutController`; success dùng opaque receipt token. |
| 4 | Header/body/footer | Header tối giản; form + order summary; footer legal/trust rút gọn. |
| 5 | Sections | Error summary, contact/address, delivery, COD, coupon/points preview, consent, summary, submit. |
| 6 | Components | FieldGroup, AddressSelect, DeliveryRadio, PaymentRadio, ErrorSummary, PriceSummary, LoadingButton. |
| 7 | Data | `CheckoutViewModel`, cart quote version, address options, shipping, idempotency token. |
| 8 | Actions | Nhập/chọn địa chỉ, shipping, COD, submit; login optional. |
| 9 | Destinations | Cart, success receipt, policies, login. |
| 10 | Desktop | Form 7/12; sticky summary 5/12. |
| 11 | Tablet | 6/6 hoặc summary dưới form; không accordion ẩn lỗi. |
| 12 | Mobile | Một cột; tổng/CTA rõ; keyboard không bị che. |
| 13 | States | Empty cart, validation, stale quote, stock conflict, pending, duplicate replay, server error. |
| 14 | SEO | `noindex,nofollow`, no-store; receipt không dùng id dễ đoán. |
| 15 | Accessibility | Label/fieldset/legend; error summary focus; paste/password manager. |
| 16 | Acceptance | Atomic reserve + snapshot; idempotency; COD-only MVP; không tạo order khi lỗi. |

### 10.4. Customer Account (`/tai-khoan/*`)

| # | Trường | Đặc tả |
|---:|:---|:---|
| 1 | Mục tiêu | Quản lý profile, address, orders, reviews, voucher/points. |
| 2 | Đối tượng | Customer đã xác thực. |
| 3 | Route | `/tai-khoan`, `/ho-so`, `/dia-chi`, `/don-hang`, `/danh-gia`, `/ma-giam-gia`, `/cuttayshop-plus`. |
| 4 | Header/body/footer | Header account; side nav/content; footer chuẩn. |
| 5 | Sections | Overview, recent orders, profile, addresses, order tabs, review queue, loyalty/vouchers. |
| 6 | Components | AccountNav, StatCard, AddressCard/Form, OrderCard/Table, StatusBadge, EmptyState. |
| 7 | Data | ViewModel theo subpage; không trả Identity entity trực tiếp. |
| 8 | Actions | Update profile/password/address, open/cancel order, review, copy voucher. |
| 9 | Destinations | Order detail, PDP, loyalty, logout. |
| 10 | Desktop | Side nav 280px + content. |
| 11 | Tablet | Nav thành horizontal/compact select; content full. |
| 12 | Mobile | Nav list/drawer; order/address thành cards; destructive confirm. |
| 13 | States | First-use empty, loading, validation, forbidden ownership, session expired, no eligible review. |
| 14 | SEO | `noindex,nofollow`, no-store; không PII trong title/URL. |
| 15 | Accessibility | Current nav `aria-current`; error summary; status text+icon; timeout warning. |
| 16 | Acceptance | Query kèm UserId; không lộ owner; default address nhất quán; keyboard hoàn tất form. |

### 10.5. Order Detail & Tracking

| # | Trường | Đặc tả |
|---:|:---|:---|
| 1 | Mục tiêu | Hiển thị snapshot/progress chỉ cho chủ đơn hoặc receipt hợp lệ. |
| 2 | Đối tượng | Customer; guest đã vượt mã + phone/rate limit. |
| 3 | Route | Account detail hoặc POST `/tra-cuu-don-hang`; không guest detail bằng code trần. |
| 4 | Header/body/footer | Account/storefront; status/timeline/items/summary/help; footer. |
| 5 | Sections | Order meta, timeline, shipment, address masked, item snapshot, totals, history. |
| 6 | Components | Stepper, StatusBadge, SnapshotRow, PriceSummary, Alert, ConfirmDialog. |
| 7 | Data | Order snapshot, allowed actions, shipment events, masked customer data. |
| 8 | Actions | Cancel request, copy tracking, buy again, return, review delivered item. |
| 9 | Destinations | Orders, PDP, contact/FAQ, review. |
| 10 | Desktop | Main 8/12 + summary/help 4/12. |
| 11 | Tablet | Timeline horizontal nếu đủ chỗ, nếu không vertical. |
| 12 | Mobile | Vertical timeline, item cards, actions full-width. |
| 13 | States | Pending/failed payment, cancelled, return requested, not found/forbidden. |
| 14 | SEO | `noindex,nofollow`, no-store; tránh code trong analytics không cần thiết. |
| 15 | Accessibility | Stepper ordered list/current text; copy feedback polite; confirm focus trap. |
| 16 | Acceptance | IDOR test pass; action đúng state; totals theo snapshot; lookup generic/masked. |

### 10.6. Admin Dashboard (`/admin`)

| # | Trường | Đặc tả |
|---:|:---|:---|
| 1 | Mục tiêu | Triage revenue, order và stock cần xử lý. |
| 2 | Đối tượng | User có capability tương ứng. |
| 3 | Route | Admin Area `DashboardController.Index`. |
| 4 | Header/body/footer | Admin sidebar/topbar; dashboard; không footer marketing. |
| 5 | Sections | Date filter, KPI, revenue chart, pending orders, low stock, activity. |
| 6 | Components | AdminNav, FilterBar, StatCard, Chart, DataTable, StatusBadge. |
| 7 | Data | Aggregate ViewModel theo Asia/Saigon và quyền xem. |
| 8 | Actions | Đổi kỳ, mở order/product/report; export theo quyền. |
| 9 | Destinations | Orders, inventory, products, reports. |
| 10 | Desktop | Sidebar 260px + content max 1600; KPI 4 cột. |
| 11 | Tablet | Collapsible sidebar; KPI 2 cột; table overflow cục bộ. |
| 12 | Mobile | Nav drawer; KPI 1–2 cột; chart có summary text/table. |
| 13 | States | No data, permission-limited, widget error, stale timestamp, skeleton. |
| 14 | SEO | `noindex,nofollow`, no-store; CSP cho chart. |
| 15 | Accessibility | Chart summary/table; table caption/scope/sort; sidebar focus. |
| 16 | Acceptance | Policy server-side; timezone/currency đúng; lỗi widget không phá trang. |

### 10.7. Admin Product Create/Edit

| # | Trường | Đặc tả |
|---:|:---|:---|
| 1 | Mục tiêu | Tạo/sửa product, variant, ảnh và SEO an toàn. |
| 2 | Đối tượng | Capability `ManageCatalog`. |
| 3 | Route | `/admin/san-pham/them-moi`, `/chinh-sua/{id}`. |
| 4 | Header/body/footer | Admin layout; form sections + sticky actions; không footer. |
| 5 | Sections | Basic, category, pricing, variants, inventory link, media, content, SEO, status. |
| 6 | Components | AdminForm, VariantTable, FileUpload, SlugField, RichText, ErrorSummary. |
| 7 | Data | Create/Edit ViewModel allow-list; row version; lookup; media metadata. |
| 8 | Actions | Save draft, publish, add/remove/reorder variant/image, preview, cancel. |
| 9 | Destinations | Product list, storefront preview/PDP, inventory. |
| 10 | Desktop | Form 8/12 + status/sidebar 4/12. |
| 11 | Tablet | Form full; sidebar inline; table local scroll. |
| 12 | Mobile | Stacked; variant editor card/dialog; sticky action không che focus. |
| 13 | States | Validation, duplicate SKU/slug, upload failure, concurrency conflict, unsaved, denied. |
| 14 | SEO | Preview noindex; metadata validation; sanitized content. |
| 15 | Accessibility | Labels/error summary; upload keyboard; reorder có button alternative. |
| 16 | Acceptance | Không bind EF entity; magic-byte/size; unique SKU/slug; audit; không overwrite conflict. |

---

## 11. BLUEPRINT KẾ THỪA CHO TOÀN BỘ PAGE INVENTORY

Mỗi trang chưa có phiếu riêng kế thừa **đủ 16 trường** từ family dưới đây và áp delta trong bảng mapping. Cách này tránh lặp layout/state giống nhau nhưng vẫn buộc mọi route có owner rõ.

| # / Trường | **Discovery** (catalog/campaign/blog/content) | **Auth** | **Account** | **Admin** | **System** |
|---:|:---|:---|:---|:---|:---|
| 1 Mục tiêu | Khám phá/đọc/chuyển đổi | Xác thực/khôi phục an toàn | Tự phục vụ dữ liệu cá nhân | Vận hành có audit | Phục hồi khỏi trạng thái bất thường |
| 2 Đối tượng | Anonymous/Customer | Anonymous hoặc session expired | Customer | Capability cụ thể | Mọi user, tối thiểu dữ liệu |
| 3 Route | Theo registry doc 02 | `AuthController` | `/tai-khoan/*` | Admin Area | `ErrorController`/embedded state |
| 4 Layout | Storefront header/body/footer | Auth shell tối giản | Storefront + account nav | Admin sidebar/topbar | Logo + main + safe navigation |
| 5 Sections | Hero/title, content/list, CTA | Title, form, help/legal | Title, nav, content/action | Filter, content/table/form | Status, explanation, recovery |
| 6 Components | Breadcrumb/card/filter/prose | FieldGroup/ErrorSummary/Button | AccountNav/card/table/form | AdminTable/Form/Status/Modal | Illustration/Alert/Button |
| 7 Data | Strong ViewModel/paged query | Auth ViewModel + token opaque | Owner-scoped ViewModel | Policy-scoped ViewModel | Correlation id/status only |
| 8 Actions | Filter/open/CTA/share phù hợp | Submit/resend/back | CRUD/track/review phù hợp | CRUD/transition/export theo policy | Retry/back/home/contact |
| 9 Destinations | PDP/cart/content liên quan | Account/home/reset | PDP/orders/help | Admin module liên quan | Home/search/help |
| 10 Desktop | Container 1360, grid theo page | Form 420–520px | Nav 280px + content | Container 1600 + sidebar | Centered 560–720px |
| 11 Tablet | Grid giảm cột | Form full trong gutter | Nav compact | Sidebar collapse | Centered full gutter |
| 12 Mobile | Một/2 cột, filter drawer | Một cột, keyboard-safe | Cards/drawer nav | Cards/local table scroll | Một cột, CTA 44px |
| 13 States | Loading/empty/no-result/error | invalid/expired/rate-limit/success | empty/loading/forbidden/session | empty/loading/conflict/denied | 403/404/500/offline/expired |
| 14 SEO | Canonical/schema theo page | noindex/no-store | noindex/no-store | noindex/no-store | noindex; 404 status thật |
| 15 A11y | landmarks/heading/focus/alt | label/error summary/paste | current nav/owner-safe status | table/form/chart semantics | focus heading, plain language |
| 16 AC | URL/state/keyboard/mobile đúng | generic response/token/rate limit | owner-only + recovery | policy/audit/concurrency | HTTP status + recovery hoạt động |

### 11.1. Mapping page → family và delta bắt buộc

| Trang/route | Family | Delta sections/action/state | Phase |
|:---|:---:|:---|:---:|
| Home `/` | Phiếu mục 1 | Hero/category/trust/deals/recommendations/blog/newsletter/AI preview | MVP |
| Catalog `/san-pham`, category `/danh-muc/{slug}`, search `/tim-kiem` | Discovery + mục 2 | Filter/sort/pagination; no-result giữ query | MVP |
| Promotion `/khuyen-mai`, Flash Sale `/flash-sale` | Discovery | Campaign terms/countdown/expired/out-of-stock | MVP |
| Wishlist `/yeu-thich` | Discovery | Saved grid, guest merge, empty CTA | MVP |
| Compare `/so-sanh` | Discovery | 2–4 columns, remove/add, mobile attribute rows | Future |
| Order success `/dat-hang-thanh-cong` | System | Opaque receipt, next steps; refresh idempotent | MVP |
| Guest order lookup `/tra-cuu-don-hang` | Auth | Order code + phone, generic/masked/rate-limited | MVP |
| Blog index/topic/detail `/blog*` | Discovery | Article cards/prose/related; sanitized HTML | Phase 2 |
| About `/ve-chung-toi` | Discovery | Brand story, commitments, CTA catalog | MVP |
| Contact `/lien-he` | Discovery | Contact form, channels, success/error; rate limit | MVP |
| FAQ `/faq` | Discovery | Searchable accordions, contact escalation | MVP |
| Policies `/chinh-sach/*` | Discovery | Prose TOC, effective date, print | MVP |
| Login `/dang-nhap` | Auth | Credentials, forgot/register; generic error/lockout | MVP |
| Register `/dang-ky` | Auth | Account fields, consent, email sent state | MVP |
| Verify `/xac-minh-email` | Auth | Valid/expired/used token, resend rate limit | MVP |
| Forgot/reset `/quen-mat-khau`, `/dat-lai-mat-khau` | Auth | Generic request result; token expired; password rules | MVP |
| Profile/password `/tai-khoan/ho-so`, `/doi-mat-khau` | Account | Personal form/current password; validation/conflict | MVP |
| Address `/tai-khoan/dia-chi` | Account | List/form/default/delete confirm | MVP |
| Orders `/tai-khoan/don-hang` | Account | Status tabs, pagination, empty by filter | MVP |
| Reviews `/tai-khoan/danh-gia` | Account | Eligible/pending/published tabs, verified purchase | Phase 2 |
| Vouchers/loyalty `/tai-khoan/ma-giam-gia`, `/cuttayshop-plus` | Account | Voucher validity/points ledger/tier, no eligible state | Phase 2 |
| Admin product/category/variant/inventory | Admin | Catalog table/form/tree/stock concurrency | Phase 2 |
| Admin orders/print slip | Admin | State filter/detail/allowed transitions/print view | Phase 2 |
| Admin customers/support | Admin | Masked PII, ticket assignment, account action audit | Phase 2 |
| Admin promotion/flash sale/banner | Admin | Schedule/scope/priority/preview/conflict | Phase 2 |
| Admin reviews/blog | Admin | Moderation/editor/sanitization/publish workflow | Phase 2 |
| Admin reports | Admin | Date filters, chart + data table, export permission | Phase 2 |
| Admin settings | Admin | Store/shipping config, confirm + audit | Phase 2 |
| Admin roles `/admin/phan-quyen` | Admin | Capability matrix, self-lockout guard, audit | Future |
| 403/404/500 `/403|404|500` | System | Status thật, correlation id cho 500, no stack trace | MVP |
| Session expired `/session-expired` | System | Login return URL allow-list, preserve safe form draft | MVP |
| Maintenance `/bao-tri` | System | Expected window/status channel; 503 + Retry-After | Phase 2 |
| Embedded loading/empty/no-result/out-of-stock/error | System | Owner page giữ layout và recovery theo doc 02 | MVP |

---

*Hệ thống blueprint này định nghĩa layout, dữ liệu, trạng thái và hành vi; độ khớp thị giác phải được xác minh bằng render và screenshot review khi triển khai.*
