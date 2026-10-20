const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../middlewares/auth.validation');
const { verifyToken } = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);

// Private route (Bắt buộc phải đăng nhập)
router.get('/me', verifyToken, authController.getProfile);

module.exports = router;