using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/phan-quyen")]
[Route("admin/roles")]
public class RoleController : Controller
{
    [HttpGet("")]
    public IActionResult Index() => View();
}
