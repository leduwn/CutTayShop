namespace CutTayShop.Core.Models;

public class ProductVariant
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? ColorName { get; set; }
    public string? ColorHex { get; set; }
    public string? SizeOrOption { get; set; }
    public decimal Price { get; set; }
    public decimal OriginalPrice { get; set; }
    public bool InStock { get; set; } = true;
    public string Sku { get; set; } = string.Empty;
}
