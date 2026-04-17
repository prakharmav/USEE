import express from 'express';
import { updateProfile, getSavedUniversities, toggleSavedUniversity, getDashboardData } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileData: { type: object }
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put('/profile', verifyToken, updateProfile);

/**
 * @swagger
 * /api/users/{id}/saved-universities:
 *   get:
 *     summary: Get shortlisted universities
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of saved unis
 *   post:
 *     summary: Toggle university in shortlist
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Toggled successfully
 */
router.get('/:id/saved-universities', verifyToken, getSavedUniversities);
router.post('/:id/saved-universities', verifyToken, toggleSavedUniversity);

/**
 * @swagger
 * /api/users/{id}/dashboard-data:
 *   get:
 *     summary: Get dashboard analytics hub
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Core dashboard metrics
 */
router.get('/:id/dashboard-data', verifyToken, getDashboardData);

export default router;
