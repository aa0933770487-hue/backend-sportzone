const { body, validationResult } = require('express-validator');
const { sendError } = require('../utils/responseHandler');

const validateRegister = [
  body('full_name')
    .notEmpty()
    .withMessage('Họ và tên không được để trống')
    .isLength({ min: 2 })
    .withMessage('Họ và tên phải có ít nhất 2 ký tự'),

  body('email')
    .notEmpty()
    .withMessage('Email không được để trống')
    .isEmail()
    .withMessage('Định dạng email không hợp lệ'),

  body('password')
    .notEmpty()
    .withMessage('Mật khẩu không được để trống')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải từ 6 ký tự trở lên'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, 'Dữ liệu nhập vào không hợp lệ', errors.array());
    }
    next();
  },
];

const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email không được để trống')
    .isEmail()
    .withMessage('Định dạng email không hợp lệ'),

  body('password')
    .notEmpty()
    .withMessage('Mật khẩu không được để trống'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, 'Dữ liệu nhập vào không hợp lệ', errors.array());
    }
    next();
  },
];

module.exports = { validateRegister, validateLogin };