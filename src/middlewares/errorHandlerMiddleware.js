import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';



export const errorHandlerMiddleware = (error, req, res, next) => {

  if (isHttpError(error)) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
      ...(error.errors ? { errors: error.errors.map(err => err.message.replace(/"/g, "'"))} : {}),
    });
  }


if (error instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      message: 'Mongoose error',
      data: error.message.replace(/(?<!\.\s)\./g, ''),
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Internal server error',
    data: error.message,
  });
};
