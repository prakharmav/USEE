import UserActivity from '../models/UserActivity.js';

/**
 * Log a user activity event
 * POST /api/activity
 */
export const logActivity = async (req, res, next) => {
  try {
    const { eventType, eventData } = req.body;
    
    const activity = new UserActivity({
      userId: req.user.id,
      eventType,
      eventData
    });

    await activity.save();

    res.status(201).json({
      status: 'success',
      data: activity
    });
  } catch (error) {
    next(error);
  }
};
