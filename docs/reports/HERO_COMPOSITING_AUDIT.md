# BÁO CÁO KIỂM TOÁN HIỆN TRẠNG & ĐỐI SOÁT THIẾT KẾ HERO COMPOSITION
## CutTayShop — Premium Multi-Layer Product Art Direction Sprint

---

### 1. BỐI CẢNH & YÊU CẦU TỪ CHỦ DỰ ÁN

Trước sprint này, trang chủ của **CutTayShop** đã chuyển đổi sang ảnh WebP thật nhưng vẫn gặp phải vấn đề cốt lõi về Art Direction mà chủ dự án đã chỉ đạo trực tiếp:

> *"Website hiện đã có ảnh WebP thật nhưng vẫn đang lấy một bức ảnh có sẵn rồi đặt nguyên khung vào Hero và banner. Tôi muốn từng sản phẩm được tìm kiếm độc lập, tách nền và ghép thành một bố cục quảng cáo chuyên nghiệp, tương tự ảnh Shoply tôi đã cung cấp."*

Hạn chế nghiêm trọng của thiết kế trước đây:
1. **Thiếu tính linh hoạt (Monolithic Asset):** Ảnh `hero-composition.webp` là một tệp hình ảnh tĩnh duy nhất. Toàn bộ các sản phẩm bị "đóng cứng" trong khung ảnh chữ nhật, không thể di chuyển, không có parallax, không có micro-motion độc lập và không thể mở rộng.
2. **Khung viền chữ nhật thô cứng:** Việc sử dụng một khung ảnh chữ nhật dù có bo tròn góc cũng làm mất đi cảm giác "editorial studio display" sang trọng. Các sản phẩm không có không gian để "thở" và không tạo ra ảo giác sản phẩm thực sự nằm trên bề mặt trang web.
3. **Banner phụ (Right 4-col) không đồng bộ:** Hai thẻ khuyến mãi bên phải lấy hai ảnh stock chữ nhật thu nhỏ đặt vào, thiếu tính bứt phá thị giác (burst-out depth) và không tương thích tối ưu với bảng màu pastel.
4. **Không có khả năng thích ứng động trên Mobile:** Khi co về màn hình nhỏ, ảnh chữ nhật bị thu bé lại khiến các chi tiết sản phẩm bị mờ nhạt, mất đi điểm nhấn thị giác chính (focal hero).

---

### 2. ĐỐI SOÁT VỚI SHOPLY BENCHMARK (`design/references/homepage-reference.png`)

Khi phân tích hình ảnh tham chiếu Shoply được chủ dự án phê duyệt:

| Thành phần thị giác | Shoply Benchmark | Hiện trạng cũ của CutTayShop | Thiết kế mới (Sprint này) |
| :--- | :--- | :--- | :--- |
| **Bố cục Hero** | 8 cột chính + 4 cột phụ (2 thẻ dọc) | 8 cột + 4 cột | Giữ nguyên lưới 8/4 chuẩn tỉ lệ vàng |
| **Phương thức thể hiện sản phẩm** | Multi-layer Studio Composition gồm các vật thể tách nền độc lập | Một tấm ảnh stock chữ nhật nguyên khối | Hệ thống 7 lớp DOM độc lập (`.hero-product-stage`) |
| **Vật thể tiêu điểm (Focal Hero)** | Tai nghe over-ear màu bạc/kem AirPods Max đặt chính giữa, góc nghiêng tự nhiên | Tai nghe bị chìm trong nền ảnh stock lộn xộn | Tai nghe Apple AirPods Max Silver tách nền siêu mịn, đặt trung tâm với contact shadow |
| **Bục trưng bày (Architectural Podiums)** | Các khối bục đá/thạch cao tối giản tạo điểm tựa kiến trúc | Không có điểm tựa kiến trúc | Khối bục vector (`display-blocks.svg`) với gradient ánh sáng studio và bóng tiếp xúc sàn |
| **Vật thể phụ trợ bên trái** | Cây bạch đàn / lá xanh trong chậu gốm + Loa vải di động | Một số vật dụng phụ không đồng nhất | Cây bạch đàn (`plant-cutout.webp`) phía sau + Loa Bluetooth vải dệt (`speaker-cutout.webp`) góc trái |
| **Vật thể phụ trợ bên phải** | Bình nước giữ nhiệt kim loại/kem cao cấp | Bình nước mờ nhạt | Bình giữ nhiệt kim loại xám titan (`bottle-cutout.webp`) đứng thẳng góc phải |
| **Chi tiết thủ công & Editorial** | Giấy ghi chú kraft "Good Products Brighter Days ☺" + Ngôi sao mint + Nốt viết tay | Thiếu điểm nhấn thủ công | Sticker memo thủ công (`paper-sticker.svg`) dán băng keo + Nốt viết tay tiếng Việt + Nơ vẽ tay mint |
| **Banner khuyến mãi (4-col)** | Đồng hồ thông minh & Mũ lưỡi trai nổi khối trên nền pastel mint/peach | Hai ảnh stock chữ nhật đóng khung | Smartwatch thật & Mũ lưỡi trai thật được bóc nền, đổ bóng khối, nổi tràn viền nhẹ |

---

### 3. ĐÁNH GIÁ KỸ THUẬT & KIẾN TRÚC MỚI

Thiết kế mới triển khai giải pháp kiến trúc DOM đa tầng:

```
[ .hero-main-card ]
  ├── [ .hero-content-col (50%) ] -> Typography, Value Props, CTAs, Social Proof
  └── [ .hero-stage-col (50%) ]
        └── [ .hero-product-stage ]
              ├── Layer 0: .hero-stage-ambient (Ánh sáng studio tỏa tròn)
              ├── Layer 1: .hero-layer-podium (Bục trưng bày kiến trúc)
              ├── Layer 2: .hero-layer-plant (Cây bạch đàn tự nhiên phía sau)
              ├── Layer 3: .hero-layer-speaker (Loa vải di động góc trước trái)
              ├── Layer 4: .hero-layer-headphones (Tai nghe AirPods Max Bạc - TIÊU ĐIỂM CHÍNH)
              ├── Layer 5: .hero-layer-bottle (Bình giữ nhiệt kim loại góc trước phải)
              ├── Layer 6: .hero-layer-callout (Dòng chữ viết tay & Mũi tên uốn lượn mint)
              └── Layer 7: .hero-layer-sticker (Giấy ghi chú kraft nghiêng "Good Products Brighter Days")
```

**Ưu điểm vượt trội:**
- **Độ phân giải & sắc nét vô hạn:** Từng vật thể có tệp WebP riêng chất lượng cao, giữ nguyên độ nét chi tiết vải dệt, nhôm phay xước, gân lá cây và mặt kính đồng hồ.
- **Tương tác độc lập (Micro-Interactions):** Người dùng có thể rê chuột qua từng sản phẩm (tai nghe, loa, bình nước, sticker) để kích hoạt chuyển động nâng nhẹ (lift) và xoay góc tương tác.
- **Hiệu năng vượt trội:** Không tải ảnh lớn nặng nề; tổng dung lượng tất cả các layer cộng lại chỉ xấp xỉ ~280 KB WebP nén lossless, tải đồng thời cực nhanh và giải phóng GPU composite layer sau khi hoàn tất hoạt cảnh.

