import Joi from 'joi';

export const ticketDTO = (data) => {
  const schema = Joi.object({
    code: Joi.string().required(),
    purchase_datetime: Joi.date().required(),
    amount: Joi.number().positive().required(),
    purchaser: Joi.string().email().required(),
  });

  return schema.validate(data);
};
