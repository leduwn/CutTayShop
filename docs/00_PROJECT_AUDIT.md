# 00 — BÁO CÁO KIỂM TOÁN DỰ ÁN (PROJECT AUDIT)

**Dự án:** CutTayShop — Nền tảng Thương mại Điện tử B2C Hiện đại  
**Giai đoạn:** Phase 0 — Design-First & Technical Architecture  
**Ngày thực hiện:** 28/10/2026  
**Người thực hiện:** Principal UI/UX Designer & Senior ASP.NET Core MVC Architect  

---

## 1. TỔNG QUAN HIỆN TRẠNG WORKSPACE & HỆ THỐNG

### 1.1. Môi trường phát triển cục bộ (Local Environment)
- **Đường dẫn thư mục làm việc:** `D:\Projects\CutTayShop - ASP`
- **Hệ điều hành:** Windows 11 Home Single Language (Build 10.0.26200, 64-bit)
- **Shell khả dụng:** PowerShell 5.1 (chính), Git Bash (POSIX)
- **Tình trạng file ban đầu:** Thư mục hoàn toàn mới, không chứa mã nguồn cũ hoặc xung đột tệp có sẵn.

### 1.2. Kiểm toán Công cụ & SDK đã cài đặt
Qua kiểm tra thực tế bằng terminal lệnh:
1. **.NET SDK & Runtime:**
   - **Phiên bản .NET SDK:** `10.0.402` (MSBuild 18.9.15+a8dd0577c)
   - **.NET Runtimes đã cài:**
     * `Microsoft.AspNetCore.App 10.0.13` [C:\Program Files\dotnet\shared\Microsoft.AspNetCore.App]
     * `Microsoft.NETCore.App 10.0.13` [C:\Program Files\dotnet\shared\Microsoft.NETCore.App]
     * `Microsoft.WindowsDesktop.App 10.0.13`
   - **Đánh giá kiến trúc:** Máy trạm hỗ trợ `net10.0`. .NET 10 là LTS đang được hỗ trợ đến 14/11/2028; .NET 8 kết thúc hỗ trợ ngày 10/11/2026. Không coi package chỉ nhắm `net8.0` là mặc nhiên tương thích với `net10.0`; từng package phải được kiểm tra TFM và phiên bản trước khi đưa vào M1.
   - **Lưu ý công cụ:** `dotnet --info` vẫn liệt kê SDK/runtime nhưng phát sinh `System.TypeInitializationException` khi đọc thông tin workload installer. Đây là vấn đề môi trường cần kiểm tra ở M1, không ảnh hưởng tới hồ sơ thiết kế Phase 0 và chưa được tự ý sửa/cài lại trong lượt này.
   - **Nguồn vòng đời:** [Microsoft .NET Support Policy](https://dotnet.microsoft.com/en-us/platform/support/policy).
2. **Node.js & Npm:**
   - Phiên bản: `v24.22.1` (Hỗ trợ tốt việc đóng gói asset tĩnh, Tailwind CSS / PostCSS compiler nếu cần).
3. **Python:**
   - Phiên bản: `Python 3.14.9` (Khả dụng cho các công cụ thiết kế dữ liệu, kịch bản tự động).
4. **Git Version Control:**
   - Git for Windows đã cài đặt, tích hợp Schannel và Credential Manager.
   - GitHub CLI (`gh`): Chưa có trong PATH. Các thao tác Git sẽ được điều phối an toàn qua lệnh `git` chuẩn.

---

## 2. HIỆN TRẠNG KHO MÃ NGUỒN (GIT AUDIT)

- **Remote Repository:** `https://github.com/leduwn/CutTayShop.git`
- **Trạng thái kiểm tra remote (`git ls-remote`):** Remote repository rỗng (chưa có commit và chưa có nhánh nào).
- **Hành động khởi tạo an toàn (Safe Bootstrap):**
  1. Khởi tạo Git repository cục bộ (`git init`).
  2. Cấu hình `.gitignore` chuẩn cho hệ sinh thái .NET Core, Visual Studio, Node.js và môi trường Windows.
  3. Tạo nhánh chính `main` với commit khởi tạo `chore: bootstrap repository with initial configuration and visual reference`.
  4. Tạo nhánh làm việc độc lập cho Phase 0: `docs/phase0-uiux-architecture`.
  5. Đảm bảo tuân thủ tuyệt đối quy tắc: Không force push, không ghi đè dữ liệu, bảo toàn lịch sử.

---

## 3. TÌNH TRẠNG CÔNG CỤ THIẾT KẾ & UI/UX PRO MAX

- **Vị trí Skill đã kiểm tra:** `C:\Users\Duwn\.agents\skills\ui-ux-pro-max`
- **Trạng thái:** Đã cài đặt và chạy được các truy vấn cục bộ bằng Python 3.14.9. Kết quả phù hợp nhất là phong cách Vibrant & Block-based, chuyển động nhẹ và mật độ trung bình; bảng màu/font cuối cùng vẫn ưu tiên ảnh mẫu và khả năng hiển thị tiếng Việt thay vì sao chép máy móc gợi ý của skill.
- **Tập dữ liệu tri thức hỗ trợ:**
  * 79 searchable styles (Vibrant, Tactile Digital, Claymorphism, Modern Minimalist).
  * 192 product palettes & reasoning rules.
  * 74 font pairings tối ưu cho chuyển đổi E-commerce.
  * 119 UX/UI guidelines (Accessibility WCAG 2.2 AA, Touch 44px, Contrast 4.5:1, CLS < 0.1).
  * 22 tech stack rules (đặc biệt là CSS hiện đại, Razor view integration).

---

## 4. TÀI NGUYÊN HÌNH ẢNH MẪU (VISUAL REFERENCE)

- **File nguồn:** `design/references/homepage-reference.png`
- **Nguồn sao lưu từ phiên:** Đã lưu trữ an toàn trực tiếp vào workspace dự án tại `design/references/homepage-reference.png`.
- **Trạng thái truy cập:** Đã đọc và phân tích trực quan toàn diện (Pixel-level inspection).
- **Đặc trưng thị giác cốt lõi được ghi nhận:**
  * **Phong cách tổng thể:** *Modern Playful E-commerce* kết hợp *Soft Pastel*, tối giản hiện đại (Clean & Premium), nhiều khoảng trắng thở (Negative Space) nhưng ấm áp, thân thiện.
  * **Điểm nhấn Hero:** Tiêu đề chữ đen siêu lớn, pill highlight màu xanh pastel (`#BDEFA8`) ôm cụm từ "ở ngay đây", sticker trang trí vẽ tay (doodles, ngôi sao xanh, sticky note cảm xúc), lifestyle product setup tinh tế.
  * **Khu vực danh mục:** 10 thẻ danh mục với icon tối giản đặt trên nền tròn pastel nhiều màu sắc, khoảng cách thoáng đãng.
  * **Trợ lý ảo:** Floating AI Widget góc phải màn hình ("CutTay AI") với giao diện hội thoại chuyên nghiệp, thân thiện.

---

## 5. CÁC NGUYÊN TẮC RÀNG BUỘC KỸ THUẬT (ARCHITECTURAL CONSTRAINTS)

1. **Công nghệ bắt buộc:**
   - Nền tảng cốt lõi: **ASP.NET Core MVC**, C#, Razor Views (`.cshtml`).
   - Tuyệt đối KHÔNG biến đổi kiến trúc thành SPA (React, Next.js, Angular, Blazor). Toàn bộ giao diện storefront phải là Server-Side Rendered (SSR) với Razor View Components và Partial Views để tối ưu SEO, tốc độ tải ban đầu (FCP/LCP) và trải nghiệm duyệt web nhẹ nhàng.
2. **Ngôn ngữ & Bản địa hóa:**
   - Ngôn ngữ chính: Tiếng Việt (vi-VN).
   - Đơn vị tiền tệ: Việt Nam Đồng (VND - ₫), định dạng số có dấu chấm phân cách hàng nghìn (ví dụ: `1.490.000₫`), định dạng ngày giờ chuẩn Việt Nam.
3. **Phạm vi Phase 0:**
   - **Design-First**: Nghiên cứu, đặc tả và lập kiến trúc hoàn chỉnh trước khi viết mã nguồn tính năng.
   - Không vội vàng scaffold template mặc định của Visual Studio.
   - Không sinh mã logic thanh toán thực tế, không lưu thông tin thẻ bảo mật của khách hàng tại giai đoạn này.

---

## 6. MA TRẬN ĐÁNH GIÁ RỦI RO & BIỆN PHÁP PHÒNG NGỪA

| Rủi ro kỹ thuật / Thiết kế | Mức độ | Biện pháp kiểm soát & Giải pháp phòng ngừa |
| :--- | :--- | :--- |
| **Giao diện rơi vào lối mòn template CRUD cũ kỹ** | Rất cao | Thiết lập *CutTay Design System v1* độc quyền với CSS Variables chuẩn, bo góc mềm, màu pastel, font chữ hiện đại (Be Vietnam Pro / Inter). |
| **Tràn layout (Horizontal Overflow) trên Mobile** | Cao | Thiết lập hệ thống breakpoint đồng nhất (375px, 768px, 1024px, 1440px), dùng `min-h-dvh`, flex-wrap an toàn, kiểm tra overflow tại mọi thành phần. |
| **Overposting & Mass Assignment rủi ro bảo mật** | Cao | Bắt buộc 100% Request Form sử dụng Strongly-typed ViewModels chuyên biệt, tuyệt đối không bind trực tiếp EF Core Entities từ Http Post. |
| **Giảm tốc độ hiển thị do ảnh sản phẩm nặng** | Trung bình | Quy định pipeline WebP/AVIF và kích thước/aspect-ratio tường minh để giảm CLS; đo theo ngân sách <= 0.1 ở M2/M7. |
| **Trải nghiệm AI Chat Widget bị ảo tưởng** | Trung bình | Thiết kế giao diện và đặc tả API Contract rõ ràng cho CutTay AI; không giả lập backend phức tạp khi chưa có dịch vụ AI thực tế. |

---

*Báo cáo được hoàn thành và đối chiếu chất lượng, làm cơ sở vững chắc cho toàn bộ tài liệu kiến trúc tiếp theo.*
