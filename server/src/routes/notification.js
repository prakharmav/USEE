import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  sendWelcomeEmail,
  sendNudgeEmail,
  updatePreferences
} from '../controllers/notificationController.js';

const router = express.Router();

/**
 * @swagger
 * /api/notifications/send-welcome:
 *   post:
 *     summary: Trigger welcome email manually (also used in backend registration flow)
 *     tags: [Notifications]
 */
router.post('/send-welcome', sendWelcomeEmail);

// Require token for nudges and opt-outs below
router.use(verifyToken);

/**
 * @swagger
 * /api/notifications/send-nudge:
 *   post:
 *     summary: Trigger an ad-hoc nudge email
 *     tags: [Notifications]
 */
router.post('/send-nudge', sendNudgeEmail);

/**
 * @swagger
 * /api/notifications/preferences:
 *   post:
 *     summary: Opt out or opt into email notifications
 *     tags: [Notifications]
 */
router.post('/preferences', updatePreferences);

export default router;
