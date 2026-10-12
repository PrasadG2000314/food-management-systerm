import express from 'express';
import {
  login,
  register,
  changePassword,
  verifyAdminPassword,
  updateProfile,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/change-password', changePassword);
router.post('/verify-admin', verifyAdminPassword);
router.put('/profile/:id', updateProfile);

export default router;
