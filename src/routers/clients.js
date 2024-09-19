import { Router } from 'express';

import {
  getClientsController,
  getClientVisitsController
} from '../controllers/clients.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {validateBody} from "../middlewares/validateBody.js";
import { authenticate } from '../middlewares/authenticate.js';
import { getVisitsSchema } from '../validation/clients/getVisitsScchema.js';



export const clientsRouter = Router();

clientsRouter.use(authenticate);

clientsRouter.get('/', ctrlWrapper(getClientsController));

clientsRouter.post('/visits', validateBody(getVisitsSchema), ctrlWrapper(getClientVisitsController));
