# ĐẶC TẢ KỸ THUẬT BỐ CỤC ĐA TẦNG (HERO LAYER COMPOSITION SPEC)
## CutTayShop — Premium Multi-Layer Product Art Direction Sprint

---

### 1. KIẾN TRÚC TỌA ĐỘ VÀ PHÂN LỚP Z-INDEX

Hệ thống sân khấu trưng bày `.hero-product-stage` hoạt động dựa trên mô hình định vị tỷ lệ phần trăm (relative percentage coordinates) kết hợp với các điểm neo (anchor points) chuẩn xác, cho phép các thành phần tự động co giãn hài hòa theo tỷ lệ khung nhìn:

```
+-----------------------------------------------------------------------------------+
|  [Layer 6: Callout Note & Arrow]                         [Layer 7: Paper Sticker]  |
|   (left: 1%, top: 3%, z: 7)                               (right: 3%, top: 3%, z: 7)|
|                                                                                   |
|                [Layer 2: Eucalyptus Plant]                                        |
|                 (left: 14%, top: 5%, z: 3)                                        |
|                                                                                   |
|                               [Layer 1: Podiums]                                  |
|                                (left: 8%, bottom: 4%, z: 2)                        |
|                                                                                   |
|  [Layer 3: Fabric Speaker]   [Layer 4: FOCAL HEADPHONES]    [Layer 5: Metal Flask]|
|   (left: 6%, bottom: 5%, z: 5)(left: 25%, bottom: 2%, z: 6)  (right: 7%, bot: 5%)  |
|                                                                                   |
|------------------------- [Layer 0: Ambient Studio Glow] --------------------------|
+-----------------------------------------------------------------------------------+
```

---

### 2. CHI TIẾT THÔNG SỐ TỪNG LAYER (DESKTOP BENCHMARK 1440PX)

#### Layer 0: Radial Ambient Studio Glow (`.hero-stage-ambient`)
- **Vai trò:** Tạo nguồn sáng khuếch tán từ trung tâm sân khấu, tạo cảm giác studio chụp ảnh cao cấp.
- **Tọa độ:** `inset: -5% -5% 0% -5%`, `border-radius: 50%`, `filter: blur(28px)`.
- **Màu sắc Light Mode:** `radial-gradient(ellipse 65% 55% at 52% 62%, rgba(226, 232, 240, 0.75) 0%, rgba(241, 245, 249, 0.35) 50%, transparent 75%)`.
- **Màu sắc Dark Mode:** `radial-gradient(ellipse 65% 55% at 52% 62%, rgba(30, 41, 59, 0.75) 0%, rgba(15, 23, 42, 0.35) 50%, transparent 75%)`.
- **Z-Index:** 1.

#### Layer 1: Architectural Podiums (`.hero-layer-podium`)
- **Vai trò:** Cung cấp bục đứng kiến trúc vững chắc, chống cảm giác "lơ lửng vô định" của sản phẩm.
- **Tọa độ:** `left: 8%`, `bottom: 4%`, `width: 84%`, `max-width: 440px`.
- **Z-Index:** 2.
- **Bóng đổ:** `filter: drop-shadow(0 16px 20px rgba(0, 0, 0, 0.04))`.

#### Layer 2: Indoor Eucalyptus Plant (`.hero-layer-plant`)
- **Vai trò:** Đưa yếu tố thiên nhiên tươi mát, phong cách sống Scandi thư thái vào không gian công nghệ.
- **Tọa độ:** `left: 14%`, `top: 5%`, `width: 42%`, `max-width: 225px`.
- **Z-Index:** 3 (nằm sau tai nghe và loa, nhô lên từ bục phía sau).
- **Hoạt cảnh:** `swayPlant 7s ease-in-out infinite alternate` (lắc lư tự nhiên nhẹ ±1.5°).

#### Layer 3: Heather Fabric Portable Speaker (`.hero-layer-speaker`)
- **Vai trò:** Sản phẩm công nghệ di động hỗ trợ góc trái, cân bằng trọng lượng thị giác với bình nước.
- **Tọa độ:** `left: 6%`, `bottom: 5%`, `width: 20%`, `max-width: 110px`, `transform: rotate(-3deg)`.
- **Z-Index:** 5.
- **Bóng đổ tiếp xúc đất (`.speaker-shadow`):** `radial-gradient(ellipse, rgba(15, 23, 42, 0.3) 0%, transparent 75%)`.

#### Layer 4: Central Focal Hero — Silver Apple AirPods Max (`.hero-layer-headphones`)
- **Vai trò:** Ngôi sao tiêu điểm của toàn bộ Hero, thu hút 80% thị giác đầu tiên của khách hàng.
- **Tọa độ:** `left: 25%`, `bottom: 2%`, `width: 56%`, `max-width: 315px`, `transform: rotate(-6deg)`.
- **Z-Index:** 6.
- **Bóng đổ kép:**
  - Lớp 1 (Ambient): `drop-shadow(0 22px 34px rgba(15, 23, 42, 0.18))`.
  - Lớp 2 (Close Contact): `drop-shadow(0 6px 12px rgba(15, 23, 42, 0.08))`.
  - Lớp 3 (Floor Shadow): `.headphones-shadow` elip mềm mại bên dưới vành tai nghe.
- **Hoạt cảnh:** `floatHeadphones 6s ease-in-out infinite alternate` (chuyển động thở nhẹ ±8px).

#### Layer 5: Slate Insulated Flask (`.hero-layer-bottle`)
- **Vai trò:** Cân bằng bố cục phía phải, thể hiện danh mục phong cách sống / thể thao.
- **Tọa độ:** `right: 7%`, `bottom: 5%`, `width: 16%`, `max-width: 95px`, `transform: rotate(2deg)`.
- **Z-Index:** 5.
- **Bóng tiếp xúc:** `filter: drop-shadow(0 14px 20px rgba(15, 23, 42, 0.14))`.

#### Layer 6: Hand-drawn Editorial Note & Mint Arrow (`.hero-layer-callout`)
- **Vai trò:** Chi tiết đồ họa thủ công tạo nét duyên dáng, gần gũi và ấm áp (human touch).
- **Tọa độ:** `left: 1%`, `top: 3%`, `max-width: 120px`.
- **Z-Index:** 7.
- **Font chữ:** `'Caveat', cursive, sans-serif`, `font-size: 0.875rem`, `font-weight: 700`, xoay nhẹ `-3deg`.
- **Ngôi sao:** SVG mint `#10B981` xoay tròn 360° chậm rãi (8 giây/vòng).
- **Mũi tên:** Mũi tên uốn lượn hướng thẳng vào tai nghe trung tâm.

#### Layer 7: Craft Paper Memo Sticker (`.hero-layer-sticker`)
- **Vai trò:** Tái hiện phong cách dán ghi chú editorial của Shoply, thông điệp truyền cảm hứng.
- **Tọa độ:** `right: 3%`, `top: 3%`, `width: 26%`, `max-width: 145px`, `transform: rotate(4deg)`.
- **Z-Index:** 7.
- **Tương tác:** Rê chuột (`:hover`) tạo hiệu ứng bóc giấy: `transform: rotate(0deg) scale(1.08) translateY(-4px)`.

