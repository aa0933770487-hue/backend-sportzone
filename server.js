require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Kết nối DB trước khi lắng nghe request
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server SportZone đang chạy tại: http://localhost:${PORT}`);
  });
});