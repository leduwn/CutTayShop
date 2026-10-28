using CutTayShop.Core.Interfaces;
using CutTayShop.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers;

public class OrderController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public OrderController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("tra-cuu-don-hang")]
    public async Task<IActionResult> Tracking([FromQuery] string? code, [FromQuery] string? phone)
    {
        var model = new OrderTrackingViewModel
        {
            QueryCode = code,
            PhoneNumber = phone
        };

        if (!string.IsNullOrWhiteSpace(code))
        {
            model.HasSearched = true;
            model.Order = await _dataProvider.GetOrderByCodeAsync(code.Trim());

            if (model.Order == null)
            {
                model.ErrorMessage = $"Không tìm thấy đơn hàng với mã \"{code}\". Vui lòng kiểm tra lại thông tin.";
            }
        }

        return View(model);
    }

    [HttpPost("tra-cuu-don-hang")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> TrackingPost(OrderTrackingViewModel input)
    {
        if (string.IsNullOrWhiteSpace(input.QueryCode))
        {
            input.ErrorMessage = "Vui lòng nhập mã đơn hàng cần tra cứu";
            return View("Tracking", input);
        }

        return RedirectToAction("Tracking", new { code = input.QueryCode.Trim(), phone = input.PhoneNumber });
    }
}
