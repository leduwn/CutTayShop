using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CutTayShop.Core.Interfaces;
using CutTayShop.Web.Models;
using CutTayShop.Web.ViewModels;

namespace CutTayShop.Web.Controllers;

public class HomeController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public HomeController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    public async Task<IActionResult> Index()
    {
        var model = new HomeViewModel
        {
            Categories = await _dataProvider.GetCategoriesAsync(),
            TrustBenefits = await _dataProvider.GetTrustBenefitsAsync(),
            PromoBanners = await _dataProvider.GetPromoBannersAsync(),
            DealCountdown = await _dataProvider.GetDealCountdownAsync(),
            HotDeals = await _dataProvider.GetHotDealsAsync(),
            FeaturedProducts = await _dataProvider.GetFeaturedProductsAsync(),
            NewArrivals = await _dataProvider.GetNewArrivalsAsync()
        };

        return View(model);
    }

    [HttpGet]
    public async Task<IActionResult> SearchSuggestions(string q)
    {
        var results = await _dataProvider.SearchProductsAsync(q);
        return Json(results.Take(5).Select(p => new
        {
            id = p.Id,
            name = p.Name,
            slug = p.Slug,
            price = p.Price.ToString("N0") + "₫",
            originalPrice = p.OriginalPrice > 0 ? p.OriginalPrice.ToString("N0") + "₫" : null,
            imageUrl = p.ImageUrl,
            categoryName = p.CategoryName
        }));
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
