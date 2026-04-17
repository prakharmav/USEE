/**
 * Service to generate a month-by-month application timeline
 */
export const generateTimeline = (targetIntake) => {
  // targetIntake e.g., 'Fall2025'
  const isFall = targetIntake.toLowerCase().includes('fall');
  const year = parseInt(targetIntake.match(/\d+/)?.[0]) || 2025;
  
  const timeline = [];

  if (isFall) {
    // For Fall 2025 (Starts Sept 2025)
    // Prep starts ~12 months before
    timeline.push({ month: `August ${year - 1}`, tasks: ['Research universities and programs', 'Register for GRE/GMAT and IELTS/TOEFL'] });
    timeline.push({ month: `September ${year - 1}`, tasks: ['Start GRE/GMAT intensive prep', 'Draft first version of Statement of Purpose (SOP)'] });
    timeline.push({ month: `October ${year - 1}`, tasks: ['Take standardized tests (GRE/GMAT)', 'Identify 3 professors/supervisors for LORs'] });
    timeline.push({ month: `November ${year - 1}`, tasks: ['Finalize University Shortlist', 'Complete IELTS/TOEFL exam'] });
    timeline.push({ month: `December ${year - 1}`, tasks: ['Submit early applications', 'Polishing SOP and Essays'] });
    timeline.push({ month: `January ${year}`, tasks: ['Regular application deadlines', 'Send official transcripts and test scores'] });
    timeline.push({ month: `February ${year}`, tasks: ['Prepare for university interviews', 'Check for scholarship application dates'] });
    timeline.push({ month: `March ${year}`, tasks: ['Wait for admission decisions', 'Connect with alumni of target schools'] });
    timeline.push({ month: `April ${year}`, tasks: ['Finalize admission offer', 'Start financial documentation for Visa'] });
  } else {
    // Assume Spring (Starts Jan 2026)
    timeline.push({ month: `April ${year - 1}`, tasks: ['Research universities', 'Register for exams'] });
    timeline.push({ month: `May ${year - 1}`, tasks: ['Prep for GRE/IELTS', 'Draft SOP'] });
    timeline.push({ month: `June ${year - 1}`, tasks: ['Take standardized tests'] });
    timeline.push({ month: `July ${year - 1}`, tasks: ['Finalize shortlist', 'Request LORs'] });
    timeline.push({ month: `August ${year - 1}`, tasks: ['Submit applications', 'Financial planning'] });
  }

  return timeline;
};
