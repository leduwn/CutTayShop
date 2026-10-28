using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers;

public class WishlistController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public WishlistController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("yeu-thich")]
    public async Task<IActionResult> Index()
    {
        var featured = await _dataProvider.GetFeaturedProductsAsync();
        return View(featured);
    }
}
