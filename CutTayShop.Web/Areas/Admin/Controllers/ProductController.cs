using CutTayShop.Core.Interfaces;
using CutTayShop.Core.Models;
using CutTayShop.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/san-pham")]
[Route("admin/products")]
public class ProductController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public ProductController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index([FromQuery] string? category, [FromQuery] string? q)
    {
        var products = await _dataProvider.GetAllProductsAsync();
        var categories = await _dataProvider.GetCategoriesAsync();

        if (!string.IsNullOrWhiteSpace(category))
        {
            products = products.Where(p => p.CategorySlug.Equals(category, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        if (!string.IsNullOrWhiteSpace(q))
        {
            products = products.Where(p => p.Name.Contains(q, StringComparison.OrdinalIgnoreCase) || p.Brand.Contains(q, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        ViewBag.Categories = categories;
        ViewBag.SelectedCategory = category;
        ViewBag.SearchQuery = q;

        return View(products);
    }

    [HttpGet("them-moi")]
    [HttpGet("create")]
    public async Task<IActionResult> Create()
    {
        var categories = await _dataProvider.GetCategoriesAsync();
        var model = new AdminProductEditViewModel
        {
            Product = new Product { InStock = true },
            Categories = categories,
            IsNew = true
        };
        return View(model);
    }

    [HttpPost("them-moi")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Product product)
    {
        TempData["AdminNotice"] = $"Thêm mới sản phẩm \"{product.Name}\" thành công!";
        return RedirectToAction("Index");
    }

    [HttpGet("chinh-sua/{id:int}")]
    [HttpGet("edit/{id:int}")]
    public async Task<IActionResult> Edit(int id)
    {
        var products = await _dataProvider.GetAllProductsAsync();
        var product = products.FirstOrDefault(p => p.Id == id);
        if (product == null) return NotFound();

        var categories = await _dataProvider.GetCategoriesAsync();
        var model = new AdminProductEditViewModel
        {
            Product = product,
            Categories = categories,
            IsNew = false
        };
        return View(model);
    }

    [HttpPost("chinh-sua/{id:int}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, Product product)
    {
        TempData["AdminNotice"] = $"Cập nhật sản phẩm \"{product.Name}\" thành công!";
        return RedirectToAction("Index");
    }
}
