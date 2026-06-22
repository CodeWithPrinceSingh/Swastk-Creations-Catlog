import { db } from '../data/store.js';

const PAGE_SIZE_DEFAULT = 12;

export const listProducts = async (req, res, next) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      pageSize = PAGE_SIZE_DEFAULT,
      tag,
    } = req.query;

    let results = [...db.products];

    if (category) {
      results = results.filter((p) => p.category === category);
    }
    if (tag) {
      results = results.filter((p) => p.tags?.includes(tag));
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (minPrice) {
      results = results.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      results = results.filter((p) => p.price <= Number(maxPrice));
    }

    switch (sort) {
      case 'price_asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    const total = results.length;
    const pageNum = Math.max(1, Number(page));
    const size = Math.max(1, Number(pageSize));
    const start = (pageNum - 1) * size;
    const paginated = results.slice(start, start + size);

    res.json({
      products: paginated,
      pagination: {
        total,
        page: pageNum,
        pageSize: size,
        totalPages: Math.ceil(total / size) || 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const product = db.products.find((p) => p.slug === req.params.slug);
    if (!product) {
      return res.status(404).json({ message: 'We could not find that product.' });
    }
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const featured = db.products.filter((p) => p.tags?.includes('bestseller')).slice(0, 5);
    res.json({ products: featured });
  } catch (err) {
    next(err);
  }
};

// ---- Admin CRUD ----

export const createProduct = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.name || !body.category || body.price == null) {
      return res.status(400).json({ message: 'Name, category, and price are required.' });
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const exists = db.products.find((p) => p.slug === slug);
    if (exists) {
      return res.status(409).json({ message: 'A product with this name/slug already exists.' });
    }

    const product = {
      id: db.uuid(),
      name: body.name,
      slug,
      category: body.category,
      price: Number(body.price),
      compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : undefined,
      rating: 0,
      reviewCount: 0,
      isNew: body.isNew ?? true,
      description: body.description || '',
      images: body.images || [],
      sizes: body.sizes || [],
      colors: body.colors || [],
      stock: body.stock != null ? Number(body.stock) : 0,
      tags: body.tags || [],
    };

    db.products.push(product);
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const idx = db.products.findIndex((p) => p.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ message: 'We could not find that product.' });
    }

    db.products[idx] = { ...db.products[idx], ...req.body, id: db.products[idx].id };
    res.json({ product: db.products[idx] });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const idx = db.products.findIndex((p) => p.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ message: 'We could not find that product.' });
    }
    db.products.splice(idx, 1);
    res.json({ message: 'Product deleted.' });
  } catch (err) {
    next(err);
  }
};
