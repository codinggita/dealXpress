import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, authorize('supplier', 'admin'), createProduct);
router.route('/:id').get(getProductById);

export default router;
