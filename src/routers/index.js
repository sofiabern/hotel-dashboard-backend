import { Router } from "express";

import { roomsRouter } from "./rooms.js";
import { clientsRouter } from "./clients.js";
import { checkInsRouter } from "./check-ins.js";
import { authRouter } from "./auth.js";

export const rootRouter = Router();

rootRouter.use('/rooms',roomsRouter);
rootRouter.use('/clients', clientsRouter);
rootRouter.use('/check-ins', checkInsRouter);
rootRouter.use('/auth', authRouter);
