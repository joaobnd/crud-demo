import Joi from 'joi';

const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(/^\d{2} \d \d{4}-\d{4}$/).required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  neighborhood: Joi.string().required(),
  number: Joi.string().required(),
  state: Joi.string().required()
});

export default contactSchema;