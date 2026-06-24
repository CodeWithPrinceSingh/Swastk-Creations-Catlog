import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';
import { products as seedProducts } from './products.js';
import { categories as seedCategories } from './categories.js';
import { testimonials as seedTestimonials } from './testimonials.js';

/**
 * In-memory data store used when DATA_SOURCE=mock.
 * Mirrors the shape of the Mongoose models in /src/models so that
 * switching DATA_SOURCE=mongo later requires no controller changes
 * beyond swapping the repository implementation (see db/index.js).
 */

const products = [...seedProducts];
const categories = [...seedCategories];
const testimonials = [...seedTestimonials];
const users = [];
const contactMessages = [];

// Seed a default admin user so the admin panel is usable immediately.
// Password: Admin@123 (hashed below)
const seedAdmin = async () => {
  const passwordHash = await bcrypt.hash('Swastik@123', 10);
  users.push({
    id: 'user-admin',
    name: 'Store Admin',
    email: 'admin@swastikcreations.com',
    passwordHash,
    role: 'admin',
    createdAt: new Date().toISOString(),
  });
};
seedAdmin();

export const db = {
  products,
  categories,
  testimonials,
  users,
  contactMessages,
  uuid,
};
