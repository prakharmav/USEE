/**
 * loanService.js
 * ──────────────
 * Rule engine for student loan eligibility and formatting.
 */

import { NBFC_OPTIONS } from '../data/nbfcOptions.js';

export const checkLoanEligibility = (profile) => {
  const {
    gpa = 0,
    gre = 0,
    workExperience = 0, // in years
    coApplicantIncome = 0, // INR/year
    universityRanking = 1000, 
  } = profile;

  let score = 0;

  // 1. GPA (Max 30 points) -> scale 0 to 4.0
  if (gpa >= 3.8) score += 30;
  else if (gpa >= 3.5) score += 25;
  else if (gpa >= 3.0) score += 15;
  else score += 5;

  // 2. GRE (Max 25 points)
  if (gre >= 330) score += 25;
  else if (gre >= 315) score += 20;
  else if (gre >= 300) score += 10;
  else score += 0;

  // 3. Work Experience (Max 15 points)
  if (workExperience >= 3) score += 15;
  else if (workExperience >= 1) score += 10;
  else score += 5;

  // 4. Co-Applicant Income (Max 15 points)
  if (coApplicantIncome >= 2000000) score += 15;
  else if (coApplicantIncome >= 1000000) score += 10;
  else if (coApplicantIncome >= 500000) score += 5;

  // 5. University Ranking (Max 15 points)
  if (universityRanking <= 50) score += 15;
  else if (universityRanking <= 200) score += 10;
  else if (universityRanking <= 500) score += 5;

  // Final Eligibility Adjustments
  let eligibilityScore = score; // Out of 100
  let estimatedInterestRate = 12.5;
  let minLoan = 1000000;
  let maxLoan = 2000000;

  if (eligibilityScore > 80) {
    estimatedInterestRate = 11.0;
    minLoan = 2000000;    // 20L
    maxLoan = 10000000;   // 1Cr
  } else if (eligibilityScore > 60) {
    estimatedInterestRate = 11.75;
    minLoan = 1500000;    // 15L
    maxLoan = 7500000;    // 75L
  } else if (eligibilityScore > 40) {
    estimatedInterestRate = 12.5;
    minLoan = 1000000;    // 10L
    maxLoan = 4000000;    // 40L
  } else {
    estimatedInterestRate = 13.5;
    minLoan = 500000;     // 5L
    maxLoan = 2000000;    // 20L
  }

  // Pick NBFCs based on score
  const nbfcOptions = NBFC_OPTIONS.filter(nbfc => {
    // Basic filter: Only show Credila/HDFC for higher scorers
    if (['credila', 'hdfc_credila'].includes(nbfc.id) && eligibilityScore < 70) return false;
    return true;
  });

  return {
    eligibilityScore,
    loanAmount: { min: minLoan, max: maxLoan },
    estimatedInterestRate,
    nbfcOptions,
  };
};

/**
 * Generate a document checklist based on destination country and profile type.
 */
export const getDocumentChecklist = (country = 'USA', loanType = 'unsecured') => {
  const baseDocs = [
    'Aadhar Card & PAN Card of Applicant',
    'Passport Copy (Front & Back)',
    '10th, 12th & Degree Marksheets',
    'University Admission Letter (Unconditional/Conditional)',
    `Co-Applicant's PAN Card & Aadhar Card`,
    `Co-Applicant's Last 3 Months Salary Slips & 6 Months Bank Statement`,
    `Co-Applicant's Form 16 / ITR for last 2 years`,
  ];

  if (country === 'USA') {
    baseDocs.push('I-20 Form (If available)');
    baseDocs.push('Score card for GRE/TOEFL/IELTS');
  } else if (country === 'UK') {
    baseDocs.push('CAS Letter (If available)');
    baseDocs.push('IELTS Scorecard');
  }

  if (loanType === 'secured') {
    baseDocs.push('Property Title Deed');
    baseDocs.push('Registered Sale Agreement');
    baseDocs.push('Latest Property Tax Receipt');
    baseDocs.push('Approved Building Plan');
  }

  return baseDocs;
};

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic Loan Offers
// ─────────────────────────────────────────────────────────────────────────────
export const calculateDynamicOffers = (eligibilityScore, university, courseFees) => {
  // Base parameters
  let baseRate = 12.0;
  if (eligibilityScore >= 80) baseRate = 9.5;
  else if (eligibilityScore >= 60) baseRate = 10.5;
  else if (eligibilityScore >= 40) baseRate = 11.5;

  const calculateEMI = (principal, rate, months) => {
    const r = (rate / 12) / 100;
    if (r === 0) return principal / months;
    return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  };

  const fees = courseFees || 5000000;

  return {
    conservative: {
      type: 'Secure Scholar',
      rate: Math.max(8.0, baseRate - 0.5),
      tenureMonths: 180, // 15 years
      emi: calculateEMI(fees, Math.max(8.0, baseRate - 0.5), 180).toFixed(2),
      note: 'Highly manageable monthly payments over a longer duration. Recommended for lower stress.',
    },
    balanced: {
      type: 'Horizon Standard',
      rate: baseRate,
      tenureMonths: 120, // 10 years
      emi: calculateEMI(fees, baseRate, 120).toFixed(2),
      note: 'Optimal balance of interest paid vs monthly outflow.',
    },
    aggressive: {
      type: 'Global FastTrack',
      rate: baseRate + 0.5,
      tenureMonths: 84, // 7 years
      emi: calculateEMI(fees, baseRate + 0.5, 84).toFixed(2),
      note: 'Higher EMI but significantly reduces total interest paid. Best if expecting high immediate ROI.',
    }
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// Repayment Scenarios
// ─────────────────────────────────────────────────────────────────────────────
export const calculateRepaymentScenarios = (principal, rate, tenureMonths) => {
  const p = Number(principal);
  const r = (Number(rate) / 12) / 100;
  const n = Number(tenureMonths);

  const stdEmi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalStandardInterest = (stdEmi * n) - p;

  // Scenario 1: Minimum Payment (Standard)
  const minimumPayment = {
    name: 'Standard Repayment',
    emi: stdEmi.toFixed(2),
    totalInterest: totalStandardInterest.toFixed(2),
    tenureAchieved: n,
    savings: '0.00'
  };

  // Scenario 2: Accelerated (paying 20% more each month)
  const acceleratedEmi = stdEmi * 1.2;
  // Calculate months to payoff with new EMI
  let balance = p;
  let monthsAccelerated = 0;
  let totalInterestAccelerated = 0;
  while (balance > 0 && monthsAccelerated < n) {
    const interest = balance * r;
    totalInterestAccelerated += interest;
    let principalPaid = acceleratedEmi - interest;
    if (balance < principalPaid) {
      principalPaid = balance;
    }
    balance -= principalPaid;
    monthsAccelerated++;
  }
  
  const accelerated = {
    name: 'Accelerated Repayment (20% Extra)',
    emi: acceleratedEmi.toFixed(2),
    totalInterest: totalInterestAccelerated.toFixed(2),
    tenureAchieved: monthsAccelerated,
    savings: Math.max(0, totalStandardInterest - totalInterestAccelerated).toFixed(2)
  };

  // Scenario 3: Lump-sum after 2 years (paying off 30% of original principal)
  let lumpBalance = p;
  let lumpInterest = 0;
  let lumpMonths = 0;
  
  for (let i = 1; i <= n; i++) {
    if (lumpBalance <= 0) break;
    
    const interest = lumpBalance * r;
    lumpInterest += interest;
    let principalPaid = stdEmi - interest;
    
    if (i === 24) { // End of year 2
      const lumpSum = p * 0.3; // 30% of original
      principalPaid += lumpSum;
    }

    if (lumpBalance < principalPaid) {
      principalPaid = lumpBalance;
    }
    lumpBalance -= principalPaid;
    lumpMonths++;
  }

  const lumpSumScenario = {
    name: 'Lump-Sum (30% at Year 2)',
    emi: stdEmi.toFixed(2),
    totalInterest: lumpInterest.toFixed(2),
    tenureAchieved: lumpMonths,
    savings: Math.max(0, totalStandardInterest - lumpInterest).toFixed(2),
    note: 'Assumes standard EMI, plus a one-time 30% principal payment at month 24.'
  };

  return {
    minimumPayment,
    accelerated,
    lumpSumScenario
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// Loan Journey State Machine
// ─────────────────────────────────────────────────────────────────────────────
export const getJourneyStage = (application) => {
  // Stages: discovery -> eligibility_check -> document_collection -> application -> submitted
  if (!application) {
    return {
      stage: 'discovery',
      completedTasks: [],
      pendingTasks: ['Check Eligibility', 'Find Target University'],
      progressPercent: 10
    };
  }

  const hasScore = !!application.eligibilityScore;
  const hasDocuments = application.documents && application.documents.length > 0;
  const isSubmitted = application.status === 'submitted';
  
  if (isSubmitted) {
    return {
      stage: 'submitted',
      completedTasks: ['Discovery', 'Eligibility Check', 'Document Collection', 'Draft Application', 'Submission'],
      pendingTasks: ['Wait for Bank Review'],
      progressPercent: 100
    };
  }

  if (hasDocuments) {
    return {
      stage: 'application',
      completedTasks: ['Discovery', 'Eligibility Check', 'Started Document Collection'],
      pendingTasks: ['Finish Remaining Uploads', 'Sign Documents', 'Submit Application'],
      progressPercent: 75
    };
  }

  if (hasScore || application.loanAmount) {
    return {
      stage: 'document_collection',
      completedTasks: ['Discovery', 'Eligibility Check'],
      pendingTasks: ['Upload KYC', 'Upload Financial Records', 'Upload Admission Letter'],
      progressPercent: 50
    };
  }

  return {
    stage: 'eligibility_check',
    completedTasks: ['Discovery'],
    pendingTasks: ['Run AI Eligibility Scoring', 'Select NBFC Offer'],
    progressPercent: 25
  };
};
