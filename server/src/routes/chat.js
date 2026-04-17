import express from 'express';
import {
  handleMessage,
  getSessions,
  getSession,
  deleteSession
} from '../controllers/chatController.js';
import { verifyToken } from '../middleware/auth.js';
import { aiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * @swagger
 * /api/chat/message:
 *   post:
 *     summary: Send a message to the AI advisor
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message:
 *                 type: string
 *                 example: "What universities should I target with a 320 GRE?"
 *               sessionId:
 *                 type: string
 *                 description: Omit to create a new session
 *               type:
 *                 type: string
 *                 enum: [career, loan, visa, general]
 *                 default: general
 *     responses:
 *       200:
 *         description: AI response returned with sessionId for continuing the conversation
 */
router.post('/message', verifyToken, aiLimiter, handleMessage);

/**
 * @swagger
 * /api/chat/sessions:
 *   get:
 *     summary: List all chat sessions for the current user
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of session summaries
 */
router.get('/sessions', verifyToken, getSessions);

/**
 * @swagger
 * /api/chat/sessions/{id}:
 *   get:
 *     summary: Get full history of a chat session
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *   delete:
 *     summary: Delete a chat session
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 */
router.get('/sessions/:id', verifyToken, getSession);
router.delete('/sessions/:id', verifyToken, deleteSession);

/**
 * @swagger
 * /api/chat/test:
 *   get:
 *     summary: Test AI provider connectivity
 *     tags: [Chat]
 *     responses:
 *       200:
 *         description: Returns a test answer from the active AI provider
 */
router.get('/test', async (req, res, next) => {
  try {
    const { callAI, activeProvider } = await import('../services/aiRouter.js');
    const answer = await callAI({
      systemPrompt: 'You are a helpful assistant.',
      userMessage: 'What is the GRE? Answer in 2 sentences.',
    });
    res.json({ status: 'success', data: { question: 'What is the GRE?', answer, provider: activeProvider } });
  } catch (error) {
    next(error);
  }
});

export default router;
