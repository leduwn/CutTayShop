using CutTayShop.Core.Interfaces;
using CutTayShop.Core.Models;

namespace CutTayShop.Infrastructure.Services;

public class InMemoryDemoDataProvider : IDemoDataProvider
{
    private static readonly List<Category> Categories = new()
    {
        new Category
        {
            Id = 1,
            Name = "Công nghệ",
            Slug = "cong-nghe",
            BgColorHex = "#E0F2FE", // Baby Blue
            IconColorHex = "#0284C7",
            ProductCount = 124,
            SortOrder = 1,
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\" ry=\"2\"/><line x1=\"12\" y1=\"18\" x2=\"12.01\" y2=\"18\"/></svg>"
        },
        new Category
        {
            Id = 2,
            Name = "Thời trang",
            Slug = "thoi-trang",
            BgColorHex = "#FFE5DA", // Warm Peach
            IconColorHex = "#EA580C",
            ProductCount = 256,
            SortOrder = 2,
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z\"/></svg>"
        },
        new Category
        {
            Id = 3,
            Name = "Nhà cửa",
            Slug = "nha-cua",
            BgColorHex = "#E5F8DC", // Soft Green
            IconColorHex = "#16A34A",
            ProductCount = 89,
            SortOrder = 3,
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/></svg>"
        },
        new Category
        {
            Id = 4,
            Name = "Làm đẹp",
            Slug = "lam-dep",
            BgColorHex = "#FCE7F3", // Soft Pink
            IconColorHex = "#E11D48",
            ProductCount = 142,
            SortOrder = 4,
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z\"/></svg>"
        },
        new Category
        {
            Id = 5,
            Name = "Thể thao",
            Slug = "the-thao",
            BgColorHex = "#EDE9FE", // Soft Lavender
            IconColorHex = "#7C3AED",
            ProductCount = 67,
            SortOrder = 5,
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m6.5 6.5 11 11\"/><path d=\"m21 21-1-1\"/><path d=\"m3 3 1 1\"/><path d=\"m18 22 4-4\"/><path d=\"m2 6 4-4\"/><path d=\"m3 10 7-7\"/><path d=\"m14 21 7-7\"/></svg>"
        },
        new Category
        {
            Id = 6,
            Name = "Phụ kiện",
            Slug = "phu-kien",
            BgColorHex = "#FEF3C7", // Amber Soft
            IconColorHex = "#D97706",
            ProductCount = 210,
            SortOrder = 6,
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\"/><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"/><path d=\"M16 10a4 4 0 0 1-8 0\"/></svg>"
        },
        new Category
        {
            Id = 7,
            Name = "Sách & VP",
            Slug = "sach-van-phong-pham",
            BgColorHex = "#F3E8FF", // Purple Soft
            IconColorHex = "#9333EA",
            ProductCount = 98,
            SortOrder = 7,
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"/><path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"/></svg>"
        },
        new Category
        {
            Id = 8,
            Name = "Đồ chơi",
            Slug = "do-choi",
            BgColorHex = "#D1FAE5", // Mint Light
            IconColorHex = "#059669",
            ProductCount = 54,
            SortOrder = 8,
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"6\" y1=\"12\" x2=\"10\" y2=\"12\"/><line x1=\"8\" y1=\"10\" x2=\"8\" y2=\"14\"/><line x1=\"15\" y1=\"13\" x2=\"15.01\" y2=\"13\"/><line x1=\"18\" y1=\"11\" x2=\"18.01\" y2=\"11\"/><rect x=\"2\" y=\"6\" width=\"20\" height=\"12\" rx=\"6\"/></svg>"
        },
        new Category
        {
            Id = 9,
            Name = "Sức khỏe",
            Slug = "suc-khoe",
            BgColorHex = "#DCFCE7", // Emerald Soft
            IconColorHex = "#16A34A",
            ProductCount = 73,
            SortOrder = 9,
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z\"/><path d=\"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12\"/></svg>"
        },
        new Category
        {
            Id = 10,
            Name = "Hàng quốc tế",
            Slug = "hang-quoc-te",
            BgColorHex = "#E0F2FE", // Sky Light
            IconColorHex = "#2563EB",
            ProductCount = 115,
            SortOrder = 10,
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z\"/></svg>"
        }
    };

    private static readonly List<TrustBenefit> TrustBenefits = new()
    {
        new TrustBenefit
        {
            Id = 1,
            Title = "Giao hàng nhanh",
            Subtitle = "Toàn quốc 2-3 ngày, nội thành 2H",
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"1\" y=\"3\" width=\"15\" height=\"13\" rx=\"2\"/><polygon points=\"16 8 20 8 23 11 23 16 16 16 16 8\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"/><circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"/></svg>"
        },
        new TrustBenefit
        {
            Id = 2,
            Title = "Hàng chính hãng",
            Subtitle = "Cam kết 100% xuất xứ rõ ràng",
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/><polyline points=\"9 12 11 14 15 10\"/></svg>"
        },
        new TrustBenefit
        {
            Id = 3,
            Title = "Đổi trả dễ dàng",
            Subtitle = "Miễn phí đổi trả trong 7 ngày",
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/></svg>"
        },
        new TrustBenefit
        {
            Id = 4,
            Title = "Hỗ trợ 24/7",
            Subtitle = "Đội ngũ chuyên nghiệp tận tâm",
            IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"/></svg>"
        }
    };

    private static readonly List<PromoBanner> PromoBanners = new()
    {
        new PromoBanner
        {
            Id = 1,
            CategoryTitle = "Đồ công nghệ",
            PromoLabel = "Giảm đến",
            HighlightNumber = "50%",
            CtaText = "Khám phá →",
            CtaLink = "/danh-muc/cong-nghe",
            ImageUrl = "/images/products/smartwatch-promo.svg",
            BgColorHex = "#E5F8DC", // Soft Green
            DecorativeDoodleSvg = "<svg viewBox=\"0 0 40 40\" fill=\"none\"><path d=\"M10 20 Q20 5 30 20 T50 20\" stroke=\"#16A34A\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/></svg>"
        },
        new PromoBanner
        {
            Id = 2,
            CategoryTitle = "Thời trang",
            PromoLabel = "Mới nhất",
            HighlightNumber = "2026",
            CtaText = "Xem ngay →",
            CtaLink = "/danh-muc/thoi-trang",
            ImageUrl = "/images/products/cap-promo.svg",
            BgColorHex = "#FFE5DA", // Warm Peach
            DecorativeDoodleSvg = "<svg viewBox=\"0 0 32 32\" fill=\"none\"><circle cx=\"16\" cy=\"16\" r=\"12\" stroke=\"#EA580C\" stroke-width=\"2\"/><circle cx=\"12\" cy=\"14\" r=\"1.5\" fill=\"#EA580C\"/><circle cx=\"20\" cy=\"14\" r=\"1.5\" fill=\"#EA580C\"/><path d=\"M11 19 Q16 23 21 19\" stroke=\"#EA580C\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>"
        }
    };

    private static readonly List<Product> Products = new()
    {
        // Hot Deals
        new Product
        {
            Id = 1,
            Name = "Tai nghe chụp tai Studio Pro Wireless",
            Slug = "tai-nghe-chup-tai-studio-pro-wireless",
            ShortDescription = "Chống ồn chủ động ANC, âm bass sống động, thời lượng pin 40 giờ",
            Price = 1490000m,
            OriginalPrice = 2490000m,
            Rating = 4.9,
            ReviewCount = 1240,
            ImageUrl = "/images/products/headphones-pro.svg",
            CategorySlug = "cong-nghe",
            CategoryName = "Công nghệ",
            BadgeText = "Deal Hot -40%",
            InStock = true,
            IsHotDeal = true,
            IsFeatured = true,
            SoldCount = 86,
            TotalStock = 100
        },
        new Product
        {
            Id = 2,
            Name = "Đồng hồ thông minh Smartwatch Sport Fit",
            Slug = "dong-ho-thong-minh-smartwatch-sport-fit",
            ShortDescription = "Đo nhịp tim, oxy SpO2, chống nước 5ATM, màn hình AMOLED 1.4 inch",
            Price = 890000m,
            OriginalPrice = 1590000m,
            Rating = 4.8,
            ReviewCount = 850,
            ImageUrl = "/images/products/smartwatch-sport.svg",
            CategorySlug = "cong-nghe",
            CategoryName = "Công nghệ",
            BadgeText = "Deal Hot -44%",
            InStock = true,
            IsHotDeal = true,
            IsFeatured = true,
            SoldCount = 45,
            TotalStock = 50
        },
        new Product
        {
            Id = 3,
            Name = "Loa Bluetooth Mini Fabric Sound",
            Slug = "loa-bluetooth-mini-fabric-sound",
            ShortDescription = "Thiết kế bọc vải cao cấp, chống nước IPX7, âm thanh 360 độ",
            Price = 590000m,
            OriginalPrice = 990000m,
            Rating = 4.9,
            ReviewCount = 620,
            ImageUrl = "/images/products/speaker-mini.svg",
            CategorySlug = "cong-nghe",
            CategoryName = "Công nghệ",
            BadgeText = "Deal Hot -40%",
            InStock = true,
            IsHotDeal = true,
            SoldCount = 72,
            TotalStock = 80
        },
        new Product
        {
            Id = 4,
            Name = "Bình giữ nhiệt Pastel Thermo 750ml",
            Slug = "binh-giu-nhiet-pastel-thermo-750ml",
            ShortDescription = "Inox 316 y tế cao cấp, giữ nóng 12h, giữ lạnh 24h, màu pastel sang trọng",
            Price = 320000m,
            OriginalPrice = 480000m,
            Rating = 4.7,
            ReviewCount = 410,
            ImageUrl = "/images/products/bottle-thermo.svg",
            CategorySlug = "nha-cua",
            CategoryName = "Nhà cửa",
            BadgeText = "Deal Hot -33%",
            InStock = true,
            IsHotDeal = true,
            SoldCount = 29,
            TotalStock = 30
        },
        new Product
        {
            Id = 5,
            Name = "Mũ lưỡi trai Cotton Street Style 2026",
            Slug = "mu-luoi-trai-cotton-street-style-2026",
            ShortDescription = "Chất liệu 100% cotton thoáng khí, thêu nổi tỉ mỉ, form chuẩn Hàn Quốc",
            Price = 190000m,
            OriginalPrice = 350000m,
            Rating = 4.8,
            ReviewCount = 520,
            ImageUrl = "/images/products/cap-beige.svg",
            CategorySlug = "thoi-trang",
            CategoryName = "Thời trang",
            BadgeText = "Deal Hot -45%",
            InStock = true,
            IsHotDeal = true,
            SoldCount = 90,
            TotalStock = 100
        },

        // Featured & New Arrivals
        new Product
        {
            Id = 6,
            Name = "Balo chống sốc Minimalist Urban Tech",
            Slug = "balo-chong-soc-minimalist-urban-tech",
            ShortDescription = "Đựng vừa laptop 15.6 inch, vải chống nước Oxford, ngăn chia khoa học",
            Price = 650000m,
            OriginalPrice = 950000m,
            Rating = 4.9,
            ReviewCount = 380,
            ImageUrl = "/images/products/backpack-urban.svg",
            CategorySlug = "phu-kien",
            CategoryName = "Phụ kiện",
            BadgeText = "Mới 2026",
            InStock = true,
            IsFeatured = true,
            IsNewArrival = true,
            SoldCount = 34,
            TotalStock = 60
        },
        new Product
        {
            Id = 7,
            Name = "Bàn phím cơ không dây Pastel Glow RGB",
            Slug = "ban-phim-co-khong-day-pastel-glow-rgb",
            ShortDescription = "3 chế độ kết nối Bluetooth/2.4G/Type-C, gõ êm mượt, LED RGB nhẹ nhàng",
            Price = 1250000m,
            OriginalPrice = 1850000m,
            Rating = 5.0,
            ReviewCount = 290,
            ImageUrl = "/images/products/keyboard-pastel.svg",
            CategorySlug = "cong-nghe",
            CategoryName = "Công nghệ",
            BadgeText = "Bán chạy",
            InStock = true,
            IsFeatured = true,
            IsNewArrival = true,
            SoldCount = 58,
            TotalStock = 70
        },
        new Product
        {
            Id = 8,
            Name = "Đèn ngủ mặt trăng cảm ứng chạm 3D",
            Slug = "den-ngu-mat-trang-cam-ung-cham-3d",
            ShortDescription = "3 màu ánh sáng ấm dịu, đế gỗ sồi tự nhiên, sạc pin tích điện tiện lợi",
            Price = 260000m,
            OriginalPrice = 390000m,
            Rating = 4.8,
            ReviewCount = 180,
            ImageUrl = "/images/products/lamp-moon.svg",
            CategorySlug = "nha-cua",
            CategoryName = "Nhà cửa",
            BadgeText = "Ưa chuộng",
            InStock = true,
            IsFeatured = true,
            IsNewArrival = true,
            SoldCount = 42,
            TotalStock = 50
        },
        new Product
        {
            Id = 9,
            Name = "Áo Hoodie form rộng Cotton Blend Organic",
            Slug = "ao-hoodie-form-rong-cotton-blend-organic",
            ShortDescription = "Định lượng 380gsm dày dặn ấm áp, phong cách trẻ trung năng động",
            Price = 420000m,
            OriginalPrice = 650000m,
            Rating = 4.7,
            ReviewCount = 490,
            ImageUrl = "/images/products/hoodie-organic.svg",
            CategorySlug = "thoi-trang",
            CategoryName = "Thời trang",
            BadgeText = "-35%",
            InStock = true,
            IsFeatured = true,
            IsNewArrival = false,
            SoldCount = 112,
            TotalStock = 150
        },
        new Product
        {
            Id = 10,
            Name = "Giày Sneaker Retro Chunky Sole CutTay",
            Slug = "giay-sneaker-retro-chunky-sole-cuttay",
            ShortDescription = "Đế êm đệm khí bồng bềnh, phối màu pastel tinh tế, cực dễ phối đồ",
            Price = 790000m,
            OriginalPrice = 1190000m,
            Rating = 4.9,
            ReviewCount = 670,
            ImageUrl = "/images/products/sneaker-retro.svg",
            CategorySlug = "thoi-trang",
            CategoryName = "Thời trang",
            BadgeText = "Hot Trend",
            InStock = true,
            IsFeatured = true,
            IsNewArrival = true,
            SoldCount = 88,
            TotalStock = 100
        }
    };

    public Task<IReadOnlyList<Category>> GetCategoriesAsync() =>
        Task.FromResult<IReadOnlyList<Category>>(Categories.OrderBy(c => c.SortOrder).ToList());

    public Task<IReadOnlyList<Product>> GetHotDealsAsync() =>
        Task.FromResult<IReadOnlyList<Product>>(Products.Where(p => p.IsHotDeal).ToList());

    public Task<IReadOnlyList<Product>> GetFeaturedProductsAsync() =>
        Task.FromResult<IReadOnlyList<Product>>(Products.Where(p => p.IsFeatured).ToList());

    public Task<IReadOnlyList<Product>> GetNewArrivalsAsync() =>
        Task.FromResult<IReadOnlyList<Product>>(Products.Where(p => p.IsNewArrival).ToList());

    public Task<IReadOnlyList<TrustBenefit>> GetTrustBenefitsAsync() =>
        Task.FromResult<IReadOnlyList<TrustBenefit>>(TrustBenefits);

    public Task<IReadOnlyList<PromoBanner>> GetPromoBannersAsync() =>
        Task.FromResult<IReadOnlyList<PromoBanner>>(PromoBanners);

    public Task<DealCountdown> GetDealCountdownAsync() =>
        Task.FromResult(new DealCountdown
        {
            EndTime = DateTime.UtcNow.Date.AddDays(2).AddHours(23).AddMinutes(59),
            Title = "Deal hot hôm nay",
            Subtitle = "Số lượng có hạn — Đừng bỏ lỡ!",
            ExpiredMessage = "Phiên ưu đãi đã kết thúc. Hẹn gặp lại quý khách vào phiên 12:00!"
        });

    public Task<IReadOnlyList<Product>> GetProductsByCategoryAsync(string categorySlug) =>
        Task.FromResult<IReadOnlyList<Product>>(Products.Where(p => p.CategorySlug.Equals(categorySlug, StringComparison.OrdinalIgnoreCase)).ToList());

    public Task<Product?> GetProductBySlugAsync(string slug) =>
        Task.FromResult(Products.FirstOrDefault(p => p.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase)));

    public Task<IReadOnlyList<Product>> SearchProductsAsync(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            return Task.FromResult<IReadOnlyList<Product>>(Products);

        var lowerQuery = query.Trim().ToLowerInvariant();
        var matches = Products.Where(p =>
            p.Name.ToLowerInvariant().Contains(lowerQuery) ||
            p.CategoryName.ToLowerInvariant().Contains(lowerQuery) ||
            p.ShortDescription.ToLowerInvariant().Contains(lowerQuery)).ToList();

        return Task.FromResult<IReadOnlyList<Product>>(matches);
    }
}
