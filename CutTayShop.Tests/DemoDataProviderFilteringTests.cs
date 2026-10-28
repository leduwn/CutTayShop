using CutTayShop.Core.Models;
using CutTayShop.Infrastructure.Services;
using Xunit;

namespace CutTayShop.Tests;

public class DemoDataProviderFilteringTests
{
    private readonly InMemoryDemoDataProvider _provider = new();

    [Fact]
    public async Task GetCatalogAsync_ReturnsAtLeast30Products()
    {
        var result = await _provider.GetCatalogAsync(new CatalogFilterParameters { PageSize = 100 });
        Assert.True(result.TotalItems >= 30, $"Expected at least 30 demo products, found {result.TotalItems}");
    }

    [Fact]
    public async Task GetCatalogAsync_FilterByPriceRange_ReturnsProductsWithinRange()
    {
        var minPrice = 300000m;
        var maxPrice = 800000m;

        var result = await _provider.GetCatalogAsync(new CatalogFilterParameters
        {
            MinPrice = minPrice,
            MaxPrice = maxPrice,
            PageSize = 100
        });

        Assert.NotEmpty(result.Products);
        Assert.All(result.Products, p =>
        {
            Assert.True(p.Price >= minPrice, $"Product {p.Name} price {p.Price} is less than min {minPrice}");
            Assert.True(p.Price <= maxPrice, $"Product {p.Name} price {p.Price} is greater than max {maxPrice}");
        });
    }

    [Fact]
    public async Task GetCatalogAsync_SortByPriceAsc_ReturnsAscendingOrder()
    {
        var result = await _provider.GetCatalogAsync(new CatalogFilterParameters
        {
            SortBy = "price_asc",
            PageSize = 50
        });

        Assert.NotEmpty(result.Products);
        for (int i = 0; i < result.Products.Count - 1; i++)
        {
            Assert.True(result.Products[i].Price <= result.Products[i + 1].Price,
                $"Order violated: {result.Products[i].Price} > {result.Products[i + 1].Price}");
        }
    }

    [Fact]
    public async Task GetCatalogAsync_SortByPriceDesc_ReturnsDescendingOrder()
    {
        var result = await _provider.GetCatalogAsync(new CatalogFilterParameters
        {
            SortBy = "price_desc",
            PageSize = 50
        });

        Assert.NotEmpty(result.Products);
        for (int i = 0; i < result.Products.Count - 1; i++)
        {
            Assert.True(result.Products[i].Price >= result.Products[i + 1].Price,
                $"Order violated: {result.Products[i].Price} < {result.Products[i + 1].Price}");
        }
    }

    [Fact]
    public async Task SearchProducts_AccentInsensitive_FindsMatches()
    {
        // "mu" without accent should find "Mũ lưỡi trai"
        var resultNoAccent = await _provider.GetCatalogAsync(new CatalogFilterParameters
        {
            SearchQuery = "mu"
        });

        Assert.NotEmpty(resultNoAccent.Products);

        // "ao" without accent should find "Áo"
        var resultAo = await _provider.GetCatalogAsync(new CatalogFilterParameters
        {
            SearchQuery = "ao"
        });

        Assert.NotEmpty(resultAo.Products);
    }

    [Theory]
    [InlineData("<script>alert('xss')</script>")]
    [InlineData("\"><img src=x onerror=alert(1)>")]
    [InlineData("'; DROP TABLE Products; --")]
    [InlineData("<svg/onload=alert(1)>")]
    public async Task SearchProducts_XssPayloads_HandledSafelyWithoutCrash(string payload)
    {
        var result = await _provider.GetCatalogAsync(new CatalogFilterParameters
        {
            SearchQuery = payload
        });

        Assert.NotNull(result);
        Assert.NotNull(result.Products);
        // Expect 0 or safe empty match, no unhandled exceptions
    }

    [Fact]
    public async Task GetCatalogAsync_Pagination_CalculatesCorrectPages()
    {
        var pageSize = 8;
        var page1 = await _provider.GetCatalogAsync(new CatalogFilterParameters
        {
            Page = 1,
            PageSize = pageSize
        });

        Assert.Equal(1, page1.CurrentPage);
        Assert.Equal(pageSize, page1.PageSize);
        Assert.True(page1.TotalPages >= 4);
        Assert.Equal(pageSize, page1.Products.Count);

        var page2 = await _provider.GetCatalogAsync(new CatalogFilterParameters
        {
            Page = 2,
            PageSize = pageSize
        });

        Assert.Equal(2, page2.CurrentPage);
        Assert.Equal(pageSize, page2.Products.Count);
        // Page 1 and Page 2 products should not overlap
        var page1Ids = page1.Products.Select(p => p.Id).ToHashSet();
        Assert.DoesNotContain(page2.Products[0].Id, page1Ids);
    }

    [Fact]
    public async Task GetRelatedProductsAsync_DoesNotIncludeSelf()
    {
        var targetProduct = (await _provider.GetHotDealsAsync()).First();
        var related = await _provider.GetRelatedProductsAsync(targetProduct.Id, 4);

        Assert.NotEmpty(related);
        Assert.DoesNotContain(related, p => p.Id == targetProduct.Id);
    }

    [Fact]
    public async Task GetAllBrandsAsync_ReturnsDistinctList()
    {
        var brands = await _provider.GetAllBrandsAsync();
        Assert.NotEmpty(brands);
        Assert.Equal(brands.Count, brands.Distinct(StringComparer.OrdinalIgnoreCase).Count());
    }

    [Fact]
    public async Task GetCategoryBySlugAsync_CaseInsensitiveMatch()
    {
        var catLower = await _provider.GetCategoryBySlugAsync("cong-nghe");
        var catUpper = await _provider.GetCategoryBySlugAsync("CONG-NGHE");

        Assert.NotNull(catLower);
        Assert.NotNull(catUpper);
        Assert.Equal(catLower.Id, catUpper.Id);
    }

    [Fact]
    public async Task GetCatalogAsync_RatingAndStockFilters()
    {
        var result = await _provider.GetCatalogAsync(new CatalogFilterParameters
        {
            MinRating = 4.8,
            InStockOnly = true,
            PageSize = 50
        });

        Assert.NotEmpty(result.Products);
        Assert.All(result.Products, p =>
        {
            Assert.True(p.Rating >= 4.8);
            Assert.True(p.InStock);
        });
    }
}
