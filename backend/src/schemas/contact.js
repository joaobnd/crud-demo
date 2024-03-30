const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string()
    .required(),
  phone: Joi.string()
    .required(),
  address: Joi.object({
    street: Joi.string()
      .required(),
    number: Joi.string()
      .required(),
    neighborhood: Joi.string()
      .required(),
    city: Joi.string()
      .required(),
    state: Joi.string()
      .required(),
  })
})

module.exports = schema
