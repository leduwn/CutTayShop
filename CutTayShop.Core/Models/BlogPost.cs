namespace CutTayShop.Core.Models;

public class BlogPost
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string ContentHtml { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string CategorySlug { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string ReadingTime { get; set; } = "5 phút";
    public DateTime PublishedAt { get; set; }
    public List<string> Tags { get; set; } = new();
    public List<string> RelatedProductSlugs { get; set; } = new();
}
