import { Router } from 'express';
import { onrampController } from '../controllers/onramp.Controller';
import { authMiddleware } from '../middleware';

export const onrampRouter = Router();
onrampRouter.use(authMiddleware)
onrampRouter.post('/', onrampController);
