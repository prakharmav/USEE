import express from 'express';
import { logActivity } from '../controllers/activityController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/activity:
 *   post:
 *     summary: Log a user activity event
 *     tags: [Activity]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [eventType]
 *             properties:
 *               eventType: { type: string, example: "view_university" }
 *               eventData: { type: object }
 *     responses:
 *       201:
 *         description: Activity logged
 */
router.post('/', verifyToken, logActivity);

export default router;
