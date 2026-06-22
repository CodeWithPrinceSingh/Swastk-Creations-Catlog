import { db } from '../data/store.js';

export const listTestimonials = async (req, res, next) => {
  try {
    res.json({ testimonials: db.testimonials });
  } catch (err) {
    next(err);
  }
};
