import { db } from '../data/store.js';

export const listCategories = async (req, res, next) => {
  try {
    res.json({ categories: db.categories });
  } catch (err) {
    next(err);
  }
};

export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = db.categories.find((c) => c.slug === req.params.slug);
    if (!category) {
      return res.status(404).json({ message: 'We could not find that category.' });
    }
    res.json({ category });
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, image } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required.' });

    const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const exists = db.categories.find((c) => c.slug === slug);
    if (exists) return res.status(409).json({ message: 'This category already exists.' });

    const category = { id: db.uuid(), name, slug, image: image || '' };
    db.categories.push(category);
    res.status(201).json({ category });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const idx = db.categories.findIndex((c) => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'We could not find that category.' });
    db.categories.splice(idx, 1);
    res.json({ message: 'Category deleted.' });
  } catch (err) {
    next(err);
  }
};
