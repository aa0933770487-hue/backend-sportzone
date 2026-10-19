const productService = require('../services/product.service');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProductsService();
    return sendSuccess(res, 200, 'Lấy danh sách sản phẩm thành công', products);
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProductService(req.body);
    return sendSuccess(res, 201, 'Thêm sản phẩm thành công', newProduct);
  } catch (error) {
    return sendError(res, 400, error.message);
  }
};

module.exports = { getProducts, createProduct };