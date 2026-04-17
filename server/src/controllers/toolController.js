import * as roiService from '../services/roiService.js';
import University from '../models/University.js';
import { calculateProbabilities } from '../services/admissionService.js';
import { generateTimeline } from '../services/timelineService.js';

/**
 * Handle ROI Calculator requests
 */
export const handleROI = async (req, res, next) => {
  try {
    const result = await roiService.calculateROI(req.body);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle EMI Calculator requests
 * Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export const handleEMI = async (req, res, next) => {
  try {
    const { loanAmount, interestRate, tenureMonths } = req.body;

    const P = Number(loanAmount);
    const monthlyRate = Number(interestRate) / 12 / 100;
    const n = Number(tenureMonths);

    const emi = (P * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    // Amortization Schedule
    const amortizationSchedule = [];
    let remainingBalance = P;
    for (let i = 1; i <= n; i++) {
      const interestForMonth = remainingBalance * monthlyRate;
      const principalForMonth = emi - interestForMonth;
      remainingBalance -= principalForMonth;

      amortizationSchedule.push({
        month: i,
        emi: Math.round(emi),
        principal: Math.round(principalForMonth),
        interest: Math.round(interestForMonth),
        remainingBalance: Math.max(0, Math.round(remainingBalance)),
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        emi: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment),
        amortizationSchedule,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle Admission Eligibility requests
 */
export const handleEligibility = async (req, res, next) => {
  try {
    const { gre, gmat, gpa, workExp, backlogs = 0 } = req.body;

    // 1. Calculate weighted score (0-100)
    let score = 0;
    
    // GPA (Scale 4.0 or 10.0) -> Convert to 100
    const normalizedGPA = gpa > 4 ? (gpa / 10) * 100 : (gpa / 4) * 100;
    score += normalizedGPA * 0.4;

    // Standardized Tests
    if (gre) {
      const greScore = ((Number(gre) - 260) / 80) * 100;
      score += greScore * 0.3;
    } else if (gmat) {
      const gmatScore = ((Number(gmat) - 200) / 600) * 100;
      score += gmatScore * 0.3;
    }

    // Work Exp
    const expPoints = Math.min(Number(workExp) * 5, 20); // 5 points per year, max 20
    score += expPoints;

    // Penalties
    score -= Number(backlogs) * 3;

    score = Math.min(Math.max(Math.round(score), 0), 100);

    // 2. Recommendations based on ranking
    let rankLimit = 500;
    if (score > 90) rankLimit = 50;
    else if (score > 80) rankLimit = 150;
    else if (score > 70) rankLimit = 250;

    const recommendedUniversities = await University.find({ ranking: { $lte: rankLimit } })
      .limit(5)
      .select('name country ranking');

    // 3. Loan Eligibility (Simple estimation)
    const loanEligibility = {
      min: 10000,
      max: score > 70 ? 75000 : 35000,
    };

    res.status(200).json({
      status: 'success',
      data: {
        eligibilityScore: score,
        recommendedUniversities,
        loanEligibility,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle Detailed Admission Predictor (Rule Engine)
 */
export const handleAdmissionPredictor = async (req, res, next) => {
  try {
    const predictions = await calculateProbabilities(req.body);
    res.status(200).json({
      status: 'success',
      data: predictions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle Application Timeline Generation
 */
export const handleApplicationTimeline = (req, res, next) => {
  try {
    const { targetIntake } = req.body;
    const timeline = generateTimeline(targetIntake);
    res.status(200).json({
      status: 'success',
      data: timeline
    });
  } catch (error) {
    next(error);
  }
};
