import { callGemini, streamGemini } from './llmService.js';
import { callOpenAI, streamOpenAI } from './openaiService.js';

const useGemini = !!process.env.GEMINI_API_KEY;

/**
 * Universal AI call. Automatically uses Gemini if key exists, otherwise falls back to OpenAI.
 * Accepts the same params as callGemini / callOpenAI.
 */
export const callAI = async (params) => {
  if (useGemini) {
    return callGemini(params);
  }
  return callOpenAI(params);
};

/**
 * Universal streaming AI call. Same routing logic as callAI.
 * Writes SSE chunks to res.
 */
export const streamAI = async (params) => {
  if (useGemini) {
    return streamGemini(params);
  }
  return streamOpenAI(params);
};

export const activeProvider = useGemini ? 'Gemini' : 'OpenAI';
