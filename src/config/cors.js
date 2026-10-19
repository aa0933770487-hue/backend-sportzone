const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Cho phép FE truy cập
  credentials: true, // Cho phép gửi cookie / header xác thực nếu có
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions;