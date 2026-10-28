using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers.Api;

[ApiController]
[Route("api/v1/search")]
public class SearchApiController : ControllerBase
{
    private readonly IDemoDataProvider _dataProvider;

    public SearchApiController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    [HttpGet("quick")]
    public async Task<IActionResult> QuickSearch([FromQuery] string? q)
    {
        if (string.IsNullOrWhiteSpace(q))
        {
            return Ok(new { products = Array.Empty<object>() });
        }

        var results = await _dataProvider.SearchProductsAsync(q.Trim());
        var mapped = results.Take(6).Select(p => new
        {
            p.Id,
            p.Name,
            p.Slug,
            p.Price,
            p.OriginalPrice,
            p.ImageUrl,
            p.CategoryName,
            p.Rating
        });

        return Ok(new { products = mapped });
    }
}
