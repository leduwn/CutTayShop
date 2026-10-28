using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/san-pham/{productId:int}/bien-the")]
[Route("admin/variants")]
[Route("admin/products/{productId:int?}/variants")]
public class VariantController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public VariantController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index(int productId = 1)
    {
        var products = await _dataProvider.GetAllProductsAsync();
        var product = products.FirstOrDefault(p => p.Id == productId) ?? products.First();
        return View(product);
    }
}
