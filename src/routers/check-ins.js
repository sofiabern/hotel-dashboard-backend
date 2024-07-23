import { Router } from 'express';

// Conrollers
import {
  getCheckInsController,
  createCheckInController,
  deleteCheckInController,
  updateCheckInController
} from '../controllers/check-ins.js';

// Middlewares
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';


// Schemas
import { createCheckInSchema } from '../validation/check-ins/createCheckInSchema.js';
import { updateCheckInSchema } from '../validation/check-ins/updateCheckInSchema.js';



export const checkInsRouter = Router();

checkInsRouter.use(authenticate);

checkInsRouter.get('/', ctrlWrapper(getCheckInsController));

checkInsRouter.post('/', validateBody(createCheckInSchema), ctrlWrapper(createCheckInController));

checkInsRouter.patch('/:checkInId',  validateMongoId('checkInId'), validateBody(updateCheckInSchema), ctrlWrapper(updateCheckInController));

checkInsRouter.delete( '/:checkInId', validateMongoId('checkInId'), ctrlWrapper(deleteCheckInController));

