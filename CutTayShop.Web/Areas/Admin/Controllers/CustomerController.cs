using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/khach-hang")]
[Route("admin/customers")]
public class CustomerController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public CustomerController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        var orders = await _dataProvider.GetOrdersAsync();
        return View(orders);
    }

    [HttpGet("{id:int}")]
    [HttpGet("detail/{id:int}")]
    [HttpGet("chi-tiet/{id:int}")]
    public async Task<IActionResult> Detail(int id)
    {
        var orders = await _dataProvider.GetOrdersAsync();
        return View(orders.FirstOrDefault());
    }
}
