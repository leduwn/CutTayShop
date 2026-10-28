namespace CutTayShop.Core.Models;

public class CatalogFilterParameters
{
    public string? CategorySlug { get; set; }
    public string? SearchQuery { get; set; }
    public string? Brand { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public double? MinRating { get; set; }
    public bool? InStockOnly { get; set; }
    public bool? OnSaleOnly { get; set; }
    public string SortBy { get; set; } = "popular";
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 12;
}
