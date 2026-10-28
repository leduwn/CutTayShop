using System.Security.Cryptography;
using CutTayShop.Core.Interfaces;
using CutTayShop.Core.Models;
using CutTayShop.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers;

public class CheckoutController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public CheckoutController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("thanh-toan")]
    public async Task<IActionResult> Index()
    {
        var model = new CheckoutFormModel();
        return View(model);
    }

    [HttpPost("thanh-toan")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ProcessOrder(CheckoutFormModel model)
    {
        if (!ModelState.IsValid)
        {
            return View("Index", model);
        }

        // Generate demo order code
        var randomNum = RandomNumberGenerator.GetInt32(10000, 99999);
        var orderCode = $"CTS-2026-{randomNum}";

        // Redirect to Order Success screen
        return RedirectToAction("OrderSuccess", new
        {
            code = orderCode,
            name = model.FullName,
            phone = model.PhoneNumber,
            addr = $"{model.Address}, {model.District}, {model.City}",
            pay = model.PaymentMethod
        });
    }

    [HttpGet("dat-hang-thanh-cong")]
    public async Task<IActionResult> OrderSuccess(string code, string? name, string? phone, string? addr, string? pay)
    {
        var order = await _dataProvider.GetOrderByCodeAsync(code);
        if (order == null)
        {
            order = new Order
            {
                OrderCode = string.IsNullOrWhiteSpace(code) ? "CTS-2026-DEMO" : code,
                CustomerName = name ?? "Khách hàng CutTayShop",
                PhoneNumber = phone ?? "0988 123 456",
                ShippingAddress = addr ?? "Số 18, Nguyễn Đình Chiểu, Hai Bà Trưng, Hà Nội",
                PaymentMethod = pay == "vietqr" ? "Chuyển khoản VietQR" : (pay == "demo_bank" ? "Thẻ ATM / Internet Banking" : "Thanh toán khi nhận hàng (COD)"),
                CreatedAt = DateTime.Now,
                Status = "Đang xử lý",
                Subtotal = 1490000m,
                ShippingFee = 30000m,
                Discount = 20000m,
                Items = new()
                {
                    new OrderItem
                    {
                        ProductId = 1,
                        ProductName = "Tai nghe chụp tai Studio Pro Wireless",
                        ProductSlug = "tai-nghe-chup-tai-studio-pro-wireless",
                        ImageUrl = "/images/products/headphones-pro.webp",
                        VariantName = "Đen Midnight",
                        UnitPrice = 1490000m,
                        Quantity = 1
                    }
                }
            };
        }

        var recommended = await _dataProvider.GetFeaturedProductsAsync();
        var model = new OrderSuccessViewModel
        {
            Order = order,
            RecommendedProducts = recommended
        };

        return View("Success", model);
    }
}
