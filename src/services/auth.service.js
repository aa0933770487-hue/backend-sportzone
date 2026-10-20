const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hàm tạo JWT Token
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// 1. Đăng ký tài khoản
const registerService = async (userData) => {
  const { full_name, email, password, phone, role } = userData;

  // Kiểm tra email đã tồn tại chưa
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email này đã được đăng ký tài khoản khác');
  }

  // Băm mật khẩu bằng bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Tạo tài khoản mới
  const newUser = await User.create({
    full_name,
    email,
    password: hashedPassword,
    phone: phone || '',
    role: role === 'admin' ? 'admin' : 'user', // Mặc định là user
  });

  // Tạo JWT token
  const token = generateToken(newUser._id, newUser.role);

  return {
    user: {
      id: newUser._id,
      full_name: newUser.full_name,
      email: newUser.email,
      role: newUser.role,
    },
    token,
  };
};

// 2. Đăng nhập
const loginService = async (email, password) => {
  // Tìm user và lấy luôn trường password (vì model cài select: false)
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Email hoặc mật khẩu không chính xác');
  }

  if (!user.status) {
    throw new Error('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin!');
  }

  // So sánh mật khẩu nhập vào với mật khẩu băm trong DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Email hoặc mật khẩu không chính xác');
  }

  // Tạo token
  const token = generateToken(user._id, user.role);

  return {
    user: {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

// 3. Lấy thông tin cá nhân hiện tại
const getProfileService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Không tìm thấy thông tin người dùng');
  }
  return user;
};

module.exports = {
  registerService,
  loginService,
  getProfileService,
};