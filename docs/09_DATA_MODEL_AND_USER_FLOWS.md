# 09 — MÔ HÌNH DỮ LIỆU & CÁC LUỒNG NGHIỆP VỤ (DATA MODEL & USER FLOWS)

**Dự án:** CutTayShop — Nền tảng Thương mại Điện tử B2C Hiện đại  
**Nền tảng:** Entity Framework Core (Code-First) / SQL Server  
**Giai đoạn:** Phase 0 — Khái niệm và Đặc tả Logic Nghiệp vụ (Chưa tạo Migration thực tế)  

---

## 1. SƠ ĐỒ THỰC THỂ QUAN HỆ KHÁI NIỆM (MERMAID ERD)

```mermaid
erDiagram
    APPLICATION_USER ||--o{ ADDRESS : "có nhiều"
    APPLICATION_USER ||--o{ ORDER : "đặt"
    APPLICATION_USER ||--o{ REVIEW : "viết"
    APPLICATION_USER ||--o| WISHLIST : "sở hữu"
    WISHLIST ||--o{ WISHLIST_ITEM : "chứa"
    APPLICATION_USER ||--o{ BLOG_POST : "tác giả"
    APPLICATION_USER ||--o| CART : "sở hữu"
    APPLICATION_USER ||--o{ USER_ROLE : "được gán"
    ROLE ||--o{ USER_ROLE : "gồm người dùng"
    APPLICATION_USER ||--o| MEMBERSHIP_ACCOUNT : "tham gia"

    CATEGORY ||--o{ CATEGORY : "danh mục cha/con"
    CATEGORY ||--o{ PRODUCT : "chứa"

    PRODUCT ||--o{ PRODUCT_IMAGE : "có nhiều ảnh"
    PRODUCT ||--o{ PRODUCT_VARIANT : "có các phiên bản"
    PRODUCT ||--o{ REVIEW : "nhận đánh giá"
    PRODUCT ||--o{ WISHLIST_ITEM : "được yêu thích"

    PRODUCT_VARIANT ||--o| INVENTORY_RECORD : "quản lý kho"
    PRODUCT_VARIANT ||--o{ CART_ITEM : "được thêm vào"
    PRODUCT_VARIANT ||--o{ ORDER_ITEM : "được mua"

    CART ||--o{ CART_ITEM : "chứa các món"

    ORDER ||--o{ ORDER_ITEM : "gồm các món"
    ORDER ||--o{ PAYMENT_TRANSACTION : "có lần thanh toán/hoàn tiền"
    ORDER ||--o| SHIPMENT : "giao vận"
    ORDER ||--o{ ORDER_HISTORY : "lưu vết trạng thái"

    PROMOTION ||--o{ PROMOTION_ITEM : "áp dụng sản phẩm/biến thể"
    PRODUCT_VARIANT ||--o{ PROMOTION_ITEM : "nhận ưu đãi"
    PROMOTION ||--o{ COUPON : "phát hành"
    COUPON o|--o{ COUPON_REDEMPTION : "được sử dụng"
    APPLICATION_USER o|--o{ COUPON_REDEMPTION : "sử dụng"
    ORDER ||--o| COUPON_REDEMPTION : "ghi nhận mã"
    ORDER_ITEM ||--o| REVIEW : "xác minh lượt mua"

    BANNER ||--o| CATEGORY : "liên kết tới"
```

---

## 2. ĐẶC TẢ CHI TIẾT CÁC THỰC THỂ CỐT LÕI (ENTITY DEFINITIONS)

### 2.1. Nhóm Người Dùng & Tài Khoản (Customer & Identity)
1. **ApplicationUser (Kế thừa IdentityUser<Guid>):**
   * `Id`: Khóa chính định danh duy nhất (GUID).
   * `FullName`: Họ và tên hiển thị của người dùng (nvarchar(150)).
   * `AvatarUrl`: Đường dẫn ảnh đại diện.
   * `CreatedAt`: Ngày tạo tài khoản (DateTimeOffset).
   * `IsActive`: Trạng thái kích hoạt (bool).
   * `DefaultAddressId`: Khóa ngoại trỏ đến địa chỉ giao hàng mặc định.
2. **Address:**
   * `Id`: Khóa chính (int).
   * `UserId`: Khóa ngoại liên kết người dùng.
   * `RecipientName`, `PhoneNumber`: Tên và số điện thoại người nhận hàng.
   * `ProvinceCode`, `ProvinceName`: Mã và tên Tỉnh / Thành phố.
   * `DistrictCode`, `DistrictName`: Mã và tên Quận / Huyện.
   * `WardCode`, `WardName`: Mã và tên Phường / Xã.
   * `StreetAddress`: Số nhà, tên đường chi tiết.
   * `IsDefault`: Cờ đánh dấu địa chỉ mặc định.
3. **Role / UserRole:** Dùng schema ASP.NET Core Identity; role vận hành gắn policy capability (`ManageCatalog`, `ManageOrders`, `ManageContent`, `ManageCustomers`, `ManagePromotions`, `ManageSettings`, `ViewReports`) thay vì kiểm tra một role rộng ở mọi action.
4. **MembershipAccount (Hội viên CutTayShop+):**
   * `UserId`: Khóa ngoại 1-1 với ApplicationUser.
   * `CurrentPoints`: Số điểm tích lũy khả dụng. Quy tắc chuẩn: **1 điểm cho mỗi 1.000₫ giá trị hàng đủ điều kiện của đơn Completed**; điểm chỉ có hiệu lực sau cửa sổ đổi trả và bị đảo khi hoàn tiền.
   * `Tier`: Hạng hội viên (`Bronze`, `Silver`, `Gold`, `Diamond`).
   * `TotalSpent`: Tổng số tiền đã chi tiêu tích lũy theo năm.

### 2.2. Nhóm Danh Mục & Sản Phẩm (Catalog & Inventory)
1. **Category:**
   * `Id`: Khóa chính (int).
   * `Name`: Tên danh mục (ví dụ "Đồ công nghệ", "Thời trang").
   * `Slug`: Chuỗi định danh URL duy nhất (ví dụ "do-cong-nghe").
   * `IconName`: Tên icon đại diện (ví dụ "device-mobile", "t-shirt").
   * `PastelBgColor`: Mã màu nền pastel trích xuất từ ảnh mẫu (ví dụ `#E0F2FE`, `#FFE5DA`).
   * `ParentId`: Khóa ngoại tự tham chiếu danh mục cha (hỗ trợ phân cấp đa tầng).
   * `DisplayOrder`: Thứ tự hiển thị trên trang chủ và menu.
2. **Product:**
   * `Id`: Khóa chính (int).
   * `Name`: Tên sản phẩm đầy đủ (nvarchar(250)).
   * `Slug`: Đường dẫn SEO duy nhất (nvarchar(250)).
   * `Sku`: Mã quản lý sản phẩm gốc.
   * `CategoryId`: Khóa ngoại trỏ về Category.
   * `Brand`: Thương hiệu sản phẩm.
   * `ShortDescription`: Mô tả ngắn gọn hiển thị trên thẻ và kết quả tìm kiếm.
   * `FullDescription`: Nội dung chi tiết chuẩn bị cho Rich Text / Markdown.
   * `OriginalPrice`: Giá niêm yết ban đầu (decimal(18,2)).
   * `SalePrice`: Giá bán thực tế sau khuyến mãi (decimal(18,2)).
   * `DiscountPercent`: Phần trăm giảm giá tính sẵn để hiển thị badge (ví dụ `40`).
   * `IsFeatured`, `IsFlashSale`: Cờ phân loại hiển thị trên trang chủ.
   * `RatingAverage`: Điểm đánh giá trung bình từ 1.0 đến 5.0.
   * `ReviewCount`: Tổng số lượt đánh giá của khách hàng.
   * `IsActive`: Trạng thái mở bán (Soft delete khi ẩn).
3. **ProductVariant (Biến thể sản phẩm):**
   * `Id`: Khóa chính (int).
   * `ProductId`: Khóa ngoại liên kết với Product cha.
   * `Sku`: Mã phân loại biến thể (ví dụ `AIRBUDS-PRO-WHT`).
   * `ColorName`, `ColorHex`: Tên màu và mã màu biểu thị (ví dụ "Trắng ngà", `#FFFFFF`).
   * `Size`: Kích thước (ví dụ "FreeSize", "XL", "42").
   * `PriceAdjustment`: Giá chênh lệch so với giá gốc của sản phẩm cha.
   * Giá hiệu lực = `BasePrice + PriceAdjustment`, sau đó `IPricingService` áp promotion có thời hạn; không lưu `StockQuantity` trùng lặp tại Variant.
4. **ProductImage:**
   * `Id`: Khóa chính (int).
   * `ProductId`: Khóa ngoại.
   * `VariantId`: Khóa ngoại tùy chọn (ảnh riêng cho từng màu).
   * `ImageUrl`: Đường dẫn tệp ảnh an toàn (chuẩn WebP).
   * `IsMain`: Ảnh bìa đại diện chính.
   * `DisplayOrder`: Thứ tự trình chiếu trong gallery.
5. **InventoryRecord (nguồn sự thật tồn kho):**
   * `ProductVariantId` unique, `OnHandQuantity`, `ReservedQuantity`, `ReorderLevel`, `UpdatedAt`, `RowVersion` concurrency token.
   * `AvailableQuantity = OnHandQuantity - ReservedQuantity`; mọi reserve/release/commit nằm trong transaction và không cho giá trị âm.

### 2.3. Nhóm Giỏ Hàng & Đơn Hàng (Cart & Orders)
1. **Cart & CartItem:**
   * `Cart.Id`: Khóa chính (Guid).
   * `Cart.UserId`: Khóa ngoại (null nếu là khách vãng lai).
   * `Cart.SessionKey`: Khóa định danh giỏ hàng lưu trong Cookie trình duyệt.
   * `CartItem.ProductVariantId`: Khóa ngoại trỏ đến biến thể đã chọn.
   * `CartItem.Quantity`: Số lượng đặt.
   * `CartItem.AddedAt`: Thời điểm thêm vào giỏ.
2. **Order (Đơn hàng):**
   * `Id`: Khóa chính (int).
   * `OrderCode`: Mã đơn hàng công khai hiển thị cho khách (ví dụ `CTS-20261028-A89F`).
   * `UserId`: Khóa ngoại người đặt (null nếu mua dạng khách vãng lai).
   * `CustomerName`, `CustomerPhone`, `CustomerEmail`: Thông tin người nhận snapshot.
   * `ShippingAddress`: Toàn bộ chuỗi địa chỉ giao hàng đã snapshot.
   * `SubTotal`: Tổng tiền hàng gốc trước khi giảm (decimal(18,2)).
   * `DiscountAmount`: Tổng số tiền giảm giá từ Voucher / Loyalty points.
   * `ShippingFee`: Phí giao hàng tính toán.
   * `TotalAmount`: **Tổng số tiền khách hàng phải thanh toán cuối cùng (Snapshot cố định)**.
   * `PaymentMethod`: `COD` ở MVP; `VietQR`, `VNPAY`, `MoMo` là giá trị dự kiến cho Phase 2/Future sau khi có adapter thật.
   * `PaymentStatus`: `Unpaid`, `Pending`, `Paid`, `PartiallyRefunded`, `Refunded`, `Failed`.
   * `OrderStatus`: dùng tập trạng thái canonical tại mục 3.3; không tạo enum rút gọn khác ở tài liệu/mã nguồn.
   * `CreatedAt`: Ngày tạo đơn.
3. **OrderItem (Chi tiết dòng sản phẩm trong đơn):**
   * `Id`: Khóa chính (int).
   * `OrderId`: Khóa ngoại trỏ về Order.
   * `ProductVariantId`: Khóa ngoại trỏ về biến thể.
   * `ProductName`: **Tên sản phẩm snapshot tại thời điểm mua**.
   * `VariantName`: **Tên biến thể snapshot (Màu, Size)**.
   * `UnitPrice`: **Đơn giá bán thực tế snapshot tại thời điểm đặt hàng**.
   * `Quantity`: Số lượng mua.
   * `TotalPrice`: Thành tiền của dòng hàng (`UnitPrice * Quantity`).

### 2.4. Thanh toán, vận chuyển, khuyến mãi, nội dung & tương tác

1. **PaymentTransaction:** `Id`, `OrderId`, `Provider`, `Type` (`Charge`, `Refund`), `ProviderReference`, `Amount`, `Status`, `IdempotencyKey`, `CreatedAt`. Một order có nhiều attempt/refund; không lưu PAN/CVV hoặc thông tin thẻ nhạy cảm.
2. **Shipment:** `Id`, `OrderId`, `Carrier`, `ServiceLevel`, `TrackingCode`, `Status`, `ShippedAt`, `DeliveredAt`, `ShippingFeeSnapshot`. Một shipment/order ở MVP; thiết kế không chặn split shipment về sau.
3. **Promotion / PromotionItem:** promotion có `Type`, `StartAt`, `EndAt`, `Priority`, `IsActive`; item nối ProductVariant và giữ `SalePrice` hoặc rule giảm. Không dùng `Product.IsFlashSale`/`SalePrice` không có thời hạn làm nguồn thật.
4. **Coupon / CouponRedemption:** coupon có code unique đã normalize, kiểu/giá trị giảm, min order, cap, thời gian, usage limit. Redemption nối coupon–order–user/session để enforce lượt dùng và audit.
5. **Review:** `Id`, `ProductId`, `OrderItemId?`, `UserId`, `Rating`, `Title`, `Content`, `Status`, timestamps. `OrderItemId` unique khi đánh dấu verified purchase; moderation không làm mất audit.
6. **Wishlist / WishlistItem:** một wishlist/user hoặc guest key; `(WishlistId, ProductId)` unique; merge idempotent khi login.
7. **Banner:** `Placement`, `Title`, `ImageUrl`, `AltText`, `TargetUrl`, `StartAt`, `EndAt`, `DisplayOrder`, `IsActive`; URL đích allow-list nội bộ hoặc HTTPS hợp lệ.
8. **BlogPost:** `Slug` unique, `Title`, `Excerpt`, `SanitizedHtml`, `Status`, `PublishedAt`, `AuthorId`, SEO fields; rich HTML phải sanitize allow-list trước render.

---

## 3. CÁC QUY TẮC NGHIỆP VỤ THEN CHỐT (CRITICAL BUSINESS RULES)

### 3.1. Quy tắc Snapshot Giá (Price Snapshotting Rule)
- **Vấn đề rủi ro:** Giá sản phẩm trên hệ thống có thể thay đổi bất kỳ lúc nào do Admin điều chỉnh hoặc do chương trình Flash Sale hết giờ.
- **Giải pháp bắt buộc:** Khi khách hàng bấm "Xác nhận đặt hàng", hệ thống lập tức sao chép (snapshot) toàn bộ thông tin tên sản phẩm, tên biến thể, đơn giá bán, số tiền giảm vào bảng `OrderItem`. Mọi thay đổi về giá của `Product` trong tương lai tuyệt đối không làm thay đổi số tiền ghi nhận trong các hóa đơn cũ.

### 3.2. Cơ chế Tạm giữ Tồn kho (Inventory Reservation Mechanism)
- Khi đơn hàng được tạo với phương thức thanh toán Online (VietQR / Chuyển khoản):
  * Hệ thống trừ kho tạm thời (`ReservedQuantity`) và tạo thời hạn giữ hàng (Expiry: 15 phút).
  * Nếu sau 15 phút không nhận được xác nhận thanh toán: Hệ thống tự động kích hoạt tiến trình giải phóng kho (Release Reservation), hoàn lại tồn kho cho người khác mua.
- Đối với phương thức COD: Tồn kho được trừ chính thức ngay khi đơn hàng chuyển sang trạng thái `Confirmed`.

### 3.3. Cỗ Máy Trạng Thái Đơn Hàng (Order State Machine)
Đơn hàng chuyển trạng thái theo allow-list; nhánh hủy/đổi trả đều đi qua service và audit log:

```mermaid
stateDiagram-v2
    [*] --> PendingPayment: Online/QR (Phase 2)
    [*] --> PendingConfirmation: COD (MVP)
    PendingPayment --> PendingConfirmation: Payment succeeded
    PendingPayment --> Cancelled: Expired / failed
    PendingConfirmation --> Confirmed: Staff accepts
    PendingConfirmation --> CancellationRequested: Customer requests
    CancellationRequested --> Cancelled: Approved
    Confirmed --> Processing: Packing starts
    Confirmed --> CancellationRequested: Before shipment
    Processing --> Shipping: Handed to carrier
    Shipping --> Delivered: Delivery confirmed
    Delivered --> ReturnRequested: Within return window
    ReturnRequested --> Returned: Return accepted
    Delivered --> Completed: Return window elapsed
    Returned --> [*]
    Completed --> [*]
    Cancelled --> [*]
```

### 3.4. Quy tắc Áp dụng Mã Giảm Giá (Coupon Validation Rules)
Một mã giảm giá chỉ được coi là hợp lệ khi thỏa mãn đồng thời 6 điều kiện:
1. `IsActive == true` và thời gian hiện tại nằm giữa `StartDate` và `EndDate`.
2. Giá trị tạm tính của giỏ hàng `>= MinOrderAmount`.
3. Số lượt sử dụng còn lại (`MaxUsageCount - CurrentUsageCount > 0`).
4. Khách hàng chưa vượt quá giới hạn lượt dùng cá nhân (`MaxUsagePerUser`).
5. Nếu mã áp dụng cho danh mục cụ thể, giỏ hàng phải chứa ít nhất 1 sản phẩm thuộc danh mục đó.
6. Mỗi đơn hàng chỉ được áp dụng tối đa 1 mã giảm giá (Single coupon policy) để chống cộng dồn lỗ vốn.

### 3.5. State machine, hủy, trả hàng và hoàn tiền

- Canonical order states: `PendingPayment`, `PendingConfirmation`, `Confirmed`, `Processing`, `Shipping`, `Delivered`, `Completed`, `CancellationRequested`, `Cancelled`, `ReturnRequested`, `Returned`.
- Chỉ `IOrderService` được chuyển trạng thái theo allow-list; mỗi lần chuyển ghi `OrderHistory` và actor. `Completed` chỉ sau khi hết cửa sổ đổi trả hoặc quy trình đóng đơn.
- Hủy trước khi ship phải release reservation/khôi phục tồn theo trạng thái và vô hiệu coupon redemption; sau khi thanh toán tạo refund transaction, không sửa/xóa charge cũ.
- Return/refund luôn là nghiệp vụ riêng có lý do, số tiền, trạng thái và audit; refund có thể partial nhưng tổng refund không vượt số đã thu.

### 3.6. Reservation, phí vận chuyển và thanh toán

- Tất cả checkout phải reserve tồn kho atomically trước khi tạo order: online giữ 15 phút trong lúc chờ thanh toán; COD chuyển reservation thành committed khi xác nhận đơn. Hết hạn/hủy phải release idempotent.
- Phí ship được server tính và snapshot vào Order/Shipment. MVP: freeship tiêu chuẩn khi giá trị hàng sau giảm từ `499.000₫`; hàng cồng kềnh/vùng đặc biệt có rule rõ và hiển thị trước submit.
- MVP chỉ thu **COD**. VietQR/gateway ở Phase 2 sau khi có adapter, webhook signature, idempotency và reconciliation; không lưu dữ liệu thẻ.
- Giá, coupon, shipping và stock luôn revalidate ở submit; dữ liệu client chỉ là lựa chọn, không là nguồn tính tiền.

---

## 4. SƠ ĐỒ CÁC LUỒNG NGHIỆP VỤ CHÍNH (MERMAID USER FLOWS)

### 4.1. Luồng 1: Khách hàng Duyệt hàng & Mua hàng (End-to-End Shopping Flow)

```mermaid
sequenceDiagram
    autonumber
    actor User as Khách hàng
    participant Web as CutTayShop Storefront
    participant Cart as Cart Service
    participant Checkout as Checkout Service
    participant DB as SQL Server Database

    User->>Web: Truy cập Trang chủ & Xem Deal hot
    Web-->>User: Hiển thị sản phẩm & Countdown timer
    User->>Web: Nhấp chọn sản phẩm (PDP)
    User->>Cart: Chọn Màu/Size & Bấm "Thêm vào giỏ"
    Cart->>DB: Ghi nhận CartItem vào Session/DB
    Cart-->>Web: Trả về cập nhật Badge giỏ hàng (AJAX)
    Web-->>User: Mở Mini Cart Drawer trượt phải
    User->>Web: Nhấp "Tiến hành thanh toán" (/thanh-toan)
    Web-->>User: Hiển thị Form thông tin giao hàng & Tóm tắt
    User->>Checkout: Điền địa chỉ, chọn COD & Bấm "Đặt hàng"
    Checkout->>DB: Kiểm tra tồn kho & Khóa giá (Price Snapshot)
    Checkout->>DB: Tạo bản ghi Order & OrderItems
    Checkout->>Cart: Xóa các món đã mua khỏi giỏ hàng
    Checkout-->>Web: Điều hướng đến /dat-hang-thanh-cong
    Web-->>User: Hiển thị Mã đơn & Hướng dẫn nhận hàng
```

### 4.2. Luồng 2: Tìm kiếm & Lọc Sản phẩm (Search & Faceted Browsing)

```mermaid
graph TD
    StartInput[Khách nhập từ khóa trên Search Pill] --> AutoSuggest[Hiển thị gợi ý nhanh AJAX]
    AutoSuggest --> PressEnter[Khách bấm Enter hoặc Xem tất cả]
    PressEnter --> RoutePLP[Chuyển đến /tim-kiem?q=...]
    RoutePLP --> QueryDB[Truy vấn Fulltext Search trong DB]
    QueryDB --> RenderResults[Hiển thị kết quả & Sidebar bộ lọc]
    RenderResults --> FilterPrice[Khách chọn khoảng giá: 500k - 2000k]
    FilterPrice --> AjaxRefresh[Gửi fetch request cập nhật kết quả]
    AjaxRefresh --> UpdateGrid[Cập nhật lưới sản phẩm không tải lại trang]
```

### 4.3. Luồng 3: Xử lý Đơn hàng Phía Quản trị viên (Admin Order Processing)

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Nhân viên vận hành
    participant AdminUI as Admin Order Management
    participant OrderSvc as Order Service
    participant DB as Database

    Admin->>AdminUI: Truy cập /admin/don-hang
    AdminUI->>DB: Nạp danh sách đơn hàng mới (Pending)
    AdminUI-->>Admin: Hiển thị đơn hàng cần xử lý
    Admin->>AdminUI: Xem chi tiết đơn #CTS-20261028-A89F
    Admin->>OrderSvc: Bấm "Xác nhận đơn hàng"
    OrderSvc->>DB: Đổi trạng thái sang Confirmed & Gửi email
    Admin->>AdminUI: In phiếu giao hàng (Print Packing Slip)
    Admin->>OrderSvc: Bấm "Bàn giao vận chuyển" (Nhập mã vận đơn)
    OrderSvc->>DB: Đổi trạng thái sang Shipping & Cập nhật Shipment
    AdminUI-->>Admin: Hiển thị thông báo cập nhật thành công
```

### 4.4. Luồng 4: Đăng nhập → Tài khoản → Lịch sử đơn

```mermaid
flowchart LR
    Login[Đăng nhập] --> Validate{Identity hợp lệ?}
    Validate -- Không --> GenericError[Lỗi chung + rate limit]
    Validate -- Có --> Account[Tổng quan tài khoản]
    Account --> Orders[Lịch sử đơn]
    Orders --> Detail[Chi tiết đơn theo code + UserId]
    Detail --> Action{Hủy / Mua lại / Đánh giá}
```

### 4.5. Luồng 5: Admin quản lý sản phẩm

```mermaid
flowchart TD
    Admin[Admin có ManageCatalog] --> Form[Create/Edit ViewModel]
    Form --> Validate[Server validation + file validation]
    Validate -->|Lỗi| Form
    Validate -->|Đạt| Service[Catalog service transaction]
    Service --> Product[Product + variants + images]
    Product --> Audit[Audit log + cache invalidation]
```

### 4.6. Luồng 6: Khách hàng đánh giá

```mermaid
flowchart LR
    Delivered[Order item đã Delivered] --> ReviewForm[Form đánh giá]
    ReviewForm --> Ownership{OrderItem thuộc User?}
    Ownership -- Không --> Forbidden[403 / generic error]
    Ownership -- Có --> Moderate[Review Pending moderation]
    Moderate --> Publish[Published hoặc Rejected + reason]
```

### 4.7. Luồng 7: Campaign → Discount → Checkout

```mermaid
sequenceDiagram
    participant Admin
    participant Promotion
    participant Cart
    participant Checkout
    Admin->>Promotion: Cấu hình thời gian, scope, priority
    Cart->>Promotion: Yêu cầu quote theo variant/time/user
    Promotion-->>Cart: Giá hiệu lực + lý do/expiry
    Checkout->>Promotion: Revalidate promotion/coupon
    Checkout->>Checkout: Snapshot discount + coupon redemption
```

---

*Đây là mô hình khái niệm Phase 0. Mọi index, transaction isolation và hiệu năng phải được chứng minh bằng migration/test ở các milestone triển khai; tài liệu không tuyên bố database thực tế đã tồn tại.*
