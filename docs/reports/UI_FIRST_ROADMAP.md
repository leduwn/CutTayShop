# CUTTAYSHOP — LỘ TRÌNH TRIỂN KHAI UI-FIRST TOÀN DIỆN (ROADMAP)

> **Chiến lược tổng quát**: FRONTEND FIRST — BACKEND INCREMENTAL  
> **Mục tiêu**: Xây dựng toàn bộ bề mặt giao diện người dùng e-commerce (UX/UI) trước với dữ liệu giả lập phong phú (`IDemoDataProvider`), hoàn thiện tương tác và kiểm thử thực tế trước khi kết nối cơ sở dữ liệu và thanh toán thật.  

---

## BẢNG TỔNG QUAN CÁC SPRINT PHÁT TRIỂN

```
Sprint 1: Nền tảng kiến trúc & Tái tạo Homepage (HOÀN THÀNH)
    │
    ▼
Sprint 2: Trang Danh mục (PLP) & Chi tiết Sản phẩm (PDP)
    │
    ▼
Sprint 3: Giỏ hàng (Cart) & Luồng Đặt hàng (Checkout UI) & Hội viên
    │
    ▼
Sprint 4: Trang Tìm kiếm, Tài khoản cá nhân & Trợ lý CutTay AI hoàn chỉnh
    │
    ▼
Sprint 5: Kết nối Backend Incremental (EF Core 10, SQL Server, Auth, Payments)
```

---

## CHI TIẾT KẾ HOẠCH TỪNG SPRINT

### Sprint 1: Nền Tảng Kiến Trúc & Homepage Foundation (ĐÃ HOÀN THÀNH ✅)
- Khởi tạo kiến trúc 3-tier: `CutTayShop.Core`, `CutTayShop.Infrastructure`, `CutTayShop.Web` (.NET 10 LTS, C# 14).
- Thiết lập Design System Token: màu sắc, typography (Plus Jakarta Sans), WCAG 2.2 AA.
- Tái tạo Homepage theo ảnh mẫu: Sticky Header, Hero 8/4 grid, 10 danh mục tròn pastel, 4 cam kết, Flash Sale countdown, sản phẩm nổi bật, banner CutTayShop+, newsletter, footer và widget CutTay AI.
- Hỗ trợ Light / Dark theme chuyển tức thì, lưu LocalStorage.
- Đảm bảo responsive 100% không tràn màn hình ngang (375px đến 1920px).

### Sprint 2: Trang Danh Mục & Chi Tiết Sản Phẩm (TIẾP THEO 🚀)
- **Trang Danh mục sản phẩm (Product Listing Page - PLP)**:
  - Bố cục bộ lọc bên trái (Sidebar Filter): theo khoảng giá, thương hiệu, đánh giá sao, tình trạng hàng.
  - Thanh sắp xếp trên cùng: Phổ biến nhất, Bán chạy, Giá tăng/giảm, Mới nhất.
  - Lưới sản phẩm responsive với phân trang và chuyển đổi chế độ xem (Lưới / Danh sách).
- **Trang Chi tiết sản phẩm (Product Detail Page - PDP)**:
  - Thư viện ảnh sản phẩm tương tác (Gallery): ảnh lớn, thumbnail chọn ảnh, zoom khi rê chuột.
  - Khu vực mua hàng: Chọn biến thể (màu sắc, dung lượng, kích cỡ), bộ tăng giảm số lượng.
  - Nút hành động: "Thêm vào giỏ hàng", "Mua ngay", "Lưu vào yêu thích".
  - Bảng thông số kỹ thuật chi tiết, chính sách bảo hành, cam kết giao hàng 2h.
  - Khu vực đánh giá & nhận xét từ khách hàng kèm hình ảnh thực tế.
  - Khối sản phẩm tương tự và thường được mua cùng.

### Sprint 3: Giỏ Hàng, Thanh Toán & Hội Viên (UI-FIRST)
- **Giỏ hàng (Cart Page & Mini-Cart Drawer)**:
  - Cập nhật số lượng sản phẩm tức thì, xoá sản phẩm, khôi phục thao tác (Undo).
  - Khung nhập mã giảm giá (Voucher / Coupon) với phản hồi trừ tiền trực quan.
  - Thanh tiến độ đạt mốc Freeship ("Mua thêm 50.000₫ để được Miễn phí vận chuyển").
- **Giao diện Thanh toán (Checkout UI)**:
  - Tiến trình 3 bước trực quan: Địa chỉ giao hàng -> Phương thức vận chuyển -> Phương thức thanh toán.
  - Lựa chọn phương thức: COD, Chuyển khoản VietQR, Thẻ ATM/Visa, Ví điện tử (giao diện chọn mẫu, tuân thủ không xử lý thẻ thật ở pha UI-first).
  - Tóm tắt đơn hàng cố định bên phải (Order Summary).
- **Trang Xác nhận đặt hàng (Order Success Page)**:
  - Mã đơn hàng, thời gian giao dự kiến, hướng dẫn thanh toán QR hoặc xác nhận COD.

### Sprint 4: Tìm Kiếm Toàn Diện, Quản Lý Tài Khoản & CutTay AI
- **Trang Kết quả tìm kiếm (Search Results Page)**:
  - Tìm kiếm nâng cao có gợi ý thông minh, lọc theo từ khóa liên quan, phân tích ngữ nghĩa.
- **Trang Tài khoản người dùng (Customer Portal)**:
  - Tổng quan tài khoản, lịch sử đơn hàng, theo dõi lộ trình đơn hàng (Tracking timeline).
  - Sổ địa chỉ giao hàng, danh sách sản phẩm yêu thích (Wishlist).
  - Trung tâm CutTay Xu và hạng thành viên CutTayShop+.
- **Nâng cấp CutTay AI**:
  - Tích hợp trả lời sâu về thông số kỹ thuật và so sánh sản phẩm ngay trong widget.

### Sprint 5: Kết Nối Backend & Tích Hợp Dịch Vụ Thực (BACKEND INCREMENTAL)
- Cấu hình Entity Framework Core 10 với Microsoft SQL Server / PostgreSQL.
- Triển khai ASP.NET Core Identity: Xác thực người dùng, bảo mật JWT, phân quyền Quản trị viên/Khách hàng.
- Kết nối cổng thanh toán chính thức (VNPay / MoMo / ZaloPay Sandbox).
- Dịch vụ email thông báo đơn hàng và quản lý tồn kho thời gian thực.
