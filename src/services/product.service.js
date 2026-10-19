const Product = require('../models/product.model');

const getAllProductsService = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

const createProductService = async (data) => {
  return await Product.create(data);
};

module.exports = { getAllProductsService, createProductService };