# BÁO CÁO KẾT QUẢ KIỂM THỬ TỰ ĐỘNG (AUTOMATED TEST RESULTS) — SPRINT 2
**Dự án:** CutTayShop — Premium E-commerce Frontend  
**Framework kiểm thử:** xUnit 2.9.3 (.NET 10 LTS, C# 14)  
**Project:** `CutTayShop.Tests`  
**Ngày thực thi:** 29/10/2026  
**Kết quả chung:** **27 / 27 bài kiểm thử ĐẠT (100% Pass Rate, 0 Failed, 0 Skipped)**  
**Thời gian thực thi:** 4.88 s

---

## 1. TỔNG HỢP DANH SÁCH TEST SUITES

```
Passed! - Failed: 0, Passed: 27, Skipped: 0, Total: 27, Duration: 4.88 s - CutTayShop.Tests.dll (net10.0)
```

| Nhóm kiểm thử (Test Class) | Số lượng test | Đạt (Passed) | Thất bại (Failed) |
|---|---|---|---|
| `CatalogControllerTests` | 8 | 8 | 0 |
| `DemoDataProviderFilteringTests` | 15 | 15 | 0 |
| `HomeControllerTests` | 4 | 4 | 0 |
| **Tổng cộng** | **27** | **27** | **0** |

---

## 2. CHI TIẾT CÁC BÀI KIỂM THỬ & MỤC TIÊU XÁC MINH

### 2.1. Nhóm kiểm thử Catalog Controller (`CatalogControllerTests`)

1. `Index_ReturnsViewWithAllProducts` (PASS):
   - **Mục tiêu:** Kiểm tra Action `Index` trên tuyến đường `/san-pham`.
   - **Xác minh:** Trả về `ViewResult` với `CatalogViewModel`, tiêu đề "Tất cả sản phẩm", breadcrumbs gồm 2 cấp (Trang chủ > Sản phẩm), danh sách sản phẩm không rỗng.
2. `Category_ValidSlug_ReturnsCategoryView` (PASS):
   - **Mục tiêu:** Kiểm tra Action `Category` trên tuyến đường `/danh-muc/cong-nghe`.
   - **Xác minh:** Trả về `ViewResult` với danh mục tương ứng, toàn bộ sản phẩm trả về thuộc ngành hàng `cong-nghe`.
3. `Category_UnknownSlug_Returns404NotFound` (PASS):
   - **Mục tiêu:** Kiểm tra hành vi khi người dùng truy cập slug ngành hàng không tồn tại.
   - **Xác minh:** Trả về đối tượng `NotFoundResult` (mã HTTP 404 thực tế), ngăn chặn hiển thị trang rỗng sai lệch.
4. `Detail_ValidSlug_ReturnsProductDetail` (PASS):
   - **Mục tiêu:** Kiểm tra Action `Detail` trên tuyến đường `/san-pham/{slug}` với slug sản phẩm hợp lệ.
   - **Xác minh:** Trả về `ViewResult` với `ProductDetailViewModel`, thông tin sản phẩm và breadcrumbs đầy đủ.
5. `Detail_PopulatesVariantsSpecsAndRelatedProducts` (PASS):
   - **Mục tiêu:** Đảm bảo trang chi tiết sản phẩm có đầy đủ các thành phần dữ liệu phong phú.
   - **Xác minh:** `Product.Specifications` không rỗng, `Product.Variants` có dữ liệu, `Product.Reviews` có dữ liệu, `RelatedProducts` không rỗng và không chứa chính sản phẩm hiện tại.
6. `Detail_UnknownSlug_Returns404NotFound` (PASS):
   - **Mục tiêu:** Kiểm tra slug sản phẩm không tồn tại.
   - **Xác minh:** Trả về đối tượng `NotFoundResult` (mã HTTP 404 chuẩn).
7. `Search_ValidQuery_ReturnsSearchResults` (PASS):
   - **Mục tiêu:** Kiểm tra Action `Search` trên tuyến đường `/tim-kiem?q=tai+nghe`.
   - **Xác minh:** Trả về `ViewResult` với cờ `IsSearch = true`, tiêu đề chứa từ khóa tìm kiếm và danh sách sản phẩm phù hợp.
8. `Search_EmptyQuery_HandlesGracefully` (PASS):
   - **Mục tiêu:** Kiểm tra Action `Search` khi chuỗi tìm kiếm rỗng hoặc khoảng trắng.
   - **Xác minh:** Xử lý an toàn không quăng ngoại lệ, trả về tiêu đề mặc định và kết quả danh mục an toàn.

### 2.2. Nhóm kiểm thử Lọc, Sắp xếp & Tìm kiếm (`DemoDataProviderFilteringTests`)

1. `GetCatalogAsync_ReturnsAtLeast30Products` (PASS):
   - **Mục tiêu:** Đảm bảo kho dữ liệu mẫu có tối thiểu 30 sản phẩm phong phú theo yêu cầu Sprint 2.
   - **Xác minh:** `TotalItems >= 30` (Hiện tại đạt 32 sản phẩm phong phú).
2. `GetCatalogAsync_FilterByPriceRange_ReturnsProductsWithinRange` (PASS):
   - **Mục tiêu:** Lọc sản phẩm trong khoảng giá từ 300.000₫ đến 800.000₫.
   - **Xác minh:** Mọi sản phẩm trả về đều có `Price >= MinPrice` và `Price <= MaxPrice`.
3. `GetCatalogAsync_SortByPriceAsc_ReturnsAscendingOrder` (PASS):
   - **Mục tiêu:** Sắp xếp giá tăng dần (`sortBy=price_asc`).
   - **Xác minh:** Giá sản phẩm phía trước luôn nhỏ hơn hoặc bằng giá sản phẩm liền sau.
4. `GetCatalogAsync_SortByPriceDesc_ReturnsDescendingOrder` (PASS):
   - **Mục tiêu:** Sắp xếp giá giảm dần (`sortBy=price_desc`).
   - **Xác minh:** Giá sản phẩm phía trước luôn lớn hơn hoặc bằng giá sản phẩm liền sau.
5. `SearchProducts_AccentInsensitive_FindsMatches` (PASS):
   - **Mục tiêu:** Tìm kiếm tiếng Việt không dấu.
   - **Xác minh:** Tìm `mu` tìm thấy "Mũ lưỡi trai", tìm `ao` tìm thấy "Áo hoodie" và "Áo thun polo".
6. `SearchProducts_XssPayloads_HandledSafelyWithoutCrash` (4 kịch bản `@Theory` PASS):
   - **Mục tiêu:** Kiểm tra khả năng chống chịu các chuỗi tấn công XSS & SQLi phổ biến:
     - `<script>alert('xss')</script>`
     - `\"><img src=x onerror=alert(1)>`
     - `'; DROP TABLE Products; --`
     - `<svg/onload=alert(1)>`
   - **Xác minh:** Không gây crash ứng dụng, chuỗi được chuẩn hóa an toàn, không có mã độc nào được thực thi.
7. `GetCatalogAsync_Pagination_CalculatesCorrectPages` (PASS):
   - **Mục tiêu:** Kiểm tra tính đúng đắn của logic phân trang.
   - **Xác minh:** Phân chia đúng số trang theo `PageSize`, sản phẩm trang 1 và trang 2 không bị trùng lặp ID.
8. `GetRelatedProductsAsync_DoesNotIncludeSelf` (PASS):
   - **Mục tiêu:** Đảm bảo danh sách sản phẩm liên quan không hiển thị chính nó.
   - **Xác minh:** Không có sản phẩm nào trong kết quả trùng ID với sản phẩm đang xem.
9. `GetAllBrandsAsync_ReturnsDistinctList` (PASS):
   - **Mục tiêu:** Kiểm tra danh sách thương hiệu không bị trùng lặp.
   - **Xác minh:** Toàn bộ danh sách thương hiệu là duy nhất và được sắp xếp bảng chữ cái.
10. `GetCategoryBySlugAsync_CaseInsensitiveMatch` (PASS):
    - **Mục tiêu:** Khớp danh mục không phân biệt chữ hoa chữ thường (`cong-nghe` vs `CONG-NGHE`).
11. `GetCatalogAsync_RatingAndStockFilters` (PASS):
    - **Mục tiêu:** Kết hợp đồng thời bộ lọc đánh giá sao và trạng thái còn hàng.
    - **Xác minh:** Sản phẩm trả về đều có `Rating >= 4.8` và `InStock == true`.

### 2.3. Nhóm kiểm thử Trang chủ & Tìm kiếm gợi ý (`HomeControllerTests`)

1. `Index_ReturnsViewWithPopulatedHomeViewModel` (PASS):
   - **Mục tiêu:** Kiểm tra nạp đầy đủ danh mục, biểu ngữ ưu đãi, đồng hồ đếm ngược, deal hot, sản phẩm nổi bật và hàng mới về trên Trang chủ.
2. `SearchSuggestions_ValidQuery_ReturnsJsonWithMatches` (PASS):
   - **Mục tiêu:** Kiểm tra API gợi ý thời gian thực `/Home/SearchSuggestions?q=tai+nghe`.
   - **Xác minh:** Trả về JSON chứa danh sách sản phẩm khớp từ khóa.
3. `SearchSuggestions_AccentInsensitive_ReturnsJsonMatches` (PASS):
   - **Mục tiêu:** Tìm kiếm gợi ý không dấu tiếng Việt (`q=mu`).
   - **Xác minh:** Trả về sản phẩm tương ứng.
4. `SearchSuggestions_XssInput_ExecutesSafely` (2 kịch bản `@Theory` PASS):
   - **Mục tiêu:** Kiểm tra đầu vào độc hại trên search dropdown.
   - **Xác minh:** Xử lý an toàn không có exception.

---

## 3. KẾT LUẬN KIỂM THỬ

Hệ thống kiểm thử tự động xác nhận toàn bộ logic nghiệp vụ, truy xuất danh mục, phân trang, thuật toán tìm kiếm tiếng Việt và xử lý ngoại lệ đều vận hành chính xác 100%, bảo đảm chất lượng ổn định và an toàn khi tích hợp tiếp vào Sprint 3.
