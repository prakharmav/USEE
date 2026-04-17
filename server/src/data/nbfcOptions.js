/**
 * nbfcOptions.js
 * ──────────────
 * Static data for NBFC (Non-Banking Financial Company) loan options
 * available for students studying abroad.
 */

export const NBFC_OPTIONS = [
  {
    id: 'credila',
    name: 'Credila',
    interestRate: 11.5, // base rate in %
    maxLoanAmt: 15000000, // 1.5 Cr INR
    processingFee: '1-1.5%',
    collateralRequired: 'Conditional (Usually false for premier institutes)',
    note: 'Good for top 100 global universities without collateral.',
  },
  {
    id: 'hdfc_credila',
    name: 'HDFC Credila',
    interestRate: 11.0,
    maxLoanAmt: 10000000, // 1 Cr INR
    processingFee: '1%',
    collateralRequired: 'Often Required',
    note: 'Trusted banking partner with competitive rates if collateral is provided.',
  },
  {
    id: 'avanse',
    name: 'Avanse',
    interestRate: 12.0,
    maxLoanAmt: 10000000, // 1 Cr INR
    processingFee: '1.5%',
    collateralRequired: 'Optional',
    note: 'High flexibility and covers 100% of the cost of education without margin money.',
  },
  {
    id: 'incred',
    name: 'InCred',
    interestRate: 11.75,
    maxLoanAmt: 8000000,  // 80 Lakh INR
    processingFee: '1%',
    collateralRequired: 'Optional',
    note: 'Fast digital processing. Ideal for mid-tier US/UK universities.',
  },
  {
    id: 'auxilo',
    name: 'Auxilo',
    interestRate: 12.5,
    maxLoanAmt: 10000000, // 1 Cr INR
    processingFee: '1.5%',
    collateralRequired: 'Optional',
    note: 'Considers future employability as a strong criteria for unsecured loans.',
  }
];
