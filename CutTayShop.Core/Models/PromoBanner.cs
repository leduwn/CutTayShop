namespace CutTayShop.Core.Models;

public class PromoBanner
{
    public int Id { get; set; }
    public string CategoryTitle { get; set; } = string.Empty;
    public string PromoLabel { get; set; } = string.Empty;
    public string HighlightNumber { get; set; } = string.Empty;
    public string CtaText { get; set; } = "Khám phá →";
    public string CtaLink { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string BgColorHex { get; set; } = string.Empty;
    public string? DecorativeDoodleSvg { get; set; }
}
