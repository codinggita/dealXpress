import express from 'express';
import { getSellerAnalytics, getBuyerAnalytics } from '../controllers/analyticsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/seller', protect, authorize('seller', 'admin', 'supplier'), getSellerAnalytics);
router.get('/buyer', protect, getBuyerAnalytics);

export default router;
