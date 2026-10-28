using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Route("admin/bai-viet")]
[Route("admin/blog")]
public class BlogAdminController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public BlogAdminController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        var posts = await _dataProvider.GetBlogPostsAsync();
        return View(posts);
    }
}
