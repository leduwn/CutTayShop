using CutTayShop.Core.Models;

namespace CutTayShop.Web.ViewModels;

public class HomeViewModel
{
    public IReadOnlyList<Category> Categories { get; set; } = [];
    public IReadOnlyList<TrustBenefit> TrustBenefits { get; set; } = [];
    public IReadOnlyList<PromoBanner> PromoBanners { get; set; } = [];
    public DealCountdown DealCountdown { get; set; } = new();
    public IReadOnlyList<Product> HotDeals { get; set; } = [];
    public IReadOnlyList<Product> FeaturedProducts { get; set; } = [];
    public IReadOnlyList<Product> NewArrivals { get; set; } = [];
}
