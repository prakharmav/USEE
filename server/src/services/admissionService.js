import University from '../models/University.js';

/**
 * Service to handle admission probability predictions
 */
export const calculateProbabilities = async (inputs) => {
  const { gre = 300, gpa = 3.0, workExp = 0, researchPapers = 0, targetUniversities = [] } = inputs;

  if (!targetUniversities || targetUniversities.length === 0) {
    throw new Error('Please provide at least one target university.');
  }

  // Fetch university data to factor in rankings
  const universities = await University.find({ _id: { $in: targetUniversities } });

  const predictions = universities.map(uni => {
    // 1. Base Score calculation (User's Formula)
    let baseScore = (gre / 340) * 30 + (gpa / 4) * 30 + workExp * 5 + researchPapers * 10;
    
    // 2. Random factor (simulate ML variability - 5% max)
    const randomFactor = (Math.random() * 5);
    baseScore += randomFactor;

    // 3. Normalize based on University Ranking
    // Assume Rank 1 has a penalty of 40%, Rank 500 has a penalty of 0%
    const rankingPenalty = Math.max(0, (500 - (uni.ranking || 500)) / 500) * 40;
    
    let probability = baseScore - rankingPenalty;

    // Ensure probability stays within 0-100 range
    probability = Math.min(Math.max(Math.round(probability), 5), 98);

    let status = 'reach';
    if (probability > 75) status = 'safe';
    else if (probability > 50) status = 'target';

    return {
      universityId: uni._id,
      name: uni.name,
      probability,
      status,
      factors: {
        academicScore: Math.round((gre / 340) * 30 + (gpa / 4) * 30),
        experienceScore: workExp * 5 + researchPapers * 10,
        randomFactor: Math.round(randomFactor)
      }
    };
  });

  return predictions;
};
