import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});
