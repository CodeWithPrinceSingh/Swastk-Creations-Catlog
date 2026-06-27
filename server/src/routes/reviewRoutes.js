import { Router } from 'express';
import { listReviews, createReview, deleteReview } from '../controllers/reviewController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public — anyone can read reviews
router.get('/', listReviews);

// Authenticated — must be logged in to submit
router.post('/', requireAuth, createReview);

// Author or admin can delete
router.delete('/:id', requireAuth, deleteReview);

export default router;
