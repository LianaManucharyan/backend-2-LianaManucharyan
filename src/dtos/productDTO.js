import Joi from 'joi';

export const productDTO = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
  });
  
  return schema.validate(data);
};
