import Joi from 'joi';

export const authorValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    biography: Joi.string().allow(''),
    dateOfBirth: Joi.date().required(),
    nationality: Joi.string().required(),
  });

  return schema.validate(data);
};
