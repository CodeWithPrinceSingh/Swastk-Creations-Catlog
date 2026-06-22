import jwt from 'jsonwebtoken';

export const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret_change_me', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_change_me');
};
