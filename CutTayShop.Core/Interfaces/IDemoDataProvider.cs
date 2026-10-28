using CutTayShop.Core.Models;

namespace CutTayShop.Core.Interfaces;

public interface IDemoDataProvider
{
    Task<IReadOnlyList<Category>> GetCategoriesAsync();
    Task<Category?> GetCategoryBySlugAsync(string slug);
    Task<IReadOnlyList<Product>> GetHotDealsAsync();
    Task<IReadOnlyList<Product>> GetFeaturedProductsAsync();
    Task<IReadOnlyList<Product>> GetNewArrivalsAsync();
    Task<IReadOnlyList<TrustBenefit>> GetTrustBenefitsAsync();
    Task<IReadOnlyList<PromoBanner>> GetPromoBannersAsync();
    Task<DealCountdown> GetDealCountdownAsync();
    Task<IReadOnlyList<Product>> GetProductsByCategoryAsync(string categorySlug);
    Task<Product?> GetProductBySlugAsync(string slug);
    Task<IReadOnlyList<Product>> SearchProductsAsync(string query);
    Task<CatalogResult> GetCatalogAsync(CatalogFilterParameters filters);
    Task<IReadOnlyList<Product>> GetRelatedProductsAsync(int productId, int count = 4);
    Task<IReadOnlyList<string>> GetAllBrandsAsync();
}
