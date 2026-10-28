using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers.Api;

[ApiController]
[Route("api/v1/cart")]
public class CartApiController : ControllerBase
{
    private readonly IDemoDataProvider _dataProvider;

    public CartApiController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    public class AddToCartRequest
    {
        public int ProductId { get; set; }
        public int? VariantId { get; set; }
        public int Quantity { get; set; } = 1;
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddToCart([FromBody] AddToCartRequest req)
    {
        var products = await _dataProvider.GetAllProductsAsync();
        var product = products.FirstOrDefault(p => p.Id == req.ProductId);
        if (product == null)
        {
            return NotFound(new { success = false, message = "Sản phẩm không tồn tại" });
        }

        return Ok(new
        {
            success = true,
            message = $"Đã thêm \"{product.Name}\" vào giỏ hàng thành công!",
            product = new
            {
                product.Id,
                product.Name,
                product.Slug,
                product.Price,
                product.ImageUrl
            }
        });
    }

    public class ApplyCouponRequest
    {
        public string Code { get; set; } = string.Empty;
    }

    [HttpPost("apply-coupon")]
    public async Task<IActionResult> ApplyCoupon([FromBody] ApplyCouponRequest req)
    {
        var coupons = await _dataProvider.GetCouponsAsync();
        var coupon = coupons.FirstOrDefault(c => c.Code.Equals(req.Code?.Trim(), StringComparison.OrdinalIgnoreCase));

        if (coupon == null)
        {
            return BadRequest(new { success = false, message = "Mã giảm giá không hợp lệ hoặc đã hết hạn" });
        }

        return Ok(new
        {
            success = true,
            message = $"Áp dụng thành công mã {coupon.Code}: {coupon.Title}",
            discountAmount = coupon.DiscountAmount,
            discountPercent = coupon.DiscountPercent,
            minOrderValue = coupon.MinOrderValue
        });
    }
}
