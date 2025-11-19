import Joi from 'joi';

export const idValidation = (id) => {
  const schema = Joi.string().uuid().required();
  return schema.validate(id);
};
