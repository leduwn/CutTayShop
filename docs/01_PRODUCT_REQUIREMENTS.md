# CUTTAYSHOP — PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Mã tài liệu:** CTS-DOC-001  
**Phiên bản:** 1.0.0  
**Tác giả:** Agent C (E-commerce Product Designer & Information Architect)  
**Nền tảng kỹ thuật mục tiêu:** ASP.NET Core MVC (`net10.0` LTS), Entity Framework Core 10, SQL Server; CSS custom properties + CSS module theo feature, JavaScript thuần có phạm vi rõ ràng  
**Thị trường:** Việt Nam (B2C E-commerce)  
**Trạng thái:** Approved for MVP Execution  

---

## 1. TỔNG QUAN SẢN PHẨM (EXECUTIVE SUMMARY & VISION)

### 1.1. Tầm nhìn sản phẩm
CutTayShop là nền tảng thương mại điện tử B2C đa ngành hàng dành cho thị trường Việt Nam, kết hợp trải nghiệm mua sắm trực quan với định hướng trợ lý CutTay AI trong tương lai. Phase 0/MVP chỉ có shell UI và fallback hỗ trợ; không tuyên bố AI trực tuyến 24/7.

Hệ thống tập trung giải quyết 3 điểm nghẽn chính của e-commerce truyền thống:
1. **Quá tải thông tin sản phẩm:** Người dùng mất nhiều thời gian đọc review và thông số. CutTay AI hỗ trợ chắt lọc, so sánh và tư vấn tức thì theo nhu cầu thực tế và ngân sách.
2. **Trải nghiệm tìm kiếm & mua hàng cồng kềnh:** CutTayShop tinh gọn checkout trong 1 luồng duy nhất (One-page / Fast Checkout), hỗ trợ tra cứu đơn không cần đăng nhập.
3. **Mất kết nối hậu mãi & giữ chân khách hàng:** Hệ sinh thái khách hàng thân thiết CutTayShop+ minh bạch tích điểm, phân hạng, tặng quà sinh nhật và voucher độc quyền.

### 1.2. Ngành hàng chủ lực (Catalog Scope)
- **Đồ công nghệ & Phụ kiện số:** Tai nghe Bluetooth, Đồng hồ thông minh, Củ sạc nhanh, Bàn phím cơ, Chuột không dây, Loa di động.
- **Thời trang & Phụ kiện:** Áo thun basic, Áo khoác streetwear, Balo chống nước, Giày sneaker, Ví da, Mũ nón.
- **Nhà cửa & Đời sống:** Bình giữ nhiệt chân không, Đèn ngủ cảm ứng, Đồ gia dụng mini, Hộp cơm giữ nhiệt.
- **Làm đẹp & Sức khỏe:** Chăm sóc da, Son dưỡng, Máy massage cổ vai gáy, Thực phẩm bổ sung chính hãng.
- **Thể thao & Dã ngoại:** Bình nước thể thao, Thảm yoga, Băng quấn cổ tay thể thao, Túi du lịch.
- **Sách & Văn phòng phẩm:** Sổ tay cao cấp, Bút ký, Đồ decor bàn làm việc.

---

## 2. ĐỐI TƯỢNG NGƯỜI DÙNG & USER PERSONAS

```
+--------------------------------------------------------------------------------------------------+
|                                    USER PERSONAS OVERVIEW                                        |
+---------------------------------+--------------------------------+-------------------------------+
|  Persona 1: Linh "Gen Z"        |  Persona 2: Minh "Millennial"  |  Persona 3: Lan "Săn Deal"    |
|  - Tuổi: 21 (Sinh viên/Intern)  |  - Tuổi: 30 (Kỹ sư phần mềm)   |  - Tuổi: 34 (Nhân viên VP/Mẹ) |
|  - Thiết bị: Smartphone 90%     |  - Thiết bị: Desktop & Mobile  |  - Thiết bị: Smartphone 85%   |
|  - Quan tâm: Trend, AI, Visual  |  - Quan tâm: Spec, Bảo hành    |  - Quan tâm: Giá, Coupon, COD |
+---------------------------------+--------------------------------+-------------------------------+
```

### 2.1. Persona 1: Linh "Gen Z Trendsetter"
- **Độ tuổi:** 21 tuổi | **Nghề nghiệp:** Sinh viên năm cuối / Marketing Intern tại TP.HCM.
- **Hành vi kỹ thuật số:** Lướt TikTok/Instagram 4h/ngày, mua sắm trên di động vào buổi tối (20h - 24h).
- **Nhu cầu chính:** Tìm kiếm phụ kiện thời trang và công nghệ mới ra mắt, giá hợp lý, giao diện bắt mắt với visual tươi sáng, sticker cá tính.
- **Pain point:** Lười đọc thông số kỹ thuật phức tạp; ghét quy trình đăng ký tài khoản rườm rà; sợ mua phải hàng nhái.
- **Kỳ vọng tại CutTayShop:** Đăng nhập 1-click bằng Google, chat với CutTay AI ("Tìm tai nghe chống ồn dưới 1 triệu học bài"), săn Flash Sale khung giờ vàng, giao diện mobile mượt mà.

### 2.2. Persona 2: Minh "Millennial Smart Shopper"
- **Độ tuổi:** 30 tuổi | **Nghề nghiệp:** Kỹ sư phần mềm tại Hà Nội | Thu nhập: 28M VNĐ/tháng.
- **Hành vi kỹ thuật số:** Sử dụng desktop trong giờ làm việc và tablet/mobile khi ở nhà. Luôn so sánh giá và thông số kỹ lưỡng trước khi bấm mua.
- **Nhu cầu chính:** Đồ công nghệ phục vụ góc làm việc (bàn phím cơ, dock sạc, loa bluetooth), đồ gia dụng thông minh cho gia đình.
- **Pain point:** Sợ đơn hàng bị thất lạc, thiếu mã vận đơn rõ ràng; ghét phí ship ẩn; thủ tục đổi trả phức tạp.
- **Kỳ vọng tại CutTayShop:** Bộ lọc sản phẩm chi tiết theo cấu hình/thương hiệu, tính năng so sánh 2-3 sản phẩm, chính sách "Đổi trả dễ dàng trong 7 ngày", tích điểm hạng thành viên CutTayShop+ cao cấp để nhận freeship định kỳ.

### 2.3. Persona 3: Lan "Thợ săn Deal & Quản lý gia đình"
- **Độ tuổi:** 34 tuổi | **Nghề nghiệp:** Kế toán viên tại Đà Nẵng | Có 1 con nhỏ.
- **Hành vi kỹ thuật số:** Tranh thủ giờ nghỉ trưa và sáng sớm để săn voucher, đọc kinh nghiệm trên blog.
- **Nhu cầu chính:** Hàng gia dụng tiện ích, mỹ phẩm chăm sóc da chính hãng, đồ dùng học tập cho con.
- **Pain point:** Mã giảm giá hiển thị không áp dụng được do điều kiện mập mờ; thích kiểm tra hàng trước khi trả tiền (COD).
- **Kỳ vọng tại CutTayShop:** Hệ thống mã giảm giá hiển thị rõ ràng điều kiện tối thiểu, countdown flash sale đếm ngược chính xác, thanh toán COD linh hoạt, tra cứu hành trình vận chuyển tức thì qua số điện thoại.

---

## 3. PHÂN KỲ PHÁT TRIỂN (SCOPE MATRIX: MVP vs PHASE 2 vs FUTURE)

| Nhóm chức năng | Giai đoạn 1: MVP (Launch) | Giai đoạn 2: Scale (Sau 3 tháng) | Giai đoạn 3: Future Vision |
|---|---|---|---|
| **Catalog & Products** | Danh mục 2 cấp, SKU theo Color/Size, Giá sale, Bộ lọc cơ bản, Tồn kho tức thì | Đa cấp (N-tier), Thuộc tính động (EAV/JSON), So sánh sản phẩm trực quan, Đánh dấu "Hàng sắp về" | 3D / AR xem thử sản phẩm trên thực tế, Bundle combo tùy biến cao cấp |
| **Search & Discovery** | Tìm kiếm từ khóa Full-text, Gợi ý nhanh (Autocomplete), Lọc theo giá/hãng | Tìm kiếm mờ (Fuzzy Search), Lịch sử tìm kiếm gần đây, Danh sách từ khóa hot trending | Tìm kiếm bằng hình ảnh (Visual Search), Gợi ý cá nhân hóa qua ML |
| **Cart & Checkout** | Giỏ hàng tạm thời (Session) & Lưu trữ (DB), One-page Checkout, Thanh toán COD, Phí ship cố định/tỉnh | Tích hợp Cổng thanh toán điện tử (VNPay, MoMo, VietQR Napas 247), Tự động tính phí GHTK/GHN API | Mua trước trả sau (BNPL: Fundiin, Kredivo), Đặt cọc hàng Pre-order |
| **Order Tracking** | Tra cứu trạng thái theo Mã Đơn + SĐT không cần login, Lịch sử đơn trong Account | Tích hợp webhook tự động cập nhật trạng thái từ đơn vị vận chuyển, Thông báo qua Email tự động | Gửi tin nhắn trạng thái đơn qua Zalo ZNS / SMS Brandname, Live map vị trí shipper |
| **Customer & Auth** | Đăng ký/Đăng nhập Email & Mật khẩu, xác minh email, Sổ địa chỉ | Google OAuth, 2FA OTP, quản lý tài khoản liên kết | Passkey/WebAuthn, Zalo Login |
| **Loyalty System** | Chỉ membership marketing card; không tích/trừ điểm | CutTayShop+ ledger, 4 hạng, voucher và rule 1 điểm/1.000₫ | Gamification/minigame |
| **Promotions** | Flash Sale countdown timer theo giờ cố định, Mã giảm giá Coupon (giảm % hoặc tiền mặt, min order) | Flash Sale đa khung giờ tự động kích hoạt, Mã freeship kết hợp mã giảm giá, Giới hạn lượt dùng/user | Dynamic Pricing engine theo giờ thấp điểm, Chiến dịch referral giới thiệu bạn bè nhận thưởng |
| **Review & Rating** | Chỉ hiển thị summary/seed data trên PDP | Verified review chữ + Admin moderation | Ảnh/video, upvote, loyalty reward |
| **Content / Blog** | Homepage ẩn section hoặc dùng curated static links | Blog/CMS, tag/topic, sanitized rich text, BlogPosting schema | Bình luận, magazine, AI summary |
| **AI Assistant** | UI shell preview/unavailable + fallback FAQ/Liên hệ, không sinh câu trả lời | Optional deterministic FAQ/order intents sau privacy/security review | LLM/RAG/voice sau đánh giá riêng |

---

## 4. FUNCTIONAL REQUIREMENTS (CHI TIẾT YÊU CẦU CHỨC NĂNG)

### FR-01: Quản lý Danh mục & Hiển thị Sản phẩm (Catalog & Product Browsing)
- **FR-01.1:** Hỗ trợ cấu trúc danh mục cha-con. Mỗi danh mục có: Tên, Slug SEO, Icon đại diện, Banner, Mô tả SEO.
- **FR-01.2:** Sản phẩm hỗ trợ cả sản phẩm đơn giản (Single SKU) và sản phẩm có nhiều biến thể (Variant SKU: ví dụ Màu sắc, Kích cỡ, Dung lượng).
- **FR-01.3:** Mỗi biến thể sản phẩm lưu trữ: Mã SKU, Giá niêm yết, Giá khuyến mãi, Tồn kho thực tế, Ảnh biến thể, Trọng lượng (gram).
- **FR-01.4:** Trang danh sách sản phẩm (PLP) hỗ trợ:
  - Lọc theo Danh mục con, Khoảng giá (Price Slider), Thương hiệu, Đánh giá sao (từ 4 sao trở lên), Tình trạng hàng (Còn hàng).
  - Sắp xếp: Mới nhất, Bán chạy nhất, Giá tăng dần, Giá giảm dần, % Giảm giá nhiều nhất.
  - Phân trang (Pagination) chuẩn SEO kết hợp nút "Xem thêm" tiện lợi trên Mobile.
- **FR-01.5:** Huy hiệu sản phẩm trực quan: `-XX%`, `HOT DEAL`, `NEW`, `FREESHIP`, `CHÍNH HÃNG`.

### FR-02: Tìm kiếm & Khám phá (Search & Discovery)
- **FR-02.1 (Search Autocomplete):** Khi gõ từ 2 ký tự, hiển thị modal popup gợi ý ngay lập tức gồm: Top 5 sản phẩm khớp nhất (kèm ảnh, giá), 3 danh mục liên quan, từ khóa phổ biến.
- **FR-02.2 (Full-text Search):** Tìm kiếm không dấu tiếng Việt, tìm theo tên sản phẩm, tên thương hiệu, mã SKU hoặc từ khóa tag.
- **FR-02.3 (Search Zero-state):** Khi tìm kiếm không có kết quả, hiển thị thông báo thân thiện và tự động đề xuất 8 sản phẩm bán chạy nhất kèm các từ khóa tìm kiếm gợi ý.

### FR-03: Giỏ hàng & Mini-cart (Cart & Mini-cart Engine)
- **FR-03.1 (Cart Persistence):** Khách vãng lai (Guest) lưu trữ giỏ hàng trong Cookie/Session (mã hóa). Khi người dùng đăng nhập, tự động đồng bộ gộp (Merge) giỏ hàng vãng lai vào Database của tài khoản mà không làm mất hàng đã chọn.
- **FR-03.2 (Mini-cart Drawer):** Khi bấm thêm vào giỏ từ PDP hoặc thẻ sản phẩm, mở slide-over drawer từ bên phải hiển thị ngay danh sách hàng vừa thêm, tổng tiền tạm tính, nút "Tiến hành thanh toán" và thanh tiến độ đạt mức "Miễn phí vận chuyển" (ví dụ: "Mua thêm 110.000₫ để được Freeship").
- **FR-03.3 (Thao tác trong giỏ):** Tăng/giảm số lượng bằng AJAX realtime, xóa sản phẩm, chọn/bỏ chọn từng món (Select All / Select Items), cảnh báo khi số lượng vượt tồn kho.

### FR-04: Quy trình Đặt hàng & Thanh toán (Checkout & Order Processing)
- **FR-04.1 (One-page Checkout):** Giao diện thanh toán dồn trên 1 trang duy nhất chia 2 cột:
  - Cột trái: Thông tin người nhận (Họ tên, SĐT, Email), Địa chỉ nhận hàng (dropdown liên kết Tỉnh/Thành -> Quận/Huyện -> Phường/Xã), Phương thức vận chuyển, Phương thức thanh toán, Ghi chú đơn hàng.
  - Cột phải: Tóm tắt đơn hàng (danh sách món, giá, mã coupon đã áp, điểm CutTayShop+ áp dụng, phí ship, tổng thanh toán cuối cùng).
- **FR-04.2 (Phương thức thanh toán theo phase):**
  - **MVP:** COD (Cash on Delivery), không lưu thông tin thẻ.
  - **Phase 2:** VietQR qua adapter thật có webhook signature, idempotency và reconciliation.
  - **Future:** VNPay / MoMo / thẻ quốc tế sau đánh giá pháp lý, bảo mật và vận hành.
- **FR-04.3 (Ngăn chặn Oversell):** Đặt Transaction khóa dòng hoặc kiểm tra Optimistic Concurrency (`RowVersion`) khi người dùng ấn nút "Đặt hàng". Nếu sản phẩm bị người khác mua hết trong lúc điền form, trả về thông báo cụ thể mặt hàng hết tồn.

### FR-05: Quản lý & Tra cứu Đơn hàng (Order Tracking)
- **FR-05.1 (Tra cứu nhanh không cần đăng nhập):** Trang `/tra-cuu-don-hang` cho phép nhập `Mã đơn hàng` + `Số điện thoại mua hàng`. Xác thực khớp sẽ hiển thị toàn bộ tiến trình đơn.
- **FR-05.2 (Vòng đời đơn hàng):** Dùng đúng state machine canonical tại `docs/09_DATA_MODEL_AND_USER_FLOWS.md` mục 3.3; `Delivered` và `Completed` là hai trạng thái khác nhau, có nhánh yêu cầu hủy/đổi trả và refund.
- **FR-05.3 (Hủy đơn hàng):** Khách hàng được tự hủy đơn trực tiếp trong trang quản lý khi đơn còn ở trạng thái `Chờ xác nhận`. Khi đã sang `Đang đóng gói` hoặc `Đang giao`, hệ thống yêu cầu liên hệ hotline/CutTay AI.

### FR-06: Tài khoản Khách hàng (Customer Account)
- **FR-06.1:** Đăng nhập, đăng ký chuẩn với mật khẩu mã hóa bcrypt/PBKDF2; hỗ trợ đăng nhập nhanh bằng tài khoản Google.
- **FR-06.2:** Trang Dashboard tổng quan cá nhân: Thống kê số đơn hoàn thành, số điểm CutTayShop+, hạng thành viên hiện tại, danh sách 3 đơn hàng gần nhất.
- **FR-06.3:** Sổ địa chỉ nhận hàng: Cho phép lưu tối đa 10 địa chỉ, gắn cờ "Địa chỉ mặc định", phân loại "Nhà riêng" hoặc "Văn phòng".
- **FR-06.4:** Danh sách yêu thích (Wishlist): Lưu lại các sản phẩm quan tâm, thông báo khi sản phẩm trong wishlist giảm giá.

### FR-07: Hệ sinh thái Khách hàng thân thiết (CutTayShop+)
- **FR-07.1 (Tích điểm):** Tích lũy 1 điểm cho mỗi 1.000₫ giá trị hàng đủ điều kiện của đơn `Completed`; điểm chỉ khả dụng sau cửa sổ đổi trả và bị đảo tương ứng khi hoàn tiền.
- **FR-07.2 (Tiêu điểm):** 100 điểm = 1.000 VNĐ giảm giá trực tiếp vào hóa đơn tiếp theo (tối đa giảm 20% giá trị đơn hàng để bảo vệ biên lợi nhuận).
- **FR-07.3 (Cấp bậc thành viên Tiering):**
  - **Hạng Đồng (Bronze):** Mới tạo tài khoản -> Tích điểm 1%, Voucher chào mừng 20k.
  - **Hạng Bạc (Silver):** Chi tiêu từ 3.000.000 VNĐ/năm -> Tích điểm 1.2%, 1 mã Freeship/tháng.
  - **Hạng Vàng (Gold):** Chi tiêu từ 10.000.000 VNĐ/năm -> Tích điểm 1.5%, 3 mã Freeship/tháng, Ưu tiên hỗ trợ CSKH.
  - **Hạng Kim Cương (Diamond):** Chi tiêu từ 25.000.000 VNĐ/năm -> Tích điểm 2%, Quà sinh nhật đặc biệt, Voucher 200k, Hỗ trợ riêng từ CutTay AI VIP.

### FR-08: Động cơ Khuyến mãi & Flash Sale (Promotional Engine)
- **FR-08.1 (Flash Sale Component):**
  - Đếm ngược thời gian thực (Days, Hours, Minutes, Seconds) đến khung giờ kết thúc.
  - Hiển thị thanh tiến độ số lượng đã bán (ví dụ: `Đã bán 85/100 chiếc - Sắp cháy hàng`).
  - Tự động hoàn lại giá gốc khi hết giờ Flash Sale.
- **FR-08.2 (Hệ thống Coupon / Voucher):**
  - Loại giảm giá: Giảm theo phần trăm (`%`, có trần giảm tối đa) hoặc Giảm số tiền cố định (`VNĐ`).
  - Điều kiện áp dụng: Giá trị đơn hàng tối thiểu, Giới hạn tổng số lượt sử dụng toàn sàn, Giới hạn 1 lượt/khách hàng, Ngày hết hạn.
  - Tự động kiểm tra tính hợp lệ tại ô nhập giỏ hàng và checkout bằng Ajax không cần reload trang.

### FR-09: Đánh giá & Xếp hạng (Review & Rating Engine)
- **FR-09.1:** Chấm điểm từ 1 đến 5 sao theo từng tiêu chí: Chất lượng sản phẩm, Đúng với mô tả, Đóng gói vận chuyển.
- **FR-09.2:** Huy hiệu uy tín: Chỉ khách hàng có tài khoản đã mua sản phẩm và đơn hàng ở trạng thái `Giao thành công` mới có badge `Đã mua hàng tại CutTayShop`.
- **FR-09.3:** Bộ lọc đánh giá theo: Số sao (1, 2, 3, 4, 5 sao), Có hình ảnh, Đã mua hàng.

### FR-10: Quản lý Nội dung & Blog (CMS & Content)
- **FR-10.1:** Đăng bài viết chia sẻ kinh nghiệm chọn đồ công nghệ, mẹo phối đồ thời trang, cẩm nang gia dụng.
- **FR-10.2:** Tích hợp khối widget sản phẩm liên quan trong nội dung bài viết (Product Embed Card) cho phép độc giả bấm mua ngay từ bài đọc.
- **FR-10.3:** Tối ưu hóa thẻ Heading, mục lục tự động (Table of Contents), và thẻ Meta SEO từng bài.

### FR-11: Trợ lý Mua sắm Thông minh (CutTay AI Assistant)
- **FR-11.1 (Giao diện hiển thị):** Widget chat hình tròn cố định góc dưới bên phải màn hình (Bottom-right Float Badge). Khi click mở cửa sổ chat popover thân thiện phong cách sticker vui tươi.
- **FR-11.2 (Khả năng tương tác MVP):**
  - Các nút hành động nhanh (Quick Action Pills):
    * `Tư vấn sản phẩm phù hợp` -> Hỏi nhu cầu, khoảng giá, đưa ra 3 gợi ý sản phẩm tốt nhất kèm nút "Xem chi tiết".
    * `Kiểm tra đơn hàng` -> Hỏi mã đơn và SĐT, tra cứu DB và trả về trạng thái vận chuyển tức thì.
    * `Chương trình khuyến mãi` -> Liệt kê 3 mã giảm giá tốt nhất đang hoạt động.
    * `Hướng dẫn mua hàng & Đổi trả` -> Trả lời ngắn gọn chính sách đổi trả 7 ngày.
  - Hộp nhập văn bản tự do hỗ trợ khách đặt câu hỏi đơn giản.

---

## 5. NON-FUNCTIONAL REQUIREMENTS (YÊU CẦU PHI CHỨC NĂNG)

### 5.1. Hiệu năng & Tối ưu Trải nghiệm (Performance & Core Web Vitals)
- **Largest Contentful Paint (LCP):** < 2.5 giây trên kết nối 4G di động thông thường.
- **Interaction to Next Paint (INP):** < 200 ms đối với mọi thao tác click/tương tác trên trang.
- **Cumulative Layout Shift (CLS):** < 0.1 (tuyệt đối không nhảy giao diện khi banner hoặc ảnh sản phẩm tải trễ).
- **Time to First Byte (TTFB):** < 500 ms nhờ bộ đệm server-side caching (MemoryCache/Redis) kết hợp tối ưu truy vấn EF Core `AsNoTracking()`.
- **Tối ưu tài nguyên ảnh:** Mọi ảnh sản phẩm tự động chuyển đổi định dạng WebP hoặc AVIF, có thuộc tính `loading="lazy"` cho ảnh dưới màn hình cuộn (below-the-fold) và `fetchpriority="high"` cho ảnh LCP chính trong Hero section.

### 5.2. Bảo mật & An toàn Dữ liệu (Security & Data Protection)
- **Tuân thủ OWASP Top 10:**
  - Chống SQL Injection tuyệt đối qua Parameterized Queries của Entity Framework Core.
  - Chống Cross-Site Scripting (XSS): Encode toàn bộ nội dung HTML đầu ra qua Razor Engine mặc định.
  - Chống Cross-Site Request Forgery (CSRF): Tích hợp `[ValidateAntiForgeryToken]` trên tất cả các Action phương thức POST, PUT, DELETE.
- **Bảo mật xác thực & phân quyền:**
  - Mật khẩu mã hóa chuẩn bảo mật ASP.NET Core Identity.
  - Hạn chế brute-force bằng Rate Limiting Middleware (tối đa 5 lần đăng nhập sai / phút trên 1 IP).
  - Identity roles nền: `Admin`, `Staff`, `Customer`; quyền nghiệp vụ dùng policy capability `ManageCatalog`, `ManageOrders`, `ManageContent`, `ManageCustomers`, `ManagePromotions`, `ManageSettings`, `ViewReports`.
- **Bảo mật truyền thông tin:** Production bắt buộc HTTPS + HSTS; cấu hình protocol/cipher theo baseline của hạ tầng được hỗ trợ, không hard-code tuyên bố TLS 1.3 trước khi kiểm deployment.

### 5.3. Độ tin cậy & Tính sẵn sàng (Reliability & Availability)
- Cam kết thời gian uptime hệ thống tối thiểu 99.9%.
- Cơ chế toàn vẹn dữ liệu đơn hàng: Áp dụng Database Transaction cho chuỗi hành động: `Tạo Đơn Hàng` -> `Trừ Kho Biến Thể` -> `Đánh Dấu Sử Dụng Voucher` -> `Ghi Nhận Lịch Sử Tích Điểm`. Bất kỳ lỗi nào phát sinh đều rollback hoàn toàn.

### 5.4. Tối ưu hóa Công cụ Tìm kiếm (SEO & Social Sharing)
- Cấu trúc URL thân thiện, chứa từ khóa, không dấu gạch dưới hoặc ID vô nghĩa (Ví dụ: `/san-pham/tai-nghe-airbuds-pro-chong-on-p1002`).
- Tự động sinh Meta Tags: `title`, `description`, `canonical`, `robots`, `og:image`, `og:title`, `og:description`, `twitter:card`.
- Tích hợp dữ liệu có cấu trúc Schema.org JSON-LD chuẩn:
  - `Product` & `AggregateOffer` & `AggregateRating` cho trang chi tiết sản phẩm.
  - `BreadcrumbList` cho hệ thống phân cấp trang.
  - `Organization` & `WebSite` với tính năng Sitelinks Searchbox cho trang chủ.
  - `Article` cho các bài viết Blog.
- Tự động cập nhật tập tin `sitemap.xml` và `robots.txt` mỗi khi có sản phẩm hoặc bài viết mới.

### 5.5. Bản địa hóa & Ngôn ngữ (i18n & L10n)
- **Ngôn ngữ:** Tiếng Việt (vi-VN) làm ngôn ngữ mặc định toàn hệ thống. Kiến trúc tài nguyên (Resource `.resx`) sẵn sàng mở rộng đa ngôn ngữ (Tiếng Anh - en-US) trong tương lai.
- **Định dạng tiền tệ:** Việt Nam Đồng (VND), quy tắc dấu chấm phân cách hàng nghìn, ký hiệu `₫` ở cuối (Ví dụ: `1.490.000₫`).
- **Thời gian & Múi giờ:** UTC+7 (Giờ Hà Nội, ICT). Định dạng ngày tháng hiển thị: `dd/MM/yyyy HH:mm`.
- **Đơn vị vận chuyển:** Phù hợp hạ tầng 63 tỉnh/thành phố và đơn vị hành chính Việt Nam.

---

## 6. MA TRẬN DỮ LIỆU ĐẶC THÙ (BUSINESS RULES & THRESHOLDS)

```
+------------------------------------+------------------------------------+
| Tiêu chí nghiệp vụ                 | Quy định / Ngưỡng giá trị          |
+------------------------------------+------------------------------------+
| Hạn chót đổi trả hàng              | 7 ngày kể từ ngày giao thành công  |
| Hạn thanh toán đơn VietQR (Phase 2)| 15 phút (quá hạn release reservation) |
| Tỷ lệ tích điểm CutTayShop+        | 1.000đ = 1 điểm; 1 điểm = 10đ khi đổi |
| Quy đổi điểm khi thanh toán        | 100 điểm = 1.000đ                  |
| Giới hạn trừ điểm tối đa / đơn     | 20% tổng giá trị tiền hàng         |
| Ngưỡng đơn miễn phí vận chuyển     | Đơn từ 499.000₫ trở lên            |
| Tồn kho cảnh báo sắp hết           | <= 5 đơn vị                        |
| Số lần đăng nhập sai khóa tạm thời | 5 lần -> Khóa 15 phút              |
+------------------------------------+------------------------------------+
```

---

## 7. KẾ HOẠCH BÀN GIAO & TIÊU CHÍ NGHIỆM THU TỔNG THỂ (ACCEPTANCE CRITERIA)
- Khách hàng vãng lai có thể tìm kiếm, thêm sản phẩm vào giỏ và đặt hàng thành công theo hình thức COD trong dưới 60 giây.
- Khách hàng đã có tài khoản có thể tra cứu đơn hàng, xem hạng thành viên CutTayShop+ và áp dụng mã giảm giá không xảy ra lỗi gián đoạn.
- Quản trị viên (Admin) có thể tạo sản phẩm mới đầy đủ biến thể Màu/Size và thiết lập chiến dịch Flash Sale đếm ngược trong vòng 3 phút.
- Toàn bộ giao diện hiển thị chuẩn xác, không vỡ layout trên 3 kích thước màn hình tiêu chuẩn: Desktop (1440px), Tablet (768px), Mobile (375px).
