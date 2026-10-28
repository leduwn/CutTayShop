using CutTayShop.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers;

public class AuthController : Controller
{
    [HttpGet("dang-nhap")]
    public IActionResult Login(string? returnUrl)
    {
        var model = new LoginViewModel { ReturnUrl = returnUrl };
        return View(model);
    }

    [HttpPost("dang-nhap")]
    [ValidateAntiForgeryToken]
    public IActionResult Login(LoginViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        // Demo login behavior: Validates demo credentials and redirects to account dashboard or returnUrl
        if (!string.IsNullOrWhiteSpace(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl))
        {
            return Redirect(model.ReturnUrl);
        }

        return RedirectToAction("Index", "Account");
    }

    [HttpGet("dang-ky")]
    public IActionResult Register()
    {
        return View(new RegisterViewModel());
    }

    [HttpPost("dang-ky")]
    [ValidateAntiForgeryToken]
    public IActionResult Register(RegisterViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        TempData["RegisterSuccess"] = "Đăng ký tài khoản thành công! Bạn nhận được voucher chào mừng CUTTAYNEW 20.000đ.";
        return RedirectToAction("Login");
    }

    [HttpGet("quen-mat-khau")]
    public IActionResult ForgotPassword()
    {
        return View(new ForgotPasswordViewModel());
    }

    [HttpPost("quen-mat-khau")]
    [ValidateAntiForgeryToken]
    public IActionResult ForgotPassword(ForgotPasswordViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        ViewBag.SuccessMessage = $"Hệ thống đã ghi nhận yêu cầu cho email: {model.Email}. (Trong chế độ Demo, bạn có thể bấm liên kết đặt lại mật khẩu bên dưới).";
        ViewBag.DemoResetLink = "/dat-lai-mat-khau?token=DEMO-RESET-TOKEN-12345";
        return View(model);
    }

    [HttpGet("dat-lai-mat-khau")]
    public IActionResult ResetPassword(string? token)
    {
        var model = new ResetPasswordViewModel { Token = token ?? "DEMO-TOKEN" };
        return View(model);
    }

    [HttpPost("dat-lai-mat-khau")]
    [ValidateAntiForgeryToken]
    public IActionResult ResetPassword(ResetPasswordViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        TempData["SuccessMessage"] = "Đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.";
        return RedirectToAction("Login");
    }

    [HttpGet("xac-minh-email")]
    public IActionResult VerifyEmail()
    {
        return View();
    }

    [HttpPost("dang-xuat")]
    [ValidateAntiForgeryToken]
    public IActionResult Logout()
    {
        return RedirectToAction("Index", "Home");
    }

    [HttpGet("dang-nhap-google")]
    public IActionResult ExternalLogin()
    {
        // Demo external login redirect
        TempData["AuthNotice"] = "Đăng nhập Google Demo thành công!";
        return RedirectToAction("Index", "Account");
    }
}
