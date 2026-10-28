using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers;

public class CompareController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public CompareController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("so-sanh")]
    public async Task<IActionResult> Index()
    {
        var products = await _dataProvider.GetAllProductsAsync();
        return View(products);
    }
}
