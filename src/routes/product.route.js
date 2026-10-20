const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// --- CÁC ROUTE MỚI THÊM VÀO ---
// 1. Tìm kiếm sản phẩm theo tên / slug (GET /api/products/search?q=...)
router.get('/search', productController.searchProducts);

// 2. Lấy danh sách sản phẩm nổi bật (GET /api/products/featured)
router.get('/featured', productController.getFeaturedProducts);

// --- ROUTE CŨ CỦA BẠN ---
// 3. Lấy danh sách sản phẩm (có lọc đa điều kiện category, brand, size, price + phân trang)
router.get('/', productController.getProducts);

// 4. Tạo sản phẩm mới
router.post('/', productController.createProduct);

module.exports = router;
