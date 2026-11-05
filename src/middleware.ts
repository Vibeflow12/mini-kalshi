import jwt from 'jsonwebtoken';
import type { AuthTokenPayload } from './types/user.types';
import type { Request, Response, NextFunction } from 'express';
import User from './schema/users.Schema';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'unauthorized',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'unauthorized',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthTokenPayload;

    if (typeof decoded === 'string' || typeof decoded.id !== 'string') {
      return res.status(401).json({ message: 'invalid token' });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: 'user does not exist',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
