import { salaryBenchmarks, defaultBenchmark } from '../data/salaryBenchmarks.js';
import { roiCache } from '../utils/cache.js';
import University from '../models/University.js';

/**
 * Service to handle ROI (Return on Investment) calculations
 */
export const calculateROI = async (inputs) => {
  const { country, course, universityId, currentSalary = 0, workExp = 0 } = inputs;
  
  // Cache check
  const cacheKey = JSON.stringify({ country, course, universityId, currentSalary, workExp });
  const cachedResult = roiCache.get(cacheKey);
  if (cachedResult) return cachedResult;

  // 1. Fetch University & Program Data
  const university = await University.findById(universityId);
  const program = university?.programs.find(p => p.name.includes(course)) || university?.programs[0];
  
  const estimatedTuition = program?.tuitionFee || 30000;
  const durationMatch = program?.duration?.match(/\d+/);
  const durationYears = durationMatch ? parseInt(durationMatch[0]) / (program.duration.toLowerCase().includes('month') ? 12 : 1) : 2;

  // 2. Benchmarks
  const benchmark = salaryBenchmarks[country] || { courses: {}, livingCost: 10000 };
  const courseData = benchmark.courses[course] || benchmark.courses['CS'] || defaultBenchmark;
  const livingCostPerYear = benchmark.livingCost || 10000;

  // 3. Estimated Salary Post-Grad (Adjusted by Work Exp)
  // Higher work exp usually pushes you closer to p75
  const expFactor = Math.min(workExp / 10, 1); // Max factor of 1 at 10 years
  const estimatedSalaryPost = courseData.p25 + (courseData.p75 - courseData.p25) * expFactor;

  // 4. Calculations
  const estimatedLivingCostTotal = livingCostPerYear * durationYears;
  const totalInvestment = estimatedTuition + estimatedLivingCostTotal;
  
  const annualGains = estimatedSalaryPost - currentSalary;
  const roiYears = annualGains > 0 ? (totalInvestment / annualGains).toFixed(1) : 'Infinite';
  const breakEvenYear = new Date().getFullYear() + Math.ceil(Number(roiYears) || 0);

  // 5. Salary Growth Projection (5 years)
  let currentProj = estimatedSalaryPost;
  const salaryGrowthProjection = [];
  for (let i = 1; i <= 5; i++) {
    currentProj *= 1.08; // 8% avg growth
    salaryGrowthProjection.push({ year: i, amount: Math.round(currentProj) });
  }

  const result = {
    estimatedTuition,
    estimatedLivingCost: estimatedLivingCostTotal,
    estimatedSalaryPost: Math.round(estimatedSalaryPost),
    roiYears: Number(roiYears) || roiYears,
    salaryGrowthProjection,
    breakEvenYear,
    totalInvestment,
    annualGains: Math.round(annualGains)
  };

  // Cache result for 1 hour
  roiCache.set(cacheKey, result);

  return result;
};
