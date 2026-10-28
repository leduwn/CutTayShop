using CutTayShop.Core.Interfaces;
using CutTayShop.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers;

public class BlogController : Controller
{
    private readonly IDemoDataProvider _dataProvider;

    public BlogController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("blog")]
    [HttpGet("tin-tuc")]
    public async Task<IActionResult> Index([FromQuery] string? chuDe)
    {
        var allPosts = await _dataProvider.GetBlogPostsAsync();
        var categories = allPosts.Select(p => p.Category).Distinct().ToList();

        var filteredPosts = string.IsNullOrWhiteSpace(chuDe)
            ? allPosts
            : allPosts.Where(p => p.CategorySlug.Equals(chuDe, StringComparison.OrdinalIgnoreCase)).ToList();

        var featured = allPosts.FirstOrDefault();

        var model = new BlogIndexViewModel
        {
            Posts = filteredPosts,
            FeaturedPost = featured,
            CurrentCategory = chuDe,
            Categories = categories
        };

        return View(model);
    }

    [HttpGet("blog/{slug}")]
    public async Task<IActionResult> Detail(string slug)
    {
        var post = await _dataProvider.GetBlogPostBySlugAsync(slug);
        if (post == null)
        {
            return NotFound();
        }

        var allPosts = await _dataProvider.GetBlogPostsAsync();
        var recent = allPosts.Where(p => p.Slug != slug).Take(3).ToList();

        var relatedProducts = new List<CutTayShop.Core.Models.Product>();
        foreach (var pSlug in post.RelatedProductSlugs)
        {
            var p = await _dataProvider.GetProductBySlugAsync(pSlug);
            if (p != null) relatedProducts.Add(p);
        }

        var model = new BlogDetailViewModel
        {
            Post = post,
            RecentPosts = recent,
            RelatedProducts = relatedProducts
        };

        return View(model);
    }

    [HttpGet("blog/chu-de/{slug}")]
    public IActionResult Topic(string slug)
    {
        return RedirectToAction("Index", new { chuDe = slug });
    }
}
