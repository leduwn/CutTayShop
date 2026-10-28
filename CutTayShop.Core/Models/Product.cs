namespace CutTayShop.Core.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal OriginalPrice { get; set; }
    public int DiscountPercent => OriginalPrice > Price && OriginalPrice > 0
        ? (int)Math.Round((OriginalPrice - Price) / OriginalPrice * 100)
        : 0;
    public double Rating { get; set; }
    public int ReviewCount { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string SecondaryImageUrl { get; set; } = string.Empty;
    public string CategorySlug { get; set; } = string.Empty;
    public string CategoryName { get; set; } = string.Empty;
    public string? BadgeText { get; set; }
    public bool InStock { get; set; } = true;
    public bool IsHotDeal { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsNewArrival { get; set; }
    public int SoldCount { get; set; }
    public int TotalStock { get; set; } = 100;
}
