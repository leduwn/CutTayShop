using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/cai-dat")]
[Route("admin/settings")]
public class SettingController : Controller
{
    [HttpGet("")]
    public IActionResult Index() => View();
}
