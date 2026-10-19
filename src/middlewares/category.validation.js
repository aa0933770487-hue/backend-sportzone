const { body, validationResult } = require('express-validator');
const { sendError } = require('../utils/responseHandler');

const validateCategory = [
  body('category_name')
    .notEmpty()
    .withMessage('Tên danh mục không được để trống')
    .isLength({ min: 2, max: 50 })
    .withMessage('Tên danh mục phải từ 2 đến 50 ký tự'),

  // Middleware kiểm tra kết quả validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, 'Dữ liệu không hợp lệ', errors.array());
    }
    next();
  },
];

module.exports = { validateCategory };