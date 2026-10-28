using CutTayShop.Core.Interfaces;
using CutTayShop.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers;

[Route("tai-khoan")]
public class AccountController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public AccountController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        var orders = await _dataProvider.GetOrdersAsync();
        var coupons = await _dataProvider.GetCouponsAsync();

        var model = new AccountDashboardViewModel
        {
            RecentOrders = orders,
            Vouchers = coupons
        };

        return View(model);
    }

    [HttpGet("ho-so")]
    public IActionResult Profile()
    {
        return View();
    }

    [HttpPost("ho-so")]
    [ValidateAntiForgeryToken]
    public IActionResult Profile(string fullName, string phone, string email, string birthday)
    {
        ViewBag.SuccessMessage = "Cập nhật thông tin hồ sơ cá nhân thành công!";
        return View();
    }

    [HttpGet("dia-chi")]
    public IActionResult Addresses()
    {
        var addresses = new List<UserAddress>
        {
            new()
            {
                Id = 1,
                ReceiverName = "Nguyễn Văn An",
                PhoneNumber = "0988 123 456",
                FullAddress = "Số 18, Ngõ 45 phố Nguyễn Đình Chiểu, Phường Lê Đại Hành, Quận Hai Bà Trưng, Hà Nội",
                IsDefault = true,
                Label = "Nhà riêng"
            },
            new()
            {
                Id = 2,
                ReceiverName = "Nguyễn Văn An (Văn phòng)",
                PhoneNumber = "0988 123 456",
                FullAddress = "Tầng 8, Tòa nhà TechnoSoft, Duy Tân, Cầu Giấy, Hà Nội",
                IsDefault = false,
                Label = "Văn phòng"
            }
        };

        return View(addresses);
    }

    [HttpGet("don-hang")]
    public async Task<IActionResult> Orders([FromQuery] string? tab)
    {
        var orders = await _dataProvider.GetOrdersAsync();
        ViewBag.CurrentTab = tab ?? "all";
        return View(orders);
    }

    [HttpGet("don-hang/{code}")]
    public async Task<IActionResult> OrderDetail(string code)
    {
        var order = await _dataProvider.GetOrderByCodeAsync(code);
        if (order == null)
        {
            return NotFound();
        }

        return View(order);
    }

    [HttpGet("cuttayshop-plus")]
    public IActionResult Loyalty()
    {
        return View();
    }

    [HttpGet("ma-giam-gia")]
    public async Task<IActionResult> Vouchers()
    {
        var coupons = await _dataProvider.GetCouponsAsync();
        return View(coupons);
    }

    [HttpGet("doi-mat-khau")]
    public IActionResult ChangePassword()
    {
        return View();
    }

    [HttpPost("doi-mat-khau")]
    [ValidateAntiForgeryToken]
    public IActionResult ChangePassword(string currentPassword, string newPassword, string confirmPassword)
    {
        if (newPassword != confirmPassword)
        {
            ViewBag.ErrorMessage = "Mật khẩu xác nhận không khớp";
            return View();
        }

        ViewBag.SuccessMessage = "Đổi mật khẩu thành công!";
        return View();
    }

    [HttpGet("danh-gia")]
    public async Task<IActionResult> Reviews()
    {
        var products = await _dataProvider.GetFeaturedProductsAsync();
        return View(products);
    }
}
