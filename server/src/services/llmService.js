import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Convert our conversation history format to the Gemini format.
 * Our format: [{ role: 'user'|'assistant', content: '...' }]
 * Gemini format: [{ role: 'user'|'model', parts: [{ text: '...' }] }]
 */
const formatHistoryForGemini = (history = []) => {
  return history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));
};

/**
 * Standard (non-streaming) Gemini call.
 * @param {string} systemPrompt - The system persona / context.
 * @param {string} userMessage - The user's latest message.
 * @param {Array} conversationHistory - Prior conversation turns.
 * @param {number} maxTokens - Max output tokens.
 * @returns {string} - The AI text response.
 */
export const callGemini = async ({
  systemPrompt = 'You are a helpful study abroad advisor.',
  userMessage,
  conversationHistory = [],
  maxTokens = 1000,
}) => {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: systemPrompt,
    generationConfig: { maxOutputTokens: maxTokens },
  });

  const chat = model.startChat({
    history: formatHistoryForGemini(conversationHistory),
  });

  const result = await chat.sendMessage(userMessage);
  return result.response.text();
};

/**
 * Streaming Gemini call — writes chunks directly to an Express response via SSE.
 * @param {string} systemPrompt
 * @param {string} userMessage
 * @param {Array} conversationHistory
 * @param {object} res - Express response object.
 */
export const streamGemini = async ({
  systemPrompt = 'You are a helpful study abroad advisor.',
  userMessage,
  conversationHistory = [],
  res,
}) => {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({
    history: formatHistoryForGemini(conversationHistory),
  });

  const result = await chat.sendMessageStream(userMessage);

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    if (chunkText) {
      res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
    }
  }

  // Signal end of stream
  res.write(`data: [DONE]\n\n`);
  res.end();
};
