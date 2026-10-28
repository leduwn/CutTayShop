using CutTayShop.Core.Models;
using CutTayShop.Infrastructure.Services;
using CutTayShop.Web.Controllers;
using CutTayShop.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Xunit;
using AdminOrderCtrl = CutTayShop.Web.Areas.Admin.Controllers.OrderController;
using AdminProductCtrl = CutTayShop.Web.Areas.Admin.Controllers.ProductController;
using AdminCategoryCtrl = CutTayShop.Web.Areas.Admin.Controllers.CategoryController;
using AdminDashboardCtrl = CutTayShop.Web.Areas.Admin.Controllers.DashboardController;
using AdminInventoryCtrl = CutTayShop.Web.Areas.Admin.Controllers.InventoryController;
using AdminCustomerCtrl = CutTayShop.Web.Areas.Admin.Controllers.CustomerController;
using AdminPromotionCtrl = CutTayShop.Web.Areas.Admin.Controllers.PromotionController;
using AdminBannerCtrl = CutTayShop.Web.Areas.Admin.Controllers.BannerController;
using AdminReviewCtrl = CutTayShop.Web.Areas.Admin.Controllers.ReviewController;
using AdminBlogCtrl = CutTayShop.Web.Areas.Admin.Controllers.BlogAdminController;
using AdminReportCtrl = CutTayShop.Web.Areas.Admin.Controllers.ReportController;
using AdminSettingCtrl = CutTayShop.Web.Areas.Admin.Controllers.SettingController;
using AdminSupportCtrl = CutTayShop.Web.Areas.Admin.Controllers.SupportController;
using AdminRoleCtrl = CutTayShop.Web.Areas.Admin.Controllers.RoleController;

namespace CutTayShop.Tests;

public class AccountAndAdminControllersTests
{
    private readonly InMemoryDemoDataProvider _dataProvider = new();

    private class DummyTempDataProvider : ITempDataProvider
    {
        public IDictionary<string, object> LoadTempData(HttpContext context) => new Dictionary<string, object>();
        public void SaveTempData(HttpContext context, IDictionary<string, object> values) { }
    }

    private static T SetupControllerContext<T>(T controller) where T : Controller
    {
        var httpContext = new DefaultHttpContext();
        var tempData = new TempDataDictionary(httpContext, new DummyTempDataProvider());
        controller.ControllerContext = new ControllerContext { HttpContext = httpContext };
        controller.TempData = tempData;
        return controller;
    }

    [Fact]
    public void AuthController_Login_Get_ReturnsView()
    {
        var controller = SetupControllerContext(new AuthController());
        var result = controller.Login("/tai-khoan");
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<LoginViewModel>(viewResult.Model);
        Assert.Equal("/tai-khoan", model.ReturnUrl);
    }

    [Fact]
    public void AuthController_Login_Post_Valid_RedirectsToAccount()
    {
        var controller = SetupControllerContext(new AuthController());
        var model = new LoginViewModel { Identifier = "an@gmail.com", Password = "password123" };
        var result = controller.Login(model);

        var redirectResult = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal("Index", redirectResult.ActionName);
        Assert.Equal("Account", redirectResult.ControllerName);
    }

    [Fact]
    public async Task AccountController_Index_ReturnsDashboardModel()
    {
        var controller = SetupControllerContext(new AccountController(_dataProvider));
        var result = await controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<AccountDashboardViewModel>(viewResult.Model);
        Assert.NotEmpty(model.RecentOrders);
        Assert.NotEmpty(model.Vouchers);
    }

    [Fact]
    public async Task AccountController_Orders_ReturnsOrdersList()
    {
        var controller = SetupControllerContext(new AccountController(_dataProvider));
        var result = await controller.Orders("all");

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IReadOnlyList<Order>>(viewResult.Model);
        Assert.NotEmpty(model);
    }

    [Fact]
    public async Task AccountController_OrderDetail_ValidCode_ReturnsOrder()
    {
        var controller = SetupControllerContext(new AccountController(_dataProvider));
        var result = await controller.OrderDetail("CTS-2026-88910");

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<Order>(viewResult.Model);
        Assert.Equal("CTS-2026-88910", model.OrderCode);
    }

    [Fact]
    public async Task AdminDashboardController_Index_ReturnsAdminDashboardViewModel()
    {
        var controller = SetupControllerContext(new AdminDashboardCtrl(_dataProvider));
        var result = await controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<AdminDashboardViewModel>(viewResult.Model);
        Assert.NotEmpty(model.RecentOrders);
        Assert.NotEmpty(model.TopProducts);
    }

    [Fact]
    public async Task AdminProductController_Index_ReturnsProducts()
    {
        var controller = SetupControllerContext(new AdminProductCtrl(_dataProvider));
        var result = await controller.Index(null, null);

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IReadOnlyList<Product>>(viewResult.Model);
        Assert.NotEmpty(model);
    }

    [Fact]
    public async Task AdminOrderController_Index_ReturnsOrders()
    {
        var controller = SetupControllerContext(new AdminOrderCtrl(_dataProvider));
        var result = await controller.Index(null);

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IReadOnlyList<Order>>(viewResult.Model);
        Assert.NotEmpty(model);
    }

    [Fact]
    public async Task AdminCategoryController_Index_ReturnsCategories()
    {
        var controller = SetupControllerContext(new AdminCategoryCtrl(_dataProvider));
        var result = await controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IReadOnlyList<Category>>(viewResult.Model);
        Assert.NotEmpty(model);
    }

    [Fact]
    public async Task AdminInventoryController_Index_ReturnsProducts()
    {
        var controller = SetupControllerContext(new AdminInventoryCtrl(_dataProvider));
        var result = await controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IReadOnlyList<Product>>(viewResult.Model);
        Assert.NotEmpty(model);
    }

    [Fact]
    public async Task AdminCustomerController_Index_ReturnsCustomers()
    {
        var controller = SetupControllerContext(new AdminCustomerCtrl(_dataProvider));
        var result = await controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        Assert.NotNull(viewResult.Model);
    }

    [Fact]
    public async Task AdminPromotionController_Coupons_ReturnsCoupons()
    {
        var controller = SetupControllerContext(new AdminPromotionCtrl(_dataProvider));
        var result = await controller.Coupons();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IReadOnlyList<Coupon>>(viewResult.Model);
        Assert.NotEmpty(model);
    }

    [Fact]
    public async Task AdminBannerController_Index_ReturnsBanners()
    {
        var controller = SetupControllerContext(new AdminBannerCtrl(_dataProvider));
        var result = await controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IReadOnlyList<PromoBanner>>(viewResult.Model);
        Assert.NotEmpty(model);
    }

    [Fact]
    public async Task AdminBlogAdminController_Index_ReturnsBlogPosts()
    {
        var controller = SetupControllerContext(new AdminBlogCtrl(_dataProvider));
        var result = await controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IReadOnlyList<BlogPost>>(viewResult.Model);
        Assert.NotEmpty(model);
    }

    [Fact]
    public async Task AdminReportController_Sales_ReturnsProducts()
    {
        var controller = SetupControllerContext(new AdminReportCtrl(_dataProvider));
        var result = await controller.Sales();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IReadOnlyList<Product>>(viewResult.Model);
        Assert.NotEmpty(model);
    }

    [Fact]
    public void AdminSetting_Support_Role_Controllers_ReturnViews()
    {
        var settingCtrl = SetupControllerContext(new AdminSettingCtrl());
        Assert.IsType<ViewResult>(settingCtrl.Index());

        var supportCtrl = SetupControllerContext(new AdminSupportCtrl());
        Assert.IsType<ViewResult>(supportCtrl.Index());

        var roleCtrl = SetupControllerContext(new AdminRoleCtrl());
        Assert.IsType<ViewResult>(roleCtrl.Index());
    }
}
