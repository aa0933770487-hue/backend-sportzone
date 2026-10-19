const { sendError } = require('../utils/responseHandler');

const errorHandler = (err, req, res, next) => {
  console.error(`❌ [ERROR LOG]: ${err.stack}`);

  if (err.name === 'CastError') {
    return sendError(res, 400, `Định dạng ID không hợp lệ: ${err.value}`);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue);
    return sendError(res, 400, `Giá trị '${err.keyValue[field]}' cho trường '${field}' đã tồn tại!`);
  }

  return sendError(res, err.statusCode || 500, err.message || 'Lỗi hệ thống nội bộ (Server Error)');
};

module.exports = errorHandler;