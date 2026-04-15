import rateLimit from 'express-rate-limit';

/**
 * General-purpose rate limiter: 100 requests per 15 minutes.
 * Applied globally in app.js.
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,  // Return rate-limit info in `RateLimit-*` headers
  legacyHeaders: false,   // Disable `X-RateLimit-*` headers
  message: {
    status: 'error',
    message: 'Too many requests. Please try again after 15 minutes.',
  },
});

/**
 * Stricter limiter for auth routes: 5 requests per 15 minutes.
 * Apply per-router: app.use('/api/auth', authLimiter, authRouter)
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});
