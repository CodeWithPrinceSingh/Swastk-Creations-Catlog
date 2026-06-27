import { Router } from 'express';
import {
  listTestimonials,
  createTestimonial,
  listPendingTestimonials,
  approveTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public — approved testimonials
router.get('/', listTestimonials);

// Logged-in customer — submit a testimonial
router.post('/', requireAuth, createTestimonial);

// Admin routes
router.get('/pending', requireAuth, requireAdmin, listPendingTestimonials);
router.patch('/:id/approve', requireAuth, requireAdmin, approveTestimonial);
router.delete('/:id', requireAuth, requireAdmin, deleteTestimonial);

export default router;
