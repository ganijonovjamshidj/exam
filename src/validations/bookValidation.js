import Joi from 'joi';

export const bookValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    isbn: Joi.string().required(),
    authorId: Joi.string().uuid().required(),
    category: Joi.string().required(),
    publicationDate: Joi.date().required(),
    totalCopies: Joi.number().integer().min(1).required(),
  });

  return schema.validate(data);
};
