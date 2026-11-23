/** Route cổng tài khoản khách hàng + auth thật (session + scrypt). */
import * as repo from '../repository.mjs';
import { sendHtml, redirect } from '../http/utils.mjs';
import {
  hashPassword, verifyPassword, newSessionToken, sessionExpiry,
  sessionCookie, clearSessionCookie,
} from '../auth.mjs';
import {
  renderAccountIndex, renderAccountOrders, renderAccountOrderDetail,
  renderAccountAddresses, renderAccountVouchers, renderAccountLoyalty,
  renderAccountProfile, renderAccountChangePassword, renderAccountReviews,
  renderLogin, renderRegister, renderForgotPassword, renderResetPassword, renderVerifyEmail,
} from '../views/account.mjs';
import { render403 } from '../views/errors.mjs';

/** Chuyển hướng về trang đăng nhập nếu chưa đăng nhập. */
export function requireLogin(req, res) {
  if (req.user) return false;
  redirect(res, `/dang-nhap?returnUrl=${encodeURIComponent(req.pathname)}`);
  return true;
}

/** Chặn truy cập cổng quản trị nếu không phải admin. */
export function requireAdmin(req, res) {
  if (req.user && req.user.role === 'admin') return false;

  if (!req.user) {
    redirect(res, `/dang-nhap?returnUrl=${encodeURIComponent(req.pathname)}`);
  } else {
    sendHtml(res, render403(), 403);
  }
  return true;
}

export function registerAccountRoutes(router) {
  /* ------------------------------------------------------------- tài khoản */

  router.get('/tai-khoan', (req, res) => {
    if (requireLogin(req, res)) return;

    const orders = repo.getOrders().filter((o) => !o.userId || o.userId === req.user.id);
    const coupons = repo.getCoupons();

    sendHtml(res, renderAccountIndex({
      customerName: req.user.fullName,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
      membershipTier: 'CutTayShop+ Vàng',
      rewardPoints: 1250,
      orderCount: orders.length,
      voucherCount: coupons.length,
      recentOrders: orders,
      vouchers: coupons,
    }));
  });

  router.get('/tai-khoan/ho-so', (req, res) => {
    if (requireLogin(req, res)) return;
    sendHtml(res, renderAccountProfile({
      profile: {
        fullName: req.user.fullName,
        phoneNumber: req.user.phoneNumber,
        email: req.user.email,
        birthday: req.user.birthday || '',
      },
    }));
  });

  router.post('/tai-khoan/ho-so', (req, res) => {
    if (requireLogin(req, res)) return;
    const body = req.body || {};

    repo.updateUserProfile(req.user.id, {
      fullName: body.fullName || req.user.fullName,
      phoneNumber: body.phone || req.user.phoneNumber,
      email: body.email || req.user.email,
      birthday: body.birthday || null,
    });

    sendHtml(res, renderAccountProfile({
      profile: {
        fullName: body.fullName || req.user.fullName,
        phoneNumber: body.phone || req.user.phoneNumber,
        email: body.email || req.user.email,
        birthday: body.birthday || '',
      },
      successMessage: 'Cập nhật thông tin hồ sơ cá nhân thành công!',
    }));
  });

  router.get('/tai-khoan/dia-chi', (req, res) => {
    if (requireLogin(req, res)) return;
    sendHtml(res, renderAccountAddresses(repo.getAddresses()));
  });

  router.get('/tai-khoan/don-hang', (req, res) => {
    if (requireLogin(req, res)) return;
    const orders = repo.getOrders().filter((o) => !o.userId || o.userId === req.user.id);
    sendHtml(res, renderAccountOrders(orders, req.query.tab || 'all'));
  });

  router.get('/tai-khoan/don-hang/:code', (req, res) => {
    if (requireLogin(req, res)) return;
    const order = repo.getOrderByCode(req.params.code);
    if (!order) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not Found');
    }
    sendHtml(res, renderAccountOrderDetail(order));
  });

  router.get('/tai-khoan/cuttayshop-plus', (req, res) => {
    if (requireLogin(req, res)) return;
    sendHtml(res, renderAccountLoyalty());
  });

  router.get('/tai-khoan/ma-giam-gia', (req, res) => {
    if (requireLogin(req, res)) return;
    sendHtml(res, renderAccountVouchers(repo.getCoupons()));
  });

  router.get('/tai-khoan/doi-mat-khau', (req, res) => {
    if (requireLogin(req, res)) return;
    sendHtml(res, renderAccountChangePassword({}));
  });

  router.post('/tai-khoan/doi-mat-khau', (req, res) => {
    if (requireLogin(req, res)) return;
    const body = req.body || {};

    if (!verifyPassword(body.currentPassword || '', req.user.password_hash)) {
      return sendHtml(res, renderAccountChangePassword({
        errorMessage: 'Mật khẩu hiện tại không đúng',
      }), 400);
    }

    if (body.newPassword !== body.confirmPassword) {
      return sendHtml(res, renderAccountChangePassword({
        errorMessage: 'Mật khẩu xác nhận không khớp',
      }), 400);
    }

    if (!body.newPassword || body.newPassword.length < 6) {
      return sendHtml(res, renderAccountChangePassword({
        errorMessage: 'Mật khẩu mới tối thiểu 6 ký tự',
      }), 400);
    }

    repo.updateUserPassword(req.user.id, hashPassword(body.newPassword));
    repo.logAudit({ userId: req.user.id, action: 'change_password', entity: 'user', entityId: req.user.id });

    sendHtml(res, renderAccountChangePassword({ successMessage: 'Đổi mật khẩu thành công!' }));
  });

  router.get('/tai-khoan/danh-gia', (req, res) => {
    if (requireLogin(req, res)) return;
    sendHtml(res, renderAccountReviews(repo.getFeaturedProducts()));
  });

  /* ------------------------------------------------------------------ auth */

  router.get('/dang-nhap', (req, res) => {
    if (req.user) return redirect(res, req.user.role === 'admin' ? '/admin' : '/tai-khoan');

    sendHtml(res, renderLogin({
      returnUrl: req.query.returnUrl || '',
      registerSuccess: req.query.registered === '1'
        ? 'Đăng ký tài khoản thành công! Bạn nhận được voucher chào mừng CUTTAYNEW 20.000đ.'
        : null,
      successMessage: req.query.reset === '1'
        ? 'Đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.'
        : null,
    }));
  });

  router.post('/dang-nhap', (req, res) => {
    const body = req.body || {};
    const identifier = (body.identifier || '').trim();
    const password = body.password || '';

    if (!identifier || !password) {
      return sendHtml(res, renderLogin({
        errorMessage: 'Vui lòng nhập đầy đủ Email/Số điện thoại và Mật khẩu.',
        returnUrl: body.returnUrl || '',
      }), 400);
    }

    const user = repo.getUserByEmail(identifier);
    if (!user || !verifyPassword(password, user.password_hash)) {
      return sendHtml(res, renderLogin({
        errorMessage: 'Email/Số điện thoại hoặc mật khẩu không đúng.',
        returnUrl: body.returnUrl || '',
      }), 401);
    }

    if (user.status !== 'active') {
      return sendHtml(res, renderLogin({
        errorMessage: 'Tài khoản đã bị khoá. Vui lòng liên hệ bộ phận hỗ trợ.',
        returnUrl: body.returnUrl || '',
      }), 403);
    }

    const token = newSessionToken();
    repo.createSession(token, user.id, sessionExpiry());
    repo.purgeExpiredSessions();

    // Gộp giỏ hàng khách vào giỏ tài khoản
    repo.mergeGuestCart(req.guestKey, user.id);

    repo.logAudit({ userId: user.id, action: 'login', entity: 'user', entityId: user.id });

    const returnUrl = body.returnUrl || '';
    const target = returnUrl.startsWith('/') && !returnUrl.startsWith('//')
      ? returnUrl
      : (user.role === 'admin' ? '/admin' : '/tai-khoan');

    res.setHeader('Set-Cookie', sessionCookie(token));
    redirect(res, target);
  });

  router.get('/dang-ky', (req, res) => {
    if (req.user) return redirect(res, '/tai-khoan');
    sendHtml(res, renderRegister({}));
  });

  router.post('/dang-ky', (req, res) => {
    const body = req.body || {};
    const errors = {};

    if (!body.fullName?.trim()) errors.fullName = 'Vui lòng nhập Họ và tên';
    if (!body.email?.trim()) errors.email = 'Vui lòng nhập Email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.email = 'Email không hợp lệ';
    else if (repo.getUserByEmail(body.email)) errors.email = 'Email này đã được đăng ký';
    if (!body.phoneNumber?.trim()) errors.phoneNumber = 'Vui lòng nhập Số điện thoại';
    if (!body.password) errors.password = 'Vui lòng nhập Mật khẩu';
    else if (body.password.length < 6) errors.password = 'Mật khẩu tối thiểu 6 ký tự';
    if (body.password !== body.confirmPassword) errors.confirmPassword = 'Mật khẩu xác nhận không khớp';

    if (Object.keys(errors).length) {
      return sendHtml(res, renderRegister({ errors }), 400);
    }

    const user = repo.createUser({
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      phoneNumber: body.phoneNumber.trim(),
      passwordHash: hashPassword(body.password),
      role: 'customer',
    });

    repo.logAudit({ userId: user.id, action: 'register', entity: 'user', entityId: user.id });

    redirect(res, '/dang-nhap?registered=1');
  });

  router.get('/quen-mat-khau', (req, res) => sendHtml(res, renderForgotPassword({})));

  router.post('/quen-mat-khau', (req, res) => {
    const email = (req.body?.email || '').trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return sendHtml(res, renderForgotPassword({
        errors: { email: 'Email không hợp lệ' },
      }), 400);
    }

    sendHtml(res, renderForgotPassword({
      successMessage: `Hệ thống đã ghi nhận yêu cầu cho email: ${email}. (Trong chế độ Demo, bạn có thể bấm liên kết đặt lại mật khẩu bên dưới).`,
      demoResetLink: '/dat-lai-mat-khau?token=DEMO-RESET-TOKEN-12345',
    }));
  });

  router.get('/dat-lai-mat-khau', (req, res) => {
    sendHtml(res, renderResetPassword({ token: req.query.token || 'DEMO-TOKEN' }));
  });

  router.post('/dat-lai-mat-khau', (req, res) => {
    const body = req.body || {};
    const errors = {};

    if (!body.newPassword) errors.newPassword = 'Vui lòng nhập Mật khẩu mới';
    else if (body.newPassword.length < 6) errors.newPassword = 'Mật khẩu tối thiểu 6 ký tự';
    if (body.newPassword !== body.confirmPassword) errors.confirmPassword = 'Mật khẩu xác nhận không khớp';

    if (Object.keys(errors).length) {
      return sendHtml(res, renderResetPassword({ token: body.token, errors }), 400);
    }

    redirect(res, '/dang-nhap?reset=1');
  });

  router.get('/xac-minh-email', (req, res) => sendHtml(res, renderVerifyEmail()));

  router.post('/dang-xuat', (req, res) => {
    repo.deleteSession(req.sessionToken);
    res.setHeader('Set-Cookie', clearSessionCookie());
    redirect(res, '/');
  });

  router.get('/dang-nhap-google', (req, res) => redirect(res, '/tai-khoan'));
}
