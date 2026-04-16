import mongoose from 'mongoose';

const loanApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    university: {
      type: String, // You could also make this an ObjectId ref to 'University'
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected'],
      default: 'draft',
    },
    documents: [{
      type: String, // URLs or file paths to documents
    }],
    eligibilityScore: {
      type: Number,
    },
    emi: {
      type: Number, // Estimated Monthly Installment
    },
  },
  {
    timestamps: true,
  }
);

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);
export default LoanApplication;
