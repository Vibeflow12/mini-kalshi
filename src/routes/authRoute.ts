import { Router } from 'express';
import { signinController, signupController } from '../controllers/auth.Controller';

export const authRouter = Router();

authRouter.post('/signin', signinController);
authRouter.post('/signup', signupController);
