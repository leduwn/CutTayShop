using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/bao-cao")]
[Route("admin/reports")]
public class ReportController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public ReportController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Sales()
    {
        var products = await _dataProvider.GetAllProductsAsync();
        return View(products);
    }
}
