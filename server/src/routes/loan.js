import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  checkEligibility,
  createLoanApplication,
  getUserApplications,
  updateApplication,
  submitApplication,
  attachDocument,
  getApplicationStatus,
  getDynamicOffers,
  getRepaymentScenarios,
  getJourneyStageHandler,
  aiApplicationAssist
} from '../controllers/loanController.js';

const router = express.Router();

router.use(verifyToken);

/**
 * @swagger
 * /api/loans/check-eligibility:
 *   post:
 *     summary: Rule engine checking loan options, eligibility matching, and generating document checklists
 *     tags: [Loans]
 */
router.post('/check-eligibility', checkEligibility);

/**
 * @swagger
 * /api/loans/applications:
 *   post:
 *     summary: Create a loan application (draft status)
 *     tags: [Loans]
 */
router.post('/applications', createLoanApplication);

/**
 * @swagger
 * /api/loans/applications/{userId}:
 *   get:
 *     summary: List user's loan applications
 *     tags: [Loans]
 */
router.get('/applications/:userId', getUserApplications);

/**
 * @swagger
 * /api/loans/applications/{id}:
 *   put:
 *     summary: Update application (add documents, change stage)
 *     tags: [Loans]
 */
router.put('/applications/:id', updateApplication);

/**
 * @swagger
 * /api/loans/applications/{id}/submit:
 *   post:
 *     summary: Change status to 'submitted', trigger email
 *     tags: [Loans]
 */
router.post('/applications/:id/submit', submitApplication);

/**
 * @swagger
 * /api/loans/applications/{id}/attach-document:
 *   post:
 *     summary: Attach a verified document URL to the loan application
 *     tags: [Loans]
 */
router.post('/applications/:id/attach-document', attachDocument);

/**
 * @swagger
 * /api/loans/applications/{id}/status:
 *   get:
 *     summary: Application status + next steps
 *     tags: [Loans]
 */
router.get('/applications/:id/status', getApplicationStatus);

/**
 * @swagger
 * /api/loans/dynamic-offers:
 *   post:
 *     summary: Predicts conservative, aggressive, and balanced loan offers.
 *     tags: [Loans, AI]
 */
router.post('/dynamic-offers', getDynamicOffers);

/**
 * @swagger
 * /api/loans/repayment-scenarios:
 *   get:
 *     summary: Calculate standard, accelerated, and lump-sum payoffs
 *     tags: [Loans]
 */
router.get('/repayment-scenarios', getRepaymentScenarios);

/**
 * @swagger
 * /api/loans/journey-stage/{userId}:
 *   get:
 *     summary: Evaluate current loan lifecycle stage dynamically
 *     tags: [Loans]
 */
router.get('/journey-stage/:userId', getJourneyStageHandler);

/**
 * @swagger
 * /api/loans/ai-application-assist:
 *   post:
 *     summary: AI assists writing loan essays or budgeting forms
 *     tags: [Loans, AI]
 */
router.post('/ai-application-assist', aiApplicationAssist);

export default router;
