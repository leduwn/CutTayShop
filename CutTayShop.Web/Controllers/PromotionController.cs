using CutTayShop.Core.Interfaces;
using CutTayShop.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers;

public class PromotionController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public PromotionController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("flash-sale")]
    public async Task<IActionResult> FlashSale()
    {
        var countdown = await _dataProvider.GetDealCountdownAsync();
        var deals = await _dataProvider.GetHotDealsAsync();
        var categories = await _dataProvider.GetCategoriesAsync();

        var model = new FlashSaleViewModel
        {
            Countdown = countdown,
            Deals = deals,
            Categories = categories
        };

        return View(model);
    }

    [HttpGet("khuyen-mai")]
    [HttpGet("deals")]
    public async Task<IActionResult> Index()
    {
        var coupons = await _dataProvider.GetCouponsAsync();
        var hotDeals = await _dataProvider.GetHotDealsAsync();
        var banners = await _dataProvider.GetPromoBannersAsync();

        var model = new PromotionIndexViewModel
        {
            Coupons = coupons,
            HotDeals = hotDeals,
            Banners = banners
        };

        return View(model);
    }
}
