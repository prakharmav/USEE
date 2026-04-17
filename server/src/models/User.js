import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    profileData: {
      gre: { type: Number },
      gmat: { type: Number },
      gpa: { type: Number },
      targetCountries: [{ type: String }],
      targetCourses: [{ type: String }],
      budget: { type: Number },
      workExp: { type: Number }, // in years
      researchPapers: { type: Number, default: 0 },
    },
    savedUniversities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
    }],
    journeyStage: {
      type: String,
      enum: ['exploration', 'shortlisting', 'applying', 'admitted'],
      default: 'exploration',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const User = mongoose.model('User', userSchema);
export default User;
