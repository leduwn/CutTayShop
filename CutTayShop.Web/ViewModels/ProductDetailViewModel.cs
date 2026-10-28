using CutTayShop.Core.Models;

namespace CutTayShop.Web.ViewModels;

public class ProductDetailViewModel
{
    public Product Product { get; set; } = new();
    public IReadOnlyList<BreadcrumbItem> Breadcrumbs { get; set; } = [];
    public IReadOnlyList<Product> RelatedProducts { get; set; } = [];
    public ProductVariant? SelectedVariant { get; set; }
}
