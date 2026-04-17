import express from 'express';
import * as toolController from '../controllers/toolController.js';

const router = express.Router();

/**
 * @swagger
 * /api/tools/roi-calculator:
 *   post:
 *     summary: Calculate ROI
 *     tags: [Tools]
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/roi-calculator', toolController.handleROI);

/**
 * @swagger
 * /api/tools/emi-calculator:
 *   post:
 *     summary: Calculate EMI
 *     tags: [Tools]
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/emi-calculator', toolController.handleEMI);

/**
 * @swagger
 * /api/tools/eligibility-estimator:
 *   post:
 *     summary: Estimate Eligibility
 *     tags: [Tools]
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/eligibility-estimator', toolController.handleEligibility);

/**
 * @swagger
 * /api/tools/admission-predictor:
 *   post:
 *     summary: Predict Admission
 *     tags: [Tools]
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/admission-predictor', toolController.handleAdmissionPredictor);

/**
 * @swagger
 * /api/tools/application-timeline:
 *   post:
 *     summary: Get Timeline
 *     tags: [Tools]
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/application-timeline', toolController.handleApplicationTimeline);

export default router;
