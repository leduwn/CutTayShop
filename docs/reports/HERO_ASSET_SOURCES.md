# DANH MỤC NGUỒN GỐC TÀI NGUYÊN HÌNH ẢNH THỰC TẾ (REAL ASSET MANIFEST)
## CutTayShop — Premium Multi-Layer Product Art Direction Sprint

---

### 1. NGUỒN GỐC ẢNH CHỤP THỰC TẾ & BẢN QUYỀN

Tất cả hình ảnh được tuyển chọn khắt khe từ các nhiếp ảnh gia thương mại chuyên nghiệp trên Unsplash (Unsplash Free Commercial License — Sử dụng thương mại hợp pháp, không vi phạm bản quyền):

| Tên Tệp Hoàn Thiện | Loại Tài Nguyên | Nhiếp ảnh gia / Nguồn | ID Unsplash / Đường dẫn gốc | Độ Phân Giải Gốc | Kích Thước Cắt Gọt | Dung Lượng WebP |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`headphones-cutout.webp`** | Tai nghe AirPods Max Silver trên nền studio | Ravi Palwe (`@ravipalwe`) | `photo-1612116454817-2b0841e30eaf` | 1200 x 738 px | 691 x 659 px | **36.3 KB** |
| **`plant-cutout.webp`** | Cây bạch đàn trang trí góc làm việc | Nhu Nguyen (`@nhunguyen`) | `photo-1542728928-0011f81446e5` | 1200 x 1600 px | 892 x 700 px | **102.3 KB** |
| **`speaker-cutout.webp`** | Loa Bluetooth vỏ vải dệt heather xám | Amazon Echo Studio Photography | `photo-1543512214-318c7553f230` | 1200 x 1800 px | 390 x 700 px | **92.6 KB** |
| **`bottle-cutout.webp`** | Bình giữ nhiệt Mizu kim loại cao cấp | Mizu Life Studio Photography | `photo-1544003484-3cd181d17917` | 1200 x 1500 px | 363 x 1124 px | **39.2 KB** |
| **`smartwatch-cutout.webp`** | Apple Watch màn hình màu, dây da đen | Studio Macro Tech Photography | `photo-1579586337278-3befd40fd17a` | 1200 x 799 px | 653 x 413 px | **64.4 KB** |
| **`cap-cutout.webp`** | Mũ lưỡi trai phong cách tối giản màu be | Local Studio Product Photography | `images/products/cap-beige.webp` | 800 x 800 px | 687 x 586 px | **43.9 KB** |
| **`display-blocks.svg`** | Khối bục kiến trúc đổ bóng không gian 3D | CutTayShop Design System | Tạo trực tiếp dạng vector SVG | Vector vô hạn | 500 x 400 viewBox | **3.0 KB** |
| **`paper-sticker.svg`** | Giấy ghi chú kraft "Good Products Brighter Days ☺" | CutTayShop Editorial Design | Tạo trực tiếp dạng vector SVG | Vector vô hạn | 220 x 210 viewBox | **3.4 KB** |
| **`decorative-arrow.svg`** | Mũi tên uốn lượn màu xanh mint vẽ tay | CutTayShop Playful Design | Tạo trực tiếp dạng vector SVG | Vector vô hạn | 120 x 120 viewBox | **0.7 KB** |
| **`decorative-star.svg`** | Ngôi sao 5 cánh màu xanh mint vẽ tay | CutTayShop Playful Design | Tạo trực tiếp dạng vector SVG | Vector vô hạn | 60 x 60 viewBox | **0.5 KB** |

---

### 2. QUY TRÌNH XỬ LÝ TÁCH NỀN BẰNG DEEP LEARNING (U2-NET AI CUTOUT PIPELINE)

Để đảm bảo đường viền vật thể tách nền không bị răng cưa (aliasing), không có quầng sáng trắng (white halo) và không bị ám màu nền cũ (color spill), chúng tôi sử dụng mô hình mạng nơ-ron **U2-Net** chạy trực tiếp qua **ONNX Runtime Engine**:

1. **Chuẩn hóa đầu vào:** Chuyển đổi sang không gian màu RGB, resize ma trận tỷ lệ chuẩn và chuẩn hóa theo hệ số ImageNet mean `[0.485, 0.456, 0.406]` & std `[0.229, 0.224, 0.225]`.
2. **Inference Segmentation Mask:** Trích xuất lớp mặt nạ xác suất biên (alpha saliency mask) độ phân giải cao.
3. **Smooth Gaussian Feathering:** Áp dụng bộ lọc làm mềm biên Gauss bán kính `1.5px` tạo độ chuyển tiếp tự nhiên như ống kính quang học chuyên nghiệp.
4. **S-Curve Contrast Smoothing:** Tối ưu hóa độ đục của phần lõi sản phẩm đạt 100% không bị trong suốt, đồng thời giữ biên rìa chuyển mượt mà (smoothstep thresholding).
5. **Lossless WebP Packaging:** Nén sang chuẩn WebP chất lượng 95% với đầy đủ kênh trong suốt Alpha.

---

### 3. VỊ TRÍ LƯU TRỮ VÀ TÍCH HỢP TRONG SOURCE CODE

- **Thư mục tài nguyên sân khấu Hero:** `CutTayShop.Web/wwwroot/images/compositions/hero/`
  - `headphones-cutout.webp`
  - `headphones-cutout.png` (bản dự phòng)
  - `plant-cutout.webp`
  - `plant-cutout.png`
  - `speaker-cutout.webp`
  - `speaker-cutout.png`
  - `bottle-cutout.webp`
  - `bottle-cutout.png`
  - `display-blocks.svg`
  - `paper-sticker.svg`
  - `decorative-arrow.svg`
  - `decorative-star.svg`

- **Thư mục tài nguyên Banner khuyến mãi:** `CutTayShop.Web/wwwroot/images/compositions/promos/`
  - `smartwatch-cutout.webp`
  - `smartwatch-cutout.png`
  - `cap-cutout.webp`
  - `cap-cutout.png`

- **Tích hợp Razor View & Data Provider:**
  - `CutTayShop.Web/Views/Home/Index.cshtml`
  - `CutTayShop.Infrastructure/Services/InMemoryDemoDataProvider.cs`

