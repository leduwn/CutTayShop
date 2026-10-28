using Microsoft.AspNetCore.Mvc;
using CutTayShop.Core.Models;
using CutTayShop.Infrastructure.Services;
using CutTayShop.Web.Controllers;
using CutTayShop.Web.ViewModels;
using Xunit;

namespace CutTayShop.Tests;

public class CatalogControllerTests
{
    private readonly InMemoryDemoDataProvider _dataProvider = new();

    [Fact]
    public async Task Index_ReturnsViewWithAllProducts()
    {
        // Arrange
        var controller = new CatalogController(_dataProvider);

        // Act
        var result = await controller.Index(new CatalogFilterParameters());

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<CatalogViewModel>(viewResult.Model);
        Assert.Equal("Tất cả sản phẩm", model.Title);
        Assert.NotEmpty(model.Result.Products);
        Assert.NotNull(model.Breadcrumbs);
        Assert.Equal(2, model.Breadcrumbs.Count);
    }

    [Fact]
    public async Task Category_ValidSlug_ReturnsCategoryView()
    {
        // Arrange
        var controller = new CatalogController(_dataProvider);

        // Act
        var result = await controller.Category("cong-nghe", new CatalogFilterParameters());

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<CatalogViewModel>(viewResult.Model);
        Assert.Equal("Công nghệ", model.Title);
        Assert.NotNull(model.Category);
        Assert.Equal("cong-nghe", model.Category.Slug);
        Assert.All(model.Result.Products, p => Assert.Equal("cong-nghe", p.CategorySlug));
    }

    [Fact]
    public async Task Category_UnknownSlug_Returns404NotFound()
    {
        // Arrange
        var controller = new CatalogController(_dataProvider);

        // Act
        var result = await controller.Category("slug-khong-ton-tai-xyz-999", new CatalogFilterParameters());

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task Detail_ValidSlug_ReturnsProductDetail()
    {
        // Arrange
        var controller = new CatalogController(_dataProvider);
        var products = await _dataProvider.GetHotDealsAsync();
        Assert.NotEmpty(products);
        var testProduct = products.First();

        // Act
        var result = await controller.Detail(testProduct.Slug);

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<ProductDetailViewModel>(viewResult.Model);
        Assert.Equal(testProduct.Name, model.Product.Name);
        Assert.Equal(testProduct.Id, model.Product.Id);
        Assert.NotEmpty(model.Breadcrumbs);
    }

    [Fact]
    public async Task Detail_UnknownSlug_Returns404NotFound()
    {
        // Arrange
        var controller = new CatalogController(_dataProvider);

        // Act
        var result = await controller.Detail("san-pham-khong-co-that-99999");

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task Search_ValidQuery_ReturnsSearchResults()
    {
        // Arrange
        var controller = new CatalogController(_dataProvider);

        // Act
        var result = await controller.Search("tai nghe", new CatalogFilterParameters());

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<CatalogViewModel>(viewResult.Model);
        Assert.True(model.IsSearch);
        Assert.Contains("tai nghe", model.Title);
        Assert.NotEmpty(model.Result.Products);
    }

    [Fact]
    public async Task Search_EmptyQuery_HandlesGracefully()
    {
        // Arrange
        var controller = new CatalogController(_dataProvider);

        // Act
        var result = await controller.Search("", new CatalogFilterParameters());

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<CatalogViewModel>(viewResult.Model);
        Assert.True(model.IsSearch);
        Assert.Equal("Tìm kiếm sản phẩm", model.Title);
        Assert.NotNull(model.Result);
    }

    [Fact]
    public async Task Detail_PopulatesVariantsSpecsAndRelatedProducts()
    {
        // Arrange
        var controller = new CatalogController(_dataProvider);

        // Act
        var result = await controller.Detail("tai-nghe-chup-tai-studio-pro-wireless");

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<ProductDetailViewModel>(viewResult.Model);
        Assert.NotNull(model.Product);
        Assert.NotEmpty(model.Product.Specifications);
        Assert.NotEmpty(model.Product.Variants);
        Assert.NotEmpty(model.Product.Reviews);
        Assert.NotEmpty(model.RelatedProducts);
        Assert.All(model.RelatedProducts, p => Assert.NotEqual(model.Product.Id, p.Id));
    }
}
