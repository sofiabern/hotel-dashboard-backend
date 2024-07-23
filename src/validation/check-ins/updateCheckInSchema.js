import Joi from "joi";
export const updateCheckInSchema = Joi.object({
    last_name: Joi.string().optional(),
    first_name: Joi.string().optional(),
    middle_name: Joi.string().optional(),
    passport_details: Joi.string().optional(),
    room: Joi.string().optional(),
    isCheckIn: Joi.boolean().optional(),
    check_in_date: Joi.date().optional(),
    check_out_date: Joi.date().optional(),
    discounts: Joi.object({
      regularCustomer: Joi.number().optional(),
      military: Joi.number().optional(),
      guardian: Joi.number().optional()
    }).optional(),
    totalDiscount: Joi.number().optional(),
    totalDayPrice: Joi.number().optional(),
    totalPrice: Joi.number().optional(),
    comment: Joi.string().optional(),
    note: Joi.string().optional()
  });
