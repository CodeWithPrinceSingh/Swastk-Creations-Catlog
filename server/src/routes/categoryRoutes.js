import { Router } from 'express';
import {
  listCategories,
  getCategoryBySlug,
  createCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listCategories);
router.get('/:slug', getCategoryBySlug);

router.post('/', requireAuth, requireAdmin, createCategory);
router.delete('/:id', requireAuth, requireAdmin, deleteCategory);

export default router;
