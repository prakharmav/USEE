import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

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
// import authRouter   from './routes/auth.js';
// import userRouter   from './routes/user.js';
// app.use('/api/auth', authLimiter, authRouter);
// app.use('/api/users', userRouter);

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

// ── Centralised Error Handler ─────────────────────────────────────────────────
app.use(errorHandler);

export default app;
