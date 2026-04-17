/**
 * aiController.js
 * ───────────────
 * Handles all AI-powered recommendation endpoints.
 * Every handler:
 *   1. Hashes the inputs to check the 5-minute prompt cache (aiCache).
 *   2. If cache miss → calls Gemini, parses JSON, stores in cache.
 *   3. Returns structured JSON to the client.
 *
 * Routes (registered in routes/ai.js):
 *   POST /api/ai/university-recommendations
 *   POST /api/ai/essay-helper
 *   POST /api/ai/loan-advisor
 *   POST /api/ai/smart-nudge
 */

import { callGemini } from '../services/llmService.js';
import { parseAIJson } from '../utils/parseAIJson.js';
import { aiCache, hashKey } from '../utils/cache.js';
import { getPersonalizedRecommendations } from '../services/personalizationService.js';
import User from '../models/User.js';

// ─────────────────────────────────────────────────────────────────────────────
// Helper: wrap Gemini call with 5-min prompt caching
// ─────────────────────────────────────────────────────────────────────────────
const cachedGeminiCall = async ({ cacheKey, systemPrompt, userMessage, maxTokens = 2000 }) => {
  const cached = aiCache.get(cacheKey);
  if (cached) return { data: cached, fromCache: true };

  const raw = await callGemini({ systemPrompt, userMessage, maxTokens });
  aiCache.set(cacheKey, raw);
  return { data: raw, fromCache: false };
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/ai/university-recommendations
// ─────────────────────────────────────────────────────────────────────────────
/**
 * @desc    Generate top-8 university recommendations tailored to the user profile.
 * @body    { gre, gpa, budget, targetCountries, course? }
 * @access  Protected (verifyToken)
 */
export const getUniversityRecommendations = async (req, res, next) => {
  try {
    const {
      gre,
      gpa,
      budget,
      targetCountries = [],
      course = 'Computer Science',
    } = req.body;

    if (!gre || !gpa || !budget) {
      return res.status(400).json({
        status: 'error',
        message: 'gre, gpa, and budget are required fields.',
      });
    }

    const countriesStr = Array.isArray(targetCountries)
      ? targetCountries.join(', ')
      : targetCountries || 'USA, UK, Canada';

    const cacheKey = hashKey({ type: 'uni-rec', gre, gpa, budget, targetCountries, course });

    const systemPrompt = `You are an expert study-abroad counsellor for Indian students. 
Always respond with ONLY a valid JSON array — no markdown, no prose outside the array.`;

    const userMessage = `Based on GRE: ${gre}, GPA: ${gpa} (on 4.0 scale), budget: USD ${budget}/year, 
target countries: ${countriesStr}, desired course: ${course}, suggest the top 8 universities.

Return ONLY a JSON array with exactly 8 objects. Each object must have these keys:
- name        (string)  : full university name
- country     (string)  : country
- whyFit      (string)  : 1-2 sentence rationale specific to the student profile
- admissionChance (string) : "High" | "Medium" | "Low"
- tuition     (number)  : annual tuition in USD (number only, no $ sign)
- ranking     (number)  : approximate world ranking (QS or US News)

Mix: 2-3 ambitious, 3-4 target, 1-2 safe schools. Do NOT include any text outside the JSON array.`;

    const { data: rawText, fromCache } = await cachedGeminiCall({
      cacheKey,
      systemPrompt,
      userMessage,
      maxTokens: 2500,
    });

    const universities = parseAIJson(rawText);

    return res.json({
      status: 'success',
      fromCache,
      data: { universities },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/ai/essay-helper
// ─────────────────────────────────────────────────────────────────────────────
/**
 * @desc    Generate an SOP/essay outline + example first paragraph.
 * @body    { topic, wordLimit, userProfile: { name, gpa, gre, course, targetUniversity, workExp } }
 * @access  Protected (verifyToken)
 */
export const getEssayHelp = async (req, res, next) => {
  try {
    const {
      topic        = 'Statement of Purpose',
      wordLimit    = 1000,
      userProfile  = {},
    } = req.body;

    const {
      name            = 'the applicant',
      gpa             = 'N/A',
      gre             = 'N/A',
      course          = 'Computer Science',
      targetUniversity = 'a top university',
      workExp         = '0',
    } = userProfile;

    const cacheKey = hashKey({ type: 'essay', topic, wordLimit, userProfile });

    const systemPrompt = `You are an elite academic writing coach specialising in graduate school applications. 
Respond only with the JSON object described — no markdown fences, no extra text.`;

    const userMessage = `Generate an SOP/essay outline and an example first paragraph for the following student.

Student profile:
- Name: ${name}
- Applying for: ${course} at ${targetUniversity}
- GPA: ${gpa} | GRE: ${gre} | Work experience: ${workExp} years
- Essay topic: ${topic}
- Word limit: ${wordLimit} words

Return a single JSON object with these keys:
- outline (array of strings): 5-7 section headings with a one-line description each
- firstParagraph (string): a compelling, personalised opening paragraph (~100 words) in the student's voice
- tips (array of strings): 3-5 specific writing tips for this student's profile`;

    const { data: rawText, fromCache } = await cachedGeminiCall({
      cacheKey,
      systemPrompt,
      userMessage,
      maxTokens: 1500,
    });

    const essay = parseAIJson(rawText);

    return res.json({
      status: 'success',
      fromCache,
      data: { essay },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/ai/loan-advisor
// ─────────────────────────────────────────────────────────────────────────────
/**
 * @desc    Personalised education loan advice for Indian students.
 * @body    { profile: { gpa, income, cibilScore?, collateral? }, targetUniversity, courseFees }
 * @access  Protected (verifyToken)
 */
export const getLoanAdvice = async (req, res, next) => {
  try {
    const {
      profile          = {},
      targetUniversity = 'a foreign university',
      courseFees       = 0,  // total course fees in INR
    } = req.body;

    const {
      gpa        = 'N/A',
      income     = 'N/A',     // family annual income in INR
      cibilScore = 'N/A',
      collateral = 'none',    // e.g. "property worth 80L"
    } = profile;

    const cacheKey = hashKey({ type: 'loan', profile, targetUniversity, courseFees });

    const systemPrompt = `You are a senior education-loan advisor at a top Indian bank, expert in financing 
study-abroad programmes. Respond only with valid JSON — no text outside the object.`;

    const userMessage = `Provide personalised education loan advice for this Indian student:

Profile:
- GPA: ${gpa}
- Family income: INR ${income}/year
- CIBIL score: ${cibilScore}
- Collateral available: ${collateral}
- Target university: ${targetUniversity}
- Total course fees: INR ${courseFees}

Return a JSON object with these keys:
- recommendedNBFCs (array of objects): each with { name, maxLoanAmount, interestRate, specialNote }
  Include at least: Credila, HDFC Credila, Avanse, InCred, Auxilo, SBI Scholar Loan, Union Education Loan
- collateralRequirements (string): advice on collateral based on loan amount
- estimatedEMI (object): { monthly: number, tenure: string, totalInterest: number } — assume 10L at median rate
- eligibilityNotes (string): honest 2-3 sentence assessment of loan eligibility given profile
- actionSteps (array of strings): 4-5 concrete next steps the student should take`;

    const { data: rawText, fromCache } = await cachedGeminiCall({
      cacheKey,
      systemPrompt,
      userMessage,
      maxTokens: 2000,
    });

    const loanAdvice = parseAIJson(rawText);

    return res.json({
      status: 'success',
      fromCache,
      data: { loanAdvice },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/ai/smart-nudge
// ─────────────────────────────────────────────────────────────────────────────
/**
 * @desc    Generate a personalised "next-action" nudge message for the user.
 *          Combines rule-based personalization with an AI-generated sentence.
 * @body    { userId? }  — falls back to req.user.id
 * @access  Protected (verifyToken)
 */
export const getSmartNudge = async (req, res, next) => {
  try {
    const userId = req.body.userId || req.user.id;

    // Fetch user with profileData + journeyStage
    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }

    // Get rule-based personalised recommendations
    const personalization = await getPersonalizedRecommendations(user);

    // Build AI nudge on top of the rule-based message
    const cacheKey = hashKey({
      type: 'nudge',
      stage: user.journeyStage,
      score: Math.floor(personalization.engagementScore / 10), // round to decade to improve cache hits
    });

    const systemPrompt = `You are a friendly and motivating study-abroad coach. 
Write concise, personalised messages. No emojis in formal channels. Keep it under 60 words.`;

    const userMessage = `Write a single motivational next-action nudge for a student at the "${user.journeyStage}" 
stage of their study-abroad journey. Their engagement score is ${personalization.engagementScore} 
(higher = more active). Context hint: "${personalization.nudgeMessage}"

Return ONLY a JSON object: { "nudge": "<your message here>" }`;

    const { data: rawText, fromCache } = await cachedGeminiCall({
      cacheKey,
      systemPrompt,
      userMessage,
      maxTokens: 200,
    });

    let aiNudge = personalization.nudgeMessage; // safe default
    try {
      const parsed = parseAIJson(rawText);
      if (parsed?.nudge) aiNudge = parsed.nudge;
    } catch (_) {
      // fallback to rule-based nudge on parse failure
    }

    return res.json({
      status: 'success',
      fromCache,
      data: {
        nudge:              aiNudge,
        nudgePriority:      personalization.nudgePriority,
        journeyStage:       personalization.journeyStage,
        engagementScore:    personalization.engagementScore,
        recommendedContent: personalization.recommendedContent,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/ai/generate-blog
// ─────────────────────────────────────────────────────────────────────────────
/**
 * @desc    Generate a blog post outline on a given topic using Gemini.
 * @body    { topic: string, targetAudience?: string }
 * @access  Protected (verifyToken)
 */
export const getBlogOutline = async (req, res, next) => {
  try {
    const { topic, targetAudience = 'students planning to study abroad' } = req.body;
    const userId = req.user.id;

    if (!topic) {
      return res.status(400).json({ status: 'error', message: 'topic is required' });
    }

    const cacheKey = hashKey({ type: 'blog', topic, targetAudience });
    
    const systemPrompt = `You are a professional content creator and study-abroad expert.
Return ONLY a valid JSON object. No markdown fences.`;

    const userMessage = `Create a comprehensive blog post outline on the topic: "${topic}".
The target audience is: ${targetAudience}.

Return ONLY a JSON object with:
- title: A catchy, SEO-friendly title
- introduction: A brief summary of what the intro should cover
- sections: Array of objects { heading: string, points: string[] }
- conclusion: A brief summary of the conclusion
- keywords: Array of 3-5 SEO keywords`;

    const { data: rawText, fromCache } = await cachedGeminiCall({
      cacheKey,
      systemPrompt,
      userMessage,
      maxTokens: 1500,
    });

    const blogOutline = parseAIJson(rawText);

    // Call gamification service asynchronously
    if (!fromCache) {
        import('../services/gamificationService.js').then(({ processGamificationEvent }) => {
            processGamificationEvent(userId, 'generate_blog', { topic }).catch(console.error);
        }).catch(console.error);
    }

    return res.json({
      status: 'success',
      fromCache,
      data: { blogOutline },
    });
  } catch (err) {
    next(err);
  }
};
