using CutTayShop.Infrastructure.Services;
using CutTayShop.Web.Controllers.Api;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace CutTayShop.Tests;

public class ApiControllersTests
{
    private readonly InMemoryDemoDataProvider _dataProvider = new();

    [Fact]
    public async Task CartApiController_AddToCart_ValidProduct_ReturnsSuccess()
    {
        var controller = new CartApiController(_dataProvider);
        var req = new CartApiController.AddToCartRequest { ProductId = 1, Quantity = 2 };

        var result = await controller.AddToCart(req);
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public async Task CartApiController_ApplyCoupon_ValidCode_ReturnsSuccess()
    {
        var controller = new CartApiController(_dataProvider);
        var req = new CartApiController.ApplyCouponRequest { Code = "CUTTAYNEW" };

        var result = await controller.ApplyCoupon(req);
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public async Task CartApiController_ApplyCoupon_InvalidCode_ReturnsBadRequest()
    {
        var controller = new CartApiController(_dataProvider);
        var req = new CartApiController.ApplyCouponRequest { Code = "NONEXISTENT_CODE" };

        var result = await controller.ApplyCoupon(req);
        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task WishlistApiController_Toggle_ValidProduct_ReturnsSuccess()
    {
        var controller = new WishlistApiController(_dataProvider);
        var req = new WishlistApiController.WishlistToggleRequest { ProductId = 1 };

        var result = await controller.Toggle(req);
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public async Task SearchApiController_QuickSearch_Query_ReturnsProducts()
    {
        var controller = new SearchApiController(_dataProvider);
        var result = await controller.QuickSearch("tai nghe");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public async Task AiAssistantController_Query_ReturnsReply()
    {
        var controller = new AiAssistantController(_dataProvider);
        var req = new AiAssistantController.AiChatRequest { Message = "Gợi ý tai nghe chống ồn" };

        var result = await controller.Query(req);
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }
}
