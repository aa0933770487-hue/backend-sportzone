const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { validateCategory } = require('../middlewares/category.validation');
const { verifyToken, verifyAdmin } = require('../middlewares/auth.middleware');


/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Quản lý danh mục sản phẩm (Admin)
 */

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);

// Bắt buộc đi qua middleware validation trước khi vào controller
router.post('/', verifyToken, verifyAdmin, validateCategory, categoryController.createCategory);
router.put('/:id', verifyToken, verifyAdmin, validateCategory, categoryController.updateCategory);
router.delete('/:id', verifyToken, verifyAdmin, categoryController.deleteCategory);

module.exports = router;
