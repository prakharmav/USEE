/**
 * gamificationController.js
 * ──────────────────────────
 * Handles gamification REST endpoints:
 *   POST /api/gamification/event      — log an event, update points
 *   GET  /api/gamification/user-stats — return full stats for the auth'd user
 */

import {
  processGamificationEvent,
  getUserGamificationStats,
} from '../services/gamificationService.js';

// Valid event types exposed through the API
const VALID_EVENTS = [
  'complete_profile',
  'use_career_navigator',
  'chat_with_ai',
  'save_university',
  'generate_blog',
  'check_eligibility',
];

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/gamification/event
// ─────────────────────────────────────────────────────────────────────────────
/**
 * @desc   Log a gamification event for the authenticated user.
 * @body   { eventType: string, metadata?: object }
 * @access Protected (verifyToken)
 */
export const logEvent = async (req, res, next) => {
  try {
    const { eventType, metadata = {} } = req.body;
    const userId = req.user.id;

    if (!eventType) {
      return res.status(400).json({
        status:  'error',
        message: 'eventType is required.',
      });
    }

    if (!VALID_EVENTS.includes(eventType)) {
      return res.status(400).json({
        status:  'error',
        message: `Invalid eventType. Must be one of: ${VALID_EVENTS.join(', ')}`,
      });
    }

    const result = await processGamificationEvent(userId, eventType, metadata);

    return res.json({
      status: 'success',
      data:   result,
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/gamification/user-stats
// ─────────────────────────────────────────────────────────────────────────────
/**
 * @desc   Return full gamification stats for the authenticated user.
 * @access Protected (verifyToken)
 */
export const getUserStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const stats  = await getUserGamificationStats(userId);

    return res.json({
      status: 'success',
      data:   stats,
    });
  } catch (err) {
    next(err);
  }
};
