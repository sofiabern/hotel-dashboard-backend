import { Router } from 'express';

// Controllers
import {
  getRoomsController,
} from '../controllers/rooms.js';

// Middlewares
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

export const roomsRouter = Router();

roomsRouter.use(authenticate);

roomsRouter.get('/', ctrlWrapper(getRoomsController) );
