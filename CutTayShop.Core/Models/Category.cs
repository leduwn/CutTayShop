namespace CutTayShop.Core.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string IconSvg { get; set; } = string.Empty;
    public string BgColorHex { get; set; } = string.Empty;
    public string IconColorHex { get; set; } = string.Empty;
    public int ProductCount { get; set; }
    public int SortOrder { get; set; }
}
