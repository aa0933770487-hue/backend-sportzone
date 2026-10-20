const Product = require('../models/product.model');

// [SỬA ĐỔI] Nâng cấp hàm lấy danh sách sản phẩm: bổ sung phân trang, lọc đa điều kiện và sắp xếp
const getAllProductsService = async (queryParams = {}) => {
  // 1. Phân trang: Mặc định trang 1, mỗi trang 12 sản phẩm
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || 12;
  const skip = (page - 1) * limit;

  // 2. Bộ lọc đa điều kiện
  const { category, brand, size, minPrice, maxPrice, sort } = queryParams;
  const filter = {};

  // Lọc category (hỗ trợ nhiều danh mục cách nhau bằng dấu phẩy: ?category=Ao,Quan)
  if (category) {
    const categories = category.split(',').map((c) => new RegExp(`^${c.trim()}$`, 'i'));
    filter.category = { $in: categories };
  }

  // Lọc brand (hỗ trợ nhiều thương hiệu: ?brand=Nike,Adidas)
  if (brand) {
    const brands = brand.split(',').map((b) => new RegExp(`^${b.trim()}$`, 'i'));
    filter.brand = { $in: brands };
  }

  // Lọc size (tìm giá trị nằm trong mảng sizes)
  if (size) {
    const sizesArray = size.split(',').map((s) => s.trim());
    filter.sizes = { $in: sizesArray };
  }

  // Lọc theo khoảng giá
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  // 3. Tùy chọn sắp xếp
  let sortOption = { createdAt: -1 }; // Mặc định: Mới nhất lên đầu
  if (sort === 'price-asc') sortOption = { price: 1 };
  if (sort === 'price-desc') sortOption = { price: -1 };
  if (sort === 'name-asc') sortOption = { name: 1 };

  // 4. Chạy song song truy vấn dữ liệu và đếm tổng số bản ghi
  const [products, totalProducts] = await Promise.all([
    Product.find(filter).sort(sortOption).skip(skip).limit(limit),
    Product.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(totalProducts / limit);

  return {
    pagination: {
      currentPage: page,
      limit,
      totalProducts,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    },
    products
  };
};

// [THÊM MỚI] Tìm kiếm sản phẩm theo tên hoặc slug
const searchProductsService = async (keyword) => {
  return await Product.find({
    $or: [
      { name: { $regex: keyword,$options: 'i' } },
      { slug: { $regex: keyword,$options: 'i' } }
    ]
  })
    .sort({ createdAt: -1 })
    .limit(20);
};

// [THÊM MỚI] Lấy danh sách sản phẩm nổi bật cho trang chủ
const getFeaturedProductsService = async (limit = 8) => {
  return await Product.find({ isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// [GIỮ NGUYÊN] Tạo sản phẩm mới
const createProductService = async (data) => {
  return await Product.create(data);
};

module.exports = {
  getAllProductsService,
  searchProductsService,
  getFeaturedProductsService,
  createProductService
};
