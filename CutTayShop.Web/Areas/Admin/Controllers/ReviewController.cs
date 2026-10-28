using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/danh-gia")]
[Route("admin/reviews")]
public class ReviewController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public ReviewController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        var product = await _dataProvider.GetProductBySlugAsync("tai-nghe-chup-tai-studio-pro-wireless");
        return View(product?.Reviews ?? new List<CutTayShop.Core.Models.ProductReview>());
    }
}
