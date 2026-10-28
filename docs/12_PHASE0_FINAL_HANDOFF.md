# 12 — PHASE 0 FINAL HANDOFF

**Dự án:** CutTayShop  
**Ngày rà soát:** 28/10/2026 (Asia/Saigon)  
**Phạm vi:** Design-first UI/UX và kiến trúc ASP.NET Core MVC; chưa triển khai application/database/payment/AI backend.  
**Nhánh làm việc:** `docs/phase0-uiux-architecture`

---

## A. Project Audit

- Workspace ban đầu có Git bootstrap, README, `.gitignore` và ảnh tham chiếu; không có application code.
- Ảnh `design/references/homepage-reference.png` mở được, kích thước `1536×1024`, SHA-256 `4323CB4F7EFBA246B3A0C818E2BC4737FB8CEC0A0956AADD17F4EDD5A9F1F795`.
- Công cụ: .NET SDK `10.0.402`, ASP.NET runtime `10.0.13`, Git `2.56.0`, Node `24.22.1`, npm `11.19.1`, Python `3.14.9`.
- `dotnet --info` trả được SDK/runtime nhưng có `System.TypeInitializationException` tại workload installer metadata; M1 phải smoke-test SDK trước scaffold, không tự cài lại trong Phase 0.
- UI/UX Pro Max có tại `C:\Users\Duwn\.agents\skills\ui-ux-pro-max`; kết quả phù hợp nhất gợi ý Vibrant & Block-based, motion nhẹ, mật độ trung bình. Skill chỉ là tư vấn, không ghi đè ảnh mẫu.

## B. Visual Design Decisions

- Hướng chốt: **Modern Playful E-commerce + Clean Premium**, nền sáng, pastel có kiểm soát, headline đậm, pill CTA, card bo mềm, editorial hero và SVG doodle.
- Font: Be Vietnam Pro cho display/heading; Inter/system fallback cho UI/body; font trang trí chỉ dùng sticker ngắn.
- Màu lõi: Ink `#101418`, Canvas `#F8F9F7`, Mint `#BDEFA8`, Peach `#FFE5DA`, Lavender `#EEE7FF`; sale surface `#FF455B` đi với chữ Ink, sale text `#C81E3A` trên trắng.
- Storefront max-width `1360px`; hero desktop 8/4; tablet xếp hero chính một cột, hai promo thành hàng; mobile có bố cục có chủ đích.
- Giữ từ ảnh mẫu: visual hierarchy, 10 category, trust strip, Deal Hot, membership/newsletter và assistant shell. Cải tiến: contrast thật, focus/form semantics, trạng thái expired/out-of-stock/error và AI fallback trung thực.
- Không tuyên bố pixel-perfect: việc so sánh screenshot/render thuộc M2.

## C. Complete Sitemap

- Inventory có **64 page designs** bao phủ Storefront, Auth/Account, Admin và System; registry có **76 page/action/API rows**, phân rõ MVP, Phase 2 và Future.
- Đã bổ sung promotion products, email verification, customer reviews, admin variants, customer support và role/capability management.
- Loading, empty, no-result, out-of-stock, partial error và session-expired là shared states với owner page, không tạo URL giả khi không cần.
- URL/controller/phase canonical nằm duy nhất ở `docs/02_SITEMAP_AND_ROUTES.md`.

## D. Technical Architecture

- Target: C# 14 / `net10.0` LTS; ASP.NET Core MVC + Razor, EF Core 10, Identity cookie auth, SQL Server production.
- CSS custom properties + module theo feature; không thêm Tailwind/Node build step trong M1 khi chưa có bằng chứng cần.
- Web → Core ← Infrastructure; controller chỉ map HTTP/ViewModel, business rule nằm trong service. Không thêm generic repository bao quanh EF Core.
- Data contract bao phủ price snapshot, inventory source-of-truth + concurrency, payment attempts/refunds, promotion/coupon redemption, verified review, loyalty, shipping và state machine.
- Security: antiforgery, allow-list ViewModel, owner-scoped query, Admin policy capability, rich HTML sanitizer, upload validation, rate limit, audit log, không lưu secret/card data.
- MVP payment chỉ COD. VietQR ở Phase 2; VNPay/MoMo/thẻ là Future.

## E. Documentation

1. `docs/00_PROJECT_AUDIT.md`
2. `docs/01_PRODUCT_REQUIREMENTS.md`
3. `docs/02_SITEMAP_AND_ROUTES.md`
4. `docs/design/03_REFERENCE_ANALYSIS.md`
5. `docs/design/04_DESIGN_SYSTEM.md`
6. `docs/design/05_PAGE_BLUEPRINTS.md`
7. `docs/design/06_COMPONENT_LIBRARY.md`
8. `docs/design/07_RESPONSIVE_AND_ACCESSIBILITY.md`
9. `docs/08_ASPNET_MVC_ARCHITECTURE.md`
10. `docs/09_DATA_MODEL_AND_USER_FLOWS.md`
11. `docs/10_IMPLEMENTATION_ROADMAP.md`
12. `docs/11_ACCEPTANCE_CRITERIA.md`
13. `docs/12_PHASE0_FINAL_HANDOFF.md`

Mermaid gồm sitemap, security/request pipeline, ERD, order state machine và đủ 7 user/business flows. Prototype HTML/CSS **không được tạo** vì là deliverable tùy chọn; tránh biến Phase 0 thành implementation trước review.

## F. Quality Review

### Đạt ở mức đặc tả Phase 0

- Visual reference được mở trực tiếp và phân tích có giới hạn rõ.
- Sitemap/routes/phasing, design tokens, component inventory, responsive/a11y plan, blueprint 16-field, MVC architecture, data model, 7 flows, roadmap M1–M7 và acceptance gates đã có.
- Contrast sai trước audit đã được tính lại, loại bỏ triệt để text xám nhạt vi phạm WCAG AA; thống nhất nguồn kích thước header mobile (`56px`) và hero mobile (`38px`); chuyển 100% component sang semantic tokens hỗ trợ Dark Mode; route/controller/role/loyalty/payment/state rule đã được thống nhất.
- AI widget ghi rõ preview/unavailable và contract dự kiến, không giả vờ backend đã hoạt động.

### Chưa thể kiểm chứng trước khi có code

- Browser screenshot, horizontal overflow thực, keyboard/screen-reader, axe/Lighthouse, Core Web Vitals, build/test application và database concurrency.
- Các kiểm tra này chuyển sang acceptance/testing của M1–M7; tài liệu không phải bằng chứng runtime pass.

### Quyết định còn mở

- Hạ tầng SQL Server cụ thể và chi phí vận hành.
- Nhà cung cấp email, storage/CDN, shipping và payment Phase 2.
- Quyền sử dụng/self-host font và nguồn asset sản phẩm/lifestyle.
- Quy định pháp lý/privacy cho analytics, marketing và AI.

## G. GitHub

- Base bootstrap: `8d50cea` trên `main`.
- Branch: `docs/phase0-uiux-architecture`.
- Remote: `https://github.com/leduwn/CutTayShop.git`; remote chưa có refs trước handoff.
- Commit/push/PR phải được ghi bằng bằng chứng Git sau verification cuối. GitHub CLI không có trong PATH; nếu không có connector/credential tạo PR, nhánh vẫn được push và URL tạo PR được báo rõ, không giả vờ PR đã tồn tại.

## H. Next Development Phase — M1

1. Smoke-test `dotnet --info`, scaffold/build app tạm và xử lý lỗi workload metadata nếu ảnh hưởng build.
2. Tạo solution 3 project `Web`, `Core`, `Infrastructure` trên `net10.0`; pin package major 10.
3. Thiết lập test projects, CI build và SQL Server integration test trước migration nghiệp vụ.
4. Đưa token CSS, font self-host/fallback, `_Layout`, Header/Footer, error shell và `/dev/design-system-preview` vào Razor.
5. Kiểm ở 375/430/768/1024/1440/1920, keyboard, reduced-motion, forced-colors và axe; lưu screenshot evidence.

Rủi ro ưu tiên: SDK hiện báo lỗi metadata workload, asset/font licensing, package version drift và việc biến design spec thành abstraction quá sớm. M1 chỉ làm foundation/layout; không xây checkout, payment hoặc AI backend.
