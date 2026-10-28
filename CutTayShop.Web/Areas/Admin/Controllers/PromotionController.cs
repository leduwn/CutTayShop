using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin")]
public class PromotionController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public PromotionController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("khuyen-mai")]
    [HttpGet("promotions")]
    public async Task<IActionResult> Coupons()
    {
        var coupons = await _dataProvider.GetCouponsAsync();
        return View(coupons);
    }

    [HttpGet("flash-sale")]
    [HttpGet("promotions/flash-sale")]
    public async Task<IActionResult> FlashSale()
    {
        var deals = await _dataProvider.GetHotDealsAsync();
        var countdown = await _dataProvider.GetDealCountdownAsync();
        ViewBag.Countdown = countdown;
        return View(deals);
    }
}
