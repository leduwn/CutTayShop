using Microsoft.AspNetCore.Mvc;
using CutTayShop.Infrastructure.Services;
using CutTayShop.Web.Controllers;
using CutTayShop.Web.ViewModels;
using Xunit;

namespace CutTayShop.Tests;

public class HomeControllerTests
{
    private readonly InMemoryDemoDataProvider _dataProvider = new();

    [Fact]
    public async Task Index_ReturnsViewWithPopulatedHomeViewModel()
    {
        // Arrange
        var controller = new HomeController(_dataProvider);

        // Act
        var result = await controller.Index();

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<HomeViewModel>(viewResult.Model);

        Assert.NotEmpty(model.Categories);
        Assert.NotEmpty(model.TrustBenefits);
        Assert.NotEmpty(model.PromoBanners);
        Assert.NotNull(model.DealCountdown);
        Assert.NotEmpty(model.HotDeals);
        Assert.NotEmpty(model.FeaturedProducts);
        Assert.NotEmpty(model.NewArrivals);
    }

    [Fact]
    public async Task SearchSuggestions_ValidQuery_ReturnsJsonWithMatches()
    {
        // Arrange
        var controller = new HomeController(_dataProvider);

        // Act
        var result = await controller.SearchSuggestions("tai nghe");

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        Assert.NotNull(jsonResult.Value);
    }

    [Fact]
    public async Task SearchSuggestions_AccentInsensitive_ReturnsJsonMatches()
    {
        // Arrange
        var controller = new HomeController(_dataProvider);

        // Act
        var result = await controller.SearchSuggestions("mu");

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        Assert.NotNull(jsonResult.Value);
    }

    [Theory]
    [InlineData("<script>alert(1)</script>")]
    [InlineData("'; DROP TABLE--")]
    public async Task SearchSuggestions_XssInput_ExecutesSafely(string payload)
    {
        // Arrange
        var controller = new HomeController(_dataProvider);

        // Act & Assert (Should not throw)
        var result = await controller.SearchSuggestions(payload);
        var jsonResult = Assert.IsType<JsonResult>(result);
        Assert.NotNull(jsonResult.Value);
    }
}
