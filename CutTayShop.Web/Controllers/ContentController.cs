using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers;

public class ContentController : Controller
{
    [HttpGet("ve-chung-toi")]
    [HttpGet("gioi-thieu")]
    public IActionResult About() => View();

    [HttpGet("lien-he")]
    public IActionResult Contact() => View();

    [HttpPost("lien-he")]
    [ValidateAntiForgeryToken]
    public IActionResult Contact(string fullName, string email, string phone, string message)
    {
        ViewBag.SuccessMessage = "Cảm ơn bạn đã liên hệ! CutTayShop sẽ phản hồi trong vòng 24 giờ.";
        return View();
    }

    [HttpGet("faq")]
    [HttpGet("huong-dan-mua-hang")]
    public IActionResult FAQ() => View();

    [HttpGet("chinh-sach/doi-tra")]
    [HttpGet("chinh-sach-doi-tra")]
    public IActionResult ReturnPolicy() => View();

    [HttpGet("chinh-sach/giao-hang")]
    [HttpGet("chinh-sach-giao-hang")]
    [HttpGet("chinh-sach-van-chuyen")]
    public IActionResult ShippingPolicy() => View();

    [HttpGet("chinh-sach/bao-mat")]
    [HttpGet("chinh-sach-bao-mat")]
    [HttpGet("bao-mat")]
    public IActionResult PrivacyPolicy() => View();

    [HttpGet("chinh-sach/dieu-khoan")]
    [HttpGet("dieu-khoan")]
    public IActionResult Terms() => View();

    [HttpGet("chinh-sach-bao-hanh")]
    public IActionResult Warranty() => View();

    [HttpGet("phuong-thuc-thanh-toan")]
    public IActionResult PaymentMethods() => View();

    [HttpGet("he-thong-cua-hang")]
    public IActionResult Stores() => View();

    [HttpGet("tuyen-dung")]
    public IActionResult Careers() => View();
}
