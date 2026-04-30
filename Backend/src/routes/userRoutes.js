import express from 'express';
import {
  registerUser,
  authUser,
  googleLogin,
  logoutUser,
  updateUserProfile,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/google', googleLogin);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);
router.put('/profile', protect, updateUserProfile);
router.put('/password', protect, changePassword);

export default router;
