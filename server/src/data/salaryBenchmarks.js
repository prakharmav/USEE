/**
 * Benchmarks for Salaries and Living Costs per Country/Course
 * All salary values are annual median/percentile estimations.
 */
export const salaryBenchmarks = {
  USA: {
    livingCost: 18000, // Avg yearly living cost in USD
    courses: {
      CS: { p25: 90000, median: 120000, p75: 155000 },
      MBA: { p25: 110000, median: 145000, p75: 190000 },
      DataScience: { p25: 100000, median: 130000, p75: 170000 },
      Mechanical: { p25: 75000, median: 95000, p75: 120000 }
    }
  },
  UK: {
    livingCost: 12000, // Avg yearly living cost in GBP equivalent
    courses: {
      CS: { p25: 45000, median: 65000, p75: 85000 },
      MBA: { p25: 60000, median: 85000, p75: 120000 },
      DataScience: { p25: 50000, median: 70000, p75: 95000 }
    }
  },
  Canada: {
    livingCost: 15000,
    courses: {
      CS: { p25: 75000, median: 100000, p75: 130000 },
      MBA: { p25: 85000, median: 115000, p75: 150000 }
    }
  },
  Germany: {
    livingCost: 10000,
    courses: {
      CS: { p25: 55000, median: 70000, p75: 90000 },
      Mechanical: { p25: 60000, median: 75000, p75: 100000 }
    }
  },
  India: {
    livingCost: 3000,
    courses: {
      CS: { p25: 12000, median: 25000, p75: 50000 },
      MBA: { p25: 15000, median: 35000, p75: 70000 }
    }
  }
};

export const defaultBenchmark = { p25: 50000, median: 75000, p75: 100000, livingCost: 10000 };
