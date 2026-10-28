namespace CutTayShop.Web.ViewModels;

public class BreadcrumbItem
{
    public string Label { get; set; } = string.Empty;
    public string? Url { get; set; }
    public bool IsActive => string.IsNullOrEmpty(Url);
}
