import Joi from "joi";

export const getVisitsSchema = Joi.object({
    passport_details: Joi.string().required()
  });
