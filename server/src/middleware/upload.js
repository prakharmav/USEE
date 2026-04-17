import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'eduvion_documents', // Optional: sub-folder in your Cloudinary account
      allowed_formats: ['jpeg', 'png', 'jpg', 'pdf'], // Strictly limit file formats
      // 'raw' resource type is needed for pdfs sometimes in Cloudinary depending on format restrictions, 
      // but auto works well for most mixed format buckets:
      resource_type: 'auto', 
    };
  },
});

// Configure Multer
export const uploadMiddleware = multer({
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Redundant safety check in memory before sending to cloud
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, and PNG are allowed.'), false);
    }
  }
});
