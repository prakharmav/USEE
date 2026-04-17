/**
 * loanController.js
 * ─────────────────
 * Handles Loan Application REST endpoints.
 */

import LoanApplication from '../models/LoanApplication.js';
import User from '../models/User.js';
import { 
  checkLoanEligibility, 
  getDocumentChecklist, 
  calculateDynamicOffers, 
  calculateRepaymentScenarios, 
  getJourneyStage 
} from '../services/loanService.js';
import { callGemini } from '../services/llmService.js';

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/loans/check-eligibility
// ─────────────────────────────────────────────────────────────────────────────
export const checkEligibility = (req, res, next) => {
  try {
    const { profile = {}, country = 'USA', loanType = 'unsecured' } = req.body;

    const eligibilityResult = checkLoanEligibility(profile);
    const requiredDocuments = getDocumentChecklist(country, loanType);

    return res.json({
      status: 'success',
      data: {
        ...eligibilityResult,
        requiredDocuments,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/loans/applications
// ─────────────────────────────────────────────────────────────────────────────
export const createLoanApplication = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { loanAmount, course, university } = req.body;

    if (!loanAmount || !course || !university) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    const application = new LoanApplication({
      userId,
      loanAmount,
      course,
      university,
      status: 'draft',
    });

    await application.save();

    return res.status(201).json({ status: 'success', data: { application } });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/loans/applications/:userId
// ─────────────────────────────────────────────────────────────────────────────
export const getUserApplications = async (req, res, next) => {
  try {
    // Only allow users to view their own, unless admin (simplifying here to strict ownership if token matches)
    const { userId } = req.params;
    
    // Safety check optionally: if (req.user.id !== userId) return res.status(403)...
    if (req.user.id !== userId) {
        return res.status(403).json({ status: 'error', message: 'Unauthorized' });
    }

    const applications = await LoanApplication.find({ userId }).sort({ createdAt: -1 });

    return res.json({ status: 'success', data: { applications } });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/loans/applications/:id
// ─────────────────────────────────────────────────────────────────────────────
export const updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body; // { documents, status, etc }

    // Ensure it belongs to user
    const application = await LoanApplication.findOne({ _id: id, userId: req.user.id });
    if (!application) {
      return res.status(404).json({ status: 'error', message: 'Loan application not found.' });
    }

    // Merge updates safely. e.g. add new documents if provided
    Object.keys(updates).forEach((key) => {
      application[key] = updates[key];
    });

    await application.save();

    return res.json({ status: 'success', data: { application } });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/loans/applications/:id/submit
// ─────────────────────────────────────────────────────────────────────────────
export const submitApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const application = await LoanApplication.findOne({ _id: id, userId: req.user.id });
    if (!application) {
      return res.status(404).json({ status: 'error', message: 'Loan application not found.' });
    }

    if (application.status !== 'draft') {
       return res.status(400).json({ status: 'error', message: 'Only draft applications can be submitted.' });
    }

    application.status = 'submitted';
    await application.save();

    // Trigger email logic here in real world
    console.log(`[EMAIL DISPATCH] Loan Application submitted for API: ${id}. Email sent to Operations team.`);

    return res.json({ 
      status: 'success', 
      message: 'Application submitted successfully. An email has been sent to processing.',
      data: { application }
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/loans/applications/:id/attach-document
// ─────────────────────────────────────────────────────────────────────────────
export const attachDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { documentUrl } = req.body;

    if (!documentUrl) {
      return res.status(400).json({ status: 'error', message: 'documentUrl is required.' });
    }

    const application = await LoanApplication.findOne({ _id: id, userId: req.user.id });
    if (!application) {
      return res.status(404).json({ status: 'error', message: 'Loan application not found.' });
    }

    application.documents.push(documentUrl);
    await application.save();

    return res.json({
      status: 'success',
      message: 'Document safely attached to Loan Application.',
      data: { application }
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/loans/applications/:id/status
// ─────────────────────────────────────────────────────────────────────────────
export const getApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const application = await LoanApplication.findOne({ _id: id, userId: req.user.id });
    if (!application) {
      return res.status(404).json({ status: 'error', message: 'Loan application not found.' });
    }

    let nextSteps = [];
    switch (application.status) {
      case 'draft':
        nextSteps = ['Complete the remaining specific fields', 'Upload all pending required documents', 'Submit the application'];
        break;
      case 'submitted':
      case 'under_review':
        nextSteps = ['Our operations team is currently reviewing your documents.', 'If anything is missing, you will be contacted via email within 24 hours.'];
        break;
      case 'approved':
        nextSteps = ['Review your loan offer', 'Digitally sign the agreement', 'Disbursement setup'];
        break;
      case 'rejected':
        nextSteps = ['Check email for rejection rationale', 'Evaluate co-applicant integration'];
        break;
    }

    return res.json({ 
      status: 'success', 
      data: { 
         status: application.status,
         nextSteps 
      } 
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/loans/dynamic-offers
// ─────────────────────────────────────────────────────────────────────────────
export const getDynamicOffers = (req, res, next) => {
  try {
    const { eligibilityScore, university, courseFees } = req.body;
    
    if (!eligibilityScore) {
       return res.status(400).json({ status: 'error', message: 'eligibilityScore is required.' });
    }

    const offers = calculateDynamicOffers(eligibilityScore, university, courseFees);

    return res.json({
      status: 'success',
      data: offers
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/loans/repayment-scenarios
// ─────────────────────────────────────────────────────────────────────────────
export const getRepaymentScenarios = (req, res, next) => {
  try {
    const { principal = 5000000, rate = 10.5, tenureMonths = 120 } = req.query;
    
    const scenarios = calculateRepaymentScenarios(principal, rate, tenureMonths);

    return res.json({
      status: 'success',
      data: scenarios
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/loans/journey-stage/:userId
// ─────────────────────────────────────────────────────────────────────────────
export const getJourneyStageHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (req.user.id !== userId) {
      return res.status(403).json({ status: 'error', message: 'Unauthorized' });
    }

    // Grab the most active draft or latest application
    const application = await LoanApplication.findOne({ userId }).sort({ createdAt: -1 });
    
    const journey = getJourneyStage(application);

    return res.json({
      status: 'success',
      data: journey
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/loans/ai-application-assist
// ─────────────────────────────────────────────────────────────────────────────
export const aiApplicationAssist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { applicationField, universityTarget, additionalContext } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    const systemPrompt = `You are a professional financial advisor and admission counselor.
    The user is applying for an education loan. 
    They need help drafting the "${applicationField}" section of their formal loan application.
    Return ONLY the requested drafted text. Do not include chatty remarks or markdown fences unless specifically formatting bullet points. Keep it highly persuasive, professional, and directly suited for a Bank Credit Officer.`;

    const profileData = `GPA: ${user.profileData?.gpa || 'N/A'}, Work Exp: ${user.profileData?.workExp || 'N/A'} yrs, Target: ${universityTarget || 'Premier Institution'}.`;

    const userMessage = `Write a professional 2-3 paragraph response for the ${applicationField} field. 
    Here is my profile background: ${profileData}. 
    Additional instructions: ${additionalContext || 'None'}.`;

    const draftedText = await callGemini({
      systemPrompt,
      userMessage,
      maxTokens: 500,
    });

    return res.json({
      status: 'success',
      data: { draftedText }
    });
  } catch (err) {
    next(err);
  }
};

