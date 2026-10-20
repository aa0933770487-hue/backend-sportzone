const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { sendError } = require('../utils/responseHandler');

// 1. Middleware kiểm tra đã đăng nhập chưa (Verify Token)
const verifyToken = async (req, res, next) => {
  try {
    let token;

    // Token gửi qua header dạng: "Authorization: Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return sendError(res, 401, 'Bạn chưa đăng nhập. Vui lòng gửi kèm Token xác thực!');
    }

    // Giải mã Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kiểm tra xem User có còn tồn tại không
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return sendError(res, 401, 'Tài khoản sở hữu token này không còn tồn tại trên hệ thống');
    }

    if (!currentUser.status) {
      return sendError(res, 403, 'Tài khoản của bạn đã bị khóa!');
    }

    // Gắn thông tin User vào biến req để các hàm sau dùng
    req.user = currentUser;
    next();
  } catch (error) {
    return sendError(res, 401, 'Token không hợp lệ hoặc đã hết hạn');
  }
};

// 2. Middleware phân quyền Admin
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return sendError(res, 403, 'Quyền truy cập bị từ chối. Chỉ dành cho Admin!');
  }
};

module.exports = { verifyToken, verifyAdmin };