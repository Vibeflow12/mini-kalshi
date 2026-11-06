import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  signinSchema,
  type SigninBody,
  signupSchema,
  type SignupBody,
} from '../validators/auth.Validator';
import User from '../schema/users.Schema';
import type { AuthTokenPayload } from '../types/user.types';

export const signupController = async (req: Request<{}, {}, SignupBody>, res: Response) => {
  try {
    const parsedData = signupSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: 'incorrect credentials',
        error: parsedData.error.flatten(),
      });
    }

    const { username, email, password } = parsedData.data;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: 'user already exist',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashPassword });

    return res.status(200).json({
      message: 'user created successfully',
    });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};

export const signinController = async (req: Request<{}, {}, SigninBody>, res: Response) => {
  try {
    const parsedData = signinSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: 'incorrect credentials',
        error: parsedData.error.flatten(),
      });
    }

    const { username, password } = parsedData.data;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({
        message: 'go back and sign in',
      });
    }

    const compairPassword = await bcrypt.compare(password, existingUser.password);

    const payload: AuthTokenPayload = {
      id: existingUser._id.toString(),
      role: existingUser.role,
    };

    if (compairPassword) {
      const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '2h',
      });

      return res.json({
        token: token,
      });
    }
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
