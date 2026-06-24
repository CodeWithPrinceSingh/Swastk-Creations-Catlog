import { Router } from 'express';
import {
  submitContactMessage,
  listContactMessages,
  markContactMessageRead,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public — anyone visiting the Contact Us page can submit
router.post('/', submitContactMessage);

// Admin only — viewing and managing submissions
router.get('/', requireAuth, requireAdmin, listContactMessages);
router.put('/:id/read', requireAuth, requireAdmin, markContactMessageRead);
router.delete('/:id', requireAuth, requireAdmin, deleteContactMessage);

export default router;
