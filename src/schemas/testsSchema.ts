import Joi from "joi";

const testsSchema = Joi.object({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  categoryId: Joi.number().required(),
  teacherDisciplineId: Joi.number().required(),
  views: Joi.number().equal(0).required(),
});

export default testsSchema;
