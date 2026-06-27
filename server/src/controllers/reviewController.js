import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { isMongoMode } from '../utils/dataSource.js';

/* ── helpers ──────────────────────────────────────────────────── */

const serializeReview = (doc) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    id: String(obj._id),
    product: String(obj.product),
    user: String(obj.user),
    userName: obj.userName,
    rating: obj.rating,
    title: obj.title || '',
    body: obj.body || '',
    createdAt: obj.createdAt,
  };
};

/** Recalculate and persist the product's average rating + reviewCount. */
async function syncProductRating(productId) {
  const agg = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        avg: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);

  const avg = agg.length ? Math.round(agg[0].avg * 10) / 10 : 0;
  const count = agg.length ? agg[0].count : 0;

  await Product.findByIdAndUpdate(productId, {
    rating: avg,
    reviewCount: count,
  });
}

/* ── GET /api/reviews?productId=<id> ─────────────────────────── */
export const listReviews = async (req, res, next) => {
  try {
    if (!isMongoMode()) {
      return res.json({ reviews: [] });
    }

    const { productId } = req.query;
    if (!productId) {
      return res.status(400).json({ message: 'productId query param is required.' });
    }

    const reviews = await Review.find({ product: productId }).sort({ createdAt: -1 });
    res.json({ reviews: reviews.map(serializeReview) });
  } catch (err) {
    next(err);
  }
};

/* ── POST /api/reviews ───────────────────────────────────────── */
export const createReview = async (req, res, next) => {
  try {
    if (!isMongoMode()) {
      return res.status(503).json({ message: 'Reviews require MongoDB mode.' });
    }

    const { productId, rating, title, body } = req.body;
    const userId = req.user.id;
    const userName = req.user.name;

    if (!productId || !rating) {
      return res.status(400).json({ message: 'productId and rating are required.' });
    }

    const ratingNum = Number(rating);
    if (ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Upsert: allow a user to update their own review
    const review = await Review.findOneAndUpdate(
      { product: productId, user: userId },
      {
        product: productId,
        user: userId,
        userName,
        rating: ratingNum,
        title: title || '',
        body: body || '',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await syncProductRating(product._id);

    res.status(201).json({ review: serializeReview(review) });
  } catch (err) {
    next(err);
  }
};

/* ── DELETE /api/reviews/:id ────────────────────────────────── */
export const deleteReview = async (req, res, next) => {
  try {
    if (!isMongoMode()) {
      return res.status(503).json({ message: 'Reviews require MongoDB mode.' });
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    // Only the author or an admin may delete
    if (String(review.user) !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "You don't have permission to delete this review." });
    }

    const productId = review.product;
    await review.deleteOne();
    await syncProductRating(productId);

    res.json({ message: 'Review deleted.' });
  } catch (err) {
    next(err);
  }
};
