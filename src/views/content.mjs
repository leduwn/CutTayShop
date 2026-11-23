/** Blog + các trang nội dung tĩnh (chính sách, FAQ, liên hệ...) */
import { esc, dmy } from '../format.mjs';
import { layout, productCard, pageHeaderEditorial, alert } from './partials.mjs';

/* -------------------------------------------------------------------- blog */

export function renderBlogIndex(model) {
  const chip = (href, label, key) =>
    `<a href="${href}" class="filter-chip${model.currentCategory === key ? ' active' : ''}">${label}</a>`;

  const allChip = `<a href="/blog" class="filter-chip${!model.currentCategory ? ' active' : ''}">Tất cả bài viết</a>`;

  const featured = model.featuredPost && !model.currentCategory
    ? `<article class="featured-blog-card" style="margin-bottom: 48px;">
      <div class="featured-blog-img-wrap">
        <img src="${esc(model.featuredPost.imageUrl)}" alt="${esc(model.featuredPost.title)}" class="featured-blog-img" width="600" height="400" />
      </div>
      <div class="featured-blog-content">
        <div class="blog-meta-badge">
          <span class="badge-capsule badge-peach">${esc(model.featuredPost.category)}</span>
          <span class="text-muted" style="font-size: 0.8rem; margin-left: 8px;">${esc(model.featuredPost.readingTime)}</span>
        </div>
        <h2 class="featured-blog-title">
          <a href="/blog/${esc(model.featuredPost.slug)}">${esc(model.featuredPost.title)}</a>
        </h2>
        <p class="featured-blog-summary">${esc(model.featuredPost.summary)}</p>
        <div class="featured-blog-footer">
          <span class="author-name">Bởi ${esc(model.featuredPost.author)}</span>
          <span class="dot-sep">•</span>
          <span class="publish-date">${dmy(model.featuredPost.publishedAt)}</span>
          <a href="/blog/${esc(model.featuredPost.slug)}" class="btn-read-more" style="margin-left: auto;">Đọc tiếp →</a>
        </div>
      </div>
    </article>`
    : '';

  const cards = model.posts.map((post) => `
      <article class="blog-card">
        <a href="/blog/${esc(post.slug)}" class="blog-card-thumb-wrap">
          <img src="${esc(post.imageUrl)}" alt="${esc(post.title)}" class="blog-card-thumb" width="400" height="250" loading="lazy" />
          <span class="blog-card-category-pill">${esc(post.category)}</span>
        </a>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span>${dmy(post.publishedAt)}</span>
            <span class="dot-sep">•</span>
            <span>${esc(post.readingTime)}</span>
          </div>
          <h3 class="blog-card-title">
            <a href="/blog/${esc(post.slug)}">${esc(post.title)}</a>
          </h3>
          <p class="blog-card-summary">${esc(post.summary)}</p>
          <div class="blog-card-footer">
            <span class="author-by">Bởi ${esc(post.author)}</span>
            <a href="/blog/${esc(post.slug)}" class="read-link">Xem chi tiết →</a>
          </div>
        </div>
      </article>`).join('\n');

  const body = `${pageHeaderEditorial({
    badgeClass: 'badge-mint',
    badgeIcon: '✍️',
    badgeText: 'Khám phá xu hướng & góc nhìn mới',
    title: 'CutTayShop Magazine & Blog',
    subtitle: 'Cẩm nang phong cách sống hiện đại, setup bàn làm việc tối giản và bí quyết chọn đồ công nghệ đỉnh cao.',
  })}

<div class="container-custom" style="padding-top: 32px; padding-bottom: 80px;">
  <div class="filter-chips-row" style="margin-bottom: 32px;">
    ${allChip}
    ${chip('/blog?chuDe=cong-nghe', 'Công nghệ & Setup', 'cong-nghe')}
    ${chip('/blog?chuDe=thoi-trang', 'Thời trang & Streetwear', 'thoi-trang')}
    ${chip('/blog?chuDe=suc-khoe', 'Sức khỏe & Đời sống', 'suc-khoe')}
  </div>

  ${featured}

  <div class="blog-grid">
${cards}
  </div>
</div>`;

  return layout({ title: 'Tin Tức & Phong Cách Sống — CutTayShop Blog', body, active: 'blog' });
}

export function renderBlogDetail(model) {
  const post = model.post;

  const tags = post.tags
    .map((tag) => `<span class="badge-capsule badge-subtle">#${esc(tag)}</span>`)
    .join('\n      ');

  const related = model.relatedProducts.length
    ? `<div class="article-related-products" style="margin-top: 48px; padding: 24px; background: var(--color-bg-secondary); border-radius: var(--radius-lg);">
        <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 16px;">🛍️ Sản phẩm xuất hiện trong bài viết</h2>
        <div class="product-grid" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));">
${model.relatedProducts.map((p) => `          ${productCard(p)}`).join('\n')}
        </div>
      </div>`
    : '';

  const body = `<article class="blog-detail-article">
  <div class="container-custom" style="max-width: 860px; padding-top: 32px; padding-bottom: 64px;">
    <nav class="breadcrumb-nav" aria-label="Breadcrumb" style="margin-bottom: 24px;">
      <a href="/">Trang chủ</a> <span class="sep">/</span>
      <a href="/blog">Blog</a> <span class="sep">/</span>
      <span class="current">${esc(post.category)}</span>
    </nav>

    <div class="badge-capsule badge-mint" style="margin-bottom: 16px;">
      ${esc(post.category)}
    </div>

    <h1 class="blog-detail-title">${esc(post.title)}</h1>

    <div class="blog-detail-meta-row">
      <div class="author-info">
        <div class="author-avatar-ph">✍️</div>
        <div>
          <strong class="author-name">${esc(post.author)}</strong>
          <div class="text-muted" style="font-size: 0.8rem;">Đăng ngày ${dmy(post.publishedAt)} • ${esc(post.readingTime)}</div>
        </div>
      </div>
    </div>

    <div class="blog-detail-banner-wrap" style="margin-top: 24px; margin-bottom: 32px;">
      <img src="${esc(post.imageUrl)}" alt="${esc(post.title)}" class="blog-detail-hero-img" width="860" height="480" />
    </div>

    <div class="blog-detail-content-body">
      ${post.contentHtml}
    </div>

    <div class="blog-tags-row" style="margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--color-border);">
      <span class="tags-label">Thẻ chủ đề:</span>
      ${tags}
    </div>

    ${related}
  </div>
</article>`;

  return layout({ title: `${post.title} — CutTayShop Blog`, body, active: 'blog' });
}

/* --------------------------------------------------------- trang nội dung */

function editorialPage({ title, badgeClass, badgeIcon, badgeText, pageTitle, subtitle, inner }) {
  return layout({
    title,
    body: `${pageHeaderEditorial({ badgeClass, badgeIcon, badgeText, title: pageTitle, subtitle })}

<div class="container-custom" style="padding-top: 48px; padding-bottom: 80px; max-width: 900px;">
${inner}
</div>`,
  });
}

export function renderAbout() {
  return editorialPage({
    title: 'Về Chúng Tôi — Câu Chuyện Thương Hiệu CutTayShop',
    badgeClass: 'badge-peach',
    badgeIcon: '🌱',
    badgeText: 'Câu chuyện CutTayShop',
    pageTitle: 'Sống Chất Mỗi Ngày Cùng CutTayShop',
    subtitle: 'Khởi nguồn từ tình yêu với công nghệ tinh giản và phong cách sống hiện đại, CutTayShop được xây dựng để mang đến trải nghiệm mua sắm trực tuyến vượt trội cho thế hệ trẻ Việt Nam.',
    inner: `  <div class="content-editorial-card">
    <h2 class="content-heading">Sứ mệnh của chúng tôi</h2>
    <p>CutTayShop tin rằng mỗi vật dụng bạn mang theo bên mình — từ chiếc tai nghe chống ồn, bình giữ nhiệt pastel đến cuốn sổ tay bìa da — đều là mảnh ghép định hình phong cách sống của bạn. Chúng tôi tuyển chọn khắt khe từng dòng sản phẩm với 3 tiêu chí cốt lõi: <strong>Chất lượng đỉnh cao • Thẩm mỹ tinh tế • Mức giá dễ tiếp cận</strong>.</p>

    <div class="values-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin: 32px 0;">
      <div class="value-item-card">
        <div class="value-icon">🛡️</div>
        <h3>100% Chính Hãng</h3>
        <p>Cam kết nguồn gốc xuất xứ rõ ràng từ các thương hiệu hàng đầu thế giới và local brand cao cấp.</p>
      </div>
      <div class="value-item-card">
        <div class="value-icon">⚡</div>
        <h3>Giao Hàng Hoả Tốc 2H</h3>
        <p>Đóng gói cẩn thận 3 lớp và vận chuyển tức thì đến tay bạn ngay trong ngày.</p>
      </div>
      <div class="value-item-card">
        <div class="value-icon">🔄</div>
        <h3>Đổi Trả Dễ Dàng 7 Ngày</h3>
        <p>Hỗ trợ đổi trả miễn phí tận nơi nếu sản phẩm có bất kỳ lỗi sản xuất nào.</p>
      </div>
    </div>

    <h2 class="content-heading">Đội ngũ sáng lập</h2>
    <p>Được dẫn dắt bởi các chuyên gia công nghệ, nhà thiết kế sản phẩm và những người đam mê phong cách sống tối giản, CutTayShop không ngừng đổi mới giao diện và quy trình để mang lại niềm vui mua sắm trọn vẹn nhất cho khách hàng.</p>
  </div>`,
  });
}

export function renderCareers() {
  return editorialPage({
    title: 'Cơ Hội Nghề Nghiệp — Gia Nhập Đội Ngũ CutTayShop',
    badgeClass: 'badge-mint',
    badgeIcon: '🚀',
    badgeText: 'Cùng tạo dựng tương lai thương mại điện tử',
    pageTitle: 'Gia Nhập Đội Ngũ CutTayShop',
    subtitle: 'Khám phá môi trường làm việc cởi mở, sáng tạo và chế độ đãi ngộ hàng đầu trong ngành công nghệ & bán lẻ.',
    inner: `  <div class="careers-list" style="display: flex; flex-direction: column; gap: 20px;">
    <div class="career-item-card" style="padding: 24px; background: var(--color-bg-secondary); border-radius: var(--radius-lg); border: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
      <div>
        <span class="badge-capsule badge-sky">Technology</span>
        <h3 style="font-size: 1.25rem; font-weight: 700; margin: 8px 0 4px;">Senior Node.js / Fullstack Engineer</h3>
        <p style="color: var(--color-text-secondary); font-size: 0.875rem;">Hà Nội / Hybrid • Full-time • Mức lương cạnh tranh</p>
      </div>
      <a href="mailto:tuyendung@cuttayshop.vn?subject=Ứng tuyển Senior Node.js" class="btn-pill btn-pill-primary">Ứng tuyển ngay →</a>
    </div>

    <div class="career-item-card" style="padding: 24px; background: var(--color-bg-secondary); border-radius: var(--radius-lg); border: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
      <div>
        <span class="badge-capsule badge-peach">Design</span>
        <h3 style="font-size: 1.25rem; font-weight: 700; margin: 8px 0 4px;">Product UI/UX &amp; Motion Designer</h3>
        <p style="color: var(--color-text-secondary); font-size: 0.875rem;">TP. Hồ Chí Minh / Hà Nội • Full-time</p>
      </div>
      <a href="mailto:tuyendung@cuttayshop.vn?subject=Ứng tuyển UI/UX Designer" class="btn-pill btn-pill-primary">Ứng tuyển ngay →</a>
    </div>
  </div>`,
  });
}

export function renderContact({ successMessage, errorMessage } = {}) {
  const ok = successMessage ? alert('success', successMessage) : '';
  const err = errorMessage ? alert('danger', errorMessage) : '';

  return layout({
    title: 'Liên Hệ & Hỗ Trợ Khách Hàng — CutTayShop',
    body: `${pageHeaderEditorial({
      badgeClass: 'badge-sky',
      badgeIcon: '📞',
      badgeText: 'Luôn sẵn sàng đồng hành',
      title: 'Liên Hệ Với CutTayShop',
      subtitle: 'Bạn cần tư vấn sản phẩm, kiểm tra đơn hàng hay đóng góp ý kiến? Đội ngũ hỗ trợ của chúng tôi sẵn sàng phục vụ bạn 24/7.',
    })}

<div class="container-custom" style="padding-top: 48px; padding-bottom: 80px;">
  ${ok}
  ${err}

  <div class="contact-grid">
    <div class="contact-info-col">
      <div class="contact-method-card">
        <div class="method-icon">📍</div>
        <div class="method-body">
          <h3>Trụ sở chính</h3>
          <p>Số 18, Ngõ 45 phố Nguyễn Đình Chiểu, Phường Lê Đại Hành, Quận Hai Bà Trưng, TP. Hà Nội</p>
        </div>
      </div>

      <div class="contact-method-card">
        <div class="method-icon">📞</div>
        <div class="method-body">
          <h3>Tổng đài chăm sóc khách hàng</h3>
          <p><strong>1900 8888</strong> (Miễn phí cuộc gọi, 8:00 - 22:00 hàng ngày)</p>
        </div>
      </div>

      <div class="contact-method-card">
        <div class="method-icon">✉️</div>
        <div class="method-body">
          <h3>Hộp thư điện tử</h3>
          <p>cskh@cuttayshop.vn • kinhdoanh@cuttayshop.vn</p>
        </div>
      </div>

      <div class="contact-method-card">
        <div class="method-icon">💬</div>
        <div class="method-body">
          <h3>Trợ lý CutTay AI 24/7</h3>
          <p>Nhấp vào biểu tượng AI ở góc phải màn hình để được hỗ trợ tức thì.</p>
        </div>
      </div>
    </div>

    <div class="contact-form-col">
      <div class="contact-form-card">
        <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 16px;">Gửi phản hồi hoặc yêu cầu hỗ trợ</h2>
        <form action="/lien-he" method="post">
          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label">Họ và tên <span class="required">*</span></label>
            <input type="text" name="fullName" class="form-control" placeholder="Ví dụ: Nguyễn Văn An" required />
          </div>
          <div class="form-row-2" style="margin-bottom: 16px;">
            <div class="form-group">
              <label class="form-label">Email <span class="required">*</span></label>
              <input type="email" name="email" class="form-control" placeholder="an.nguyen@example.com" required />
            </div>
            <div class="form-group">
              <label class="form-label">Số điện thoại</label>
              <input type="tel" name="phone" class="form-control" placeholder="0988 123 456" />
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label">Nội dung tin nhắn <span class="required">*</span></label>
            <textarea name="message" class="form-control" rows="4" placeholder="Nhập chi tiết yêu cầu của bạn..." required></textarea>
          </div>
          <button type="submit" class="btn-pill btn-pill-primary btn-block btn-pill-lg">
            Gửi tin nhắn ngay →
          </button>
        </form>
      </div>
    </div>
  </div>
</div>`,
    active: 'contact',
  });
}

export function renderFAQ() {
  const items = [
    {
      q: '1. CutTayShop có cam kết hàng chính hãng 100% không?',
      a: 'Tất cả sản phẩm tại CutTayShop đều được nhập khẩu chính ngạch hoặc phân phối trực tiếp từ nhà sản xuất với đầy đủ hóa đơn, tem mác và phiếu bảo hành chính hãng. Chúng tôi cam kết hoàn tiền 200% nếu phát hiện hàng không chính hãng.',
    },
    {
      q: '2. Thời gian giao hàng mất bao lâu?',
      a: '• <strong>Nội thành Hà Nội &amp; TP.HCM:</strong> Giao hàng hỏa tốc trong 2 giờ hoặc trong ngày theo yêu cầu.<br />• <strong>Các tỉnh thành khác:</strong> Từ 2 - 3 ngày làm việc qua dịch vụ vận chuyển nhanh.',
    },
    {
      q: '3. Chính sách đổi trả hàng trong 7 ngày như thế nào?',
      a: 'Bạn được quyền đổi trả hàng miễn phí trong vòng 7 ngày kể từ khi nhận kiện hàng nếu sản phẩm gặp lỗi từ nhà sản xuất, bị hư hỏng trong quá trình vận chuyển hoặc không đúng mô tả. Vui lòng giữ nguyên tem mác và bao bì gốc khi gửi đổi trả.',
    },
    {
      q: '4. CutTayShop hỗ trợ các phương thức thanh toán nào?',
      a: 'Chúng tôi hỗ trợ đa dạng phương thức: Thanh toán tiền mặt khi nhận hàng (COD), Quét mã VietQR tiện lợi từ 40+ ứng dụng ngân hàng, và thẻ ATM nội địa / Internet Banking.',
    },
    {
      q: '5. Làm thế nào để trở thành hội viên CutTayShop+?',
      a: 'Bạn chỉ cần tạo tài khoản thành viên miễn phí tại website. Mọi đơn hàng thành công sẽ tự động tích điểm CutTayShop+ để nâng hạng từ Bạc lên Vàng và Kim Cương với nhiều ưu đãi giảm giá độc quyền.',
    },
  ];

  const accordion = items.map((item, i) => `
    <details class="faq-item"${i === 0 ? ' open' : ''}>
      <summary class="faq-question">${item.q}</summary>
      <div class="faq-answer">
        <p>${item.a}</p>
      </div>
    </details>`).join('\n');

  return editorialPage({
    title: 'Câu Hỏi Thường Gặp (FAQ) — CutTayShop',
    badgeClass: 'badge-mint',
    badgeIcon: '💡',
    badgeText: 'Giải đáp mọi thắc mắc',
    pageTitle: 'Câu Hỏi Thường Gặp (FAQ)',
    subtitle: 'Tổng hợp câu trả lời nhanh cho các vấn đề về đặt hàng, thanh toán, vận chuyển và chính sách đổi trả.',
    inner: `  <div class="faq-accordion-group">
${accordion}
  </div>`,
  });
}

export function renderPaymentMethods() {
  return editorialPage({
    title: 'Phương Thức Thanh Toán — CutTayShop',
    badgeClass: 'badge-mint',
    badgeIcon: '💳',
    badgeText: 'Tiện lợi & An toàn',
    pageTitle: 'Phương Thức Thanh Toán Tại CutTayShop',
    subtitle: 'Đa dạng lựa chọn thanh toán linh hoạt, bảo mật tuyệt đối cho mọi khách hàng.',
    inner: `  <div class="content-editorial-card">
    <h2 class="content-heading">1. Thanh toán tiền mặt khi nhận hàng (COD)</h2>
    <p>Khách hàng có thể thanh toán tiền mặt trực tiếp cho nhân viên bưu tá khi nhận kiện hàng. Đây là hình thức an tâm và phổ biến nhất được hỗ trợ trên 63 tỉnh thành.</p>

    <h2 class="content-heading">2. Chuyển khoản VietQR tức thì</h2>
    <p>Quét mã QR bằng ứng dụng ngân hàng di động (MoMo, ZaloPay, Vietcombank, Techcombank, MB Bank, v.v.). Hệ thống tự động đối soát giao dịch trong 3 giây mà không cần nhập số tài khoản thủ công.</p>
  </div>`,
  });
}

export function renderPrivacyPolicy() {
  return editorialPage({
    title: 'Chính Sách Bảo Mật Thông Tin — CutTayShop',
    badgeClass: 'badge-sky',
    badgeIcon: '🔒',
    badgeText: 'Bảo vệ quyền riêng tư',
    pageTitle: 'Chính Sách Bảo Mật Thông Tin',
    subtitle: 'Cam kết bảo vệ tuyệt đối dữ liệu cá nhân của khách hàng theo tiêu chuẩn an toàn thông tin.',
    inner: `  <div class="content-editorial-card">
    <h2 class="content-heading">1. Mục đích thu thập thông tin</h2>
    <p>CutTayShop chỉ thu thập các thông tin tối thiểu cần thiết để phục vụ công tác giao nhận đơn hàng và chăm sóc khách hàng, bao gồm: Họ tên, số điện thoại, địa chỉ nhận hàng và địa chỉ email nhận hóa đơn điện tử.</p>

    <h2 class="content-heading">2. Phạm vi sử dụng thông tin</h2>
    <p>Thông tin của bạn chỉ được sử dụng nội bộ nhằm mục đích:</p>
    <ul>
      <li>Xử lý và bàn giao kiện hàng cho đối tác vận chuyển được ủy quyền.</li>
      <li>Gửi thông báo tiến độ đơn hàng qua SMS hoặc Email.</li>
      <li>Hỗ trợ bảo hành, đổi trả và giải quyết khiếu nại của khách hàng.</li>
    </ul>

    <h2 class="content-heading">3. Cam kết bảo mật</h2>
    <p>CutTayShop áp dụng các biện pháp mã hóa dữ liệu theo tiêu chuẩn quốc tế và không chia sẻ thông tin khách hàng cho bất kỳ bên thứ ba nào ngoài đối tác vận chuyển phục vụ giao nhận đơn hàng.</p>
  </div>`,
  });
}

export function renderReturnPolicy() {
  return editorialPage({
    title: 'Chính Sách Đổi Trả 7 Ngày — CutTayShop',
    badgeClass: 'badge-peach',
    badgeIcon: '🔄',
    badgeText: 'Yên tâm mua sắm',
    pageTitle: 'Chính Sách Đổi Trả 7 Ngày Miễn Phí',
    subtitle: 'Quy định chi tiết về điều kiện và quy trình đổi mới sản phẩm tại CutTayShop.',
    inner: `  <div class="content-editorial-card">
    <h2 class="content-heading">1. Điều kiện áp dụng đổi trả</h2>
    <p>Khách hàng được quyền đổi sản phẩm mới hoặc yêu cầu hoàn tiền trong các trường hợp sau:</p>
    <ul>
      <li>Sản phẩm phát sinh lỗi kỹ thuật từ nhà sản xuất trong vòng 7 ngày đầu sử dụng.</li>
      <li>Sản phẩm bị nứt, vỡ, móp méo hoặc trầy xước do quá trình vận chuyển.</li>
      <li>Giao sai mẫu mã, sai biến thể màu sắc hoặc thiếu phụ kiện so với đơn đặt hàng.</li>
    </ul>

    <h2 class="content-heading">2. Yêu cầu đối với sản phẩm đổi trả</h2>
    <ul>
      <li>Sản phẩm còn nguyên tem niêm phong, nhãn mác của CutTayShop hoặc nhà phân phối.</li>
      <li>Đầy đủ hộp, sách hướng dẫn, phụ kiện đi kèm và quà tặng khuyến mãi (nếu có).</li>
      <li>Không có dấu hiệu va đập, ngấm nước hoặc can thiệp tháo lắp trái phép.</li>
    </ul>

    <h2 class="content-heading">3. Quy trình thực hiện đổi trả 3 bước</h2>
    <ol>
      <li><strong>Bước 1:</strong> Liên hệ hotline 1900 8888 hoặc gửi email tới cskh@cuttayshop.vn kèm hình ảnh/video sản phẩm.</li>
      <li><strong>Bước 2:</strong> CutTayShop cử bưu tá đến thu hồi sản phẩm tận nơi hoàn toàn miễn phí cước vận chuyển.</li>
      <li><strong>Bước 3:</strong> Ngay sau khi kiểm tra kiện hàng hoàn về, chúng tôi sẽ gửi sản phẩm mới hoặc hoàn tiền trong vòng 24 giờ.</li>
    </ol>
  </div>`,
  });
}

export function renderShippingPolicy() {
  return editorialPage({
    title: 'Chính Sách Giao Hàng & Vận Chuyển — CutTayShop',
    badgeClass: 'badge-mint',
    badgeIcon: '🚚',
    badgeText: 'Giao nhanh toàn quốc',
    pageTitle: 'Chính Sách Vận Chuyển & Cước Phí',
    subtitle: 'Thông tin về thời gian giao hàng, bảng giá cước và chính sách miễn phí vận chuyển.',
    inner: `  <div class="content-editorial-card">
    <h2 class="content-heading">1. Bảng giá cước vận chuyển tiêu chuẩn</h2>
    <table class="table-styled" style="width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 24px;">
      <thead>
        <tr style="background: var(--color-bg-secondary); text-align: left;">
          <th style="padding: 12px;">Khu vực giao hàng</th>
          <th style="padding: 12px;">Thời gian dự kiến</th>
          <th style="padding: 12px;">Cước phí</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid var(--color-border);">
          <td style="padding: 12px;">Nội thành Hà Nội &amp; TP.HCM (Hỏa tốc 2H)</td>
          <td style="padding: 12px;">Dưới 2 giờ</td>
          <td style="padding: 12px;">45.000 ₫</td>
        </tr>
        <tr style="border-bottom: 1px solid var(--color-border);">
          <td style="padding: 12px;">Nội thành Hà Nội &amp; TP.HCM (Tiêu chuẩn)</td>
          <td style="padding: 12px;">1 - 2 ngày</td>
          <td style="padding: 12px;">25.000 ₫</td>
        </tr>
        <tr>
          <td style="padding: 12px;">Các tỉnh thành toàn quốc</td>
          <td style="padding: 12px;">2 - 3 ngày</td>
          <td style="padding: 12px;">30.000 ₫</td>
        </tr>
      </tbody>
    </table>

    <h2 class="content-heading">2. Chính sách miễn phí vận chuyển (Freeship)</h2>
    <p>• <strong>Đơn hàng từ 250.000 ₫:</strong> Tặng mã giảm 30.000 ₫ phí ship khi nhập coupon <code>FREESHIP50</code>.</p>
    <p>• <strong>Hội viên CutTayShop+ Vàng &amp; Kim Cương:</strong> Tặng 4 mã Freeship toàn quốc vào ngày đầu mỗi tháng.</p>

    <h2 class="content-heading">3. Đồng kiểm khi nhận hàng</h2>
    <p>Khách hàng có quyền yêu cầu đồng kiểm tra ngoại quan kiện hàng cùng nhân viên bưu tá trước khi ký nhận và thanh toán tiền mặt (COD).</p>
  </div>`,
  });
}

export function renderTerms() {
  return editorialPage({
    title: 'Điều Khoản Dịch Vụ — CutTayShop',
    badgeClass: 'badge-peach',
    badgeIcon: '📜',
    badgeText: 'Quy chế hoạt động',
    pageTitle: 'Điều Khoản & Điều Kiện Giao Dịch',
    subtitle: 'Các nguyên tắc pháp lý điều chỉnh hoạt động mua sắm giữa khách hàng và CutTayShop.',
    inner: `  <div class="content-editorial-card">
    <h2 class="content-heading">1. Chấp thuận điều khoản</h2>
    <p>Khi truy cập và đặt mua sản phẩm tại nền tảng CutTayShop, bạn xác nhận rằng mình đã đọc, hiểu rõ và đồng ý tuân thủ toàn bộ các điều khoản dịch vụ được nêu tại đây.</p>

    <h2 class="content-heading">2. Giá bán và thanh toán</h2>
    <p>Tất cả giá niêm yết trên website đều được tính bằng Việt Nam Đồng (VNĐ) và đã bao gồm thuế Giá trị gia tăng (VAT) theo luật định. CutTayShop có quyền điều chỉnh giá bán theo các chương trình khuyến mãi theo từng thời điểm mà không cần thông báo trước đối với các đơn hàng chưa xác nhận.</p>

    <h2 class="content-heading">3. Quyền hủy đơn hàng</h2>
    <p>CutTayShop bảo lưu quyền từ chối hoặc hủy đơn hàng trong trường hợp: Thông tin liên hệ của khách hàng không chính xác, sản phẩm tạm thời hết hàng hoặc phát hiện hành vi gian lận mã khuyến mãi số lượng lớn.</p>
  </div>`,
  });
}

export function renderWarranty() {
  return editorialPage({
    title: 'Chính Sách Bảo Hành — CutTayShop',
    badgeClass: 'badge-sky',
    badgeIcon: '🛡️',
    badgeText: 'Cam kết chất lượng',
    pageTitle: 'Chính Sách Bảo Hành Chính Hãng',
    subtitle: 'Bảo hành 12 - 24 tháng chính hãng, 1 đổi 1 trong 30 ngày cho các sản phẩm công nghệ.',
    inner: `  <div class="content-editorial-card">
    <h2 class="content-heading">1. Thời hạn bảo hành tiêu chuẩn</h2>
    <p>• <strong>Thiết bị công nghệ &amp; điện tử:</strong> Bảo hành chính hãng 12 - 24 tháng theo tiêu chuẩn nhà sản xuất.<br />• <strong>Phụ kiện &amp; đời sống:</strong> Bảo hành 6 - 12 tháng đối với lỗi kỹ thuật phần cứng.</p>

    <h2 class="content-heading">2. Trung tâm tiếp nhận bảo hành</h2>
    <p>Khách hàng có thể mang sản phẩm tới hệ thống cửa hàng CutTayShop tại Hà Nội &amp; TP.HCM hoặc gửi chuyển phát nhanh tới trung tâm kỹ thuật của chúng tôi. Hotline kỹ thuật hỗ trợ: <strong>1900 8888 (nhánh 2)</strong>.</p>
  </div>`,
  });
}

export function renderStores() {
  return editorialPage({
    title: 'Hệ Thống Cửa Hàng Trải Nghiệm — CutTayShop',
    badgeClass: 'badge-peach',
    badgeIcon: '🏬',
    badgeText: 'Không gian trải nghiệm',
    pageTitle: 'Hệ Thống Cửa Hàng CutTay Experience Space',
    subtitle: 'Ghé thăm các không gian trải nghiệm sản phẩm thực tế của chúng tôi tại Hà Nội và TP. Hồ Chí Minh.',
    inner: `  <div class="stores-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
    <div class="store-card" style="padding: 24px; background: var(--color-bg-secondary); border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
      <div class="badge-capsule badge-mint" style="margin-bottom: 12px;">Flagship Store Hà Nội</div>
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">CutTay Space Hai Bà Trưng</h3>
      <p style="color: var(--color-text-secondary); margin-bottom: 12px;">Số 18, Ngõ 45 phố Nguyễn Đình Chiểu, Phường Lê Đại Hành, Quận Hai Bà Trưng, Hà Nội</p>
      <p style="font-size: 0.875rem;">⏰ Giờ mở cửa: 08:30 - 21:30 hàng ngày</p>
      <p style="font-size: 0.875rem;">📞 Hotline: 024 3888 9999</p>
    </div>

    <div class="store-card" style="padding: 24px; background: var(--color-bg-secondary); border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
      <div class="badge-capsule badge-sky" style="margin-bottom: 12px;">Concept Store TP.HCM</div>
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">CutTay Space Quận 1</h3>
      <p style="color: var(--color-text-secondary); margin-bottom: 12px;">Tầng 2, 120 Đồng Khởi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
      <p style="font-size: 0.875rem;">⏰ Giờ mở cửa: 09:00 - 22:00 hàng ngày</p>
      <p style="font-size: 0.875rem;">📞 Hotline: 028 3888 8888</p>
    </div>
  </div>`,
  });
}
