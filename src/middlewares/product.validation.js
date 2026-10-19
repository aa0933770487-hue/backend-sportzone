const { body, validationResult } = require('express-validator');
const { sendError } = require('../utils/responseHandler');

const validateProduct = [
  body('name')
    .notEmpty().withMessage('Tên sản phẩm không được để trống')
    .isLength({ min: 3 }).withMessage('Tên sản phẩm phải từ 3 ký tự trở lên'),
  
  body('category_id')
    .notEmpty().withMessage('Vui lòng chọn danh mục cho sản phẩm')
    .isMongoId().withMessage('ID danh mục không hợp lệ'),

  body('price')
    .notEmpty().withMessage('Giá sản phẩm không được để trống')
    .isNumeric().withMessage('Giá sản phẩm phải là chữ số')
    .custom(value => value >= 0).withMessage('Giá sản phẩm không được nhỏ hơn 0'),

  body('brand_id')
    .notEmpty().withMessage('Vui lòng chọn thương hiệu'),

  // Middleware hứng lỗi validation chung
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, 'Dữ liệu sản phẩm không hợp lệ', errors.array());
    }
    next();
  }
];

module.exports = { validateProduct };