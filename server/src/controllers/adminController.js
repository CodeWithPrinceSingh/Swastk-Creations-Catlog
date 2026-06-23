import { db } from '../data/store.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import { isMongoMode } from '../utils/dataSource.js';
import { serializeUser } from '../utils/serialize.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    if (isMongoMode()) {
      const [totalProducts, totalCategories, totalCustomers, outOfStock, lowStockDocs, categories] =
        await Promise.all([
          Product.countDocuments(),
          Category.countDocuments(),
          User.countDocuments({ role: 'customer' }),
          Product.countDocuments({ stock: 0 }),
          Product.find({ stock: { $gt: 0, $lte: 5 } }).select('name stock'),
          Category.find(),
        ]);

      const productsByCategory = await Promise.all(
        categories.map(async (cat) => ({
          id: String(cat._id),
          name: cat.name,
          count: await Product.countDocuments({ category: cat._id }),
        }))
      );

      return res.json({
        stats: { totalProducts, totalCategories, totalCustomers, outOfStock },
        lowStock: lowStockDocs.map((p) => ({ id: String(p._id), name: p.name, stock: p.stock })),
        productsByCategory,
      });
    }

    // ---- Mock mode ----
    const totalProducts = db.products.length;
    const totalCategories = db.categories.length;
    const totalCustomers = db.users.filter((u) => u.role === 'customer').length;
    const outOfStock = db.products.filter((p) => p.stock === 0).length;

    const lowStock = db.products
      .filter((p) => p.stock > 0 && p.stock <= 5)
      .map((p) => ({ id: p.id, name: p.name, stock: p.stock }));

    const productsByCategory = db.categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: db.products.filter((p) => p.category === cat.id).length,
    }));

    res.json({
      stats: { totalProducts, totalCategories, totalCustomers, outOfStock },
      lowStock,
      productsByCategory,
    });
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    if (isMongoMode()) {
      const docs = await User.find().sort({ createdAt: -1 });
      return res.json({ users: docs.map(serializeUser) });
    }

    const users = db.users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
    }));
    res.json({ users });
  } catch (err) {
    next(err);
  }
};
