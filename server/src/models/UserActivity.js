import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    eventType: {
      type: String,
      required: true,
      trim: true, // e.g., 'view_university', 'start_application', 'login'
    },
    eventData: {
      type: mongoose.Schema.Types.Mixed, // Allows flexible schema for event-specific data
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Keeping timestamps false here if explicit timestamp is enough, but true doesn't hurt.
    timestamps: false, 
  }
);

// Indexes for performance (especially since this is for a personalization engine)
userActivitySchema.index({ userId: 1, eventType: 1 });
userActivitySchema.index({ timestamp: -1 });

const UserActivity = mongoose.model('UserActivity', userActivitySchema);
export default UserActivity;
