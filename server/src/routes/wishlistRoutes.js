import { Router } from "express";
import {
  getWishlist,
  addWishlist,
  removeWishlist,
} from "../controllers/wishlistController.js";

import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, getWishlist);

router.post("/:productId", requireAuth, addWishlist);

router.delete("/:productId", requireAuth, removeWishlist);

export default router;
