import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/users.js';
import { env } from '../utils/env.js';
import { ENV_VARS } from '../constants/index.js';


export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(createHttpError(401, 'Authorization header is not defined'));
  }

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(createHttpError(401));
  }

  try {
    const { id } = jwt.verify(token, env(ENV_VARS.JWT_SECRET));
    const user = await User.findById(id);


    if(!user || !user.token || token !== user.token){
       return next(createHttpError(401)) ;
    }
    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(401, error.message));
  }
};
