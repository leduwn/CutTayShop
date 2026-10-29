# BÁO CÁO KIỂM THỬ GIAO DIỆN DI ĐỘNG (HERO MOBILE VISUAL QA)
## CutTayShop — Premium Multi-Layer Product Art Direction Sprint

---

### 1. BẢNG KIỂM TRA ĐA THIẾT BỊ DI ĐỘNG (RESPONSIVE VIEWPORT MATRIX)

| Thiết bị mẫu | Độ phân giải kiểm thử | Bố cục sắp xếp | Tình trạng tràn viền (Horizontal Scroll) | Khả năng đọc chữ (Legibility) | Đánh giá tổng quan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **iPhone SE / 13 mini** | 375 x 667 px | Dọc (Vertical Stack): Headline trên, Sân khấu dưới | **0% tràn viền** (`overflow-x: hidden`) | Cỡ chữ 1.75rem rõ ràng, nút bấm to dễ chạm | **ĐẠT XUẤT SẮC** |
| **iPhone 14 / 15 / 16** | 390 x 844 px | Dọc: Headline trên, Sân khấu dưới | **0% tràn viền** | Tỷ lệ vàng hoàn hảo, lề cách viền 18px an toàn | **ĐẠT XUẤT SẮC** |
| **iPhone 15 Pro Max** | 430 x 932 px | Dọc: Headline trên, Sân khấu dưới | **0% tràn viền** | Không gian rộng rãi, chi tiết vật liệu nổi khối sắc nét | **ĐẠT XUẤT SẮC** |
| **Màn hình cực nhỏ** | 320 x 568 px | Dọc tối giản (Tự động ẩn nốt viết tay) | **0% tràn viền** | Không bị đè chữ, nút bấm xếp dọc dễ bấm | **ĐẠT** |
| **iPad Mini / Tablet** | 768 x 1024 px | Dọc kết hợp lưới Bento 2 cột dưới | **0% tràn viền** | Thanh danh mục lướt ngang mượt mà | **ĐẠT XUẤT SẮC** |

---

### 2. CÁC QUY TẮC NGHỆ THUẬT RIÊNG CHO MOBILE (MOBILE ART DIRECTION RULES)

1. **Bảo tồn tiêu điểm sản phẩm (Hero Focus Retention):**
   - Trên màn hình nhỏ, tai nghe AirPods Max vẫn giữ nguyên tỷ lệ `52%` chiều rộng sân khấu và đứng tại trung tâm, không bao giờ bị che khuất.
   - Bục kiến trúc và cây lá được hạ thấp chiều cao để không cạnh tranh sự chú ý với tiêu điểm.

2. **Xử lý khoảng đệm đáy chống cắt hình (Bottom Elevation Padding):**
   - Nâng các vật thể lên `bottom: 6%` đến `bottom: 8%` trên màn hình dưới 768px, đảm bảo bóng tiếp xúc và chân sản phẩm cách mép thẻ tối thiểu 16px, không bị hiệu ứng "cắt ngang đáy thẻ".

3. **Chống đè chữ thông minh (Adaptive Callout Suppression):**
   - Trên màn hình dưới 480px, nốt viết tay tiếng Việt tự động ẩn (`display: none`) để giải phóng không gian thở cho headline tiếng Việt và nhãn dán sticker craft.

4. **Tối ưu hóa ngón tay cái (Thumb-Friendly Touch Targets):**
   - Hai nút bấm hành động chính "Mua ngay →" và "Xem ưu đãi" đạt chiều cao 48px với bo góc tròn `border-radius: var(--radius-pill)`, đáp ứng chuẩn Accessibility WCAG 2.2 cấp độ AAA về kích thước vùng chạm (tối thiểu 44x44px).

