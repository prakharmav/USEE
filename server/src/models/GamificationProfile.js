/**
 * GamificationProfile.js
 * ────────────────────────
 * Stores a user's total points, active streak, earned badges,
 * and per-event counters used for badge evaluation.
 *
 * One document per user — upsert on every gamification event.
 */

import mongoose from 'mongoose';

// ── Badge definitions (values are the badge IDs stored in the array) ──────────
export const BADGE_IDS = {
  PROFILE_COMPLETER: 'profile_completer',  // complete_profile event
  EXPLORER:          'explorer',            // 5 universities saved
  AI_USER:           'ai_user',            // 10 AI chat sessions
  LOAN_READY:        'loan_ready',         // completed eligibility check
};

const badgeSchema = new mongoose.Schema(
  {
    id:        { type: String, required: true },
    label:     { type: String, required: true },
    awardedAt: { type: Date,   default: Date.now },
  },
  { _id: false }
);

const gamificationProfileSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
      unique:   true,
      index:    true,
    },

    // ── Points ───────────────────────────────────────────────────────────────
    totalPoints: { type: Number, default: 0, min: 0 },

    // ── Streak ───────────────────────────────────────────────────────────────
    currentStreak:  { type: Number, default: 0 },    // consecutive active days
    longestStreak:  { type: Number, default: 0 },
    lastActivityAt: { type: Date,   default: null },  // last calendar day active

    // ── Badges ───────────────────────────────────────────────────────────────
    badges: [badgeSchema],

    // ── Event counters (used for badge thresholds) ────────────────────────────
    counters: {
      universitiesSaved:  { type: Number, default: 0 },
      aiChatSessions:     { type: Number, default: 0 },
      profileCompleted:   { type: Number, default: 0 },  // 0 or 1
      eligibilityChecked: { type: Number, default: 0 },  // 0 or 1
      careerNavigations:  { type: Number, default: 0 },
      blogsGenerated:     { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const GamificationProfile = mongoose.model('GamificationProfile', gamificationProfileSchema);
export default GamificationProfile;
