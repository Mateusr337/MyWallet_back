import { Router } from 'express';
import operationRouter from './operationRouter.js';
import authRouter from './authRouter.js';

const router = Router();
router.use(authRouter);
router.use(operationRouter);

export default router;