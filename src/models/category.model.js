const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: [true, 'Tên danh mục không được để trống'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: Boolean,
      default: true, // true: Hoạt động/Hiện, false: Ẩn
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);