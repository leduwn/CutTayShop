using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/ho-tro")]
[Route("admin/support")]
public class SupportController : Controller
{
    [HttpGet("")]
    public IActionResult Index() => View();
}
