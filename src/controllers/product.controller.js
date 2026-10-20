const productService = require('../services/product.service');
const { sendSuccess, sendError } = require('../utils/responseHandler');

// 1. Lấy danh sách sản phẩm (hỗ trợ phân trang và lọc đa điều kiện)
const getProducts = async (req, res) => {
  try {
    const result = await productService.getAllProductsService(req.query);
    return sendSuccess(res, 200, 'Lấy danh sách sản phẩm thành công', result);
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

// 2. Tìm kiếm sản phẩm theo tên hoặc slug (MỚI THÊM)
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      return sendError(res, 400, 'Vui lòng cung cấp từ khóa tìm kiếm (q)');
    }

    const products = await productService.searchProductsService(q.trim());
    return sendSuccess(res, 200, 'Tìm kiếm sản phẩm thành công', products);
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

// 3. Lấy danh sách sản phẩm nổi bật cho trang chủ (MỚI THÊM)
const getFeaturedProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const products = await productService.getFeaturedProductsService(limit);
    return sendSuccess(res, 200, 'Lấy danh sách sản phẩm nổi bật thành công', products);
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

// 4. Tạo sản phẩm mới (giữ nguyên của bạn)
const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProductService(req.body);
    return sendSuccess(res, 201, 'Thêm sản phẩm thành công', newProduct);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

module.exports = {
  getProducts,
  searchProducts,
  getFeaturedProducts,
  createProduct
};
