import { verifyToken } from '../utils/token.js';
import { db } from '../data/store.js';
import User from '../models/User.js';
import { isMongoMode } from '../utils/dataSource.js';
import { serializeUser } from '../utils/serialize.js';

/**
 * Requires a valid Bearer token. Attaches req.user (sans password) on success.
 */
export const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'You need to sign in to do that.' });
  }

  try {
    const decoded = verifyToken(token);

    if (isMongoMode()) {
      const userDoc = await User.findById(decoded.id);
      if (!userDoc) {
        return res.status(401).json({ message: 'Your session is no longer valid. Please sign in again.' });
      }
      req.user = serializeUser(userDoc);
      return next();
    }

    const user = db.users.find((u) => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Your session is no longer valid. Please sign in again.' });
    }

    req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Your session has expired. Please sign in again.' });
  }
};

/**
 * Requires req.user.role === 'admin'. Must run after requireAuth.
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: "You don't have permission to do that." });
  }
  next();
};
