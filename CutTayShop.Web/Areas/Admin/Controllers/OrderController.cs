using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/don-hang")]
[Route("admin/orders")]
public class OrderController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public OrderController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index([FromQuery] string? status)
    {
        var orders = await _dataProvider.GetOrdersAsync();
        if (!string.IsNullOrWhiteSpace(status))
        {
            orders = orders.Where(o => o.Status.Equals(status, StringComparison.OrdinalIgnoreCase)).ToList();
        }
        ViewBag.SelectedStatus = status;
        return View(orders);
    }

    [HttpGet("chi-tiet/{id:int}")]
    [HttpGet("detail/{id:int}")]
    public async Task<IActionResult> Detail(int id)
    {
        var orders = await _dataProvider.GetOrdersAsync();
        var order = orders.FirstOrDefault(o => o.Id == id) ?? orders.FirstOrDefault();
        if (order == null) return NotFound();

        return View(order);
    }

    [HttpGet("in-phieu/{id:int}")]
    [HttpGet("print-slip/{id:int}")]
    public async Task<IActionResult> PrintSlip(int id)
    {
        var orders = await _dataProvider.GetOrdersAsync();
        var order = orders.FirstOrDefault(o => o.Id == id) ?? orders.FirstOrDefault();
        if (order == null) return NotFound();

        return View(order);
    }
}
