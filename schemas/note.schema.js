import Joi from "joi";

export const noteSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
});
