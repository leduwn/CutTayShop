using System.ComponentModel.DataAnnotations;
using CutTayShop.Core.Models;

namespace CutTayShop.Web.ViewModels;

public class CartPageViewModel
{
    public IReadOnlyList<Product> SuggestedProducts { get; set; } = new List<Product>();
    public IReadOnlyList<Coupon> AvailableCoupons { get; set; } = new List<Coupon>();
}

public class CheckoutFormModel
{
    [Required(ErrorMessage = "Vui lòng nhập họ và tên")]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
    [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
    public string PhoneNumber { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "Email không hợp lệ")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Vui lòng chọn Tỉnh / Thành phố")]
    public string City { get; set; } = "Hà Nội";

    [Required(ErrorMessage = "Vui lòng chọn Quận / Huyện")]
    public string District { get; set; } = string.Empty;

    [Required(ErrorMessage = "Vui lòng nhập địa chỉ nhận hàng")]
    public string Address { get; set; } = string.Empty;

    public string ShippingMethod { get; set; } = "standard"; // standard (30k), express (45k)

    public string PaymentMethod { get; set; } = "cod"; // cod, vietqr, demo_bank

    public string? Note { get; set; }

    public string? CouponCode { get; set; }
}

public class OrderSuccessViewModel
{
    public Order Order { get; set; } = new();
    public IReadOnlyList<Product> RecommendedProducts { get; set; } = new List<Product>();
}
