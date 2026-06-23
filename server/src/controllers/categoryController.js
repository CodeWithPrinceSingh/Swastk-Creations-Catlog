import { db } from '../data/store.js';
import Category from '../models/Category.js';
import { isMongoMode } from '../utils/dataSource.js';
import { serializeCategory } from '../utils/serialize.js';

const slugify = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const listCategories = async (req, res, next) => {
  try {
    if (isMongoMode()) {
      const docs = await Category.find().sort({ name: 1 });
      return res.json({ categories: docs.map(serializeCategory) });
    }
    res.json({ categories: db.categories });
  } catch (err) {
    next(err);
  }
};

export const getCategoryBySlug = async (req, res, next) => {
  try {
    if (isMongoMode()) {
      const doc = await Category.findOne({ slug: req.params.slug });
      if (!doc) return res.status(404).json({ message: 'We could not find that category.' });
      return res.json({ category: serializeCategory(doc) });
    }

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

    const slug = slugify(name);

    if (isMongoMode()) {
      const exists = await Category.findOne({ slug });
      if (exists) return res.status(409).json({ message: 'This category already exists.' });

      const doc = await Category.create({ name, slug, image: image || '' });
      return res.status(201).json({ category: serializeCategory(doc) });
    }

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
    if (isMongoMode()) {
      const doc = await Category.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: 'We could not find that category.' });
      return res.json({ message: 'Category deleted.' });
    }

    const idx = db.categories.findIndex((c) => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'We could not find that category.' });
    db.categories.splice(idx, 1);
    res.json({ message: 'Category deleted.' });
  } catch (err) {
    next(err);
  }
};
