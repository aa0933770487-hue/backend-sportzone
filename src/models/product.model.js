const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true }, // Phục vụ tìm kiếm theo slug/SEO
    category: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    sizes: [{ type: String, trim: true }], // Mảng các kích cỡ (ví dụ: ["S", "M", "L"] hoặc ["39", "40", "41"])
    isFeatured: { type: Boolean, default: false }, // Đánh dấu sản phẩm nổi bật
    image: { type: String, default: '' }
  },
  { timestamps: true }
);

// Tạo index để tối ưu tốc độ tìm kiếm và lọc dữ liệu
productSchema.index({ name: 'text', slug: 'text' });
productSchema.index({ category: 1, brand: 1, price: 1 });
productSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Product', productSchema);
