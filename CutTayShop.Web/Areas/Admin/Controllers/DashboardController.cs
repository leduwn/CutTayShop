using CutTayShop.Core.Interfaces;
using CutTayShop.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin")]
public class DashboardController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public DashboardController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        var orders = await _dataProvider.GetOrdersAsync();
        var products = await _dataProvider.GetFeaturedProductsAsync();

        var model = new AdminDashboardViewModel
        {
            RecentOrders = orders,
            TopProducts = products
        };

        return View(model);
    }
}
