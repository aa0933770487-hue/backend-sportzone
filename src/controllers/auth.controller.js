const authService = require('../services/auth.service');
const { sendSuccess } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');

// Đăng ký
const register = asyncHandler(async (req, res) => {
  const result = await authService.registerService(req.body);
  return sendSuccess(res, 201, 'Đăng ký tài khoản thành công', result);
});

// Đăng nhập
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginService(email, password);
  return sendSuccess(res, 200, 'Đăng nhập thành công', result);
});

// Lấy thông tin cá nhân (Cần có verifyToken)
const getProfile = asyncHandler(async (req, res) => {
  const profile = await authService.getProfileService(req.user._id);
  return sendSuccess(res, 200, 'Lấy thông tin cá nhân thành công', profile);
});

module.exports = {
  register,
  login,
  getProfile,
};