import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';

import {rootRouter} from "./routers/index.js";

export const startServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use('/api-docs', swaggerDocs());

  app.use(rootRouter);

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
