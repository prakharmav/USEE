import jwt from 'jsonwebtoken';

/**
 * Express middleware that verifies a Bearer JWT token.
 *
 * Expects: Authorization: Bearer <token>
 * On success: attaches decoded payload to req.user and calls next().
 * On failure: responds with 401 / 403.
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Access denied. No token provided.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    const isExpired = err.name === 'TokenExpiredError';
    return res.status(403).json({
      status: 'error',
      message: isExpired ? 'Token expired.' : 'Invalid token.',
    });
  }
};
