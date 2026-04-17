/**
 * notificationController.js
 * ─────────────────────────
 * Handles REST trigger points for sending emails and updating opt-out preferences.
 */
import User from '../models/User.js';
import { sendNotification, welcomeEmail, nudgeEmail } from '../services/emailService.js';

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/notifications/send-welcome
// ─────────────────────────────────────────────────────────────────────────────
export const sendWelcomeEmail = async (req, res, next) => {
  try {
    // Optionally triggered on registration, passing userId
    const { userId } = req.body;
    
    // Fallback to logged-in user if token used, or passed user if backend triggered
    const targetUserId = userId || req.user?.id;
    if (!targetUserId) {
        return res.status(400).json({ status: 'error', message: 'Target userId required.' });
    }

    const user = await User.findById(targetUserId);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found.' });

    // Ensure notifications enabled
    if (user.notificationsEnabled) {
      const html = welcomeEmail(user);
      await sendNotification(user.email, 'Welcome to Eduvion! 🎓', html);
    }

    return res.json({ status: 'success', message: 'Welcome email cycle completed.' });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/notifications/send-nudge
// ─────────────────────────────────────────────────────────────────────────────
export const sendNudgeEmail = async (req, res, next) => {
  try {
    const { userId, action } = req.body;
    
    const targetUserId = userId || req.user?.id;
    if (!targetUserId) {
        return res.status(400).json({ status: 'error', message: 'Target userId required.' });
    }

    const user = await User.findById(targetUserId);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found.' });

    if (user.notificationsEnabled) {
      const recommendedAction = action || 'Check out the new AI University Finder today!';
      const html = nudgeEmail(user, recommendedAction);
      await sendNotification(user.email, 'We Missed You at Eduvion!', html);
    }

    return res.json({ status: 'success', message: 'Nudge cycle completed.' });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/notifications/preferences
// ─────────────────────────────────────────────────────────────────────────────
export const updatePreferences = async (req, res, next) => {
  try {
    const { notificationsEnabled } = req.body;
    
    if (typeof notificationsEnabled !== 'boolean') {
       return res.status(400).json({ status: 'error', message: 'notificationsEnabled boolean is required.' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { notificationsEnabled }, 
      { new: true }
    );

    return res.json({ 
        status: 'success', 
        message: 'Notification preferences updated.',
        data: { notificationsEnabled: user.notificationsEnabled } 
    });

  } catch (err) {
    next(err);
  }
};
