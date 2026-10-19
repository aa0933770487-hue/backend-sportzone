const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/cors');
const errorHandler = require('./middlewares/error.middleware'); // Import error handler

const categoryRoutes = require('./routes/category.route');
const productRoutes = require('./routes/product.route');

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);

// ⚠️ BẮT BỘC: Đặt Middleware xử lý lỗi DƯỚI CÙNG sau tất cả các routes
app.use(errorHandler);

module.exports = app;