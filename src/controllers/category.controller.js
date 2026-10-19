const categoryService = require('../services/category.service');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');

// 1. Lấy danh sách danh mục
const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories(req.query);
  return sendSuccess(res, 200, 'Lấy danh sách danh mục thành công', categories);
});

// 2. Lấy chi tiết 1 danh mục theo ID
const getCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  if (!category) {
    return sendError(res, 404, 'Danh mục không tồn tại');
  }
  return sendSuccess(res, 200, 'Lấy thông tin danh mục thành công', category);
});

// 3. Tạo mới danh mục
const createCategory = asyncHandler(async (req, res) => {
  const newCategory = await categoryService.createCategory(req.body);
  return sendSuccess(res, 201, 'Tạo danh mục thành công', newCategory);
});

// 4. Cập nhật danh mục
const updateCategory = asyncHandler(async (req, res) => {
  const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
  return sendSuccess(res, 200, 'Cập nhật danh mục thành công', updatedCategory);
});

// 5. Xóa danh mục
const deleteCategory = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  return sendSuccess(res, 200, 'Xóa danh mục thành công');
});

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};