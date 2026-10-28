namespace CutTayShop.Core.Models;

public class CatalogResult
{
    public IReadOnlyList<Product> Products { get; set; } = Array.Empty<Product>();
    public int TotalItems { get; set; }
    public int CurrentPage { get; set; } = 1;
    public int PageSize { get; set; } = 12;

    private int _totalPages;
    public int TotalPages
    {
        get => _totalPages > 0 ? _totalPages : (PageSize > 0 ? (int)Math.Ceiling((double)TotalItems / PageSize) : 0);
        set => _totalPages = value;
    }

    public IReadOnlyList<string> AvailableBrands { get; set; } = Array.Empty<string>();
    public IReadOnlyList<Category> AvailableCategories { get; set; } = Array.Empty<Category>();
    public Category? CurrentCategory { get; set; }
}
