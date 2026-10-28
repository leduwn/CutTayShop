namespace CutTayShop.Core.Models;

public class OrderItem
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string ProductSlug { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string? VariantName { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice => UnitPrice * Quantity;
}

public class Order
{
    public int Id { get; set; }
    public string OrderCode { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public string ShippingMethod { get; set; } = "Giao hàng tiêu chuẩn";
    public string PaymentMethod { get; set; } = "Thanh toán khi nhận hàng (COD)";
    public string Status { get; set; } = "Chờ xác nhận"; // Chờ xác nhận, Đang xử lý, Đang giao, Đã giao, Đã hủy
    public decimal Subtotal { get; set; }
    public decimal ShippingFee { get; set; } = 30000m;
    public decimal Discount { get; set; }
    public decimal TotalAmount => Subtotal + ShippingFee - Discount;
    public string? TrackingNumber { get; set; }
    public string? Note { get; set; }
    public List<OrderItem> Items { get; set; } = new();
    public List<OrderTrackingStep> TrackingHistory { get; set; } = new();
}

public class OrderTrackingStep
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public bool IsCompleted { get; set; }
    public bool IsCurrent { get; set; }
}
