/** Trang lỗi / trạng thái — port từ Views/Shared/Error*.cshtml */
import { layout, errorPage } from './partials.mjs';

export function render404() {
  return layout({
    title: '404 — Không Tìm Thấy Trang | CutTayShop',
    body: errorPage({
      emoji: '🛸',
      badgeClass: 'badge-peach',
      badgeText: 'Lỗi 404 — Page Not Found',
      heading: 'Trang này đã bay vào vũ trụ!',
      description: 'Địa chỉ bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng. Đừng lo, hãy để CutTayShop đưa bạn về nơi có nhiều món đồ xinh xắn!',
      actions: `<a href="/" class="btn-pill btn-pill-primary btn-pill-lg">
        Quay lại trang chủ →
      </a>
      <a href="/san-pham" class="btn-pill btn-pill-secondary btn-pill-lg">
        Khám phá sản phẩm
      </a>`,
    }).replace(
      '<div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">',
      `<div style="max-width: 440px; margin: 0 auto 32px;">
      <form action="/tim-kiem" method="get" class="search-pill-form">
        <input type="search" name="q" class="search-pill-input" placeholder="Tìm sản phẩm khác (tai nghe, balo, mũ...)" />
        <button type="submit" class="search-pill-btn">🔍</button>
      </form>
    </div>

    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">`,
    ),
  });
}

export function render403() {
  return layout({
    title: '403 — Từ Chối Truy Cập | CutTayShop',
    body: errorPage({
      emoji: '🚫',
      badgeClass: 'badge-peach',
      badgeText: 'Lỗi 403 — Access Denied',
      heading: 'Bạn không có quyền truy cập khu vực này',
      description: 'Khu vực quản trị chỉ dành cho tài khoản nhân viên được cấp quyền. Vui lòng đăng nhập với tài khoản có thẩm quyền hoặc quay lại trang chủ.',
      actions: `<a href="/dang-nhap" class="btn-pill btn-pill-primary btn-pill-lg">
        Đăng nhập tài khoản →
      </a>
      <a href="/" class="btn-pill btn-pill-secondary btn-pill-lg">
        Về trang chủ
      </a>`,
    }),
  });
}

export function render500() {
  return layout({
    title: '500 — Sự Cố Hệ Thống | CutTayShop',
    body: errorPage({
      emoji: '⚙️',
      badgeClass: 'badge-peach',
      badgeText: 'Lỗi 500 — Internal Server Error',
      heading: 'Đang có sự cố kết nối máy chủ',
      description: 'Đội ngũ kỹ thuật của CutTayShop đã nhận được thông báo lỗi và đang khẩn trương khắc phục. Bạn vui lòng thử tải lại trang sau ít phút.',
      actions: `<a href="/" class="btn-pill btn-pill-primary btn-pill-lg">
        Tải lại trang chủ →
      </a>
      <a href="/lien-he" class="btn-pill btn-pill-secondary btn-pill-lg">
        Báo lỗi hỗ trợ
      </a>`,
    }),
  });
}

export function renderSessionExpired() {
  return layout({
    title: 'Phiên Làm Việc Hết Hạn — CutTayShop',
    body: errorPage({
      emoji: '⏳',
      badgeClass: 'badge-sky',
      badgeText: 'Hết phiên làm việc',
      heading: 'Phiên đăng nhập đã hết hạn',
      description: 'Để bảo vệ an toàn cho tài khoản và dữ liệu giỏ hàng của bạn, phiên làm việc đã tự động đóng sau một khoảng thời gian không có tương tác.',
      actions: `<a href="/dang-nhap" class="btn-pill btn-pill-primary btn-pill-lg">
        Đăng nhập lại →
      </a>
      <a href="/" class="btn-pill btn-pill-secondary btn-pill-lg">
        Về trang chủ
      </a>`,
    }),
  });
}

export function renderMaintenance() {
  return layout({
    title: 'Hệ Thống Đang Nâng Cấp — CutTayShop',
    body: errorPage({
      emoji: '🚧',
      badgeClass: 'badge-peach',
      badgeText: 'Bảo trì định kỳ',
      heading: 'Hệ thống đang được nâng cấp',
      description: 'CutTayShop đang bảo trì định kỳ để tối ưu hóa hiệu năng và ra mắt các tính năng mua sắm mới. Chúng tôi sẽ trở lại trong ít phút nữa!',
      actions: `<a href="/" class="btn-pill btn-pill-primary btn-pill-lg">
        Thử lại ngay
      </a>`,
    }),
  });
}
