import bcrypt from 'bcryptjs';
import { db } from '../data/store.js';
import User from '../models/User.js';
import { isMongoMode } from '../utils/dataSource.js';
import { serializeUser } from '../utils/serialize.js';
import { signToken } from '../utils/token.js';

const sanitize = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are all required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    if (isMongoMode()) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(409).json({ message: 'An account with this email already exists.' });
      }

      const userDoc = await User.create({
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: 'customer',
      });

      const user = serializeUser(userDoc);
      const token = signToken({ id: user.id, role: user.role });
      return res.status(201).json({ user, token });
    }

    // ---- Mock mode ----
    const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const user = {
      id: db.uuid(),
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);

    const token = signToken({ id: user.id, role: user.role });
    res.status(201).json({ user: sanitize(user), token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    if (isMongoMode()) {
      const userDoc = await User.findOne({ email: email.toLowerCase() });
      if (!userDoc) {
        return res.status(401).json({ message: 'Incorrect email or password.' });
      }

      const matches = await bcrypt.compare(password, userDoc.passwordHash);
      if (!matches) {
        return res.status(401).json({ message: 'Incorrect email or password.' });
      }

      const user = serializeUser(userDoc);
      const token = signToken({ id: user.id, role: user.role });
      return res.json({ user, token });
    }

    // ---- Mock mode ----
    const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    const token = signToken({ id: user.id, role: user.role });
    res.json({ user: sanitize(user), token });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    // req.user is already populated (and correctly shaped) by requireAuth
    // for both mock and Mongo modes, so we can return it directly.
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
};
