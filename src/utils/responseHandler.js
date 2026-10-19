// Trả về khi THÀNH CÔNG
const sendSuccess = (res, statusCode = 200, message = 'Thành công', data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Trả về khi THẤT BẠI
const sendError = (res, statusCode = 400, message = 'Lỗi', errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = { sendSuccess, sendError };