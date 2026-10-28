using CutTayShop.Core.Models;

namespace CutTayShop.Web.ViewModels;

public class FlashSaleViewModel
{
    public DealCountdown Countdown { get; set; } = new();
    public IReadOnlyList<Product> Deals { get; set; } = new List<Product>();
    public IReadOnlyList<Category> Categories { get; set; } = new List<Category>();
}

public class PromotionIndexViewModel
{
    public IReadOnlyList<Coupon> Coupons { get; set; } = new List<Coupon>();
    public IReadOnlyList<Product> HotDeals { get; set; } = new List<Product>();
    public IReadOnlyList<PromoBanner> Banners { get; set; } = new List<PromoBanner>();
}
