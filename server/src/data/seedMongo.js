// Run with: npm run seed (after setting DATA_SOURCE=mongo and MONGO_URI in .env)
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import { products as mockProducts } from './products.js';
import { categories as mockCategories } from './categories.js';

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB for seeding...');

  await Promise.all([Product.deleteMany({}), Category.deleteMany({}), User.deleteMany({})]);

  const categoryDocs = await Category.insertMany(
    mockCategories.map((c) => ({ name: c.name, slug: c.slug, image: c.image }))
  );
  const categoryMap = Object.fromEntries(categoryDocs.map((c) => [c.slug, c._id]));
  const mockCategorySlugById = Object.fromEntries(mockCategories.map((c) => [c.id, c.slug]));

  await Product.insertMany(
    mockProducts.map((p) => ({
      name: p.name,
      slug: p.slug,
      category: categoryMap[mockCategorySlugById[p.category]],
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      rating: p.rating,
      reviewCount: p.reviewCount,
      isNew: p.isNew,
      description: p.description,
      images: p.images,
      sizes: p.sizes,
      colors: p.colors,
      stock: p.stock,
      tags: p.tags,
    }))
  );

  const passwordHash = await bcrypt.hash('Admin@123', 10);
  await User.create({
    name: 'Store Admin',
    email: 'admin@bridestore.com',
    passwordHash,
    role: 'admin',
  });

  console.log('✅ Seed complete. Admin login: admin@bridestore.com / Admin@123');
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
