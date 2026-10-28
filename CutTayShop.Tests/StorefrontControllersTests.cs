using CutTayShop.Core.Models;
using CutTayShop.Infrastructure.Services;
using CutTayShop.Web.Controllers;
using CutTayShop.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace CutTayShop.Tests;

public class StorefrontControllersTests
{
    private readonly InMemoryDemoDataProvider _dataProvider = new();

    [Fact]
    public async Task PromotionController_FlashSale_ReturnsViewModelWithDealsAndCountdown()
    {
        var controller = new PromotionController(_dataProvider);
        var result = await controller.FlashSale();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<FlashSaleViewModel>(viewResult.Model);
        Assert.NotNull(model.Countdown);
        Assert.NotEmpty(model.Deals);
        Assert.NotEmpty(model.Categories);
    }

    [Fact]
    public async Task PromotionController_Index_ReturnsCouponsAndBanners()
    {
        var controller = new PromotionController(_dataProvider);
        var result = await controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<PromotionIndexViewModel>(viewResult.Model);
        Assert.NotEmpty(model.Coupons);
        Assert.NotEmpty(model.HotDeals);
        Assert.NotEmpty(model.Banners);
    }

    [Fact]
    public async Task WishlistController_Index_ReturnsFeaturedProducts()
    {
        var controller = new WishlistController(_dataProvider);
        var result = await controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IReadOnlyList<Product>>(viewResult.Model);
        Assert.NotEmpty(model);
    }

    [Fact]
    public async Task CompareController_Index_ReturnsAllProducts()
    {
        var controller = new CompareController(_dataProvider);
        var result = await controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IReadOnlyList<Product>>(viewResult.Model);
        Assert.NotEmpty(model);
    }

    [Fact]
    public async Task CartController_Index_ReturnsCartPageViewModel()
    {
        var controller = new CartController(_dataProvider);
        var result = await controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<CartPageViewModel>(viewResult.Model);
        Assert.NotEmpty(model.SuggestedProducts);
        Assert.NotEmpty(model.AvailableCoupons);
    }

    [Fact]
    public async Task CheckoutController_Index_ReturnsEmptyForm()
    {
        var controller = new CheckoutController(_dataProvider);
        var result = await controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        Assert.IsType<CheckoutFormModel>(viewResult.Model);
    }

    [Fact]
    public async Task CheckoutController_ProcessOrder_ValidModel_RedirectsToOrderSuccess()
    {
        var controller = new CheckoutController(_dataProvider);
        var form = new CheckoutFormModel
        {
            FullName = "Nguyễn Văn Test",
            PhoneNumber = "0988123456",
            Address = "Số 1 Đường Test",
            City = "Hà Nội",
            District = "Hai Bà Trưng",
            PaymentMethod = "cod"
        };

        var result = await controller.ProcessOrder(form);
        var redirectResult = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal("OrderSuccess", redirectResult.ActionName);
        Assert.NotNull(redirectResult.RouteValues?["code"]);
    }

    [Fact]
    public async Task CheckoutController_OrderSuccess_ReturnsOrderSuccessViewModel()
    {
        var controller = new CheckoutController(_dataProvider);
        var result = await controller.OrderSuccess("CTS-2026-88910", "Nguyễn Văn An", "0988123456", "Hà Nội", "cod");

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<OrderSuccessViewModel>(viewResult.Model);
        Assert.NotNull(model.Order);
        Assert.Equal("CTS-2026-88910", model.Order.OrderCode);
    }

    [Fact]
    public async Task OrderController_Tracking_WithValidCode_ReturnsOrder()
    {
        var controller = new OrderController(_dataProvider);
        var result = await controller.Tracking("CTS-2026-88910", null);

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<OrderTrackingViewModel>(viewResult.Model);
        Assert.True(model.HasSearched);
        Assert.NotNull(model.Order);
        Assert.Equal("CTS-2026-88910", model.Order.OrderCode);
    }

    [Fact]
    public async Task OrderController_Tracking_WithInvalidCode_SetsErrorMessage()
    {
        var controller = new OrderController(_dataProvider);
        var result = await controller.Tracking("CTS-INVALID-9999", null);

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<OrderTrackingViewModel>(viewResult.Model);
        Assert.True(model.HasSearched);
        Assert.Null(model.Order);
        Assert.NotNull(model.ErrorMessage);
    }

    [Fact]
    public async Task BlogController_Index_ReturnsPostsAndFeatured()
    {
        var controller = new BlogController(_dataProvider);
        var result = await controller.Index(null);

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<BlogIndexViewModel>(viewResult.Model);
        Assert.NotEmpty(model.Posts);
        Assert.NotNull(model.FeaturedPost);
    }

    [Fact]
    public async Task BlogController_Detail_ValidSlug_ReturnsPost()
    {
        var controller = new BlogController(_dataProvider);
        var result = await controller.Detail("top-5-setup-goc-lam-viec-toi-gian-2026");

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<BlogDetailViewModel>(viewResult.Model);
        Assert.NotNull(model.Post);
        Assert.Equal("top-5-setup-goc-lam-viec-toi-gian-2026", model.Post.Slug);
    }

    [Fact]
    public async Task BlogController_Detail_InvalidSlug_ReturnsNotFound()
    {
        var controller = new BlogController(_dataProvider);
        var result = await controller.Detail("bai-viet-khong-ton-tai");

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public void ContentController_StaticPages_ReturnViews()
    {
        var controller = new ContentController();
        Assert.IsType<ViewResult>(controller.About());
        Assert.IsType<ViewResult>(controller.Contact());
        Assert.IsType<ViewResult>(controller.FAQ());
        Assert.IsType<ViewResult>(controller.ReturnPolicy());
        Assert.IsType<ViewResult>(controller.ShippingPolicy());
        Assert.IsType<ViewResult>(controller.PrivacyPolicy());
        Assert.IsType<ViewResult>(controller.Terms());
        Assert.IsType<ViewResult>(controller.Warranty());
        Assert.IsType<ViewResult>(controller.PaymentMethods());
        Assert.IsType<ViewResult>(controller.Stores());
        Assert.IsType<ViewResult>(controller.Careers());
    }

    [Fact]
    public void ErrorController_ErrorPages_ReturnCorrectStatusCodes()
    {
        var controller = new ErrorController();
        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext()
        };

        var res404 = controller.NotFound404();
        Assert.IsType<ViewResult>(res404);
        Assert.Equal(404, controller.Response.StatusCode);

        var res403 = controller.AccessDenied403();
        Assert.IsType<ViewResult>(res403);
        Assert.Equal(403, controller.Response.StatusCode);

        var res500 = controller.Internal500();
        Assert.IsType<ViewResult>(res500);
        Assert.Equal(500, controller.Response.StatusCode);

        var resExpired = controller.SessionExpired();
        Assert.IsType<ViewResult>(resExpired);

        var resMaint = controller.Maintenance();
        Assert.IsType<ViewResult>(resMaint);
    }
}
