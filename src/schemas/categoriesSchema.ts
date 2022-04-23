import Joi from "joi";

const categoriesSchema = Joi.object({
  name: Joi.string()
    .pattern(/^P1$|^P2$|^P3$|^P2ch$|^Outras$/)
    .required(),
});

export default categoriesSchema;
