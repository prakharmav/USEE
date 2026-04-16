import express from 'express';
import { updateProfile } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.put('/profile', verifyToken, updateProfile);

export default router;
