/**
 * Document.js
 * ───────────
 * Tracks uploaded documents for a user, maintaining references to the Cloudinary URL.
 */
import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true, // Need this to properly delete from Cloudinary later
    },
    category: {
      type: String,
      enum: ['transcript', 'SOP', 'LOR', 'ID proof', 'bank statement', 'uncategorized'],
      default: 'uncategorized',
    },
    status: {
      type: String,
      enum: ['uploaded', 'verified'],
      default: 'uploaded',
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model('Document', documentSchema);
export default Document;
