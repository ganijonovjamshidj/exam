import Joi from 'joi';

export const borrowValidation = (data) => {
  const schema = Joi.object({
    bookId: Joi.string().uuid().required(),
    userId: Joi.string().uuid().required(),
    borrowDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    returnDate: Joi.date().optional(),
    status: Joi.string().valid('borrowed', 'returned', 'overdue').optional(),
  });

  return schema.validate(data);
};
