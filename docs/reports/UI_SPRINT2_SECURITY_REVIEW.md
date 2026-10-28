# BÁO CÁO ĐÁNH GIÁ AN TOÀN & BẢO MẬT GIAO DIỆN (SECURITY REVIEW) — SPRINT 2
**Dự án:** CutTayShop — Premium E-commerce Frontend  
**Phạm vi rà soát:** Sprint 1.1 Remediation + Sprint 2 Shopping UI  
**Ngày kiểm tra:** 29/10/2026  
**Đánh giá rủi ro chung:** **LOW (An toàn — Đạt chuẩn xuất xưởng)**

---

## 1. CÁC MỐI NGUY ĐÃ ĐƯỢC RÀ SOÁT VÀ KHẮC PHỤC

### 1.1. Ngăn chặn triệt để Cross-Site Scripting (XSS) trên thanh tìm kiếm
- **Vấn đề tiềm ẩn:** Trong các phiên bản ban đầu, chuỗi nhập từ ô tìm kiếm được ghép chuỗi HTML để tạo danh sách gợi ý xổ xuống (Search Autocomplete dropdown), có nguy cơ bị khai thác XSS nếu kẻ tấn công chèn `<script>` hoặc `<img onerror=...>` vào ô tìm kiếm.
- **Biện pháp khắc phục đã triển khai (`homepage.js`):**
  - Loại bỏ hoàn toàn việc ghép chuỗi `innerHTML`.
  - Chuyển sang sử dụng 100% DOM API an toàn: `document.createElement`, `element.textContent = item.name`, `element.setAttribute`.
  - Mọi URL chuyển hướng đều được bọc qua hàm `encodeURIComponent(item.slug)`:
    ```javascript
    const a = document.createElement('a');
    a.className = 'search-suggestion-item';
    a.href = `/san-pham/${encodeURIComponent(item.slug)}`;
    ```
- **Xác minh:** Kiểm thử tự động với 4 payload tấn công phổ biến (`<script>`, `onerror`, `DROP TABLE`, `<svg onload>`) trong `DemoDataProviderFilteringTests.cs` đều xử lý an toàn, Razor view tự động escape HTML khi hiển thị trên giao diện (`Kh&#xF4;ng t&#xEC;m th&#x1EA5;y s&#x1EA3;n ph&#x1EA9;m...`).

### 1.2. Tính minh bạch đối với tính năng AI & Dịch vụ khách hàng
- **Vấn đề tiềm ẩn:** Giao diện có nguy cơ gây hiểu nhầm cho người dùng nếu hiển thị chatbot tự nhận "Đang trực tuyến" và có khả năng trả lời tư vấn trong khi hệ sinh thái backend chưa tích hợp API LLM thật.
- **Biện pháp khắc phục đã triển khai (`_CutTayAiWidget.cshtml`):**
  - Gắn nhãn tiêu đề rõ ràng: *"Bản thử nghiệm / Demo Preview"*.
  - Dòng trạng thái phụ đề: *"Minh hoạ giao diện · Chưa kết nối API AI"*.
  - Bổ sung khối hỗ trợ trực tiếp để người dùng có kênh liên lạc thực: *"Hỗ trợ khách hàng: hotro@cuttayshop.vn | Hotline: 1900-xxxx"*.
  - Hỗ trợ phím tắt `Escape` để người dùng có thể đóng ngay cửa sổ widget bất kỳ lúc nào.

### 1.3. Tính trung thực trong nội dung khuyến mãi & Newsletter
- **Vấn đề tiềm ẩn:** Việc hứa hẹn các quyền lợi phi thực tế ("10.000+ đánh giá", "Freeship trọn đời", "Giao hàng 2h") hoặc cấp mã voucher giả lập sau khi nhập email sẽ làm giảm uy tín thương hiệu và vi phạm nguyên tắc bảo vệ quyền lợi người tiêu dùng.
- **Biện pháp khắc phục đã triển khai (`Index.cshtml`):**
  - Cập nhật số liệu xã hội học minh bạch: `"⭐ 4.9/5 (Đánh giá giao diện mẫu)"`.
  - Cập nhật quyền lợi hội viên trung thực: *"Ưu đãi giao hàng hội viên"*, *"Tích điểm thưởng hội viên"*.
  - Form newsletter khi submit hiển thị thông báo chân thực: *"Cảm ơn bạn! (Đây là giao diện demo, thông tin chưa được lưu vào hệ thống)"*, không tạo ra các mã giảm giá giả lập đánh lừa người dùng.

### 1.4. Quản lý trạng thái Giỏ hàng Client-Side an toàn (`cart-state.js`)
- **Vấn đề tiềm ẩn:** Thao tác thêm vào giỏ hàng lưu trữ ở `localStorage` có thể bị lỗi cú pháp JSON làm sập trang hoặc dữ liệu bị chèn mã độc.
- **Biện pháp khắc phục đã triển khai:**
  - Mọi thao tác `JSON.parse` và `localStorage.getItem` đều được bọc trong khối `try-catch` an toàn, tự động fallback về giỏ hàng rỗng nếu dữ liệu bị lỗi.
  - Dữ liệu thêm vào giỏ chỉ nhận các trường kiểu dữ liệu chuẩn (`id`: integer, `price`: number, `quantity`: integer [1..99], `name`: string an toàn).
  - Không có bất kỳ đoạn mã nào giả lập thanh toán thành công hay yêu cầu nhập số thẻ ngân hàng / mật khẩu dưới danh nghĩa giả mạo.

---

## 2. KẾT LUẬN ĐÁNH GIÁ

Giao diện CutTayShop sau Sprint 1.1 và Sprint 2 tuân thủ nghiêm ngặt các tiêu chuẩn an toàn thông tin, bảo vệ người dùng, loại trừ các kịch bản lừa dối nhận thức (dark patterns) và hoàn toàn sẵn sàng cho môi trường thử nghiệm thực tế.
