using Microsoft.AspNetCore.Mvc;
using CutTayShop.Core.Interfaces;
using CutTayShop.Core.Models;
using CutTayShop.Web.ViewModels;

namespace CutTayShop.Web.Controllers;

public class CatalogController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public CatalogController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    /// <summary>
    /// Route: /san-pham
    /// All Products Catalog (PLP) with Filters, Sorting, and Pagination
    /// </summary>
    [HttpGet]
    [Route("san-pham")]
    [Route("danh-muc")]
    public async Task<IActionResult> Index([FromQuery] CatalogFilterParameters filters)
    {
        filters ??= new CatalogFilterParameters();
        var catalogResult = await _dataProvider.GetCatalogAsync(filters);

        var model = new CatalogViewModel
        {
            Title = "Tất cả sản phẩm",
            Description = "Khám phá hàng ngàn sản phẩm công nghệ, thời trang và đời sống cao cấp tại CutTayShop.",
            Breadcrumbs = new List<BreadcrumbItem>
            {
                new() { Label = "Trang chủ", Url = "/" },
                new() { Label = "Sản phẩm", Url = null }
            },
            Result = catalogResult,
            Filter = filters,
            Category = null,
            IsSearch = false
        };

        return View(model);
    }

    /// <summary>
    /// Route: /danh-muc/{slug}
    /// Category Products with Breadcrumbs, Category Banner, and Filters
    /// Unknown slug returns true HTTP 404
    /// </summary>
    [HttpGet]
    [Route("danh-muc/{slug}")]
    public async Task<IActionResult> Category(string slug, [FromQuery] CatalogFilterParameters filters)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return NotFound();
        }

        var category = await _dataProvider.GetCategoryBySlugAsync(slug);
        if (category == null)
        {
            return NotFound();
        }

        filters ??= new CatalogFilterParameters();
        filters.CategorySlug = slug;

        var catalogResult = await _dataProvider.GetCatalogAsync(filters);

        var model = new CatalogViewModel
        {
            Title = category.Name,
            Description = $"Bộ sưu tập sản phẩm ngành hàng {category.Name} chính hãng, cập nhật xu hướng mới nhất 2026.",
            Breadcrumbs = new List<BreadcrumbItem>
            {
                new() { Label = "Trang chủ", Url = "/" },
                new() { Label = "Sản phẩm", Url = "/san-pham" },
                new() { Label = category.Name, Url = null }
            },
            Result = catalogResult,
            Filter = filters,
            Category = category,
            IsSearch = false
        };

        return View("Index", model);
    }

    /// <summary>
    /// Route: /san-pham/{slug}
    /// Product Detail Page (PDP) with Gallery, Variants, Specs, Reviews, and Related Products
    /// Unknown slug returns true HTTP 404
    /// </summary>
    [HttpGet]
    [Route("san-pham/{slug}")]
    public async Task<IActionResult> Detail(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return NotFound();
        }

        var product = await _dataProvider.GetProductBySlugAsync(slug);
        if (product == null)
        {
            return NotFound();
        }

        var relatedProducts = await _dataProvider.GetRelatedProductsAsync(product.Id, 4);

        var breadcrumbs = new List<BreadcrumbItem>
        {
            new() { Label = "Trang chủ", Url = "/" },
            new() { Label = "Sản phẩm", Url = "/san-pham" }
        };

        if (!string.IsNullOrEmpty(product.CategorySlug) && !string.IsNullOrEmpty(product.CategoryName))
        {
            breadcrumbs.Add(new()
            {
                Label = product.CategoryName,
                Url = $"/danh-muc/{product.CategorySlug}"
            });
        }

        breadcrumbs.Add(new()
        {
            Label = product.Name,
            Url = null
        });

        var model = new ProductDetailViewModel
        {
            Product = product,
            Breadcrumbs = breadcrumbs,
            RelatedProducts = relatedProducts,
            SelectedVariant = product.Variants?.FirstOrDefault()
        };

        return View(model);
    }

    /// <summary>
    /// Route: /tim-kiem?q=...
    /// Search Results Page with Accent-Insensitive Matching and Filters
    /// </summary>
    [HttpGet]
    [Route("tim-kiem")]
    public async Task<IActionResult> Search([FromQuery] string? q, [FromQuery] CatalogFilterParameters filters)
    {
        filters ??= new CatalogFilterParameters();
        filters.SearchQuery = q;

        var catalogResult = await _dataProvider.GetCatalogAsync(filters);

        var queryDisplay = string.IsNullOrWhiteSpace(q) ? "" : q.Trim();
        var title = string.IsNullOrEmpty(queryDisplay)
            ? "Tìm kiếm sản phẩm"
            : $"Kết quả tìm kiếm cho: \"{queryDisplay}\"";

        var description = catalogResult.TotalItems > 0
            ? $"Tìm thấy {catalogResult.TotalItems:N0} sản phẩm phù hợp với từ khóa của bạn."
            : "Không tìm thấy sản phẩm nào phù hợp. Bạn vui lòng thử lại với từ khóa khác.";

        var model = new CatalogViewModel
        {
            Title = title,
            Description = description,
            Breadcrumbs = new List<BreadcrumbItem>
            {
                new() { Label = "Trang chủ", Url = "/" },
                new() { Label = "Tìm kiếm", Url = null }
            },
            Result = catalogResult,
            Filter = filters,
            Category = null,
            IsSearch = true,
            SearchQuery = queryDisplay
        };

        return View("Index", model);
    }
}
