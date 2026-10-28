using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/danh-muc")]
[Route("admin/categories")]
public class CategoryController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public CategoryController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        var categories = await _dataProvider.GetCategoriesAsync();
        return View(categories);
    }
}
