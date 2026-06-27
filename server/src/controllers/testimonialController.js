import { db } from '../data/store.js';
import Testimonial from '../models/Testimonial.js';
import { isMongoMode } from '../utils/dataSource.js';

const serializeTestimonial = (doc) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    id: String(obj._id),
    user: obj.user ? String(obj.user) : null,
    name: obj.name,
    location: obj.location || '',
    rating: obj.rating,
    quote: obj.quote,
    avatar: obj.avatar || '',
    approved: obj.approved,
    createdAt: obj.createdAt,
  };
};

/* ── GET /api/testimonials  (public — approved only) ─────────── */
export const listTestimonials = async (req, res, next) => {
  try {
    if (isMongoMode()) {
      const docs = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
      return res.json({ testimonials: docs.map(serializeTestimonial) });
    }
    res.json({ testimonials: db.testimonials });
  } catch (err) {
    next(err);
  }
};

/* ── POST /api/testimonials  (logged-in customers) ───────────── */
export const createTestimonial = async (req, res, next) => {
  try {
    if (!isMongoMode()) {
      return res.status(503).json({ message: 'Testimonials require MongoDB mode.' });
    }

    const { location, rating, quote } = req.body;
    const name = req.user.name;
    const userId = req.user.id;

    if (!rating || !quote?.trim()) {
      return res.status(400).json({ message: 'Rating aur review text zaroori hai.' });
    }

    const ratingNum = Number(rating);
    if (ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ message: 'Rating 1 se 5 ke beech honi chahiye.' });
    }

    const doc = await Testimonial.create({
      user: userId,
      name,
      location: location?.trim() || '',
      rating: ratingNum,
      quote: quote.trim(),
      approved: false, // admin approves first
    });

    res.status(201).json({ testimonial: serializeTestimonial(doc) });
  } catch (err) {
    next(err);
  }
};

/* ── GET /api/testimonials/pending  (admin only) ─────────────── */
export const listPendingTestimonials = async (req, res, next) => {
  try {
    if (!isMongoMode()) return res.json({ testimonials: [] });
    const docs = await Testimonial.find({ approved: false }).sort({ createdAt: -1 });
    res.json({ testimonials: docs.map(serializeTestimonial) });
  } catch (err) {
    next(err);
  }
};

/* ── PATCH /api/testimonials/:id/approve  (admin only) ────────── */
export const approveTestimonial = async (req, res, next) => {
  try {
    if (!isMongoMode()) return res.status(503).json({ message: 'MongoDB mode required.' });
    const doc = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: 'Testimonial nahi mila.' });
    res.json({ testimonial: serializeTestimonial(doc) });
  } catch (err) {
    next(err);
  }
};

/* ── DELETE /api/testimonials/:id  (admin only) ──────────────── */
export const deleteTestimonial = async (req, res, next) => {
  try {
    if (!isMongoMode()) return res.status(503).json({ message: 'MongoDB mode required.' });
    const doc = await Testimonial.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Testimonial nahi mila.' });
    res.json({ message: 'Testimonial delete ho gaya.' });
  } catch (err) {
    next(err);
  }
};
