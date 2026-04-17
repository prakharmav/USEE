import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Convert our conversation history to OpenAI's message format.
 */
const formatHistoryForOpenAI = (systemPrompt, history = [], userMessage) => {
  const messages = [{ role: 'system', content: systemPrompt }];

  history.forEach(msg => {
    messages.push({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    });
  });

  messages.push({ role: 'user', content: userMessage });
  return messages;
};

/**
 * Standard (non-streaming) OpenAI call.
 * Same signature as callGemini for drop-in compatibility.
 */
export const callOpenAI = async ({
  systemPrompt = 'You are a helpful study abroad advisor.',
  userMessage,
  conversationHistory = [],
  maxTokens = 1000,
}) => {
  const messages = formatHistoryForOpenAI(systemPrompt, conversationHistory, userMessage);

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: maxTokens,
  });

  return response.choices[0].message.content;
};

/**
 * Streaming OpenAI call — writes SSE chunks to Express response.
 * Same signature as streamGemini.
 */
export const streamOpenAI = async ({
  systemPrompt = 'You are a helpful study abroad advisor.',
  userMessage,
  conversationHistory = [],
  res,
}) => {
  const messages = formatHistoryForOpenAI(systemPrompt, conversationHistory, userMessage);

  const stream = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content || '';
    if (text) {
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    }
  }

  res.write(`data: [DONE]\n\n`);
  res.end();
};
