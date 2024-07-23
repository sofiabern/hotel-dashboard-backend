import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const validateMongoId = (idName) => (req, res, next) => {
    const id = req.params[idName];

    if (!id) {
      throw new Error('id in validateMongoId is not provided');
    }

    if (!isValidObjectId(id)) {
      return next(createHttpError(400, 'Invalid id'));
    }

    return next();
  };
