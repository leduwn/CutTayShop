using CutTayShop.Core.Models;

namespace CutTayShop.Web.ViewModels;

public class AdminDashboardViewModel
{
    public decimal TodayRevenue { get; set; } = 48500000m;
    public int TodayOrders { get; set; } = 38;
    public int TotalCustomers { get; set; } = 1420;
    public int LowStockCount { get; set; } = 4;
    public IReadOnlyList<Order> RecentOrders { get; set; } = new List<Order>();
    public IReadOnlyList<Product> TopProducts { get; set; } = new List<Product>();
}

public class AdminProductEditViewModel
{
    public Product Product { get; set; } = new();
    public IReadOnlyList<Category> Categories { get; set; } = new List<Category>();
    public bool IsNew { get; set; }
}
