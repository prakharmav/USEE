/**
 * personalizationService.js
 * ─────────────────────────
 * Reads UserActivity documents for a given user, calculates a simple
 * engagement score, and returns recommended content + nudge priority
 * based on their journey stage and recent behaviour.
 *
 * Scoring rubric (additive):
 *   login              +1
 *   view_university    +2
 *   save_university    +4
 *   start_application  +8
 *   submit_document    +6
 *   use_tool           +3
 *   chat_message       +2
 *
 * Recency multiplier: events in the last 7 days count 2×.
 */

import UserActivity from '../models/UserActivity.js';

// ── Event weights ──────────────────────────────────────────────────────────────
const EVENT_WEIGHTS = {
  login:              1,
  view_university:    2,
  save_university:    4,
  start_application:  8,
  submit_document:    6,
  use_tool:           3,
  chat_message:       2,
};

const RECENCY_WINDOW_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ── Recommended content map keyed by journey stage ────────────────────────────
const STAGE_CONTENT = {
  exploration: [
    { type: 'tool',    id: 'eligibility-checker', label: 'Check your eligibility' },
    { type: 'tool',    id: 'university-match',    label: 'Find matching universities' },
    { type: 'article', id: 'gre-guide',            label: 'GRE preparation guide' },
  ],
  shortlisting: [
    { type: 'tool',    id: 'roi-calculator',      label: 'Calculate ROI for shortlisted unis' },
    { type: 'tool',    id: 'essay-helper',         label: 'Draft your SOP' },
    { type: 'article', id: 'shortlist-tips',       label: 'How to build a balanced shortlist' },
  ],
  applying: [
    { type: 'tool',    id: 'loan-advisor',         label: 'Explore education loan options' },
    { type: 'tool',    id: 'visa-advisor',          label: 'Prepare your visa documents' },
    { type: 'article', id: 'lor-guide',             label: 'Writing a strong LOR request' },
  ],
  admitted: [
    { type: 'tool',    id: 'visa-advisor',          label: 'Apply for your student visa' },
    { type: 'article', id: 'pre-departure',         label: 'Pre-departure checklist' },
    { type: 'article', id: 'banking-abroad',        label: 'Setting up banking abroad' },
  ],
};

// ── Nudge messages per stage ───────────────────────────────────────────────────
const STAGE_NUDGES = {
  exploration: [
    "You haven't run the Eligibility Checker yet — it takes 2 minutes!",
    "Discover universities that match your GRE & GPA profile.",
    "Start exploring — your dream university is waiting.",
  ],
  shortlisting: [
    "Your shortlist has great picks — calculate the ROI for each now.",
    "Ready to draft your Statement of Purpose? Try the Essay Helper.",
    "Compare tuition costs across your shortlisted universities.",
  ],
  applying: [
    "Don't forget your loan options — compare NBFCs before applying.",
    "Start your visa prep early to avoid last-minute stress.",
    "Upload your documents and track your application progress.",
  ],
  admitted: [
    "Congratulations! Book your student visa appointment soon.",
    "Check off your pre-departure checklist to make the most of Day 1.",
    "Set up an international bank account before you land.",
  ],
};

/**
 * Calculate the engagement score for a user based on their activity log.
 *
 * @param {string} userId - MongoDB ObjectId string
 * @returns {Promise<{
 *   score: number,
 *   eventCount: number,
 *   recentEventCount: number,
 *   topEvents: { eventType: string, count: number }[]
 * }>}
 */
export const calculateEngagementScore = async (userId) => {
  const activities = await UserActivity.find({ userId })
    .sort({ timestamp: -1 })
    .limit(200)
    .lean();

  const now = Date.now();
  let score = 0;
  let recentEventCount = 0;
  const eventCounts = {};

  for (const activity of activities) {
    const weight   = EVENT_WEIGHTS[activity.eventType] ?? 1;
    const isRecent = now - new Date(activity.timestamp).getTime() < RECENCY_WINDOW_MS;
    const multiplier = isRecent ? 2 : 1;

    score += weight * multiplier;
    if (isRecent) recentEventCount++;

    eventCounts[activity.eventType] = (eventCounts[activity.eventType] || 0) + 1;
  }

  const topEvents = Object.entries(eventCounts)
    .map(([eventType, count]) => ({ eventType, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    score: Math.round(score),
    eventCount: activities.length,
    recentEventCount,
    topEvents,
  };
};

/**
 * Return recommended content and a smart nudge message for a user.
 *
 * @param {object} user - Mongoose User document (with .journeyStage)
 * @returns {Promise<{
 *   engagementScore: number,
 *   journeyStage: string,
 *   recommendedContent: object[],
 *   nudgeMessage: string,
 *   nudgePriority: 'high'|'medium'|'low'
 * }>}
 */
export const getPersonalizedRecommendations = async (user) => {
  const { score, recentEventCount } = await calculateEngagementScore(user._id);

  const stage   = user.journeyStage || 'exploration';
  const content = STAGE_CONTENT[stage] ?? STAGE_CONTENT.exploration;

  // Pick nudge deterministically but "rotate" based on day of year so it feels fresh
  const dayOfYear  = Math.floor(Date.now() / 86400000);
  const nudges     = STAGE_NUDGES[stage] ?? STAGE_NUDGES.exploration;
  const nudgeMsg   = nudges[dayOfYear % nudges.length];

  // Priority: low activity → high nudge urgency
  let nudgePriority = 'medium';
  if (recentEventCount === 0) nudgePriority = 'high';
  else if (recentEventCount >= 10) nudgePriority = 'low';

  return {
    engagementScore:      score,
    journeyStage:         stage,
    recommendedContent:   content,
    nudgeMessage:         nudgeMsg,
    nudgePriority,
  };
};
