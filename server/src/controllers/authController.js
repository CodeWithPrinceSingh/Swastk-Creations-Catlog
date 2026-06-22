import bcrypt from 'bcryptjs';
import { db } from '../data/store.js';
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

    const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
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
    const user = db.users.find((u) => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'Account not found.' });
    res.json({ user: sanitize(user) });
  } catch (err) {
    next(err);
  }
};
