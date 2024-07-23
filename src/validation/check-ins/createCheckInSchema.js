import Joi from 'joi';
export const createCheckInSchema = Joi.object({
  last_name: Joi.string().required(),
  first_name: Joi.string().required(),
  middle_name: Joi.string().optional(),
  passport_details: Joi.string().required(),
  room: Joi.string().required(),
  isCheckIn: Joi.boolean().required(),
  check_in_date: Joi.date().required(),
  check_out_date: Joi.date().required(),
  discounts: Joi.object({
    regularCustomer: Joi.number().required(),
    military: Joi.number().required(),
    guardian: Joi.number().required(),
  }).required(),
  totalDiscount: Joi.number().required(),
  totalDayPrice: Joi.number().required(),
  totalPrice: Joi.number().required(),
  comment: Joi.string().optional(),
});
