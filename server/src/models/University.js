import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String, // e.g., "2 years", "18 months"
  },
  tuitionFee: {
    type: Number,
  },
  intake: [{
    type: String, // e.g., "Fall 2024", "Spring 2025"
  }],
  requiredScores: {
    type: Map,
    of: String, // e.g., "GRE": "320", "IELTS": "7.0"
  },
});

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    ranking: {
      type: Number,
    },
    programs: [programSchema],
    acceptanceRate: {
      type: Number, // percentage out of 100
    },
    employmentRate: {
      type: Number, // percentage out of 100
    },
    avgSalary: {
      type: Number, // in USD or local currency
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for full-text search
universitySchema.index({ name: 'text', 'programs.name': 'text' });

const University = mongoose.model('University', universitySchema);
export default University;
