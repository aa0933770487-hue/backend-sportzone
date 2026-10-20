const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, 'Họ và tên không được để trống'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email không được để trống'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Mật khẩu không được để trống'],
      minlength: 6,
      select: false, // Mặc định không trả mật khẩu khi query dữ liệu
    },
    phone: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    status: {
      type: Boolean,
      default: true, // true: Hoạt động, false: Khóa tài khoản
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);