import Joi from 'joi';

export const signupValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
      'any.only': 'Passwords do not match',
    }),
    role: Joi.string().valid('user', 'librarian', 'admin').required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });

  return schema.validate(data);
};

export const signinValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

export const verifyOtpValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().uuid().required(),
    otp: Joi.string().length(6).required(),
  });

  return schema.validate(data);
};
