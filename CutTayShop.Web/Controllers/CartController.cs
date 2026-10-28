using CutTayShop.Core.Interfaces;
using CutTayShop.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers;

public class CartController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public CartController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("gio-hang")]
    public async Task<IActionResult> Index()
    {
        var suggestions = await _dataProvider.GetFeaturedProductsAsync();
        var coupons = await _dataProvider.GetCouponsAsync();

        var model = new CartPageViewModel
        {
            SuggestedProducts = suggestions,
            AvailableCoupons = coupons
        };

        return View(model);
    }
}
