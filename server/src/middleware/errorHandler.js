/**
 * Centralised Express error-handling middleware.
 *
 * All errors that reach here are normalised to a consistent JSON shape:
 * { status, message, ...(stack in development) }
 *
 * Usage: app.use(errorHandler)  — must be registered LAST.
 */
export const errorHandler = (err, _req, res, _next) => {
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: messages,
    });
  }

  // Mongoose duplicate key (e.g. unique email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      status: 'error',
      message: `Duplicate value for field: ${field}`,
    });
  }

  // JWT errors forwarded from route handlers
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(403).json({
      status: 'error',
      message: err.message,
    });
  }

  // Everything else
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${statusCode} — ${message}`, err.stack ?? '');

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
