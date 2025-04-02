import Joi from 'joi';

export const userDTO = (user) => {
  return {
    email: user.email,
    role: user.role,
  };
};

export const userValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  
  return schema.validate(data);
};
