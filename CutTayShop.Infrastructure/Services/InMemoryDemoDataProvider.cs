using System.Globalization;
using System.Text;
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
            ImageUrl = "/images/categories/cat-cong-nghe.webp",
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
            ImageUrl = "/images/categories/cat-thoi-trang.webp",
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
            ImageUrl = "/images/categories/cat-nha-cua.webp",
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
            ImageUrl = "/images/categories/cat-lam-dep.webp",
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
            ImageUrl = "/images/categories/cat-the-thao.webp",
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
            ImageUrl = "/images/categories/cat-phu-kien.webp",
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
            ImageUrl = "/images/categories/cat-sach-vp.webp",
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
            ImageUrl = "/images/categories/cat-do-choi.webp",
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
            ImageUrl = "/images/categories/cat-suc-khoe.webp",
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
            ImageUrl = "/images/categories/cat-hang-quoc-te.webp",
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
            ImageUrl = "/images/compositions/promos/smartwatch-cutout.webp",
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
            ImageUrl = "/images/compositions/promos/cap-cutout.webp",
            BgColorHex = "#FFE5DA", // Warm Peach
            DecorativeDoodleSvg = "<svg viewBox=\"0 0 32 32\" fill=\"none\"><circle cx=\"16\" cy=\"16\" r=\"12\" stroke=\"#EA580C\" stroke-width=\"2\"/><circle cx=\"12\" cy=\"14\" r=\"1.5\" fill=\"#EA580C\"/><circle cx=\"20\" cy=\"14\" r=\"1.5\" fill=\"#EA580C\"/><path d=\"M11 19 Q16 23 21 19\" stroke=\"#EA580C\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>"
        }
    };

    private static readonly List<Product> Products = new()
    {
        // ======================================================================
        // 1. CÔNG NGHỆ (cong-nghe)
        // ======================================================================
        new Product
        {
            Id = 1,
            Name = "Tai nghe chụp tai Studio Pro Wireless",
            Slug = "tai-nghe-chup-tai-studio-pro-wireless",
            ShortDescription = "Chống ồn chủ động ANC, âm bass sống động, thời lượng pin 40 giờ",
            Description = "Tai nghe chụp tai Studio Pro Wireless mang lại trải nghiệm âm thanh phòng thu đỉnh cao. Với công nghệ chống ồn chủ động Hybrid ANC thế hệ mới, màng loa dynamic 40mm phủ titanium và thời lượng pin vượt trội lên tới 40 giờ, bạn có thể hoàn toàn đắm chìm trong từng giai điệu âm nhạc bất kể không gian xung quanh.",
            Price = 1490000m,
            OriginalPrice = 2490000m,
            Rating = 4.9,
            ReviewCount = 1240,
            ImageUrl = "/images/products/headphones-pro.webp",
            SecondaryImageUrl = "/images/products/headphones-pro-detail.webp",
            Brand = "Sony",
            CategorySlug = "cong-nghe",
            CategoryName = "Công nghệ",
            BadgeText = "Deal Hot -40%",
            InStock = true,
            IsHotDeal = true,
            IsFeatured = true,
            SoldCount = 86,
            TotalStock = 100,
            GalleryImages = new() { "/images/products/headphones-pro.webp", "/images/products/speaker-mini.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Sony" },
                { "Kết nối", "Bluetooth 5.3 / Jack 3.5mm" },
                { "Thời lượng pin", "40 giờ (bật ANC 30 giờ)" },
                { "Cổng sạc", "USB Type-C Fast Charge" },
                { "Trọng lượng", "250g" },
                { "Bảo hành", "12 tháng chính hãng" }
            },
            Variants = new()
            {
                new() { Id = 101, Name = "Đen Midnight", Price = 1490000m, OriginalPrice = 2490000m, Sku = "SNY-HP-BLK" },
                new() { Id = 102, Name = "Trắng Bạc Lunar", Price = 1590000m, OriginalPrice = 2590000m, Sku = "SNY-HP-SLV" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Nguyễn Minh Tuấn", Rating = 5, Date = new DateTime(2026, 2, 14), Comment = "Âm bass chắc, chống ồn ANC tốt ngoài quán cà phê, đeo lâu không bị đau vành tai.", IsVerifiedPurchase = true },
                new() { AuthorName = "Lê Hoàng Yến", Rating = 5, Date = new DateTime(2026, 1, 28), Comment = "Giao hàng cực nhanh, tai nghe hoàn thiện đẹp và sang trọng.", IsVerifiedPurchase = true }
            },
            RelatedProductSlugs = new() { "dong-ho-thong-minh-smartwatch-sport-fit", "loa-bluetooth-mini-fabric-sound", "ban-phim-co-khong-day-pastel-glow-rgb" }
        },
        new Product
        {
            Id = 2,
            Name = "Đồng hồ thông minh Smartwatch Sport Fit",
            Slug = "dong-ho-thong-minh-smartwatch-sport-fit",
            ShortDescription = "Đo nhịp tim, oxy SpO2, chống nước 5ATM, màn hình AMOLED 1.4 inch",
            Description = "Smartwatch Sport Fit đồng hành cùng bạn trên mọi cung đường luyện tập. Màn hình AMOLED 1.4 inch rực rỡ dưới ánh nắng, cảm biến quang học theo dõi nhịp tim 24/7, SpO2, giấc ngủ và hơn 100 chế độ thể thao chuyên nghiệp.",
            Price = 890000m,
            OriginalPrice = 1590000m,
            Rating = 4.8,
            ReviewCount = 850,
            ImageUrl = "/images/products/smartwatch-sport.webp",
            Brand = "Apple",
            CategorySlug = "cong-nghe",
            CategoryName = "Công nghệ",
            BadgeText = "Deal Hot -44%",
            InStock = true,
            IsHotDeal = true,
            IsFeatured = true,
            SoldCount = 45,
            TotalStock = 50,
            GalleryImages = new() { "/images/products/smartwatch-sport.webp", "/images/compositions/promos/smartwatch-cutout.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Apple" },
                { "Màn hình", "1.4 inch AMOLED 454x454" },
                { "Chống nước", "5ATM (độ sâu 50m)" },
                { "Pin", "Khoảng 10 ngày sử dụng cơ bản" },
                { "Bảo hành", "12 tháng 1 đổi 1" }
            },
            Variants = new()
            {
                new() { Id = 201, Name = "Dây Silicon Xanh Neon", Price = 890000m, OriginalPrice = 1590000m, Sku = "APL-SW-GRN" },
                new() { Id = 202, Name = "Dây Da Nâu Classic", Price = 990000m, OriginalPrice = 1690000m, Sku = "APL-SW-BRN" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Trần Đình Khang", Rating = 5, Date = new DateTime(2026, 2, 10), Comment = "Màn hình rất nét, đo bước chạy bộ chuẩn xác, thông báo Zalo mượt mà.", IsVerifiedPurchase = true }
            },
            RelatedProductSlugs = new() { "tai-nghe-chup-tai-studio-pro-wireless", "loa-bluetooth-mini-fabric-sound" }
        },
        new Product
        {
            Id = 3,
            Name = "Loa Bluetooth Mini Fabric Sound",
            Slug = "loa-bluetooth-mini-fabric-sound",
            ShortDescription = "Thiết kế bọc vải cao cấp, chống nước IPX7, âm thanh 360 độ",
            Description = "Loa Bluetooth Mini Fabric Sound nhỏ gọn trong lòng bàn tay nhưng mang lại âm lượng vang dội cùng chất âm trong trẻo. Chuẩn chống nước IPX7 hoàn hảo cho các chuyến dã ngoại, hồ bơi hay bãi biển.",
            Price = 590000m,
            OriginalPrice = 990000m,
            Rating = 4.9,
            ReviewCount = 620,
            ImageUrl = "/images/products/speaker-mini.webp",
            Brand = "Anker",
            CategorySlug = "cong-nghe",
            CategoryName = "Công nghệ",
            BadgeText = "Deal Hot -40%",
            InStock = true,
            IsHotDeal = true,
            SoldCount = 72,
            TotalStock = 80,
            GalleryImages = new() { "/images/products/speaker-mini.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Anker" },
                { "Công suất", "15W Stereo" },
                { "Chống nước", "IPX7 ngâm nước 1m" },
                { "Thời lượng pin", "16 giờ liên tục" }
            },
            Variants = new()
            {
                new() { Id = 301, Name = "Xanh Mint Pastel", Price = 590000m, OriginalPrice = 990000m, Sku = "ANK-SP-MNT" },
                new() { Id = 302, Name = "Xám Khói Titan", Price = 590000m, OriginalPrice = 990000m, Sku = "ANK-SP-GRY" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Phạm Quỳnh Như", Rating = 5, Date = new DateTime(2026, 1, 20), Comment = "Loa nhỏ xinh, âm bass ấm, nghe nhạc acoustic buổi tối rất chill.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 7,
            Name = "Bàn phím cơ không dây Pastel Glow RGB",
            Slug = "ban-phim-co-khong-day-pastel-glow-rgb",
            ShortDescription = "3 chế độ kết nối Bluetooth/2.4G/Type-C, gõ êm mượt, LED RGB nhẹ nhàng",
            Description = "Bàn phím cơ không dây Pastel Glow RGB sở hữu layout 75% gọn gàng, switch pre-lubed êm ái cùng hệ thống đèn LED RGB pastel đổi màu linh hoạt. Hỗ trợ hotswap chuyển đổi switch nhanh chóng.",
            Price = 1250000m,
            OriginalPrice = 1850000m,
            Rating = 5.0,
            ReviewCount = 290,
            ImageUrl = "/images/products/keyboard-pastel.webp",
            Brand = "CutTay Studio",
            CategorySlug = "cong-nghe",
            CategoryName = "Công nghệ",
            BadgeText = "Bán chạy",
            InStock = true,
            IsFeatured = true,
            IsNewArrival = true,
            SoldCount = 58,
            TotalStock = 70,
            GalleryImages = new() { "/images/products/keyboard-pastel.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "CutTay Studio" },
                { "Layout", "75% (84 phím)" },
                { "Switch", "Custom Linear Switch êm mượt" },
                { "Pin", "4000mAh dùng đến 2 tuần" }
            },
            Variants = new()
            {
                new() { Id = 701, Name = "Pastel Matcha Green", Price = 1250000m, OriginalPrice = 1850000m, Sku = "KB-MCH-75" },
                new() { Id = 702, Name = "Pastel Sakura Pink", Price = 1250000m, OriginalPrice = 1850000m, Sku = "KB-SKR-75" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Vũ Bảo Long", Rating = 5, Date = new DateTime(2026, 2, 22), Comment = "Gõ rất đầm tay, âm thanh thocky dễ chịu, kết nối Bluetooth với Macbook cực mượt.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 11,
            Name = "Chuột không dây công thái học Silence Pro",
            Slug = "chuot-khong-day-cong-thai-hoc-silence-pro",
            ShortDescription = "Click không ồn Silent Switch, độ nhạy 4000 DPI, ôm sát lòng bàn tay",
            Description = "Chuột không dây công thái học Silence Pro với thiết kế uốn lượn tự nhiên nâng đỡ lòng bàn tay, triệt tiêu tiếng click chuột khó chịu, phù hợp không gian văn phòng và làm việc ban đêm.",
            Price = 390000m,
            OriginalPrice = 650000m,
            Rating = 4.8,
            ReviewCount = 310,
            ImageUrl = "/images/products/mouse-wireless.webp",
            Brand = "CutTay Studio",
            CategorySlug = "cong-nghe",
            CategoryName = "Công nghệ",
            BadgeText = "-40%",
            InStock = true,
            IsFeatured = false,
            SoldCount = 65,
            TotalStock = 90,
            Specifications = new()
            {
                { "Thương hiệu", "CutTay Studio" },
                { "DPI", "1000 - 1600 - 2400 - 4000 DPI" },
                { "Kết nối", "Wireless 2.4GHz + Bluetooth 5.2" }
            }
        },

        // ======================================================================
        // 2. THỜI TRANG (thoi-trang)
        // ======================================================================
        new Product
        {
            Id = 5,
            Name = "Mũ lưỡi trai Cotton Street Style 2026",
            Slug = "mu-luoi-trai-cotton-street-style-2026",
            ShortDescription = "Chất liệu 100% cotton thoáng khí, thêu nổi tỉ mỉ, form chuẩn Hàn Quốc",
            Description = "Mũ lưỡi trai Cotton Street Style phiên bản 2026 làm từ sợi cotton dệt chéo thoáng mát, giữ form cứng cáp và viền bo mềm mại. Thêu họa tiết logo CutTay tinh xảo.",
            Price = 190000m,
            OriginalPrice = 350000m,
            Rating = 4.8,
            ReviewCount = 520,
            ImageUrl = "/images/products/cap-beige.webp",
            Brand = "CutTay Studio",
            CategorySlug = "thoi-trang",
            CategoryName = "Thời trang",
            BadgeText = "Deal Hot -45%",
            InStock = true,
            IsHotDeal = true,
            SoldCount = 90,
            TotalStock = 100,
            GalleryImages = new() { "/images/products/cap-beige.webp", "/images/compositions/promos/cap-cutout.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "CutTay Studio" },
                { "Chất liệu", "100% Khaki Cotton Wash" },
                { "Kích thước", "Freesize (vòng đầu 54-60cm)" }
            },
            Variants = new()
            {
                new() { Id = 501, Name = "Màu Be Vintage", Price = 190000m, OriginalPrice = 350000m, Sku = "CAP-BEI-01" },
                new() { Id = 502, Name = "Màu Xanh Cổ Vịt", Price = 190000m, OriginalPrice = 350000m, Sku = "CAP-GRN-02" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Đỗ Hải Đăng", Rating = 5, Date = new DateTime(2026, 2, 5), Comment = "Form mũ cứng cáp rất đẹp, đội vừa vặn, màu be phối đồ cực dễ.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 9,
            Name = "Áo Hoodie form rộng Cotton Blend Organic",
            Slug = "ao-hoodie-form-rong-cotton-blend-organic",
            ShortDescription = "Định lượng 380gsm dày dặn ấm áp, phong cách trẻ trung năng động",
            Description = "Áo hoodie nỉ bông cao cấp định lượng 380gsm với bề mặt vải chải mịn, chống xù lông và giữ ấm tuyệt vời cho những ngày se lạnh.",
            Price = 420000m,
            OriginalPrice = 650000m,
            Rating = 4.7,
            ReviewCount = 490,
            ImageUrl = "/images/products/hoodie-organic.webp",
            Brand = "Uniqlo",
            CategorySlug = "thoi-trang",
            CategoryName = "Thời trang",
            BadgeText = "-35%",
            InStock = true,
            IsFeatured = true,
            IsNewArrival = false,
            SoldCount = 112,
            TotalStock = 150,
            GalleryImages = new() { "/images/products/hoodie-organic.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Uniqlo" },
                { "Chất liệu", "80% Cotton Organic, 20% Polyester" },
                { "Định lượng", "380gsm chải bông" }
            },
            Variants = new()
            {
                new() { Id = 901, Name = "Size M - Xám Tiêu", Price = 420000m, OriginalPrice = 650000m, Sku = "HD-GRY-M" },
                new() { Id = 902, Name = "Size L - Xám Tiêu", Price = 420000m, OriginalPrice = 650000m, Sku = "HD-GRY-L" },
                new() { Id = 903, Name = "Size XL - Đen Nhám", Price = 420000m, OriginalPrice = 650000m, Sku = "HD-BLK-XL" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Bùi Thanh Trúc", Rating = 5, Date = new DateTime(2026, 1, 15), Comment = "Vải dày dặn ấm áp, form oversize mặc rất tôn dáng.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 10,
            Name = "Giày Sneaker Retro Chunky Sole CutTay",
            Slug = "giay-sneaker-retro-chunky-sole-cuttay",
            ShortDescription = "Đế êm đệm khí bồng bềnh, phối màu pastel tinh tế, cực dễ phối đồ",
            Description = "Đôi sneaker mang âm hưởng thập niên 90 với phần đế chunky hack dáng 4cm nhưng vô cùng nhẹ và đàn hồi tốt, phù hợp đi học, đi chơi và dạo phố hàng ngày.",
            Price = 790000m,
            OriginalPrice = 1190000m,
            Rating = 4.9,
            ReviewCount = 670,
            ImageUrl = "/images/products/sneaker-retro.webp",
            Brand = "Nike",
            CategorySlug = "thoi-trang",
            CategoryName = "Thời trang",
            BadgeText = "Hot Trend",
            InStock = true,
            IsFeatured = true,
            IsNewArrival = true,
            SoldCount = 88,
            TotalStock = 100,
            GalleryImages = new() { "/images/products/sneaker-retro.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Nike" },
                { "Chất liệu", "Da Microfiber cao cấp + Vải lưới thoáng khí" },
                { "Chiều cao đế", "4.0 cm" }
            },
            Variants = new()
            {
                new() { Id = 1001, Name = "Size 38 (Pastel)", Price = 790000m, OriginalPrice = 1190000m, Sku = "SNK-38" },
                new() { Id = 1002, Name = "Size 40 (Pastel)", Price = 790000m, OriginalPrice = 1190000m, Sku = "SNK-40" },
                new() { Id = 1003, Name = "Size 42 (Pastel)", Price = 790000m, OriginalPrice = 1190000m, Sku = "SNK-42" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Hoàng Nhật Linh", Rating = 5, Date = new DateTime(2026, 2, 19), Comment = "Đi êm ru chân, màu pastel bên ngoài y như ảnh, đóng gói hộp hai lớp cẩn thận.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 12,
            Name = "Túi Tote vải Canvas Eco Friendly CutTay",
            Slug = "tui-tote-vai-canvas-eco-friendly-cuttay",
            ShortDescription = "Vải canvas dệt dày 12oz, có khóa kéo và ngăn phụ chống trộm",
            Description = "Chiếc túi tote phong cách tối giản với sức chứa lớn đựng vừa tài liệu A4, laptop 14 inch cùng các vật dụng cá nhân, thân thiện với môi trường.",
            Price = 160000m,
            OriginalPrice = 250000m,
            Rating = 4.8,
            ReviewCount = 380,
            ImageUrl = "/images/products/tote-canvas.webp",
            Brand = "CutTay Studio",
            CategorySlug = "thoi-trang",
            CategoryName = "Thời trang",
            BadgeText = "Bán chạy",
            InStock = true,
            IsFeatured = false,
            SoldCount = 145,
            TotalStock = 200,
            Specifications = new()
            {
                { "Thương hiệu", "CutTay Studio" },
                { "Chất liệu", "Canvas 12oz mộc cao cấp" },
                { "Kích thước", "38 x 36 x 8 cm" }
            }
        },

        // ======================================================================
        // 3. NHÀ CỬA & ĐỜI SỐNG (nha-cua)
        // ======================================================================
        new Product
        {
            Id = 4,
            Name = "Bình giữ nhiệt Pastel Thermo 750ml",
            Slug = "binh-giu-nhiet-pastel-thermo-750ml",
            ShortDescription = "Inox 316 y tế cao cấp, giữ nóng 12h, giữ lạnh 24h, màu pastel sang trọng",
            Description = "Bình giữ nhiệt Pastel Thermo 750ml chế tạo từ ruột Inox 316 an toàn tuyệt đối cho sức khỏe, không ám mùi, giữ nhiệt độ đồ uống suốt cả ngày dài năng động.",
            Price = 320000m,
            OriginalPrice = 480000m,
            Rating = 4.7,
            ReviewCount = 410,
            ImageUrl = "/images/products/bottle-thermo.webp",
            Brand = "Lock&Lock",
            CategorySlug = "nha-cua",
            CategoryName = "Nhà cửa",
            BadgeText = "Deal Hot -33%",
            InStock = true,
            IsHotDeal = true,
            SoldCount = 29,
            TotalStock = 30,
            GalleryImages = new() { "/images/products/bottle-thermo.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Lock&Lock" },
                { "Dung tích", "750 ml" },
                { "Chất liệu ruột", "Inox 316 tráng men gốm" },
                { "Khả năng giữ nhiệt", "Nóng 12h, Lạnh 24h" }
            },
            Variants = new()
            {
                new() { Id = 401, Name = "Xanh Pastel Mint", Price = 320000m, OriginalPrice = 480000m, Sku = "BTL-MNT-75" },
                new() { Id = 402, Name = "Cam Đào Pastel", Price = 320000m, OriginalPrice = 480000m, Sku = "BTL-PCH-75" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Nguyễn Thùy Dung", Rating = 5, Date = new DateTime(2026, 1, 10), Comment = "Giữ đá từ sáng đến chiều vẫn chưa tan hết, bình không bị đọng sương bên ngoài.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 8,
            Name = "Đèn ngủ mặt trăng cảm ứng chạm 3D",
            Slug = "den-ngu-mat-trang-cam-ung-cham-3d",
            ShortDescription = "3 màu ánh sáng ấm dịu, đế gỗ sồi tự nhiên, sạc pin tích điện tiện lợi",
            Description = "Đèn ngủ mô phỏng bề mặt mặt trăng bằng công nghệ in 3D sắc nét. Chạm cảm ứng để chuyển đổi 3 sắc màu (vàng ấm, trắng tự nhiên, vàng trăng dịu) giúp thư giãn giấc ngủ.",
            Price = 260000m,
            OriginalPrice = 390000m,
            Rating = 4.8,
            ReviewCount = 180,
            ImageUrl = "/images/products/lamp-moon.webp",
            Brand = "Xiaomi",
            CategorySlug = "nha-cua",
            CategoryName = "Nhà cửa",
            BadgeText = "Ưa chuộng",
            InStock = true,
            IsFeatured = true,
            IsNewArrival = true,
            SoldCount = 42,
            TotalStock = 50,
            GalleryImages = new() { "/images/products/lamp-moon.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Xiaomi" },
                { "Đường kính", "15 cm" },
                { "Nguồn điện", "Pin sạc Li-ion 800mAh (sáng 8-10h)" },
                { "Đế đèn", "Gỗ sồi nguyên khối" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Lâm Gia Huy", Rating = 5, Date = new DateTime(2026, 2, 8), Comment = "Ánh sáng dịu mắt, để bàn làm việc decor hay phòng ngủ đều rất xinh.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 13,
            Name = "Máy khuếch tán tinh dầu thơm phòng Aroma Mist",
            Slug = "may-khuech-tan-tinh-dau-thom-phong-aroma-mist",
            ShortDescription = "Sóng siêu âm nano êm ái, đèn LED đổi 7 màu, tự ngắt an toàn khi hết nước",
            Description = "Máy khuếch tán tinh dầu Aroma Mist tạo làn sương nano dịu mát, giúp không khí trong phòng luôn thư thái, dễ chịu và giảm stress hiệu quả.",
            Price = 350000m,
            OriginalPrice = 520000m,
            Rating = 4.7,
            ReviewCount = 220,
            ImageUrl = "/images/products/aroma-diffuser.webp",
            Brand = "Muji",
            CategorySlug = "nha-cua",
            CategoryName = "Nhà cửa",
            BadgeText = "-32%",
            InStock = true,
            SoldCount = 68,
            TotalStock = 85
        },

        // ======================================================================
        // 4. LÀM ĐẸP (lam-dep)
        // ======================================================================
        new Product
        {
            Id = 14,
            Name = "Serum cấp ẩm phục hồi da Hyaluronic B5 Glow",
            Slug = "serum-cap-am-phuc-hoi-da-hyaluronic-b5-glow",
            ShortDescription = "Tinh chất cấp ẩm chuyên sâu, làm dịu da nhạy cảm và se khít lỗ chân lông",
            Description = "Serum dưỡng ẩm chứa phức hợp 5 tầng phân tử Hyaluronic Acid kết hợp Vitamin B5 nguyên chất 10% giúp phục hồi hàng rào bảo vệ da, căng bóng ngậm nước tức thì.",
            Price = 380000m,
            OriginalPrice = 550000m,
            Rating = 4.9,
            ReviewCount = 430,
            ImageUrl = "/images/products/skincare-serum.webp",
            Brand = "Innisfree",
            CategorySlug = "lam-dep",
            CategoryName = "Làm đẹp",
            BadgeText = "Best Seller",
            InStock = true,
            IsFeatured = true,
            SoldCount = 89,
            TotalStock = 120,
            GalleryImages = new() { "/images/products/skincare-serum.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Innisfree" },
                { "Dung tích", "50 ml" },
                { "Loại da", "Phù hợp mọi loại da, kể cả da nhạy cảm" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Ngô Mai Phương", Rating = 5, Date = new DateTime(2026, 2, 1), Comment = "Serum thấm nhanh không bết dính, da mình đỡ mẩn đỏ rõ rệt sau 1 tuần dùng.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 15,
            Name = "Kem chống nắng quang phổ rộng Sun Shield SPF50+",
            Slug = "kem-chong-nang-quang-pho-rong-sun-shield-spf50",
            ShortDescription = "Chống tia UVA/UVB và ánh sáng xanh, kiềm dầu nâng tone tự nhiên",
            Description = "Bảo vệ làn da trước nắng gắt và ánh sáng màn hình điện tử với màng lọc chống nắng tiên tiến, chất kem mỏng nhẹ thấm trong 30 giây.",
            Price = 290000m,
            OriginalPrice = 420000m,
            Rating = 4.8,
            ReviewCount = 310,
            ImageUrl = "/images/products/sunscreen-shield.webp",
            Brand = "Innisfree",
            CategorySlug = "lam-dep",
            CategoryName = "Làm đẹp",
            InStock = true,
            SoldCount = 56,
            TotalStock = 80
        },

        // ======================================================================
        // 5. THỂ THAO (the-thao)
        // ======================================================================
        new Product
        {
            Id = 16,
            Name = "Bộ tạ tay bọc cao su chống trượt Pro Dumbbells 10kg",
            Slug = "bo-ta-tay-boc-cao-su-chong-truot-pro-dumbbells-10kg",
            ShortDescription = "Lõi gang đúc nguyên khối, bọc silicon êm tay, bảo vệ mặt sàn nhà",
            Description = "Cặp tạ tay đa năng hoàn hảo cho các bài tập thể lực, gym tại nhà. Cao su đúc nguyên khối triệt tiêu va đập và bảo vệ sàn gỗ khi đặt xuống.",
            Price = 490000m,
            OriginalPrice = 750000m,
            Rating = 4.9,
            ReviewCount = 280,
            ImageUrl = "/images/products/dumbbells-pro.webp",
            Brand = "Adidas",
            CategorySlug = "the-thao",
            CategoryName = "Thể thao",
            BadgeText = "Ưu đãi -35%",
            InStock = true,
            IsFeatured = true,
            SoldCount = 62,
            TotalStock = 90,
            GalleryImages = new() { "/images/products/dumbbells-pro.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Adidas" },
                { "Trọng lượng", "5kg x 2 chiếc (Tổng 10kg)" },
                { "Chất liệu", "Lõi gang đúc bọc cao su Neoprene" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Phan Trọng Hiếu", Rating = 5, Date = new DateTime(2026, 1, 18), Comment = "Tạ cầm chắc tay không bị trơn mồ hôi, cao su không có mùi hôi.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 17,
            Name = "Thảm tập Yoga định tuyến TPE 2 lớp chống trượt 8mm",
            Slug = "tham-tap-yoga-dinh-tuyen-tpe-2-lop-chong-truot-8mm",
            ShortDescription = "Độ dày 8mm êm ái bảo vệ khớp, kẻ đường định tuyến chuẩn xác tư thế",
            Description = "Thảm yoga TPE cao cấp với độ đàn hồi vượt trội, bề mặt vân kim cương bám dính tuyệt đối kể cả khi ra mồ hôi, tặng kèm túi đựng tiện lợi.",
            Price = 280000m,
            OriginalPrice = 450000m,
            Rating = 4.8,
            ReviewCount = 340,
            ImageUrl = "/images/products/yoga-mat.webp",
            Brand = "Adidas",
            CategorySlug = "the-thao",
            CategoryName = "Thể thao",
            InStock = true,
            SoldCount = 75,
            TotalStock = 100
        },

        // ======================================================================
        // 6. PHỤ KIỆN (phu-kien)
        // ======================================================================
        new Product
        {
            Id = 6,
            Name = "Balo chống sốc Minimalist Urban Tech",
            Slug = "balo-chong-soc-minimalist-urban-tech",
            ShortDescription = "Đựng vừa laptop 15.6 inch, vải chống nước Oxford, ngăn chia khoa học",
            Description = "Balo công nghệ phong cách tối giản với lớp đệm mút tổ ong bảo vệ laptop và tablet toàn diện, ngăn ẩn an toàn phía sau lưng.",
            Price = 650000m,
            OriginalPrice = 950000m,
            Rating = 4.9,
            ReviewCount = 380,
            ImageUrl = "/images/products/backpack-urban.webp",
            Brand = "CutTay Studio",
            CategorySlug = "phu-kien",
            CategoryName = "Phụ kiện",
            BadgeText = "Mới 2026",
            InStock = true,
            IsFeatured = true,
            IsNewArrival = true,
            SoldCount = 34,
            TotalStock = 60,
            GalleryImages = new() { "/images/products/backpack-urban.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "CutTay Studio" },
                { "Kích thước", "44 x 31 x 14 cm" },
                { "Tải trọng tối đa", "15 kg" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Tạ Quang Minh", Rating = 5, Date = new DateTime(2026, 2, 11), Comment = "Form balo đứng dáng, ngăn chia tiện lợi đựng vừa macbook 16 inch.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 18,
            Name = "Kính râm phân cực Chic Retro UV400",
            Slug = "kinh-ram-phan-cuc-chic-retro-uv400",
            ShortDescription = "Tròng kính phân cực chống lóa polarized, gọng acetate siêu nhẹ",
            Description = "Kính râm thời trang bảo vệ mắt 100% trước tia UV400, lọc ánh sáng chói chang khi lái xe hoặc đi biển, gọng kính tôn đường nét khuôn mặt.",
            Price = 340000m,
            OriginalPrice = 550000m,
            Rating = 4.8,
            ReviewCount = 190,
            ImageUrl = "/images/products/sunglasses-chic.webp",
            Brand = "CutTay Studio",
            CategorySlug = "phu-kien",
            CategoryName = "Phụ kiện",
            BadgeText = "-38%",
            InStock = true,
            SoldCount = 45,
            TotalStock = 70
        },

        // ======================================================================
        // 7. SÁCH & VĂN PHÒNG PHẨM (sach-van-phong-pham)
        // ======================================================================
        new Product
        {
            Id = 19,
            Name = "Sổ tay kế hoạch bìa da Planner 2026",
            Slug = "so-tay-ke-hoach-bia-da-planner-2026",
            ShortDescription = "Giấy kem chống lóa 100gsm, layout quản lý mục tiêu khoa học",
            Description = "Cuốn sổ tay được thiết kế tỉ mỉ để bạn theo dõi kế hoạch năm, tháng, tuần và habit tracker hàng ngày. Chất giấy cao cấp không thấm mực sang trang sau.",
            Price = 210000m,
            OriginalPrice = 320000m,
            Rating = 4.9,
            ReviewCount = 260,
            ImageUrl = "/images/products/notebook-planner.webp",
            Brand = "Muji",
            CategorySlug = "sach-van-phong-pham",
            CategoryName = "Sách & VP",
            BadgeText = "Năm mới 2026",
            InStock = true,
            IsFeatured = true,
            SoldCount = 78,
            TotalStock = 120,
            GalleryImages = new() { "/images/products/notebook-planner.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Muji" },
                { "Số trang", "240 trang" },
                { "Định lượng giấy", "100 gsm chống thấm" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Trần Thị Mai", Rating = 5, Date = new DateTime(2026, 1, 5), Comment = "Sổ rất đẹp và chỉn chu, giấy dày viết bút mực máy không bị nhòe.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 20,
            Name = "Bút máy ngòi mài EF ngòi trơn Signature",
            Slug = "but-may-ngoi-mai-ef-ngoi-tron-signature",
            ShortDescription = "Thân kim loại nguyên khối, ngòi thép không gỉ mạ vàng 18K",
            Description = "Cây bút ký cao cấp mang đến nét viết thanh đậm mượt mà, cảm giác cầm đầm tay sang trọng, thích hợp làm quà tặng ý nghĩa.",
            Price = 450000m,
            OriginalPrice = 690000m,
            Rating = 4.7,
            ReviewCount = 140,
            ImageUrl = "/images/products/fountain-pen.webp",
            Brand = "Muji",
            CategorySlug = "sach-van-phong-pham",
            CategoryName = "Sách & VP",
            InStock = true,
            SoldCount = 32,
            TotalStock = 50
        },

        // ======================================================================
        // 8. ĐỒ CHƠI (do-choi)
        // ======================================================================
        new Product
        {
            Id = 21,
            Name = "Bộ lắp ráp Robot thám hiểm AI Mech Explorer",
            Slug = "bo-lap-rap-robot-tham-hiem-ai-mech-explorer",
            ShortDescription = "Hơn 580 mảnh ghép chi tiết, khớp xoay linh hoạt, nhựa ABS an toàn",
            Description = "Mô hình robot thám hiểm tương lai với thiết kế ấn tượng, rèn luyện tư duy logic, tính kiên nhẫn và đam mê công nghệ cho cả trẻ em lẫn người lớn.",
            Price = 520000m,
            OriginalPrice = 790000m,
            Rating = 4.9,
            ReviewCount = 310,
            ImageUrl = "/images/products/lego-robot.webp",
            Brand = "Xiaomi",
            CategorySlug = "do-choi",
            CategoryName = "Đồ chơi",
            BadgeText = "Yêu thích",
            InStock = true,
            IsFeatured = true,
            SoldCount = 54,
            TotalStock = 75,
            GalleryImages = new() { "/images/products/lego-robot.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Xiaomi" },
                { "Số mảnh ghép", "586 chi tiết" },
                { "Chất liệu", "Nhựa nguyên sinh ABS đạt chuẩn an toàn" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Lê Thành An", Rating = 5, Date = new DateTime(2026, 2, 12), Comment = "Mảnh ghép khớp khít, sách hướng dẫn in màu rõ ràng, lắp xong trưng bày góc bàn cực ngầu.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 22,
            Name = "Bộ cờ bàn chiến thuật Board Game Catan Việt Hóa",
            Slug = "bo-co-ban-chien-thuat-board-game-catan-viet-hoa",
            ShortDescription = "Trò chơi chiến thuật giao thương hấp dẫn cho gia đình và nhóm bạn 3-4 người",
            Description = "Board game giao thương đỉnh cao thế giới phiên bản tiếng Việt chất lượng cao. Khám phá đảo Catan, khai thác tài nguyên và xây dựng vương quốc thịnh vượng.",
            Price = 390000m,
            OriginalPrice = 550000m,
            Rating = 4.8,
            ReviewCount = 270,
            ImageUrl = "/images/products/board-game.webp",
            Brand = "CutTay Studio",
            CategorySlug = "do-choi",
            CategoryName = "Đồ chơi",
            InStock = true,
            SoldCount = 61,
            TotalStock = 90
        },

        // ======================================================================
        // 9. SỨC KHỎE (suc-khoe)
        // ======================================================================
        new Product
        {
            Id = 23,
            Name = "Súng massage cầm tay giải cơ Deep Tissue Pro",
            Slug = "sung-massage-cam-tay-giai-co-deep-tissue-pro",
            ShortDescription = "Động cơ không chổi than 3200rpm, 4 đầu massage chuyên dụng",
            Description = "Giải tỏa đau mỏi cơ bắp sau khi tập luyện thể thao hoặc ngồi làm việc máy tính lâu với súng massage Deep Tissue Pro. Lực đấm sâu 12mm êm ái, pin bền bỉ.",
            Price = 850000m,
            OriginalPrice = 1350000m,
            Rating = 4.9,
            ReviewCount = 420,
            ImageUrl = "/images/products/massage-gun.webp",
            Brand = "Xiaomi",
            CategorySlug = "suc-khoe",
            CategoryName = "Sức khỏe",
            BadgeText = "Hot Deal -37%",
            InStock = true,
            IsHotDeal = true,
            IsFeatured = true,
            SoldCount = 83,
            TotalStock = 100,
            GalleryImages = new() { "/images/products/massage-gun.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Xiaomi" },
                { "Tốc độ rung", "1800 - 3200 vòng/phút (6 cấp độ)" },
                { "Pin", "2500mAh dùng 3-4 tuần" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Nguyễn Hữu Trí", Rating = 5, Date = new DateTime(2026, 2, 7), Comment = "Đấm cơ rất thích, tan mỏi vai gáy nhanh chóng sau giờ làm văn phòng.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 24,
            Name = "Máy tăm nước du lịch cầm tay Water Pulse Clean",
            Slug = "may-tam-nuoc-du-lich-cam-tay-water-pulse-clean",
            ShortDescription = "Áp lực nước 140 PSI, bình chứa 200ml, chống nước IPX7",
            Description = "Chăm sóc răng miệng chuẩn nha khoa mọi lúc mọi nơi. Loại bỏ 99.9% mảng bám và cặn thức ăn ở kẽ răng mà chỉ nha khoa không chạm tới được.",
            Price = 480000m,
            OriginalPrice = 720000m,
            Rating = 4.8,
            ReviewCount = 350,
            ImageUrl = "/images/products/water-flosser.webp",
            Brand = "Lock&Lock",
            CategorySlug = "suc-khoe",
            CategoryName = "Sức khỏe",
            InStock = true,
            SoldCount = 67,
            TotalStock = 85
        },

        // ======================================================================
        // 10. HÀNG QUỐC TẾ (hang-quoc-te)
        // ======================================================================
        new Product
        {
            Id = 25,
            Name = "Củ sạc đa năng du lịch toàn cầu Universal 65W GaN",
            Slug = "cu-sac-da-nang-du-lich-toan-cau-universal-65w-gan",
            ShortDescription = "Tích hợp chân cắm US/UK/EU/AU, 2 cổng Type-C + 2 cổng USB-A",
            Description = "Bộ chuyển đổi nguồn điện quốc tế tất cả trong một tích hợp công nghệ GaN 65W sạc nhanh cho laptop, điện thoại và máy tính bảng tại hơn 150 quốc gia.",
            Price = 580000m,
            OriginalPrice = 890000m,
            Rating = 4.9,
            ReviewCount = 290,
            ImageUrl = "/images/products/travel-adapter.webp",
            Brand = "Anker",
            CategorySlug = "hang-quoc-te",
            CategoryName = "Hàng quốc tế",
            BadgeText = "Chuẩn GaN",
            InStock = true,
            IsFeatured = true,
            SoldCount = 51,
            TotalStock = 70,
            GalleryImages = new() { "/images/products/travel-adapter.webp" },
            Specifications = new()
            {
                { "Thương hiệu", "Anker" },
                { "Công suất", "Max 65W GaN Fast Charge" },
                { "Tương thích", "Điện áp 100V - 250V quốc tế" }
            },
            Reviews = new()
            {
                new() { AuthorName = "Đặng Vũ Phong", Rating = 5, Date = new DateTime(2026, 1, 25), Comment = "Củ sạc nhỏ gọn mang đi công tác nước ngoài rất tiện, sạc được cùng lúc cả laptop và điện thoại.", IsVerifiedPurchase = true }
            }
        },
        new Product
        {
            Id = 26,
            Name = "Cân tiểu ly điện tử nhà bếp cảm ứng Kitchen Pro",
            Slug = "can-tieu-ly-dien-tu-nha-bep-cam-ung-kitchen-pro",
            ShortDescription = "Độ chính xác 0.1g, mặt kính cường lực chống nước, sạc Type-C",
            Description = "Dụng cụ chuẩn xác cho các tín đồ pha chế cà phê espresso/pourover và làm bánh gia đình với màn hình LED ẩn tinh tế.",
            Price = 240000m,
            OriginalPrice = 380000m,
            Rating = 4.8,
            ReviewCount = 175,
            ImageUrl = "/images/products/kitchen-scale.webp",
            Brand = "Muji",
            CategorySlug = "hang-quoc-te",
            CategoryName = "Hàng quốc tế",
            InStock = true,
            SoldCount = 39,
            TotalStock = 60
        },

        // ======================================================================
        // Bổ sung sản phẩm phong phú để đạt trên 30 sản phẩm demo
        // ======================================================================
        new Product
        {
            Id = 27,
            Name = "Tai nghe True Wireless AirDots ANC Crystal",
            Slug = "tai-nghe-true-wireless-airdots-anc-crystal",
            ShortDescription = "Hộp sạc trong suốt, chống ồn chủ động 35dB, độ trễ thấp chơi game 45ms",
            Description = "Mẫu tai nghe không dây thế hệ mới với thiết kế vỏ trong suốt khoe trọn vi mạch công nghệ bên trong cùng chất âm sống động.",
            Price = 690000m,
            OriginalPrice = 1090000m,
            Rating = 4.8,
            ReviewCount = 380,
            ImageUrl = "/images/products/headphones-pro.webp",
            Brand = "Sony",
            CategorySlug = "cong-nghe",
            CategoryName = "Công nghệ",
            InStock = true,
            SoldCount = 76,
            TotalStock = 100
        },
        new Product
        {
            Id = 28,
            Name = "Áo thun Polo Cotton Pima form Regular Fit",
            Slug = "ao-thun-polo-cotton-pima-form-regular-fit",
            ShortDescription = "Sợi bông Pima thượng hạng mềm mịn, cổ áo dệt kháng bai dão",
            Description = "Áo polo thanh lịch thích hợp đi làm và dạo phố, sợi bông Pima đem lại cảm giác thoáng mát mát mẻ suốt cả ngày.",
            Price = 310000m,
            OriginalPrice = 450000m,
            Rating = 4.7,
            ReviewCount = 210,
            ImageUrl = "/images/products/hoodie-organic.webp",
            Brand = "Uniqlo",
            CategorySlug = "thoi-trang",
            CategoryName = "Thời trang",
            InStock = true,
            SoldCount = 48,
            TotalStock = 80
        },
        new Product
        {
            Id = 29,
            Name = "Ví da nam gấp gọn da bò sáp Waxed Leather",
            Slug = "vi-da-nam-gap-gon-da-bo-sap-waxed-leather",
            ShortDescription = "Da bò sáp tự nhiên càng dùng càng bóng đẹp, có ngăn thẻ RFID chống trộm",
            Description = "Ví da thủ công nhỏ gọn để vừa túi quần trước, tích hợp màng chắn sóng RFID bảo vệ thẻ ngân hàng của bạn an toàn.",
            Price = 360000m,
            OriginalPrice = 520000m,
            Rating = 4.9,
            ReviewCount = 275,
            ImageUrl = "/images/products/backpack-urban.webp",
            Brand = "CutTay Studio",
            CategorySlug = "phu-kien",
            CategoryName = "Phụ kiện",
            InStock = true,
            SoldCount = 63,
            TotalStock = 85
        },
        new Product
        {
            Id = 30,
            Name = "Dây nhảy thể lực dây cáp bọc PVC xoay 360 độ",
            Slug = "day-nhay-the-luc-day-cap-boc-pvc-xoay-360-do",
            ShortDescription = "Vòng bi xoay trợ lực tốc độ cao, điều chỉnh chiều dài dễ dàng",
            Description = "Dụng cụ rèn luyện tim mạch và đốt mỡ hiệu quả tại nhà, dây cáp thép bọc PVC chống rối và chịu mài mòn cực tốt.",
            Price = 110000m,
            OriginalPrice = 180000m,
            Rating = 4.8,
            ReviewCount = 390,
            ImageUrl = "/images/products/dumbbells-pro.webp",
            Brand = "Nike",
            CategorySlug = "the-thao",
            CategoryName = "Thể thao",
            InStock = true,
            SoldCount = 120,
            TotalStock = 150
        },
        new Product
        {
            Id = 31,
            Name = "Máy rửa mặt sóng âm Silicon kháng khuẩn Sonic Clean",
            Slug = "may-rua-mat-song-am-silicon-khang-khuan-sonic-clean",
            ShortDescription = "8000 rung động/phút, sợi silicon y tế siêu mềm 0.6mm, chống nước IPX8",
            Description = "Làm sạch sâu từng lỗ chân lông nhẹ nhàng không gây xước da, loại bỏ bụi mịn và dầu thừa, kích thích lưu thông máu khuôn mặt.",
            Price = 420000m,
            OriginalPrice = 680000m,
            Rating = 4.8,
            ReviewCount = 290,
            ImageUrl = "/images/products/skincare-serum.webp",
            Brand = "Xiaomi",
            CategorySlug = "lam-dep",
            CategoryName = "Làm đẹp",
            InStock = true,
            SoldCount = 70,
            TotalStock = 90
        },
        new Product
        {
            Id = 32,
            Name = "Bộ ly thủy tinh hai lớp cách nhiệt Double Wall Glass",
            Slug = "bo-ly-thuy-tinh-hai-lop-cach-nhiet-double-wall-glass",
            ShortDescription = "Bộ 2 ly 350ml thủy tinh Borosilicate chịu nhiệt từ -20°C đến 150°C",
            Description = "Thiết kế hai lớp giữ nhiệt đồ uống lâu hơn và không bao giờ bị nóng hay đọng nước ra mặt bàn khi cầm uống.",
            Price = 185000m,
            OriginalPrice = 280000m,
            Rating = 4.7,
            ReviewCount = 160,
            ImageUrl = "/images/products/bottle-thermo.webp",
            Brand = "Lock&Lock",
            CategorySlug = "nha-cua",
            CategoryName = "Nhà cửa",
            InStock = true,
            SoldCount = 52,
            TotalStock = 75
        }
    };

    public Task<IReadOnlyList<Category>> GetCategoriesAsync() =>
        Task.FromResult<IReadOnlyList<Category>>(Categories.OrderBy(c => c.SortOrder).ToList());

    public Task<Category?> GetCategoryBySlugAsync(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug)) return Task.FromResult<Category?>(null);
        var cat = Categories.FirstOrDefault(c => c.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase));
        return Task.FromResult(cat);
    }

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

    public Task<IReadOnlyList<string>> GetAllBrandsAsync()
    {
        var brands = Products
            .Where(p => !string.IsNullOrWhiteSpace(p.Brand))
            .Select(p => p.Brand)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(b => b)
            .ToList();
        return Task.FromResult<IReadOnlyList<string>>(brands);
    }

    public Task<IReadOnlyList<Product>> GetRelatedProductsAsync(int productId, int count = 4)
    {
        var current = Products.FirstOrDefault(p => p.Id == productId);
        if (current == null)
        {
            return Task.FromResult<IReadOnlyList<Product>>(Products.Take(count).ToList());
        }

        if (current.RelatedProductSlugs != null && current.RelatedProductSlugs.Count > 0)
        {
            var explicitList = Products
                .Where(p => current.RelatedProductSlugs.Contains(p.Slug, StringComparer.OrdinalIgnoreCase) && p.Id != productId)
                .Take(count)
                .ToList();

            if (explicitList.Count > 0)
            {
                return Task.FromResult<IReadOnlyList<Product>>(explicitList);
            }
        }

        var related = Products
            .Where(p => p.Id != productId && p.CategorySlug.Equals(current.CategorySlug, StringComparison.OrdinalIgnoreCase))
            .Take(count)
            .ToList();

        if (related.Count < count)
        {
            var additional = Products
                .Where(p => p.Id != productId && !related.Any(r => r.Id == p.Id))
                .Take(count - related.Count);
            related.AddRange(additional);
        }

        return Task.FromResult<IReadOnlyList<Product>>(related);
    }

    public Task<CatalogResult> GetCatalogAsync(CatalogFilterParameters filters)
    {
        filters ??= new CatalogFilterParameters();
        IEnumerable<Product> query = Products;

        // 1. Category Filter
        if (!string.IsNullOrWhiteSpace(filters.CategorySlug))
        {
            query = query.Where(p => p.CategorySlug.Equals(filters.CategorySlug, StringComparison.OrdinalIgnoreCase));
        }

        // 2. Search Query (Accent-Insensitive Vietnamese Search)
        if (!string.IsNullOrWhiteSpace(filters.SearchQuery))
        {
            var rawSearch = filters.SearchQuery.Trim();
            var normalizedQuery = RemoveDiacritics(rawSearch).ToLowerInvariant();

            query = query.Where(p =>
            {
                var normName = RemoveDiacritics(p.Name).ToLowerInvariant();
                var normCat = RemoveDiacritics(p.CategoryName).ToLowerInvariant();
                var normShortDesc = RemoveDiacritics(p.ShortDescription).ToLowerInvariant();
                var normBrand = RemoveDiacritics(p.Brand).ToLowerInvariant();

                return normName.Contains(normalizedQuery) ||
                       normCat.Contains(normalizedQuery) ||
                       normShortDesc.Contains(normalizedQuery) ||
                       normBrand.Contains(normalizedQuery);
            });
        }

        // 3. Brand Filter
        if (!string.IsNullOrWhiteSpace(filters.Brand))
        {
            query = query.Where(p => p.Brand.Equals(filters.Brand, StringComparison.OrdinalIgnoreCase));
        }

        // 4. Price Filter
        if (filters.MinPrice.HasValue)
        {
            query = query.Where(p => p.Price >= filters.MinPrice.Value);
        }
        if (filters.MaxPrice.HasValue)
        {
            query = query.Where(p => p.Price <= filters.MaxPrice.Value);
        }

        // 5. Rating Filter
        if (filters.MinRating.HasValue)
        {
            query = query.Where(p => p.Rating >= filters.MinRating.Value);
        }

        // 6. Availability & Sale Filters
        if (filters.InStockOnly == true)
        {
            query = query.Where(p => p.InStock);
        }
        if (filters.OnSaleOnly == true)
        {
            query = query.Where(p => p.OriginalPrice > p.Price);
        }

        // 7. Sorting
        query = (filters.SortBy?.ToLowerInvariant()) switch
        {
            "price_asc" => query.OrderBy(p => p.Price),
            "price_desc" => query.OrderByDescending(p => p.Price),
            "newest" => query.OrderByDescending(p => p.IsNewArrival).ThenByDescending(p => p.Id),
            "rating_desc" => query.OrderByDescending(p => p.Rating).ThenByDescending(p => p.ReviewCount),
            _ => query.OrderByDescending(p => p.IsHotDeal).ThenByDescending(p => p.SoldCount) // default: popular
        };

        var allFiltered = query.ToList();
        var totalItems = allFiltered.Count;
        var page = filters.Page > 0 ? filters.Page : 1;
        var pageSize = filters.PageSize > 0 ? filters.PageSize : 12;

        var paginated = allFiltered
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var currentCategory = !string.IsNullOrWhiteSpace(filters.CategorySlug)
            ? Categories.FirstOrDefault(c => c.Slug.Equals(filters.CategorySlug, StringComparison.OrdinalIgnoreCase))
            : null;

        var availableBrands = Products
            .Where(p => string.IsNullOrWhiteSpace(filters.CategorySlug) || p.CategorySlug.Equals(filters.CategorySlug, StringComparison.OrdinalIgnoreCase))
            .Where(p => !string.IsNullOrWhiteSpace(p.Brand))
            .Select(p => p.Brand)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(b => b)
            .ToList();

        var result = new CatalogResult
        {
            Products = paginated,
            TotalItems = totalItems,
            CurrentPage = page,
            PageSize = pageSize,
            AvailableBrands = availableBrands,
            AvailableCategories = Categories,
            CurrentCategory = currentCategory
        };

        return Task.FromResult(result);
    }

    public Task<IReadOnlyList<Product>> SearchProductsAsync(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            return Task.FromResult<IReadOnlyList<Product>>(Products);

        var normQuery = RemoveDiacritics(query.Trim()).ToLowerInvariant();

        var matches = Products.Where(p =>
        {
            var normName = RemoveDiacritics(p.Name).ToLowerInvariant();
            var normCat = RemoveDiacritics(p.CategoryName).ToLowerInvariant();
            var normDesc = RemoveDiacritics(p.ShortDescription).ToLowerInvariant();
            var normBrand = RemoveDiacritics(p.Brand).ToLowerInvariant();

            return normName.Contains(normQuery) ||
                   normCat.Contains(normQuery) ||
                   normDesc.Contains(normQuery) ||
                   normBrand.Contains(normQuery);
        }).ToList();

        return Task.FromResult<IReadOnlyList<Product>>(matches);
    }

    /// <summary>
    /// Helper to remove Vietnamese diacritics for accent-insensitive search.
    /// E.g. "Mũ lưỡi trai" -> "Mu luoi trai", "Áo hoodie" -> "Ao hoodie"
    /// </summary>
    private static string RemoveDiacritics(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return string.Empty;

        var normalizedString = text.Normalize(NormalizationForm.FormD);
        var sb = new StringBuilder();

        foreach (var c in normalizedString)
        {
            var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
            {
                sb.Append(c);
            }
        }

        var result = sb.ToString().Normalize(NormalizationForm.FormC);
        result = result.Replace('đ', 'd').Replace('Đ', 'D');
        return result;
    }

    private static readonly List<BlogPost> BlogPosts = new()
    {
        new BlogPost
        {
            Id = 1,
            Title = "Top 5 Setup Góc Làm Việc Tối Giản Cực Chill 2026",
            Slug = "top-5-setup-goc-lam-viec-toi-gian-2026",
            Summary = "Khám phá phong cách bàn làm việc Minimalism kết hợp công nghệ hiện đại giúp tăng 200% cảm hứng sáng tạo mỗi ngày.",
            Category = "Công nghệ & Lifestyle",
            CategorySlug = "cong-nghe",
            ImageUrl = "/images/blog/blog-desk-setup.webp",
            Author = "Lê Hải Đăng",
            ReadingTime = "4 phút đọc",
            PublishedAt = new DateTime(2026, 2, 20),
            Tags = new() { "Setup", "Minimalism", "Công nghệ", "Góc làm việc" },
            RelatedProductSlugs = new() { "ban-phim-co-khong-day-pastel-glow-rgb", "chuot-khong-day-cong-thai-hoc-silence-pro", "tai-nghe-chup-tai-studio-pro-wireless" },
            ContentHtml = "<p>Một góc làm việc gọn gàng, tinh tế không chỉ tạo cảm giác thư thái mà còn là nguồn động lực dồi dào cho mỗi ngày làm việc sáng tạo. Không gian tối giản giúp giảm tải áp lực thị giác, cho phép tâm trí tập trung vào những dòng code hay ý tưởng kinh doanh cốt lõi.</p><h3>1. Nguyên tắc bàn phím cơ không dây & chuột công thái học</h3><p>Hãy giải phóng mặt bàn khỏi những bó dây cáp rối mắt. Một chiếc bàn phím cơ tone màu pastel cùng chuột silent không dây vừa mang lại cảm giác gõ êm mượt, vừa giữ không gian luôn trong trạng thái tinh khiết.</p><h3>2. Ánh sáng dịu nhẹ với đèn decor</h3><p>Ánh sáng gián tiếp từ đèn mặt trăng 3D hoặc dải LED hắt sau màn hình sẽ bảo vệ mắt khi làm việc buổi tối và biến góc làm việc thành chốn chill tuyệt vời.</p>"
        },
        new BlogPost
        {
            Id = 2,
            Title = "Xu Hướng Streetwear Đón Đầu Năm 2026: Năng Động & Tinh Tế",
            Slug = "xu-huong-streetwear-don-dau-2026",
            Summary = "Tổng hợp những cách phối đồ theo phong cách đường phố tối giản với mũ lưỡi trai, hoodie và sneaker retro.",
            Category = "Thời trang",
            CategorySlug = "thoi-trang",
            ImageUrl = "/images/blog/blog-spring-fashion.webp",
            Author = "Trần Thảo Ly",
            ReadingTime = "6 phút đọc",
            PublishedAt = new DateTime(2026, 2, 18),
            Tags = new() { "Streetwear", "Fashion", "CutTay Style", "OOTD" },
            RelatedProductSlugs = new() { "mu-luoi-trai-cotton-street-style-2026", "ao-hoodie-form-rong-cotton-blend-organic", "giay-sneaker-retro-chunky-sole-cuttay" },
            ContentHtml = "<p>Năm 2026 chứng kiến sự lên ngôi của phong cách Quiet Streetwear - nơi sự thoải mái và đường nét tối giản chiếm vị trí trung tâm. Thay vì những logo phô trương, giới trẻ chuộng phom dáng oversize mềm mại cùng gam màu đất hoặc pastel trang nhã.</p><h3>Bí quyết mix-and-match kinh điển</h3><p>Sự kết hợp giữa áo hoodie cotton blend hữu cơ, mũ lưỡi trai beige mộc mạc cùng đôi sneaker chunky đế thô mang đến diện mạo vừa phóng khoáng vừa chỉn chu trong mọi buổi dạo phố.</p>"
        },
        new BlogPost
        {
            Id = 3,
            Title = "Bí Quyết Nạp Năng Lượng Buổi Sáng Cho Dân Văn Phòng Hiện Đại",
            Slug = "bi-quyet-nap-nang-luong-buoi-sang",
            Summary = "Duy trì sức bền và tinh thần hứng khởi suốt 8 tiếng làm việc nhờ thói quen vận động nhẹ và thư giãn thông minh.",
            Category = "Sức khỏe & Đời sống",
            CategorySlug = "suc-khoe",
            ImageUrl = "/images/blog/blog-morning-routine.webp",
            Author = "Bác sĩ Minh Vũ",
            ReadingTime = "5 phút đọc",
            PublishedAt = new DateTime(2026, 2, 15),
            Tags = new() { "Wellness", "Routine", "Sức khỏe", "Work-Life" },
            RelatedProductSlugs = new() { "binh-giu-nhiet-inox-316-pastel-thermo-750ml", "tham-tap-yoga-dinh-tuyen-tpe-2-lop-chong-truot-8mm", "sung-massage-cam-tay-giai-co-deep-tissue-pro" },
            ContentHtml = "<p>Cảm giác uể oải mỗi sáng hoàn toàn có thể được giải quyết chỉ bằng một vài điều chỉnh nhỏ trong thói quen sinh hoạt. Bắt đầu ngày mới bằng 15 phút giãn cơ trên thảm yoga, uống một cốc nước ấm từ bình giữ nhiệt và nghe podcast âm nhạc nhẹ nhàng.</p><h3>Thư giãn cơ tức thì sau giờ làm việc</h3><p>Súng massage mini cầm tay sẽ là vị cứu tinh xua tan cơn mỏi vai gáy của người ngồi máy tính nhiều, giúp phục hồi lưu thông máu nhanh chóng.</p>"
        }
    };

    private static readonly List<Coupon> Coupons = new()
    {
        new Coupon
        {
            Id = 1,
            Code = "CUTTAYNEW",
            Title = "Voucher chào bạn mới",
            Description = "Giảm trực tiếp 20.000đ cho đơn hàng đầu tiên từ 150.000đ",
            DiscountAmount = 20000m,
            MinOrderValue = 150000m,
            ValidUntil = new DateTime(2026, 12, 31),
            IsActive = true
        },
        new Coupon
        {
            Id = 2,
            Code = "FREESHIP50",
            Title = "Miễn phí vận chuyển toàn quốc",
            Description = "Giảm 30.000đ phí vận chuyển cho đơn hàng từ 250.000đ",
            DiscountAmount = 30000m,
            MinOrderValue = 250000m,
            ValidUntil = new DateTime(2026, 12, 31),
            IsActive = true
        },
        new Coupon
        {
            Id = 3,
            Code = "TECHDEAL10",
            Title = "Ưu đãi công nghệ 10%",
            Description = "Giảm 10% tối đa 100.000đ khi mua các sản phẩm ngành hàng Công nghệ",
            DiscountAmount = 100000m,
            DiscountPercent = 10m,
            MinOrderValue = 500000m,
            ValidUntil = new DateTime(2026, 12, 31),
            IsActive = true,
            CategoryLimit = "cong-nghe"
        },
        new Coupon
        {
            Id = 4,
            Code = "VIPMEMBER",
            Title = "Đặc quyền CutTayShop+ Gold",
            Description = "Giảm 50.000đ cho thành viên hạng Vàng trở lên đơn từ 400.000đ",
            DiscountAmount = 50000m,
            MinOrderValue = 400000m,
            ValidUntil = new DateTime(2026, 12, 31),
            IsActive = true
        }
    };

    private static readonly List<Order> Orders = new()
    {
        new Order
        {
            Id = 1,
            OrderCode = "CTS-2026-88910",
            CreatedAt = new DateTime(2026, 2, 26, 14, 30, 0),
            CustomerName = "Nguyễn Văn An",
            PhoneNumber = "0988 123 456",
            Email = "nguyenvanan@gmail.com",
            ShippingAddress = "Số 18, Ngõ 45 phố Nguyễn Đình Chiểu, Phường Lê Đại Hành, Quận Hai Bà Trưng, Hà Nội",
            ShippingMethod = "Giao hàng hỏa tốc 2H",
            PaymentMethod = "Thanh toán khi nhận hàng (COD)",
            Status = "Đang giao",
            Subtotal = 2080000m,
            ShippingFee = 35000m,
            Discount = 20000m,
            TrackingNumber = "VNPOST-99281923",
            Items = new()
            {
                new OrderItem
                {
                    ProductId = 1,
                    ProductName = "Tai nghe chụp tai Studio Pro Wireless",
                    ProductSlug = "tai-nghe-chup-tai-studio-pro-wireless",
                    ImageUrl = "/images/products/headphones-pro.webp",
                    VariantName = "Đen Midnight",
                    UnitPrice = 1490000m,
                    Quantity = 1
                },
                new OrderItem
                {
                    ProductId = 3,
                    ProductName = "Loa Bluetooth Mini Fabric Sound",
                    ProductSlug = "loa-bluetooth-mini-fabric-sound",
                    ImageUrl = "/images/products/speaker-mini.webp",
                    VariantName = "Xanh Mint Pastel",
                    UnitPrice = 590000m,
                    Quantity = 1
                }
            },
            TrackingHistory = new()
            {
                new() { Title = "Đơn hàng đã đặt", Description = "Quý khách đã đặt đơn hàng thành công", Timestamp = new DateTime(2026, 2, 26, 14, 30, 0), IsCompleted = true },
                new() { Title = "Đã xác nhận", Description = "CutTayShop đã xác nhận đơn hàng và chuẩn bị kiện", Timestamp = new DateTime(2026, 2, 26, 15, 0, 0), IsCompleted = true },
                new() { Title = "Đang vận chuyển", Description = "Đơn hàng đã bàn giao cho bưu tá VNPost, đang trên đường giao tới bạn", Timestamp = new DateTime(2026, 2, 26, 16, 20, 0), IsCompleted = true, IsCurrent = true },
                new() { Title = "Đã giao thành công", Description = "Kiện hàng đã được giao tận tay khách hàng", Timestamp = new DateTime(2026, 2, 26, 17, 30, 0), IsCompleted = false }
            }
        },
        new Order
        {
            Id = 2,
            OrderCode = "CTS-2026-88902",
            CreatedAt = new DateTime(2026, 2, 20, 9, 15, 0),
            CustomerName = "Nguyễn Văn An",
            PhoneNumber = "0988 123 456",
            Email = "nguyenvanan@gmail.com",
            ShippingAddress = "Số 18, Ngõ 45 phố Nguyễn Đình Chiểu, Phường Lê Đại Hành, Quận Hai Bà Trưng, Hà Nội",
            ShippingMethod = "Giao hàng tiêu chuẩn",
            PaymentMethod = "Chuyển khoản VietQR",
            Status = "Đã giao",
            Subtotal = 400000m,
            ShippingFee = 0m,
            Discount = 20000m,
            TrackingNumber = "GHN-8827103",
            Items = new()
            {
                new OrderItem
                {
                    ProductId = 6,
                    ProductName = "Mũ lưỡi trai Cotton Street Style 2026",
                    ProductSlug = "mu-luoi-trai-cotton-street-style-2026",
                    ImageUrl = "/images/products/cap-beige.webp",
                    VariantName = "Màu Be Vintage",
                    UnitPrice = 190000m,
                    Quantity = 1
                },
                new OrderItem
                {
                    ProductId = 11,
                    ProductName = "Túi Tote Canvas thân thiện môi trường CutTay",
                    ProductSlug = "tui-tote-canvas-eco-friendly-cuttay",
                    ImageUrl = "/images/products/tote-canvas.webp",
                    VariantName = "Kem Canvas Mộc",
                    UnitPrice = 210000m,
                    Quantity = 1
                }
            },
            TrackingHistory = new()
            {
                new() { Title = "Đã giao thành công", Description = "Giao hàng thành công. Cảm ơn bạn đã mua sắm tại CutTayShop!", Timestamp = new DateTime(2026, 2, 22, 11, 45, 0), IsCompleted = true, IsCurrent = true }
            }
        },
        new Order
        {
            Id = 3,
            OrderCode = "CTS-2026-88934",
            CreatedAt = new DateTime(2026, 2, 28, 10, 0, 0),
            CustomerName = "Nguyễn Văn An",
            PhoneNumber = "0988 123 456",
            Email = "nguyenvanan@gmail.com",
            ShippingAddress = "Số 18, Ngõ 45 phố Nguyễn Đình Chiểu, Phường Lê Đại Hành, Quận Hai Bà Trưng, Hà Nội",
            ShippingMethod = "Giao hàng tiêu chuẩn",
            PaymentMethod = "Thanh toán khi nhận hàng (COD)",
            Status = "Đang xử lý",
            Subtotal = 320000m,
            ShippingFee = 30000m,
            Discount = 0m,
            Items = new()
            {
                new OrderItem
                {
                    ProductId = 10,
                    ProductName = "Bình giữ nhiệt Inox 316 Pastel Thermo 750ml",
                    ProductSlug = "binh-giu-nhiet-inox-316-pastel-thermo-750ml",
                    ImageUrl = "/images/products/bottle-thermo.webp",
                    VariantName = "Xanh Mint Pastel",
                    UnitPrice = 320000m,
                    Quantity = 1
                }
            }
        }
    };

    public Task<IReadOnlyList<Product>> GetAllProductsAsync() => Task.FromResult<IReadOnlyList<Product>>(Products);
    public Task<IReadOnlyList<BlogPost>> GetBlogPostsAsync() => Task.FromResult<IReadOnlyList<BlogPost>>(BlogPosts);
    public Task<BlogPost?> GetBlogPostBySlugAsync(string slug) => Task.FromResult(BlogPosts.FirstOrDefault(b => b.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase)));
    public Task<IReadOnlyList<Coupon>> GetCouponsAsync() => Task.FromResult<IReadOnlyList<Coupon>>(Coupons);
    public Task<IReadOnlyList<Order>> GetOrdersAsync() => Task.FromResult<IReadOnlyList<Order>>(Orders);
    public Task<Order?> GetOrderByCodeAsync(string code) => Task.FromResult(Orders.FirstOrDefault(o => o.OrderCode.Equals(code, StringComparison.OrdinalIgnoreCase) || o.PhoneNumber.Equals(code, StringComparison.OrdinalIgnoreCase)));

}
