import Joi from "joi";

const termsSchema = Joi.object({
  number: Joi.number().integer().min(1).max(10).required(),
});

export default termsSchema;
