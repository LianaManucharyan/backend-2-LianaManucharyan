import Joi from 'joi';

export const cartDTO = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().positive().required(),
      })
    ).required(),
  });

  return schema.validate(data);
};
