using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/ton-kho")]
[Route("admin/inventory")]
public class InventoryController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public InventoryController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        var products = await _dataProvider.GetAllProductsAsync();
        return View(products);
    }
}
