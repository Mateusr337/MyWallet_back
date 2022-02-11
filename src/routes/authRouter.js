import { Router } from 'express';
import { signIn, signUp } from '../controllers/authControllers.js';
import validatesignUpSchema from '../middlewares/validateSignUpSchema.js';
import validateSignInSchema from '../middlewares/validateSignInSchema.js';


const authRouter = Router();
authRouter.post("/sign-in", validateSignInSchema, signIn);
authRouter.post('/sign-up', validatesignUpSchema, signUp);


export default authRouter;