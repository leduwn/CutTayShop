namespace CutTayShop.Core.Models;

public class ProductReview
{
    public string AuthorName { get; set; } = string.Empty;
    public int Rating { get; set; }
    public DateTime Date { get; set; }
    public string Comment { get; set; } = string.Empty;
    public bool IsVerifiedPurchase { get; set; }
}
