import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// ── Documentation ─────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// ── Security & Utility Middleware ─────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ── Rate Limiting (global) ────────────────────────────────────────────────────
app.use(generalLimiter);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({ status: 'OK', version: '1.0' });
});

// ── API Routes ────────────────────────────────────────────────────────────────
import authRouter   from './routes/auth.js';
import userRouter   from './routes/user.js';
import universityRouter from './routes/university.js';
import toolRouter from './routes/tool.js';
import activityRouter from './routes/activity.js';

// Using general limiter for auth right now or define authLimiter if you want
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/universities', universityRouter);
app.use('/api/tools', toolRouter);
app.use('/api/activity', activityRouter);

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

// ── Centralised Error Handler ─────────────────────────────────────────────────
app.use(errorHandler);

export default app;
