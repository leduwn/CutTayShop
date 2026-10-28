using CutTayShop.Core.Models;

namespace CutTayShop.Web.ViewModels;

public class CatalogViewModel
{
    public string Title { get; set; } = "Tất cả sản phẩm";
    public string Description { get; set; } = "Khám phá bộ sưu tập phong phú đa ngành hàng chất lượng cao tại CutTayShop.";
    public IReadOnlyList<BreadcrumbItem> Breadcrumbs { get; set; } = [];
    public CatalogResult Result { get; set; } = new();
    public CatalogFilterParameters Filter { get; set; } = new();
    public Category? Category { get; set; }
    public bool IsSearch { get; set; }
    public string? SearchQuery { get; set; }
}
