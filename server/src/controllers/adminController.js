import { db } from '../data/store.js';

export const getDashboardStats = async (req, res, next) => {
  try {
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
