using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/banner-cms")]
[Route("admin/banners")]
public class BannerController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public BannerController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        var banners = await _dataProvider.GetPromoBannersAsync();
        return View(banners);
    }
}
