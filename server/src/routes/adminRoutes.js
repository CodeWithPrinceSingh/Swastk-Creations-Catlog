import { Router } from 'express';
import { getDashboardStats, listUsers } from '../controllers/adminController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireAdmin);

router.get('/dashboard', getDashboardStats);
router.get('/users', listUsers);

export default router;
