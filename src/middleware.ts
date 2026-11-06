import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import User from './models/users.model';
import { authTokenSchema, type AuthTokenPayload } from './validators/auth.Validator';

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === 'string') {
      return res.status(401).json({ message: 'invalid token' });
    }

    const parsedPayload = authTokenSchema.safeParse(decoded);

    if (!parsedPayload.success) {
      return res.status(401).json({ message: 'invalid token payload' });
    }

    const payload: AuthTokenPayload = parsedPayload.data;

    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json({
        message: 'user does not exist',
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: 'invalid or expired token',
      });
    }

    console.error('AUTH MIDDLEWARE ERROR:', error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
