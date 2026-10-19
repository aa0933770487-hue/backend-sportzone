const Category = require('../models/category.model');
const Product = require('../models/product.model'); // Model Sản phẩm để kiểm tra ràng buộc
const slugify = require('slugify');

// 1. Lấy danh sách danh mục (Hỗ trợ phân trang / lọc nếu cần)
const getAllCategories = async (query) => {
  return await Category.find().sort({ createdAt: -1 });
};

// 2. Lấy chi tiết 1 danh mục
const getCategoryById = async (id) => {
  return await Category.findById(id);
};

// 3. Tạo mới danh mục
const createCategory = async (data) => {
  const { category_name, description } = data;

  // Kiểm tra tên danh mục đã tồn tại chưa
  const existingCategory = await Category.findOne({ category_name });
  if (existingCategory) {
    throw new Error('Tên danh mục này đã tồn tại');
  }

  const slug = slugify(category_name, { lower: true, strict: true });

  return await Category.create({
    category_name,
    slug,
    description,
  });
};

// 4. Cập nhật danh mục
const updateCategory = async (id, data) => {
  const { category_name, description, status } = data;

  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Không tìm thấy danh mục');
  }

  // Nếu đổi tên, kiểm tra trùng tên với danh mục khác
  if (category_name && category_name !== category.category_name) {
    const existing = await Category.findOne({ category_name });
    if (existing) {
      throw new Error('Tên danh mục đã tồn tại');
    }
    category.category_name = category_name;
    category.slug = slugify(category_name, { lower: true, strict: true });
  }

  if (description !== undefined) category.description = description;
  if (status !== undefined) category.status = status;

  return await category.save();
};

// 5. Xóa danh mục (Có kiểm tra dữ liệu liên quan)
const deleteCategory = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Không tìm thấy danh mục');
  }

  // ⚠️ KIỂM TRA DỮ LIỆU LIÊN QUAN: Xem danh mục này có đang chứa sản phẩm nào không
  const productsCount = await Product.countDocuments({ category_id: id });
  if (productsCount > 0) {
    throw new Error(
      `Không thể xóa danh mục này vì đang có ${productsCount} sản phẩm liên quan. Vui lòng di chuyển hoặc xóa sản phẩm trước!`
    );
  }

  return await Category.findByIdAndDelete(id);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};