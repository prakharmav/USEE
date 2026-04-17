/**
 * gamificationService.js
 * ──────────────────────
 * Core business logic for the gamification engine.
 *
 * Points table:
 *   complete_profile         → +50 pts  (one-time)
 *   use_career_navigator     → +20 pts  (per use)
 *   chat_with_ai             → +10 pts  (per session)
 *   save_university          → +5  pts  (per university)
 *   generate_blog            → +5  pts  (per generation)
 *   check_eligibility        → +10 pts  (one-time)
 *
 * Badge thresholds:
 *   profile_completer  → complete_profile event fired
 *   explorer           → 5 universities saved (cumulative)
 *   ai_user            → 10 AI chat sessions (cumulative)
 *   loan_ready         → check_eligibility event fired
 *
 * Streak logic:
 *   - A "day" is a calendar date in the user's activity.
 *   - If last activity was TODAY → streak unchanged.
 *   - If last activity was YESTERDAY → streak + 1.
 *   - Anything older → streak resets to 1.
 *
 * Rank tiers (based on totalPoints):
 *   0–99     → 'Newcomer'
 *   100–299  → 'Explorer'
 *   300–699  → 'Applicant'
 *   700–1499 → 'Scholar'
 *   1500+    → 'Pioneer'
 */

import GamificationProfile, { BADGE_IDS } from '../models/GamificationProfile.js';

// ── Points per event ───────────────────────────────────────────────────────────
const POINTS = {
  complete_profile:     50,
  use_career_navigator: 20,
  chat_with_ai:         10,
  save_university:       5,
  generate_blog:         5,
  check_eligibility:    10,
};

// ── Badge catalogue ────────────────────────────────────────────────────────────
const BADGE_CATALOGUE = {
  [BADGE_IDS.PROFILE_COMPLETER]: { id: BADGE_IDS.PROFILE_COMPLETER, label: 'Profile Completer' },
  [BADGE_IDS.EXPLORER]:          { id: BADGE_IDS.EXPLORER,          label: 'Explorer'          },
  [BADGE_IDS.AI_USER]:           { id: BADGE_IDS.AI_USER,           label: 'AI User'            },
  [BADGE_IDS.LOAN_READY]:        { id: BADGE_IDS.LOAN_READY,        label: 'Loan Ready'        },
};

// ── Rank tier calculation ──────────────────────────────────────────────────────
export const calculateRank = (totalPoints) => {
  if (totalPoints >= 1500) return 'Pioneer';
  if (totalPoints >= 700)  return 'Scholar';
  if (totalPoints >= 300)  return 'Applicant';
  if (totalPoints >= 100)  return 'Explorer';
  return 'Newcomer';
};

// ── Internal: award a badge if not already held ────────────────────────────────
const awardBadge = (profile, badgeId) => {
  const alreadyHas = profile.badges.some((b) => b.id === badgeId);
  if (!alreadyHas) {
    const badge = BADGE_CATALOGUE[badgeId];
    if (badge) {
      profile.badges.push({ ...badge, awardedAt: new Date() });
      return true;
    }
  }
  return false;
};

// ── Internal: evaluate which badges should be awarded now ──────────────────────
const evaluateBadges = (profile, eventType) => {
  const newBadges = [];
  const c = profile.counters;

  // Profile Completer — fired once on complete_profile
  if (eventType === 'complete_profile' && c.profileCompleted >= 1) {
    if (awardBadge(profile, BADGE_IDS.PROFILE_COMPLETER)) {
      newBadges.push(BADGE_IDS.PROFILE_COMPLETER);
    }
  }

  // Explorer — 5+ universities saved
  if (c.universitiesSaved >= 5) {
    if (awardBadge(profile, BADGE_IDS.EXPLORER)) {
      newBadges.push(BADGE_IDS.EXPLORER);
    }
  }

  // AI User — 10+ chat sessions
  if (c.aiChatSessions >= 10) {
    if (awardBadge(profile, BADGE_IDS.AI_USER)) {
      newBadges.push(BADGE_IDS.AI_USER);
    }
  }

  // Loan Ready — eligibility check completed
  if (eventType === 'check_eligibility' && c.eligibilityChecked >= 1) {
    if (awardBadge(profile, BADGE_IDS.LOAN_READY)) {
      newBadges.push(BADGE_IDS.LOAN_READY);
    }
  }

  return newBadges;
};

// ── Internal: update streak ────────────────────────────────────────────────────
const updateStreak = (profile) => {
  const now    = new Date();
  const today  = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (!profile.lastActivityAt) {
    profile.currentStreak  = 1;
    profile.lastActivityAt = today;
    return;
  }

  const last     = new Date(profile.lastActivityAt);
  const lastDay  = new Date(last.getFullYear(), last.getMonth(), last.getDate());
  const diffDays = Math.round((today - lastDay) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Same day — no change to streak
    return;
  } else if (diffDays === 1) {
    // Consecutive day — extend streak
    profile.currentStreak += 1;
  } else {
    // Gap — reset
    profile.currentStreak = 1;
  }

  profile.lastActivityAt = today;
  if (profile.currentStreak > profile.longestStreak) {
    profile.longestStreak = profile.currentStreak;
  }
};

// ── Internal: increment the relevant counter for an event ─────────────────────
const incrementCounter = (profile, eventType, metadata = {}) => {
  const c = profile.counters;

  switch (eventType) {
    case 'save_university':        c.universitiesSaved  += 1; break;
    case 'chat_with_ai':           c.aiChatSessions     += 1; break;
    case 'complete_profile':       c.profileCompleted    = 1; break;  // one-time
    case 'check_eligibility':      c.eligibilityChecked  = 1; break;  // one-time
    case 'use_career_navigator':   c.careerNavigations  += 1; break;
    case 'generate_blog':          c.blogsGenerated     += 1; break;
    default: break;
  }
};

// ── PUBLIC API ─────────────────────────────────────────────────────────────────

/**
 * Log a gamification event and update the user's profile accordingly.
 *
 * @param {string} userId    - MongoDB ObjectId string
 * @param {string} eventType - One of the keys in POINTS
 * @param {object} metadata  - Optional extra data (e.g. universityId)
 * @returns {Promise<{
 *   pointsAwarded: number,
 *   totalPoints: number,
 *   newBadges: string[],
 *   currentStreak: number,
 *   rank: string
 * }>}
 */
export const processGamificationEvent = async (userId, eventType, metadata = {}) => {
  // Validate event type
  if (!Object.prototype.hasOwnProperty.call(POINTS, eventType)) {
    throw new Error(`Unknown gamification event type: "${eventType}"`);
  }

  // Upsert profile
  let profile = await GamificationProfile.findOne({ userId });
  if (!profile) {
    profile = new GamificationProfile({ userId });
  }

  // One-time events: don't duplicate points
  const isOneTime  = ['complete_profile', 'check_eligibility'].includes(eventType);
  const c          = profile.counters;
  const alreadyDid = (
    (eventType === 'complete_profile'  && c.profileCompleted   >= 1) ||
    (eventType === 'check_eligibility' && c.eligibilityChecked >= 1)
  );

  const pointsAwarded = isOneTime && alreadyDid ? 0 : POINTS[eventType];
  profile.totalPoints += pointsAwarded;

  // Update counter, streak, evaluate badges
  incrementCounter(profile, eventType, metadata);
  updateStreak(profile);
  const newBadges = evaluateBadges(profile, eventType);

  await profile.save();

  return {
    pointsAwarded,
    totalPoints:   profile.totalPoints,
    newBadges,
    currentStreak: profile.currentStreak,
    rank:          calculateRank(profile.totalPoints),
  };
};

/**
 * Fetch the full gamification stats for a user.
 *
 * @param {string} userId
 * @returns {Promise<{
 *   totalPoints: number,
 *   streak: number,
 *   longestStreak: number,
 *   badges: { id, label, awardedAt }[],
 *   rank: string,
 *   counters: object
 * }>}
 */
export const getUserGamificationStats = async (userId) => {
  let profile = await GamificationProfile.findOne({ userId }).lean();

  if (!profile) {
    // Return zeroed-out stats for new users
    return {
      totalPoints:   0,
      streak:        0,
      longestStreak: 0,
      badges:        [],
      rank:          'Newcomer',
      counters:      {
        universitiesSaved:  0,
        aiChatSessions:     0,
        profileCompleted:   0,
        eligibilityChecked: 0,
        careerNavigations:  0,
        blogsGenerated:     0,
      },
    };
  }

  return {
    totalPoints:   profile.totalPoints,
    streak:        profile.currentStreak,
    longestStreak: profile.longestStreak,
    badges:        profile.badges,
    rank:          calculateRank(profile.totalPoints),
    counters:      profile.counters,
  };
};
