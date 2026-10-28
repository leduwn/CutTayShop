using CutTayShop.Core.Models;

namespace CutTayShop.Web.ViewModels;

public class OrderTrackingViewModel
{
    public string? QueryCode { get; set; }
    public string? PhoneNumber { get; set; }
    public Order? Order { get; set; }
    public bool HasSearched { get; set; }
    public string? ErrorMessage { get; set; }
}
