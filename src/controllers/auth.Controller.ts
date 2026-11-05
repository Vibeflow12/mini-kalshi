import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signupSchema, type SignupBody } from '../validators/signup.Validator';
import { signinSchema, type SigninBody } from '../validators/signin.Validator';
import User from '../schema/users.Schema';


export const signupController = async (req: Request<{}, {}, SignupBody>, res: Response) => {
  try {
    const parsedData = signupSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: 'incorrect credentials',
        error: parsedData.error.flatten(),
      });
    }

    const { username, password } = parsedData.data;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: 'user already exist',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ username, password: hashPassword });

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

    if (compairPassword) {
      const token = jwt.sign({ id: existingUser._id.toString() }, process.env.JWT_SECRET!, {
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
