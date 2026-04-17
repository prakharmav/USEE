import express from 'express';
import { 
  getUniversities, 
  getUniversityById, 
  compareUniversities, 
  getCountries 
} from '../controllers/universityController.js';

const router = express.Router();

/**
 * @swagger
 * /api/universities:
 *   get:
 *     summary: Search and filter universities
 *     tags: [Universities]
 *     parameters:
 *       - in: query
 *         name: country
 *         schema: { type: string }
 *       - in: query
 *         name: course
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of universities
 */
router.get('/', getUniversities);

/**
 * @swagger
 * /api/universities/countries:
 *   get:
 *     summary: Get list of countries
 *     tags: [Universities]
 *     responses:
 *       200:
 *         description: Array of countries
 */
router.get('/countries', getCountries);

/**
 * @swagger
 * /api/universities/{id}:
 *   get:
 *     summary: Get university details
 *     tags: [Universities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: University details
 */
router.get('/:id', getUniversityById);

/**
 * @swagger
 * /api/universities/compare:
 *   post:
 *     summary: Compare universities
 *     tags: [Universities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids: { type: array, items: { type: string } }
 *     responses:
 *       200:
 *         description: Comparison data
 */
router.post('/compare', compareUniversities);

export default router;
