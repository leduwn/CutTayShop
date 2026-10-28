using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers;

public class ErrorController : Controller
{
    [HttpGet("404")]
    public IActionResult NotFound404()
    {
        Response.StatusCode = 404;
        return View("~/Views/Shared/Error404.cshtml");
    }

    [HttpGet("403")]
    public IActionResult AccessDenied403()
    {
        Response.StatusCode = 403;
        return View("~/Views/Shared/Error403.cshtml");
    }

    [HttpGet("500")]
    public IActionResult Internal500()
    {
        Response.StatusCode = 500;
        return View("~/Views/Shared/Error500.cshtml");
    }

    [HttpGet("session-expired")]
    public IActionResult SessionExpired()
    {
        return View("~/Views/Shared/SessionExpired.cshtml");
    }

    [HttpGet("bao-tri")]
    public IActionResult Maintenance()
    {
        Response.StatusCode = 503;
        return View("~/Views/Shared/Maintenance.cshtml");
    }
}
