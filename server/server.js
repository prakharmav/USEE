import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';

import User from './src/models/User.js';
import UserActivity from './src/models/UserActivity.js';
import { sendNotification, nudgeEmail } from './src/services/emailService.js';

const PORT = process.env.PORT || 5000;

// ── Smart Nudge Cron-like Scheduler ──────────────────────────────────────────
const startNudgeScheduler = () => {
  const SIX_HOURS = 6 * 60 * 60 * 1000;
  const TWO_DAYS = 48 * 60 * 60 * 1000;

  setInterval(async () => {
    try {
      console.log('⏳ Running scheduled inactivity checks for smart nudges...');
      
      const fortyEightHoursAgo = new Date(Date.now() - TWO_DAYS);

      // Find users with notifications enabled
      const users = await User.find({ notificationsEnabled: true });
      
      for (let user of users) {
        // Find most recent activity of this user
        const lastActivity = await UserActivity.findOne({ userId: user._id })
          .sort({ timestamp: -1 });

        // Check if recently nudged (so we don't spam them every 6 hours)
        const lastNudge = await UserActivity.findOne({ userId: user._id, eventType: 'email_nudge_sent' })
          .sort({ timestamp: -1 });

        const isInactive = !lastActivity || lastActivity.timestamp < fortyEightHoursAgo;
        const recentNudge = lastNudge && lastNudge.timestamp > fortyEightHoursAgo;

        if (isInactive && !recentNudge) {
          // Send nudge
          const actionText = 'Continue exploring global universities matching your profile!';
          const html = nudgeEmail(user, actionText);
          await sendNotification(user.email, 'We Missed You at Eduvion!', html);

          // Log the nudge so we don't spam
          await UserActivity.create({
            userId: user._id,
            eventType: 'email_nudge_sent',
            eventData: { action: actionText },
            // default timestamp is now
          });
        }
      }
    } catch (error) {
      console.error('Error running Smart Nudge Scheduler:', error);
    }
  }, SIX_HOURS);
};

const start = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`🚀  Server running on port ${PORT} [${process.env.NODE_ENV ?? 'development'}]`);
    startNudgeScheduler(); // Kick off the background recurring check
  });

  // ── Graceful Shutdown ─────────────────────────────────────────────────────
  const shutdown = (signal) => {
    console.log(`\n${signal} received — shutting down gracefully…`);
    server.close(() => {
      console.log('💤  HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
};

start();
