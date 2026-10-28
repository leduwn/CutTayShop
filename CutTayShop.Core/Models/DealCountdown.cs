namespace CutTayShop.Core.Models;

public class DealCountdown
{
    public DateTime EndTime { get; set; }
    public string Title { get; set; } = "Deal hot hôm nay";
    public string Subtitle { get; set; } = "Số lượng có hạn — Đừng bỏ lỡ!";
    public string ExpiredMessage { get; set; } = "Phiên ưu đãi đã kết thúc. Hẹn gặp lại quý khách vào phiên 12:00!";
}
