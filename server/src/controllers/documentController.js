/**
 * documentController.js
 * ─────────────────────
 * Handles document uploads, fetching user documents, and deletion.
 */

import Document from '../models/Document.js';
import cloudinary from '../config/cloudinary.js';
import { categorizeDocument } from '../utils/documentCategorizer.js';

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/documents/upload
// ─────────────────────────────────────────────────────────────────────────────
export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No file uploaded.' });
    }

    const { originalname } = req.file;
    const url = req.file.path; // Multer-storage-cloudinary attaches 'path' holding the secure url
    const cloudinaryId = req.file.filename; // Cloudinary public_id

    // Auto classify document using our keyword mapping utility
    const category = categorizeDocument(originalname);

    const doc = new Document({
      userId: req.user.id,
      filename: originalname,
      url,
      cloudinaryId,
      category,
      status: 'uploaded', // Defaults to uploaded
    });

    await doc.save();

    return res.status(201).json({
      status: 'success',
      data: { document: doc },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/documents/:userId
// ─────────────────────────────────────────────────────────────────────────────
export const getUserDocuments = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Safety check assuming ownership required unless admin logic handles it
    if (req.user.id !== userId) {
      return res.status(403).json({ status: 'error', message: 'Unauthorized access.' });
    }

    const documents = await Document.find({ userId }).sort({ createdAt: -1 });

    return res.json({
      status: 'success',
      data: { documents },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/documents/:id
// ─────────────────────────────────────────────────────────────────────────────
export const deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;

    const doc = await Document.findOne({ _id: id, userId: req.user.id });

    if (!doc) {
      return res.status(404).json({ status: 'error', message: 'Document not found or unauthorized.' });
    }

    // Attempt to remove it physically from Cloudinary using stored public_id
    await cloudinary.uploader.destroy(doc.cloudinaryId);

    await Document.deleteOne({ _id: id });

    return res.json({
      status: 'success',
      message: 'Document permanently deleted.',
    });
  } catch (err) {
    next(err);
  }
};
