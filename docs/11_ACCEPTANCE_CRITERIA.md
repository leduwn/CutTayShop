# 11 — BỘ TIÊU CHÍ NGHIỆM THU CHẤT LƯỢNG (ACCEPTANCE CRITERIA)

**Dự án:** CutTayShop — Nền tảng Thương mại Điện tử B2C Hiện đại  
**Nền tảng:** ASP.NET Core MVC  
**Phạm vi:** Kiểm toán chất lượng Phase 0 và khung nghiệm thu các giai đoạn triển khai (M1 - M7).

---

## 1. QUALITY GATES — GIAI ĐOẠN 0 (PHASE 0 CHECKLIST)

Trạng thái chỉ được ghi **PASS** khi có bằng chứng trong repository; prototype là tùy chọn của prompt gốc nên không dùng làm blocker.

| Mã cổng | Hạng mục kiểm tra | Tiêu chuẩn bắt buộc | Trạng thái |
| :--- | :--- | :--- | :--- |
| **QG-01** | Phân tích ảnh mẫu | Ảnh 1536×1024 đã mở; visual deconstruction, giới hạn đo và quyết định tái tạo nằm ở doc 03. | **PASS — doc 03** |
| **QG-02** | Design System | Primitive/semantic color, typography, spacing, layout, radius, shadow, motion, z-index, icon/media token. | **PASS — doc 04** |
| **QG-03** | Component library | Component bắt buộc, states, responsive và accessibility; AI có contract UI-only/fallback. | **PASS — doc 06** |
| **QG-04** | Sitemap/inventory | >50 page designs, route registry, MVP/Phase 2/Future và shared system states. | **PASS — doc 02** |
| **QG-05** | Page blueprint | 16 trường cho trang trọng yếu; các trang còn lại kế thừa family contract + delta rõ ràng. | **PASS — doc 05 §10–11** |
| **QG-06** | MVC architecture | MVC/Razor, ViewModel, DI/EF/Identity, routing/service/cart/search/logging/error/security. | **PASS — doc 08** |
| **QG-07** | Data/flows | ERD, entity/rule canonical, state machine và đủ 7 Mermaid flow. | **PASS — doc 09** |
| **QG-08** | Responsive/a11y | 6 viewport, contrast tính lại, keyboard/focus/form/error/reduced-motion/forced-colors plan. | **PASS cho đặc tả; kiểm UI thật ở M1/M2** |
| **QG-09** | Prototype HTML/CSS | Prompt gốc ghi “có thể tạo”; Phase 0 này không tạo để tránh biến tài liệu thành code chưa được duyệt. | **N/A — optional** |
| **QG-10** | Roadmap/Git | M1–M7 đủ scope/deliverable/dependency/risk/AC/test; branch/commit/push được ghi ở handoff. | **XÁC NHẬN KHI COMMIT** |

---

## 2. TIÊU CHÍ NGHIỆM THU TỪNG PHÂN HỆ CHỨC NĂNG (SYSTEM CRITERIA)

### 2.1. Phân hệ Giao diện & Thẩm mỹ (UI/UX Criteria)
- **AC-UI-01 (Màu sắc & Nhận diện):** 
  * Nền chính trắng ngà sáng (`#FFFFFF` và `#F8F9F7`), viền xám mềm `#E8ECEA`.
  * Màu xanh pastel `#BDEFA8` được áp dụng chuẩn xác cho highlight cụm từ "ở ngay đây" trên Hero và điểm nhấn thương hiệu.
  * Toàn bộ nút chính (CTA) mang hình dáng viên thuốc (Pill shape `rounded-full`) màu đen mực `#101418` với chữ trắng tương phản cao.
- **AC-UI-02 (Typography tiếng Việt):** 
  * Sử dụng phông chữ Be Vietnam Pro hoặc Inter hỗ trợ đầy đủ 100% ký tự dấu tiếng Việt, không bị lỗi vỡ nét (glyph missing) hoặc lỗi dấu cách.
  * Phân cấp cỡ chữ (Type Scale) rõ ràng từ Display (44px-56px), H1-H3 đến Body (14px-16px).
- **AC-UI-03 (Responsive & Mobile UX):** 
  * Không bao giờ xảy ra tình trạng cuộn ngang (horizontal scroll) trên bất kỳ kích thước màn hình nào từ 375px trở lên.
  * Vùng chạm cho nút bấm và icon trên thiết bị di động đạt kích thước tối thiểu `44x44px`.
  * Nội dung các hàng danh mục hoặc banner trên mobile tự động cuộn ngang êm ái (`overflow-x-auto` snap) hoặc co giãn 1 cột linh hoạt.

### 2.2. Phân hệ Mua sắm & Giỏ hàng (Storefront & Cart Criteria)
- **AC-CAT-01 (Duyệt danh mục):** Nhấn vào bất kỳ danh mục nào trong 10 danh mục trang chủ sẽ điều hướng chính xác đến `/danh-muc/{slug}` với các sản phẩm thuộc danh mục tương ứng.
- **AC-FLS-01 (Deal Hot Flash Sale):**
  * Đồng hồ đếm ngược (Countdown Timer) hiển thị định dạng chuẩn `Ngày : Giờ : Phút : Giây`. Khi hết giờ, hệ thống tự động khóa giá khuyến mãi và hiển thị nhãn "Chương trình đã kết thúc".
  * Thẻ sản phẩm hiển thị phần trăm giảm giá màu đỏ (`-40%`), giá bán nổi bật và giá niêm yết gạch ngang.
- **AC-CRT-01 (Giỏ hàng & Mini Cart Drawer):**
  * Thao tác "Thêm vào giỏ" không làm tải lại toàn bộ trang; hiển thị thông báo toast thành công và cập nhật số lượng trên icon giỏ hàng Header ngay lập tức.
  * Cart Drawer hỗ trợ xem nhanh sản phẩm, điều chỉnh số lượng (+/-) và tính toán tổng tiền tạm tính chính xác theo đơn vị VND.

### 2.3. Phân hệ Thanh toán & Đơn hàng (Checkout & Orders Criteria)
- **AC-CHK-01 (Xác thực dữ liệu form):**
  * Bắt buộc kiểm tra họ tên, số điện thoại đúng định dạng Việt Nam (10 số, đầu số hợp lệ 03, 05, 07, 08, 09), địa chỉ nhận hàng chi tiết.
  * Cung cấp thông báo lỗi ngay bên dưới từng trường nhập liệu với `aria-describedby` hỗ trợ khiếm thị.
- **AC-ORD-01 (Bảo vệ giá & Tồn kho):**
  * Giá tiền của từng sản phẩm trong đơn hàng được lưu dạng snapshot cố định tại thời điểm checkout, không bị thay đổi nếu sau đó Admin sửa giá sản phẩm.
  * Checkout reserve tồn kho atomically. Online payment Phase 2 giữ tối đa 15 phút; COD chuyển reservation thành committed khi xác nhận và release idempotent khi hủy/lỗi.
- **AC-ORD-02 (Vòng đời đơn hàng):**
  * Đơn hàng tuân thủ state machine canonical, gồm nhánh hủy/đổi trả/refund tại `docs/09_DATA_MODEL_AND_USER_FLOWS.md` mục 3.3–3.6.
  * Khách hàng có thể tra cứu tình trạng đơn hàng bằng Mã đơn + Số điện thoại bất kỳ lúc nào.

### 2.4. Phân hệ Quản trị (Admin Operations Criteria)
- **AC-ADM-01 (Bảo mật truy cập):** 
  * Admin Area yêu cầu xác thực mặc định; từng controller/action dùng policy capability phù hợp, không cấp `Staff` quyền blanket.
  * Tài khoản khách hàng thường nếu truy cập trực tiếp URL `/Admin` sẽ bị từ chối với mã phản hồi HTTP 403 Forbidden.
- **AC-ADM-02 (Quản lý sản phẩm):**
  * Hỗ trợ tạo sản phẩm đơn và sản phẩm có biến thể (ví dụ: Màu sắc, Size).
  * Ảnh sản phẩm tải lên được kiểm tra định dạng an toàn (chỉ nhận `.jpg`, `.jpeg`, `.png`, `.webp`), kích thước tối đa 5MB và tự động đổi tên ngẫu nhiên để chống tấn công Path Traversal.
- **AC-ADM-03 (Bảo vệ dữ liệu):**
  * Áp dụng xóa mềm (Soft Delete) cho sản phẩm và danh mục để không làm gãy dữ liệu lịch sử đơn hàng đã bán.

### 2.5. Phân hệ Trợ lý Ảo (CutTay AI Widget Criteria)
- **AC-AI-01 (Giao diện & Tương tác):**
  * Widget xuất hiện nổi cố định ở góc dưới bên phải màn hình, không che khuất các nút thao tác chính.
  * Cho phép thu nhỏ (minimize), đóng mở mượt mà không gây giật trang.
  * Cung cấp danh sách các chip câu hỏi mẫu để người dùng nhấn hỏi nhanh chỉ với 1 cú click.
- **AC-AI-02 (Hợp đồng API Backend):**
  * JSON request/response/error và privacy/fallback được định nghĩa ở doc 06 §7.5; Phase 0 chỉ là UI contract, không tuyên bố backend AI hoạt động.

---

## 3. TIÊU CHÍ BẢO MẬT & HIỆU NĂNG (NON-FUNCTIONAL CRITERIA)

| Tiêu chuẩn | Chỉ số nghiệm thu bắt buộc |
| :--- | :--- |
| **Chống tấn công CSRF** | 100% các form `POST`, `PUT`, `DELETE` đều chứa AntiForgeryToken hợp lệ của ASP.NET Core. |
| **Chống tấn công XSS** | Razor encode dữ liệu thường; rich HTML blog/product phải qua sanitizer allow-list trước khi render. |
| **Chống Overposting** | 100% Action nhận dữ liệu đầu vào thông qua Strongly-typed ViewModels, không bao giờ dùng trực tiếp Entity Framework Model. |
| **Core Web Vitals** | Mục tiêu p75 mobile production: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1; lab test không thay thế field data. |
| **Accessibility WCAG 2.2** | Điểm số Lighthouse Accessibility đạt từ 95/100 trở lên. |

---

*Tài liệu tiêu chí này đóng vai trò là thước đo chính thức để nghiệm thu từng phần mã nguồn được phát triển trong các giai đoạn tiếp theo.*
