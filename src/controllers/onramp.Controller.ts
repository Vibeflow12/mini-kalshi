import type { Request, Response } from 'express';
import { onrampSchema } from '../validators/onramp.Valiator';
import User from '../models/users.model';

export const onrampController = async (req: Request, res: Response) => {
  try {
    const parsedData = onrampSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        messae: 'invalid input',
        error: parsedData.error.flatten(),
      });
    }

    const { amount } = parsedData.data;

    const result = await User.findByIdAndUpdate(
      req.user._id,
      {
        $inc: {
          usdBalance: BigInt(amount),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!result) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      message: 'usd added',
      usdBalance: result.usdBalance.toString(),
    });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
