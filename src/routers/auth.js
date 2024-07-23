import { Router } from 'express';

// Controllers
import {
    getCurrentContoller,
    loginUserController,
    logoutUserController,
    signupUserController,
  } from '../controllers/auth.js';

// Middlewares
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';

// Schemas
import { signupUserSchema } from '../validation/users/signupUserSchema.js';
import { loginUserSchema } from '../validation/users/loginUserSchema.js';



export const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(signupUserSchema),
  ctrlWrapper(signupUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', authenticate, ctrlWrapper(logoutUserController));

authRouter.get('/current', authenticate, ctrlWrapper(getCurrentContoller));
