using CutTayShop.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CutTayShop.Web.Controllers.Api;

[ApiController]
[Route("api/v1/ai")]
public class AiAssistantController : ControllerBase
{
    private readonly IDemoDataProvider _dataProvider;

    public AiAssistantController(IDemoDataProvider dataProvider)
    {
        _dataProvider = dataProvider;
    }

    public class AiChatRequest
    {
        public string Message { get; set; } = string.Empty;
    }

    [HttpPost("chat")]
    public async Task<IActionResult> Query([FromBody] AiChatRequest req)
    {
        var msg = req.Message?.Trim().ToLowerInvariant() ?? "";
        string reply;
        object? suggestions = null;

        if (msg.Contains("tai nghe") || msg.Contains("âm thanh") || msg.Contains("headphone"))
        {
            var p = await _dataProvider.GetProductBySlugAsync("tai-nghe-chup-tai-studio-pro-wireless");
            reply = "CutTay AI gợi ý bạn mẫu **Tai nghe Studio Pro Wireless** chống ồn chủ động ANC 40h pin, đang có ưu đãi giảm 40% chỉ 1.490.000đ!";
            if (p != null) suggestions = new[] { new { p.Name, p.Slug, p.Price, p.ImageUrl } };
        }
        else if (msg.Contains("mũ") || msg.Contains("thời trang") || msg.Contains("hoodie"))
        {
            var p = await _dataProvider.GetProductBySlugAsync("mu-luoi-trai-cotton-street-style-2026");
            reply = "Đối với phong cách dạo phố trẻ trung, **Mũ lưỡi trai Cotton Street Style 2026** màu Be Vintage đang là best-seller tuần này của CutTayShop!";
            if (p != null) suggestions = new[] { new { p.Name, p.Slug, p.Price, p.ImageUrl } };
        }
        else if (msg.Contains("ship") || msg.Contains("giao hàng") || msg.Contains("vận chuyển"))
        {
            reply = "CutTayShop hỗ trợ **Giao hàng hỏa tốc 2H** tại nội thành Hà Nội & TP.HCM, và 2-3 ngày toàn quốc. Đơn từ 250.000đ nhập mã `FREESHIP50` được miễn phí ship bạn nhé!";
        }
        else
        {
            reply = "Xin chào! Tôi là CutTay AI - Trợ lý mua sắm thông minh. Bạn có thể hỏi tôi về gợi ý quà tặng, kiểm tra deal hot hôm nay hoặc chính sách đổi trả 7 ngày!";
        }

        return Ok(new
        {
            reply,
            suggestions
        });
    }
}
