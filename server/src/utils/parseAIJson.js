/**
 * parseAIJson.js
 * ──────────────
 * Extracts and parses JSON from Gemini (or any LLM) text responses.
 * Handles the three most common output formats:
 *   1. Bare JSON          → { ... }  or  [ ... ]
 *   2. Markdown fence     → ```json\n...\n```
 *   3. Markdown no-lang   → ```\n...\n```
 *
 * @param {string} rawText - The raw text returned by Gemini.
 * @returns {*} Parsed JavaScript value (object, array, etc.)
 * @throws {Error} If no valid JSON could be extracted.
 */
export const parseAIJson = (rawText) => {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('parseAIJson: input must be a non-empty string');
  }

  const text = rawText.trim();

  // ── Strategy 1: strip markdown code fences ─────────────────────────────────
  // Matches ```json ... ``` or ``` ... ```
  const fenceRegex = /```(?:json)?\s*([\s\S]*?)```/i;
  const fenceMatch = text.match(fenceRegex);
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1].trim());
    } catch (_) {
      // fall through to next strategy
    }
  }

  // ── Strategy 2: first JSON array in the string ─────────────────────────────
  const arrayStart = text.indexOf('[');
  const arrayEnd   = text.lastIndexOf(']');
  if (arrayStart !== -1 && arrayEnd > arrayStart) {
    try {
      return JSON.parse(text.slice(arrayStart, arrayEnd + 1));
    } catch (_) {
      // fall through
    }
  }

  // ── Strategy 3: first JSON object in the string ────────────────────────────
  const objStart = text.indexOf('{');
  const objEnd   = text.lastIndexOf('}');
  if (objStart !== -1 && objEnd > objStart) {
    try {
      return JSON.parse(text.slice(objStart, objEnd + 1));
    } catch (_) {
      // fall through
    }
  }

  // ── Strategy 4: parse the whole string as-is ───────────────────────────────
  try {
    return JSON.parse(text);
  } catch (_) {
    throw new Error(
      `parseAIJson: could not extract valid JSON from AI response.\nRaw text snippet: ${text.slice(0, 200)}`
    );
  }
};
