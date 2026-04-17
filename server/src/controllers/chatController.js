import ChatSession from '../models/ChatSession.js';
import User from '../models/User.js';
import { callAI, streamAI, activeProvider } from '../services/aiRouter.js';
import { buildCareerAdvisorPrompt } from '../prompts/careerAdvisorPrompt.js';
import { buildLoanAdvisorPrompt } from '../prompts/loanAdvisorPrompt.js';
import { buildVisaAdvisorPrompt } from '../prompts/visaAdvisorPrompt.js';

/**
 * Build the correct system prompt based on chat type, injecting user profile.
 */
const buildSystemPrompt = (type, userProfile) => {
  switch (type) {
    case 'career':  return buildCareerAdvisorPrompt(userProfile);
    case 'loan':    return buildLoanAdvisorPrompt(userProfile);
    case 'visa':    return buildVisaAdvisorPrompt(userProfile);
    default:        return buildCareerAdvisorPrompt(userProfile); // Default to career
  }
};

/**
 * Generate a short title from the first user message.
 */
const generateTitle = (message) => {
  return message.length > 50 ? message.substring(0, 47) + '...' : message;
};

// ─── POST /api/chat/message ────────────────────────────────────────────────────
export const handleMessage = async (req, res, next) => {
  try {
    const { sessionId, message, type = 'general' } = req.body;
    const userId = req.user.id;

    if (!message) {
      return res.status(400).json({ status: 'error', message: 'Message is required.' });
    }

    // 1. Load user profile for context injection
    const user = await User.findById(userId);
    const userProfile = {
      name: user?.name,
      ...user?.profileData,
      journeyStage: user?.journeyStage,
    };

    // 2. Get or create chat session
    let session;
    if (sessionId) {
      session = await ChatSession.findOne({ _id: sessionId, userId });
      if (!session) {
        return res.status(404).json({ status: 'error', message: 'Session not found.' });
      }
    } else {
      session = await ChatSession.create({
        userId,
        sessionType: type,
        title: generateTitle(message),
        messages: [],
      });
    }

    // 3. Build conversation history from last 10 messages
    const recentMessages = session.messages.slice(-10).map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    }));

    // 4. Build the system prompt with user profile context
    const systemPrompt = buildSystemPrompt(session.sessionType, userProfile);

    // 5. Call AI
    const aiResponse = await callAI({
      systemPrompt,
      userMessage: message,
      conversationHistory: recentMessages,
    });

    // 6. Save both messages to session
    session.messages.push({ role: 'user', content: message });
    session.messages.push({ role: 'assistant', content: aiResponse });
    session.messageCount = session.messages.length;
    await session.save();

    res.status(200).json({
      status: 'success',
      data: {
        sessionId: session._id,
        response: aiResponse,
        sessionType: session.sessionType,
        provider: activeProvider,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/chat/sessions ────────────────────────────────────────────────────
export const getSessions = async (req, res, next) => {
  try {
    const sessions = await ChatSession.find({ userId: req.user.id })
      .select('sessionType title messageCount createdAt updatedAt')
      .sort({ updatedAt: -1 })
      .limit(20);

    res.status(200).json({
      status: 'success',
      data: sessions,
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/chat/sessions/:id ───────────────────────────────────────────────
export const getSession = async (req, res, next) => {
  try {
    const session = await ChatSession.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!session) {
      return res.status(404).json({ status: 'error', message: 'Session not found.' });
    }

    res.status(200).json({
      status: 'success',
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/chat/sessions/:id ────────────────────────────────────────────
export const deleteSession = async (req, res, next) => {
  try {
    const deleted = await ChatSession.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Session not found.' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Session deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
