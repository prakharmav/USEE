/**
 * routes/ai.js
 * ─────────────
 * All AI-powered recommendation endpoints.
 * Mounted at /api/ai in app.js
 */

import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import {
  getUniversityRecommendations,
  getEssayHelp,
  getLoanAdvice,
  getSmartNudge,
  getBlogOutline,
} from '../controllers/aiController.js';

const router = express.Router();

// All AI routes require authentication and are rate-limited
router.use(verifyToken, aiLimiter);

/**
 * @swagger
 * /api/ai/university-recommendations:
 *   post:
 *     summary: Get AI-powered university recommendations
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [gre, gpa, budget]
 *             properties:
 *               gre:
 *                 type: number
 *                 example: 320
 *               gpa:
 *                 type: number
 *                 example: 3.7
 *               budget:
 *                 type: number
 *                 description: Annual budget in USD
 *                 example: 50000
 *               targetCountries:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["USA", "UK", "Canada"]
 *               course:
 *                 type: string
 *                 example: "Computer Science"
 *     responses:
 *       200:
 *         description: Array of 8 university recommendations with rationale
 */
router.post('/university-recommendations', getUniversityRecommendations);

/**
 * @swagger
 * /api/ai/essay-helper:
 *   post:
 *     summary: Generate SOP/essay outline and example paragraph
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *                 example: "Statement of Purpose"
 *               wordLimit:
 *                 type: number
 *                 example: 1000
 *               userProfile:
 *                 type: object
 *                 properties:
 *                   name: { type: string }
 *                   gpa: { type: number }
 *                   gre: { type: number }
 *                   course: { type: string }
 *                   targetUniversity: { type: string }
 *                   workExp: { type: number }
 *     responses:
 *       200:
 *         description: Essay outline, first paragraph, and writing tips
 */
router.post('/essay-helper', getEssayHelp);

/**
 * @swagger
 * /api/ai/loan-advisor:
 *   post:
 *     summary: Get personalised education loan advice
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profile:
 *                 type: object
 *                 properties:
 *                   gpa: { type: number }
 *                   income: { type: number, description: "Annual family income in INR" }
 *                   cibilScore: { type: number }
 *                   collateral: { type: string }
 *               targetUniversity:
 *                 type: string
 *                 example: "University of Toronto"
 *               courseFees:
 *                 type: number
 *                 description: Total course fees in INR
 *                 example: 4500000
 *     responses:
 *       200:
 *         description: Recommended NBFCs, EMI estimates, and action steps
 */
router.post('/loan-advisor', getLoanAdvice);

/**
 * @swagger
 * /api/ai/smart-nudge:
 *   post:
 *     summary: Get a personalised next-action nudge based on user journey
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Optional — defaults to authenticated user's ID
 *     responses:
 *       200:
 *         description: Personalised nudge message with recommended content
 */
router.post('/smart-nudge', getSmartNudge);

/**
 * @swagger
 * /api/ai/generate-blog:
 *   post:
 *     summary: Generate a blog post outline on a given topic using Gemini
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *                 example: "Student Visa Guide for the UK"
 *               targetAudience:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog post outline JSON object
 */
router.post('/generate-blog', getBlogOutline);

export default router;
