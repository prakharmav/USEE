/**
 * documentCategorizer.js
 * ──────────────────────
 * Rule-based auto-categorizer for incoming loan/visa documents.
 */

export const categorizeDocument = (filename) => {
  if (!filename) return 'uncategorized';
  
  const lowerName = filename.toLowerCase();

  // Basic keyword mapping
  if (lowerName.includes('transcript') || lowerName.includes('mark') || lowerName.includes('grade')) {
    return 'transcript';
  }
  
  if (lowerName.includes('sop') || lowerName.includes('statement of purpose') || lowerName.includes('essay')) {
    return 'SOP';
  }

  if (lowerName.includes('lor') || lowerName.includes('recommendation')) {
    return 'LOR';
  }

  if (lowerName.includes('passport') || lowerName.includes('aadhar') || lowerName.includes('pan') || lowerName.includes('id')) {
    return 'ID proof';
  }

  if (lowerName.includes('bank') || lowerName.includes('statement') || lowerName.includes('financial')) {
    return 'bank statement';
  }

  return 'uncategorized';
};
