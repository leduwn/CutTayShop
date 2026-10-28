using CutTayShop.Core.Models;

namespace CutTayShop.Web.ViewModels;

public class BlogIndexViewModel
{
    public IReadOnlyList<BlogPost> Posts { get; set; } = new List<BlogPost>();
    public BlogPost? FeaturedPost { get; set; }
    public string? CurrentCategory { get; set; }
    public IReadOnlyList<string> Categories { get; set; } = new List<string>();
}

public class BlogDetailViewModel
{
    public BlogPost Post { get; set; } = new();
    public IReadOnlyList<BlogPost> RecentPosts { get; set; } = new List<BlogPost>();
    public IReadOnlyList<Product> RelatedProducts { get; set; } = new List<Product>();
}
