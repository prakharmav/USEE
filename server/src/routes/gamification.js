import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { logEvent, getUserStats } from '../controllers/gamificationController.js';

const router = express.Router();

// Require auth for all gamification routes
router.use(verifyToken);

/**
 * @swagger
 * /api/gamification/event:
 *   post:
 *     summary: Log a gamification event and update points/badges
 *     tags: [Gamification]
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
 *               eventType:
 *                 type: string
 *                 example: "complete_profile"
 *               metadata:
 *                 type: object
 *     responses:
 *       200:
 *         description: Gamification event log results including points awarded and new badges
 */
router.post('/event', logEvent);

/**
 * @swagger
 * /api/gamification/user-stats:
 *   get:
 *     summary: Returns the gamification stats of the user
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Full gamification stats (points, ranking, badges, streaks)
 */
router.get('/user-stats', getUserStats);

export default router;
