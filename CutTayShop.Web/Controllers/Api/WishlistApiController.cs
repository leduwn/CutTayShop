using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers.Api;

[ApiController]
[Route("api/v1/wishlist")]
public class WishlistApiController : ControllerBase
{
    private readonly IDemoDataProvider _dataProvider;

    public WishlistApiController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    public class WishlistToggleRequest
    {
        public int ProductId { get; set; }
    }

    [HttpPost("toggle")]
    public async Task<IActionResult> Toggle([FromBody] WishlistToggleRequest req)
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
            productId = product.Id,
            productName = product.Name
        });
    }
}
