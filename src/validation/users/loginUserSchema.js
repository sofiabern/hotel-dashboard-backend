import Joi from "joi";
export const loginUserSchema = Joi.object({
password: Joi.string().min(6).required(),
email: Joi.string().required().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),

});
