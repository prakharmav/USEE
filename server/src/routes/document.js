import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { uploadMiddleware } from '../middleware/upload.js';
import {
  uploadDocument,
  getUserDocuments,
  deleteDocument
} from '../controllers/documentController.js';

const router = express.Router();

router.use(verifyToken);

/**
 * @swagger
 * /api/documents/upload:
 *   post:
 *     summary: Upload a document to Cloudinary (Multipart form - field "file")
 *     tags: [Documents]
 */
router.post('/upload', uploadMiddleware.single('file'), uploadDocument);

/**
 * @swagger
 * /api/documents/{userId}:
 *   get:
 *     summary: Retrieve a user's uploaded documents
 *     tags: [Documents]
 */
router.get('/:userId', getUserDocuments);

/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     summary: Permanently delete a document
 *     tags: [Documents]
 */
router.delete('/:id', deleteDocument);

export default router;
